#!/usr/bin/env python3
"""Bundel de syllabuspagina's tot de PDF die de student downloadt.

    python scripts/export-syllabus.py
    python scripts/export-syllabus.py --html-only      # alleen de bundel, geen Chrome

De uitvoer is downloads/Datacommunicatie-en-netwerken-syllabus.pdf, en die is
GECOMMIT: Pages serveert alleen wat in git zit. Ze is dus afgeleid materiaal dat
toch in de repo staat, net als de verslagsjablonen, en regel 13 van
scripts/check-content.py faalt als ze ouder is dan de pagina's waar ze uit komt.

DE VOLGORDE KOMT UIT HET MANIFEST, niet uit de mappenlijst. Een categorie in
reference.js is een hoofdstuk, een topic is een sectie, en het hoofdstuknummer
volgt uit de plaats van de categorie in die lijst. Zo kan de gedrukte volgorde
niet uit de pas lopen met wat de hub toont. Een categorie met genummerd: false
(het Voorwoord) krijgt geen nummer.

Het eerste topic van een hoofdstuk heet Overzicht.html en draagt de kernpunten
en de studievragen. Dat is de opening van het hoofdstuk, dus die pagina krijgt
de hoofdstuktitel als kop en telt niet als sectie: OSI model is 1.1 en niet 1.2.

HOE DE PAGINANUMMERS IN DE INHOUDSTAFEL KOMEN

Chrome kan geen inhoudstafel met paginanummers maken: CSS kent target-counter(),
Chrome niet. Vandaar dat de INHOUD eerst gedrukt wordt en pypdf daarna de tekst
van elke bladzijde terugleest om te zien waar elke kop geland is. Pas dan worden
de cover en de inhoudstafel gedrukt, met die nummers erin.

Het gedrukte nummer telt de cover en de inhoudstafel mee, zoals in de bestaande
syllabus, waar het Voorwoord op 3 staat. Het is dus ook de plaats van het blad
in het document, en wie in zijn viewer naar bladzijde 40 springt, komt uit waar
de inhoudstafel hem stuurt. De prijs is dat de nummers in de inhoudstafel
afhangen van hoe lang de inhoudstafel zelf is; die lengte hangt alleen van het
aantal regels af en niet van de nummers, dus een proefdruk volstaat om ze te
kennen. Zie de lus in main().

Cover, inhoudstafel en inhoud worden apart gedrukt en achteraf aan elkaar
geplakt, want ze hebben elk andere @page-marges. De cover zet zijn tekst op
absolute posities vanaf de bladrand en is nagemeten van de bestaande syllabus.

De kop- en voettekst worden er achteraf op gestempeld met reportlab: Chrome kan
via de commandoregel alleen zijn eigen kop- en voettekst zetten (met datum en
URL erin) en die is niet aan te passen. De Word doet het net zo als hier: het
paginanummer bovenaan, de hoofdstuktitel onderaan.
"""

import argparse
import functools
import html
import io
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from collections import namedtuple
from pathlib import Path

try:
    from pypdf import PdfReader, PdfWriter
except ImportError:
    sys.exit("pypdf ontbreekt:  pip install pypdf")

try:
    from reportlab.lib.units import mm
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.pdfgen import canvas as rl_canvas
except ImportError:
    sys.exit("reportlab ontbreekt:  pip install reportlab")

REPO = Path(__file__).resolve().parent.parent
MODULE = "syllabus"
BRON = REPO / "Theorie" / "Syllabus" / "Theorie"
UIT = REPO / "downloads" / "Datacommunicatie-en-netwerken-syllabus.pdf"
LOGO = REPO / "img" / "syllabus-cover-logo.png"

TITEL = "Datacommunicatie en netwerken"
OPLEIDING = "Bachelor in de elektromechanica - automatisering"
DEPARTEMENT = "Departement Biowetenschappen en Industri\u00eble Technologie"
AUTEUR = "Tom Demets (tom.demets@hogent.be)"

CHROME_KANDIDATEN = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
]
CHROME_OP_PAD = ["chrome", "google-chrome", "chromium", "msedge"]

DOCUMENT_RE = re.compile(r"\.(pdf|zip|docx|pptx|xlsx|pka|pkt)$", re.I)

ARIAL_KANDIDATEN = [
    ("C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/arialbd.ttf"),
    ("/Library/Fonts/Arial.ttf", "/Library/Fonts/Arial Bold.ttf"),
    ("/System/Library/Fonts/Supplemental/Arial.ttf",
     "/System/Library/Fonts/Supplemental/Arial Bold.ttf"),
    ("/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
     "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"),
]


def stempelletters():
    """(gewoon, vet) voor de kop- en voettekst, in Arial als dat te vinden is.

    Helvetica zit in elke PDF-lezer ingebakken en lijkt er sterk op, maar het is
    het lettertype van de rest van dit document niet. Staat Arial nergens, dan is
    Helvetica de terugval en scheelt het alleen een haartje.
    """
    for gewoon, vet in ARIAL_KANDIDATEN:
        if Path(gewoon).exists() and Path(vet).exists():
            try:
                pdfmetrics.registerFont(TTFont("SyllabusArial", gewoon))
                pdfmetrics.registerFont(TTFont("SyllabusArial-Bold", vet))
                return "SyllabusArial", "SyllabusArial-Bold"
            except Exception:
                pass
    return "Helvetica", "Helvetica-Bold"

overgeslagen = []


# --------------------------------------------------------- manifest lezen

def js_literal(tekst, start):
    """Het JS-objectliteral dat op tekst[start] begint, als Python-object.

    reference.js is JavaScript en geen JSON: sleutels zonder aanhalingstekens,
    enkele aanhalingstekens, commentaar, komma's op het eind. Dit loopt teken
    per teken en weet dus wanneer het in een string zit; een regex die alleen
    de aanhalingstekens omwisselt, struikelt over elke apostrof in een blurb.
    """
    uit = []
    i, n, diepte = start, len(tekst), 0
    while i < n:
        c = tekst[i]
        if c == "/" and i + 1 < n and tekst[i + 1] == "/":
            while i < n and tekst[i] != "\n":
                i += 1
            continue
        if c == "/" and i + 1 < n and tekst[i + 1] == "*":
            eind = tekst.find("*/", i)
            i = len(tekst) if eind == -1 else eind + 2
            continue
        if c in "'\"":
            aanhaling = c
            stuk = ['"']
            i += 1
            while i < n and tekst[i] != aanhaling:
                if tekst[i] == "\\":
                    stuk.append(tekst[i:i + 2])
                    i += 2
                    continue
                stuk.append('\\"' if tekst[i] == '"' else tekst[i])
                i += 1
            stuk.append('"')
            uit.append("".join(stuk))
            i += 1
            continue
        if c in "{[":
            diepte += 1
        elif c in "}]":
            diepte -= 1
        uit.append(c)
        i += 1
        if diepte == 0 and uit and uit[-1] in "}]":
            break

    ruw = "".join(uit)
    ruw = re.sub(r"([{,]\s*)([A-Za-z_$][\w$]*)\s*:", r'\1"\2":', ruw)
    ruw = re.sub(r",(\s*[}\]])", r"\1", ruw)
    return json.loads(ruw)


def lees_module():
    tekst = (REPO / "reference.js").read_text(encoding="utf-8")
    m = re.search(rf"^    {MODULE}:\s*\{{", tekst, re.M)
    if not m:
        sys.exit(f"module '{MODULE}' staat niet in reference.js")
    return js_literal(tekst, m.end() - 1)


# Een sectie van het gedrukte document. soort is "pagina" voor een sectie die
# uit een bronpagina komt, en "oplossingen" voor de sectie die uit de Test
# jezelf van diezelfde pagina afgeleid wordt.
Sectie = namedtuple("Sectie", "nummer vaste_titel pagina tid soort")


def hoofdstukken(module):
    """(nummer of None, titel, [Sectie, ...]) per hoofdstuk."""
    uit = []
    teller = 0
    for categorie in module["categories"]:
        genummerd = categorie.get("genummerd", True)
        if genummerd:
            teller += 1
        nummer = str(teller) if genummerd else None

        secties = []
        sectieteller = 0
        for topic in categorie["topics"]:
            href = topic["href"]
            if DOCUMENT_RE.search(href):
                overgeslagen.append(f"{categorie['name']}: {href} is een document, "
                                    "dat gaat niet in de bundel")
                continue
            pad = Path(os.path.normpath(BRON / href))
            if not pad.exists():
                overgeslagen.append(f"{categorie['name']}: {href} bestaat niet")
                continue
            opening = pad.name.lower() == "overzicht.html" and not secties
            if opening and nummer:
                secties.append(Sectie(None, categorie["name"], pad,
                                      topic["id"], "pagina"))
                continue
            sectieteller += 1
            snummer = f"{nummer}.{sectieteller}" if nummer else None
            secties.append(Sectie(snummer, None, pad, topic["id"], "pagina"))
            # De oplossingen volgen op de Test jezelf waar ze uit komen, als
            # een sectie op zich: ze staan achter de vragen en niet eronder.
            if pad.name.lower() == "testjezelf.html" and oplossingen_uit(pad):
                sectieteller += 1
                snummer = f"{nummer}.{sectieteller}" if nummer else None
                secties.append(Sectie(snummer, None, pad,
                                      topic["id"] + "-oplossingen", "oplossingen"))
        if secties:
            uit.append((nummer, categorie["name"], secties))
    return uit


# ------------------------------------------------------------ pagina lezen

def container_van(pagina):
    tekst = pagina.read_text(encoding="utf-8")
    m = re.search(r'<div class="container">(.*?)\n    </div>', tekst, re.S)
    if not m:
        sys.exit(f"{pagina}: geen <div class=\"container\"> gevonden")
    return m.group(1)


def kop_en_inhoud(pagina):
    binnen = container_van(pagina)
    m = re.search(r"<h1>(.*?)</h1>", binnen, re.S)
    kop = re.sub(r"\s+", " ", m.group(1)).strip() if m else pagina.stem
    inhoud = binnen[m.end():] if m else binnen
    return kop, inhoud


def verplaats_koppen(fragment):
    """h2 wordt h3 enzovoort: de h1 van de pagina wordt in de bundel een h2."""
    def een(m):
        return f"<{m.group(1)}h{min(int(m.group(2)) + 1, 6)}{m.group(3)}>"
    return re.sub(r"<(/?)h([1-5])([^>]*)>", een, fragment)


def absolute_paden(fragment, pagina):
    """src en href relatief aan de pagina worden absolute file:-URL's.

    De bundel staat in een tijdelijke map, dus elk relatief pad zou daar zoeken.
    """
    def een(m):
        attr, waarde = m.group(1), m.group(2)
        if re.match(r"(https?:|file:|data:|mailto:|#)", waarde):
            return m.group(0)
        doel = Path(os.path.normpath(pagina.parent / waarde))
        return f'{attr}="{doel.as_uri()}"'
    return re.sub(r'\b(src|href)="([^"]+)"', een, fragment)


def naamruimte_ids(fragment, prefix):
    """Vijf pagina's met id="het-schema" worden in een document vijf keer dezelfde."""
    return re.sub(r'\bid="([^"]+)"', lambda m: f'id="{prefix}-{m.group(1)}"', fragment)


def zonder_scripts(fragment):
    return re.sub(r"<script\b.*?</script>", "", fragment, flags=re.S | re.I)


# ---------------------------------------------------------- de oplossingen

# HET ANTWOORD STAAT BIJ DE VRAAG, en alleen de export laat het zien.
#
# Een meerkeuzevraag duidt de juiste mogelijkheid aan met class="juist", een
# open vraag draagt haar modelantwoord in <!-- oplossing: ... -->. Allebei
# blijven ze onzichtbaar op de site, zodat TestJezelf.html daar een toets blijft
# en niet een toets met de antwoorden eronder.
#
# Waarom niet een geschreven oplossingenpagina naast de vragen? Omdat die de
# letter van de mogelijkheid zou moeten herhalen ("2. b"). Verwissel dan ooit
# twee mogelijkheden en die letter is stil fout: aan geen van beide pagina's is
# iets te zien. Door de juiste mogelijkheid zelf te merken, wordt de letter
# geteld op het ogenblik dat er gedrukt wordt en kan hij niet uit de pas lopen.
#
# De sectie staat daarom ook niet in reference.js. Het manifest blijft zeggen
# waar de Test jezelf staat; de oplossingen zijn eruit afgeleid en volgen erop,
# zoals het verslagsjabloon uit Opdracht.html volgt.
#
# Regel 14 van scripts/check-content.py bewaakt dat elke vraag een antwoord
# draagt, want hieronder is een vraag zonder antwoord alleen een regel "let op".

OPLOSSING_RE = re.compile(r"<!--\s*oplossing:\s*(.*?)-->", re.S)


def lijstitems(fragment, tag):
    """De <li> op het eerste niveau van de eerste <tag> in fragment.

    Geeft (openingstag, inhoud) per item. Met een reguliere expressie alleen
    lukt dat niet: de mogelijkheden van een meerkeuzevraag zijn zelf <li>'s
    binnen het item, dus er moet geteld worden hoe diep we zitten.
    """
    opening = re.search(rf"<{tag}\b[^>]*>", fragment)
    if not opening:
        return []
    rest = fragment[opening.end():]
    items = []
    lijstdiepte = 0   # geneste ul/ol binnen het lopende item
    lidiepte = 0
    start = tagtekst = None
    for m in re.finditer(r"<(/?)(ul|ol|li)\b[^>]*>", rest):
        sluit, naam = m.group(1) == "/", m.group(2)
        if naam == "li":
            if sluit:
                if lidiepte == 1 and lijstdiepte == 0 and start is not None:
                    items.append((tagtekst, rest[start:m.start()]))
                    start = None
                lidiepte = max(0, lidiepte - 1)
            else:
                lidiepte += 1
                if lidiepte == 1 and lijstdiepte == 0:
                    start, tagtekst = m.end(), m.group(0)
        elif sluit:
            if lijstdiepte == 0:
                break             # hier sluit de buitenste lijst
            lijstdiepte -= 1
        else:
            lijstdiepte += 1
    return items


def top_lijsten(fragment):
    """De <ol>'s op het eerste niveau, elk met het nummer waar hij begint.

    Een Test jezelf is in de Word een doorlopende genummerde lijst, maar een
    tussenzin of een tabel ertussen splitst hem in HTML in meerdere <ol>'s. Het
    start-attribuut houdt de nummering dan aan, en hier worden ze weer aan
    elkaar geregen. Zonder dat leest alleen de eerste <ol> mee: de vragen
    daarna raken hun antwoord kwijt zonder dat er iets aan te zien is.
    """
    uit = []
    diepte = 0
    volgende = 1
    for m in re.finditer(r"<(/?)(ul|ol)\b([^>]*)>", fragment):
        if m.group(1) == "/":
            diepte = max(0, diepte - 1)
            continue
        if diepte == 0 and m.group(2) == "ol":
            begin = re.search(r'start="(\d+)"', m.group(3))
            begin = int(begin.group(1)) if begin else volgende
            items = lijstitems(fragment[m.start():], "ol")
            uit.append((begin, items))
            volgende = begin + len(items)
        diepte += 1
    return uit


def vragen_van(fragment):
    """(nummer, openingstag, inhoud) per vraag, over alle <ol>'s van de pagina heen."""
    return [(begin + i, tag, inhoud)
            for begin, items in top_lijsten(fragment)
            for i, (tag, inhoud) in enumerate(items)]


def inline(fragment):
    return re.sub(r"\s+", " ", fragment).strip()


@functools.lru_cache(maxsize=None)
def oplossingen_uit(pagina):
    """De oplossingen van een Test jezelf, of None als er een antwoord ontbreekt.

    Alles of niets, en met opzet. Een lijst waar vraag 3 uit weggevallen is,
    laat de student denken dat hij vraag 3 goed heeft, en dat is erger dan geen
    lijst. Ontbreekt er een antwoord, dan zegt de export welke vraag het is en
    drukt ze voor dat hoofdstuk geen oplossingen.
    """
    _, fragment = kop_en_inhoud(pagina)
    vragen = vragen_van(fragment)
    if not vragen:
        overgeslagen.append(f"{pagina.name}: geen genummerde vragen gevonden")
        return None

    regels, ontbreekt = [], []
    for nummer, _, inhoud in vragen:
        keuzes = lijstitems(inhoud, "ul")
        if keuzes:
            juist = [i for i, (tag, _) in enumerate(keuzes)
                     if re.search(r'class="[^"]*\bjuist\b', tag)]
            if len(juist) != 1:
                ontbreekt.append(f"vraag {nummer} heeft {len(juist)} juiste "
                                 "mogelijkheden in plaats van een")
                continue
            letter = chr(ord("a") + juist[0])
            regels.append(f'<li><span class="keuze">{letter}</span>'
                          f"{inline(keuzes[juist[0]][1])}</li>")
            continue
        gemerkt = OPLOSSING_RE.search(inhoud)
        if not gemerkt:
            ontbreekt.append(f"vraag {nummer} draagt geen <!-- oplossing: ... -->")
            continue
        regels.append(f"<li>{inline(gemerkt.group(1))}</li>")

    if ontbreekt:
        for regel in ontbreekt:
            overgeslagen.append(f"{pagina.name}: {regel}")
        overgeslagen.append(f"{pagina.name}: geen oplossingen gedrukt zolang niet "
                            "elke vraag er een heeft")
        return None
    return '<ol class="oplossingen">\n' + "\n".join(regels) + "\n</ol>"


def zonder_oplossingen(fragment):
    """De antwoorden uit de vragen halen: ze horen in de oplossingensectie."""
    return OPLOSSING_RE.sub("", fragment)


# --------------------------------------------------------------- de bundel

# Er staat hier geen opmaak. Alles wat zegt hoe het document eruitziet, staat in
# Theorie/Syllabus/syllabus.css, en dat bestand wordt hieronder gelinkt met een
# absolute file:-URL, zodat de url()'s erin (de icoontjes van de kaders) tegen
# de repo oplossen en niet tegen de tijdelijke map waar de bundel staat.
#
# OrionCSS wordt hier NIET geladen. Dat is de huisstijl van de site; dit is een
# document met de huisstijl van HOGENT, en twee stylesheets over elkaar zouden
# betekenen dat je bij elke afwijking moet raden welke van de twee wint.
STIJLBLAD = REPO / "Theorie" / "Syllabus" / "syllabus.css"

BUNDEL = """<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <title>{titel}</title>
    <link rel="stylesheet" href="{stijlblad}">
</head>

<body>
{inhoud}
</body>

</html>
"""


def bundel(inhoud):
    return BUNDEL.format(titel=html.escape(TITEL), inhoud=inhoud,
                         stijlblad=STIJLBLAD.as_uri())




def sectie_slug(bestandsnaam):
    """TestJezelf -> test-jezelf. De bestandsnaam is PascalCase, zoals overal."""
    met_streepjes = re.sub(r"(?<=[a-z0-9])(?=[A-Z])", "-", bestandsnaam)
    return re.sub(r"[^a-z0-9]+", "-", met_streepjes.lower()).strip("-")


def bouw_inhoud(structuur):
    stukken = []
    for nummer, titel, secties in structuur:
        for snummer, vaste_titel, pagina, tid, soort in secties:
            if soort == "oplossingen":
                nr = f'<span class="kop-nr">{snummer}</span>' if snummer else ""
                fragment = naamruimte_ids(
                    absolute_paden(oplossingen_uit(pagina), pagina), tid)
                stukken.append('<section data-sectie="oplossingen">\n'
                               f'<h2 id="{tid}">{nr}Oplossingen</h2>\n'
                               + fragment + "\n</section>")
                continue
            kop, fragment = kop_en_inhoud(pagina)
            fragment = zonder_scripts(fragment)
            fragment = zonder_oplossingen(fragment)
            fragment = verplaats_koppen(fragment)
            fragment = absolute_paden(fragment, pagina)
            fragment = naamruimte_ids(fragment, tid)
            # Het nummer krijgt een eigen span, want in de syllabus staat de
            # titel op een vaste tabstop: zonder dat schuift "1.1" hem verder
            # op dan "1" en lijnt geen enkele kop uit met de volgende.
            if vaste_titel is not None:
                # de opening van een hoofdstuk: titel plus de kaders, samen op
                # een eigen bladzijde zoals in de syllabus
                nr = f'<span class="kop-nr">{nummer}</span>' if nummer else ""
                stukken.append(
                    '<div class="hoofdstuk-opening">\n'
                    f'<h1 id="{tid}">{nr}{html.escape(vaste_titel)}</h1>\n'
                    + fragment.strip() + "\n</div>")
                continue
            # Elke sectie zegt in data-sectie welke sectie ze is, afgeleid van de
            # bestandsnaam van haar bronpagina. syllabus.css beslist daarmee wat
            # er met zo'n sectie gebeurt (een Test jezelf begint bijvoorbeeld op
            # een nieuwe bladzijde). Zo staat die keuze in de stylesheet en niet
            # hier, en geldt ze meteen voor elk hoofdstuk.
            if snummer is None:
                kopregel = f'<h1 id="{tid}">{html.escape(kop)}</h1>'
            else:
                kopregel = (f'<h2 id="{tid}"><span class="kop-nr">{snummer}</span>'
                            f"{html.escape(kop)}</h2>")
            stukken.append(f'<section data-sectie="{sectie_slug(pagina.stem)}">\n'
                           + kopregel + "\n" + fragment.strip() + "\n</section>")
    return "\n\n".join(stukken)


def bouw_cover():
    logo = (f'<img class="cover-logo" src="{LOGO.as_uri()}" alt="HOGENT">'
            if LOGO.exists() else "")
    return "\n".join([
        '<div class="cover">',
        f'    <div class="cover-opleiding">{html.escape(OPLEIDING)}</div>',
        f'    <div class="cover-titel">{html.escape(TITEL)}</div>',
        f'    <div class="cover-auteur">{html.escape(AUTEUR)}</div>',
        '    <div class="cover-departement">Departement<br>Biowetenschappen en<br>'
        "Industri&euml;le Technologie</div>",
        '    <div class="cover-opleidingsvoet">Bachelor in de elektromechanica'
        "<br><br>Automatisering</div>",
        f"    {logo}",
        "</div>",
    ])


def bouw_inhoudstafel(inhoudstafel):
    regels = ['<div class="inhoud-titel">Inhoudstafel</div>', '<table class="toc">']
    for niveau, nummer, titel, bladzijde in inhoudstafel:
        nr = f'<span class="nr">{nummer}</span>' if nummer else ""
        regels.append(f'    <tr class="n{niveau}">'
                      f"<td>{nr}{html.escape(titel)}</td>"
                      f'<td class="pg">{bladzijde}</td></tr>')
    regels.append("</table>")
    return "\n".join(regels)


# ------------------------------------------------------------------ chrome

def zoek_chrome(opgegeven):
    for kandidaat in filter(None, [opgegeven, os.environ.get("CHROME")]):
        if Path(kandidaat).exists():
            return kandidaat
    for kandidaat in CHROME_KANDIDATEN:
        pad = Path(os.path.expandvars(kandidaat))
        if pad.exists():
            return str(pad)
    for naam in CHROME_OP_PAD:
        gevonden = shutil.which(naam)
        if gevonden:
            return gevonden
    sys.exit("geen Chrome of Edge gevonden; geef --chrome PAD of zet CHROME")


def druk_af(chrome, html_pad, pdf_pad):
    opdracht = [chrome, "--headless=new", "--disable-gpu", "--no-sandbox",
                "--no-pdf-header-footer", "--virtual-time-budget=20000",
                f"--print-to-pdf={pdf_pad}", html_pad.as_uri()]
    klaar = subprocess.run(opdracht, capture_output=True, text=True)
    if not Path(pdf_pad).exists():
        sys.exit(f"Chrome maakte geen PDF:\n{klaar.stderr[-2000:]}")


# ------------------------------------------------ paginanummers terugzoeken

def genormaliseerd(tekst):
    return re.sub(r"\s+", "", tekst).lower()


def zoek_bladzijden(pdf_pad, koppen):
    """Op welke bladzijde staat elke kop? Vooruit zoekend, dus dubbele titels
    (elk hoofdstuk heeft een Test jezelf) landen op de juiste."""
    lezer = PdfReader(str(pdf_pad))
    paginas = [genormaliseerd(p.extract_text() or "") for p in lezer.pages]
    uit = []
    vanaf = 0
    for kop in koppen:
        naald = genormaliseerd(kop)
        gevonden = None
        for i in range(vanaf, len(paginas)):
            if naald in paginas[i]:
                gevonden = i + 1
                vanaf = i
                break
        if gevonden is None:
            overgeslagen.append(f'kop "{kop}" niet teruggevonden in de PDF, '
                                "paginanummer geschat")
            gevonden = uit[-1] if uit else 1
        uit.append(gevonden)
    return uit, len(lezer.pages)


# ------------------------------------------------------- kop- en voettekst

def stempel(bron_pdf, hoofdstuk_per_bladzijde, verschuiving):
    """Paginanummer bovenaan, hoofdstuktitel onderaan, zoals in de Word.

    Het nummer telt de cover en de inhoudstafel mee, zodat het gelijkloopt met
    de inhoudstafel en met wat een viewer als bladzijde aanwijst.
    """
    lezer = PdfReader(str(bron_pdf))
    schrijver = PdfWriter()
    for i, bladzijde in enumerate(lezer.pages):
        breedte = float(bladzijde.mediabox.width)
        hoogte = float(bladzijde.mediabox.height)
        buffer = io.BytesIO()
        c = rl_canvas.Canvas(buffer, pagesize=(breedte, hoogte))
        _, vet = stempelletters()

        # Maten van de bestaande syllabus afgemeten: het nummer rechtsboven op
        # 185.1mm, de hoofdstuktitel linksonder in grijs, en het logo rechts
        # ernaast. Alles staat buiten de tekstspiegel van 25 tot 185mm.
        c.setFont(vet, 16)
        c.setFillGray(0)
        c.drawRightString(185.1 * mm, hoogte - 19.6 * mm, str(i + 1 + verschuiving))

        titel = hoofdstuk_per_bladzijde[i] if i < len(hoofdstuk_per_bladzijde) else ""
        if titel:
            c.setFont(vet, 9.5)
            c.setFillGray(0.45)
            c.drawString(27.8 * mm, 19.6 * mm, titel)
        if LOGO.exists():
            c.drawImage(str(LOGO), 165.7 * mm, 16.0 * mm, width=19.4 * mm,
                        height=10.7 * mm, mask="auto")
        c.save()
        buffer.seek(0)
        bladzijde.merge_page(PdfReader(buffer).pages[0])
        schrijver.add_page(bladzijde)
    return schrijver


# -------------------------------------------------------------------- main

def main():
    p = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--out", default=str(UIT))
    p.add_argument("--chrome")
    p.add_argument("--html-only", action="store_true",
                   help="schrijf alleen de gebundelde HTML, start Chrome niet")
    p.add_argument("--keep-html", action="store_true",
                   help="laat de bundel staan naast de PDF")
    args = p.parse_args()

    if not STIJLBLAD.exists():
        # Zonder stylesheet drukt Chrome de bundel gewoon af met de standaard
        # browseropmaak. Dat levert een PDF op die er alleen maar armzalig
        # uitziet en verder nergens over klaagt.
        sys.exit(f"{STIJLBLAD.relative_to(REPO)} ontbreekt; zonder dat bestand "
                 "heeft de PDF geen enkele opmaak.")

    module = lees_module()
    structuur = hoofdstukken(module)
    if not structuur:
        sys.exit("geen enkel hoofdstuk gevonden")

    werk = Path(tempfile.mkdtemp(prefix="syllabus-"))
    inhoud_html = werk / "inhoud.html"
    inhoud_html.write_text(bundel(bouw_inhoud(structuur)), encoding="utf-8")

    if args.html_only:
        doel = Path(args.out).with_suffix(".html")
        doel.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(inhoud_html, doel)
        print(f"bundel  -> {doel}")
        # Ook hier, want een proefdruk is precies het ogenblik waarop je wil
        # horen dat er een vraag zonder antwoord tussen zit.
        for regel in overgeslagen:
            print(f"  let op: {regel}")
        return

    chrome = zoek_chrome(args.chrome)
    body_pdf = werk / "inhoud.pdf"
    druk_af(chrome, inhoud_html, body_pdf)

    # welke koppen zoeken we terug, en wat komt er in de inhoudstafel
    koppen, tafel = [], []
    for nummer, titel, secties in structuur:
        for snummer, vaste_titel, pagina, _, soort in secties:
            if soort == "oplossingen":
                koppen.append(f"{snummer} Oplossingen")
                tafel.append([2, snummer, "Oplossingen", None])
            elif vaste_titel is not None or snummer is None:
                kop, _ = kop_en_inhoud(pagina)
                zichtbaar = f"{nummer} {vaste_titel}" if nummer else kop
                koppen.append(zichtbaar)
                tafel.append([1, nummer, vaste_titel or kop, None])
            else:
                kop, _ = kop_en_inhoud(pagina)
                koppen.append(f"{snummer} {kop}")
                tafel.append([2, snummer, kop, None])

    bladzijden, aantal = zoek_bladzijden(body_pdf, koppen)
    for rij, bladzijde in zip(tafel, bladzijden):
        rij[3] = bladzijde

    # Cover en inhoudstafel gaan samen in een bundel: syllabus.css zet de cover
    # op een eigen @page zonder marges (benoemde pagina), dus ze kunnen in een
    # run zonder elkaars marges over te nemen.
    #
    # Het gedrukte nummer is de plaats in het hele document, cover meegeteld, en
    # niet de plaats in de inhoud. Zo klopt het met wat een lezer in zijn viewer
    # ziet, en het is ook wat de bestaande syllabus doet: daar staat het
    # Voorwoord op 3, na de cover en de inhoudstafel.
    #
    # Daardoor hangen de nummers IN de inhoudstafel af van hoe lang het voorwerk
    # is. Die lengte hangt alleen van het aantal regels af en niet van de nummers
    # erin, dus een keer proefdrukken volstaat om ze te kennen. De lus eromheen
    # is er voor het geval een breder nummer toch een regel doet omslaan.
    voorwerk_html = werk / "voorwerk.html"
    voorwerk_pdf = werk / "voorwerk.pdf"
    verschuiving = 1
    for _ in range(3):
        verschoven = [[n, nr, tt, b + verschuiving] for n, nr, tt, b in tafel]
        voorwerk_html.write_text(
            bundel(bouw_cover() + "\n" + bouw_inhoudstafel(verschoven)),
            encoding="utf-8")
        druk_af(chrome, voorwerk_html, voorwerk_pdf)
        nieuw = len(PdfReader(str(voorwerk_pdf)).pages)
        if nieuw == verschuiving:
            break
        verschuiving = nieuw
    tafel = verschoven

    # hoofdstuktitel per bladzijde, voor de voettekst
    per_bladzijde = [""] * aantal
    hoofdstuk_start = [(rij[3], rij[2]) for rij in tafel if rij[0] == 1]
    for i in range(aantal):
        lopend = ""
        for start, naam in hoofdstuk_start:
            if start <= i + 1 + verschuiving:
                lopend = naam
        per_bladzijde[i] = lopend

    schrijver = PdfWriter()
    for bladzijde in PdfReader(str(voorwerk_pdf)).pages:
        schrijver.add_page(bladzijde)
    for bladzijde in stempel(body_pdf, per_bladzijde, verschuiving).pages:
        schrijver.add_page(bladzijde)

    ouder = None
    for niveau, nummer, titel, bladzijde in tafel:
        naam = f"{nummer} {titel}" if nummer else titel
        doel = bladzijde - 1
        if niveau == 1:
            ouder = schrijver.add_outline_item(naam, doel)
        else:
            schrijver.add_outline_item(naam, doel, parent=ouder)

    doel = Path(args.out)
    doel.parent.mkdir(parents=True, exist_ok=True)
    try:
        with open(doel, "wb") as f:
            schrijver.write(f)
    except PermissionError:
        # Windows houdt een geopende PDF vast. Dat gebeurt precies wanneer je aan
        # het nakijken bent wat je net liet genereren, dus zeg wat er aan de hand
        # is in plaats van een stack trace.
        sys.exit(f"{doel.name} is vergrendeld; sluit hem in je PDF-lezer en "
                 "draai dit opnieuw, of gebruik --out om ergens anders te schrijven.")

    if args.keep_html:
        for bron in (inhoud_html, voorwerk_html):
            shutil.copy(bron, doel.with_name(f"{doel.stem}-{bron.stem}.html"))
    else:
        shutil.rmtree(werk, ignore_errors=True)

    print(f"{verschuiving} bladzijden voorwerk, {aantal} bladzijden inhoud")
    print(f"pdf     -> {doel.relative_to(REPO) if doel.is_relative_to(REPO) else doel}")
    for regel in overgeslagen:
        print(f"  let op: {regel}")


if __name__ == "__main__":
    main()

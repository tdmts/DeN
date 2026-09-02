#!/usr/bin/env python3
"""De publiceerbaarheidscontrole van deze repo.

    python scripts/check-content.py

Draai dit voor je een inhoudelijke wijziging afsluit. Een groene check hoort bij
"klaar". Wat het nakijkt, in volgorde:

1. Links en assets bestaan, met exact dezelfde hoofdletters, en zitten in git.
   GitHub Pages is hoofdlettergevoelig en serveert alleen wat gecommit is, dus
   een tikfout in de hoofdletters of een niet-toegevoegde afbeelding werkt
   lokaal en geeft 404 in productie. Een asset met de naam TODO-* is een
   waarschuwing, geen fout: dat is tekenwerk dat nog moet komen.
2. Het manifest klopt met de bestanden. Elke href in reference.js is relatief,
   bestaat, en heeft een unieke id binnen zijn module; elk veld dat de engines
   lezen is aanwezig en niet leeg, want een leeg veld geeft een lege kaart in
   plaats van een fout. En elke theoriepagina onder een module staat in het
   manifest: een pagina die er niet in staat is onbereikbaar via de hub en
   krijgt geen gelezen-vinkje.

   Elke categorie zet er ook zijn reeks bij. Een reeks is een menu-item in
   Orion (zie de kop van reference.js), en reference-dashboard.js toont per hub
   de categorieen van een reeks. Een categorie zonder reeks hoort dus nergens
   bij en verdwijnt gewoon van de hub, zonder dat er iets faalt.
3. De pagina's zijn juist bedraad. Elke pagina linkt de gehoste OrionCSS; elke
   theoriepagina laadt reference.js en back-link.js, want zonder reference.js
   rendert de pagina perfect en verdwijnt alleen de volgende-link; reference.html
   roept initReferenceHub op voor zijn eigen module.
4. Assethygiëne. Geen Brightspace-hotlinks (/content/enforced/), geen externe
   <img src="http...">, geen externe documentlinks: een URL van een fabrikant
   sterft midden in het semester net zoals een gehotlinkte afbeelding.
5. Codestijl in Arduino-code: Allman-accolades, geen em-dashes, spaties rond
   operatoren. Geen enkele compiler geeft erom, maar een eerstejaars die tegen
   een muur van tekens aankijkt, besteedt aan de syntaxis precies de aandacht
   die de les elders nodig had.
6. Het verslagsjabloon bestaat voor elke module met een Opdracht.html, en is
   niet ouder dan die pagina. Het sjabloon wordt eruit gegenereerd, dus een
   oudere docx betekent dat scripts/export-verslag.py opnieuw moet lopen.
7. De opdracht staat in <!-- verslag ... --> en niet op het scherm. Opdracht.html
   is een landingspagina; het werk gebeurt in de docx die eruit gegenereerd
   wordt. Deze regel vangt drie manieren waarop dat misloopt: een vragenlijst of
   kader buiten commentaar, een blok dat niet afgesloten is (waarna de rest van
   de pagina stil verdwijnt), en een blok waar niets bruikbaars in staat. Ze
   controleert ook de invultabellen: evenveel cellen per rij als kolomkoppen,
   want een scheve rij geeft een scheve tabel in Word zonder dat iets faalt.

8. Elke Opdracht.html heeft een <p class="lead"> buiten het commentaar. Dat is
   de introductie van het labo, en ze komt op de eerste bladzijde van het
   verslag terecht. Zonder die zin begint het document dat de student offline
   invult met een invulregel en verder niets.

9. Geen verloop op overview.html. De hub zegt wat het labo is, wat je nodig
   hebt en hoe het meetelt; hij vertelt niet in welke volgorde je te werk gaat.
   Zo'n stappenplan telt op wat elders staat ("zes theoriepagina's", "tien
   vragen", "zeven schakelingen") en die getallen staan in reference.js en in
   Opdracht.html, niet hier. Ze lopen dus stil uit de pas zodra daar iets
   bijkomt, en niets faalt. De regel weigert een kop Verloop en de
   steps-container waarin zo'n stappenplan gerenderd wordt.

   Om dezelfde reden weigert ze een sessietelling ("voor dit labo zijn twee
   sessies voorzien"). Hoeveel sessies een labo krijgt en wanneer het doorgaat,
   staat in Algemeen/Planning.html, en het verschilt per groep: A1 en B1 volgen
   een andere volgorde dan A2 en B2. Een getal op de hub is dus een kopie die
   voor de helft van de studenten sowieso niet klopt. Dat was geen theorie: de
   hub van Labo TCP/IP zei een sessie waar de planning er twee toont.

   Dit is een struikeldraad en geen bewijs. Ze grijpt op "N sessies voorzien",
   dus een telling die anders geformuleerd is, glipt erdoor. De werkafspraak
   "zorg dat je klaar bent voor het einde van een sessie" blijft wel toegelaten:
   dat is een regel en geen getal.

   Om dezelfde reden weigert ze een gewicht in procent ("[40%]"). Wat een
   onderdeel bijdraagt, staat in Algemeen/Evaluatie.html, waar de labo's naast
   elkaar staan en samen met de theorie optellen tot een eindcijfer. Los op een
   hub is een percentage een breuk zonder noemer: het zegt niets over hoeveel
   dat labo voor het vak betekent. Wat wel op de hub blijft, is de vorm van de
   evaluatie (een test gesloten boek, een verslag dat zelf geen punt krijgt) en
   de werkafspraken die eruit volgen.

10. Geen link die in de iframe een ander Orion-menu-item opent. Elk deel van
   een labo is een eigen item in Orion: Inleiding (overview.html), Theorie
   (Theorie/), Opdracht (Opdracht.html), en bij ManagedSwitch twee opdrachten
   in een eigen map. Dat menu staat naast de iframe en verspringt niet mee, dus
   een link die de iframe naar een ander item stuurt, laat het menu een pagina
   aanwijzen die de student niet leest: hij zit bij "Inleiding" en heeft de
   opdracht voor zich.

   Naar beneden navigeren binnen een item mag wel, en gebeurt overal: klik een
   theoriepagina aan en Orion zegt "Theorie" terwijl je Wat is RS485 leest. Het
   menu is dan grover dan waar je bent, en niet onwaar.

   Verwijzen naar een ander item mag dus, maar niet in de iframe. Ofwel laat je
   de link weg en noem je het item bij naam (dat doen de overzichten, want in
   het menu staan Theorie en Opdracht er vlak onder), ofwel open je hem met
   target="_blank" (dat doen twee Packet Tracer-oefeningen voor de theoriepagina
   die erbij hoort, want die kijk je na terwijl je bezig bent). Dezelfde
   behandeling die een PDF en Algemeen/Planning.html al kregen.

   Deze regel kijkt alleen naar links tussen pagina's onder Labo/. Wat de
   navigatiebalk doet, staat hier niet in: die bestaat pas als back-link.js
   gelopen heeft, en scripts/check-nav.js meet dat van het DOM af.

11. Het opschrift van de knop noemt één bestand. Op een Opdracht.html staat
   precies één download: de docx die uit die pagina gegenereerd is. Die staat
   er onder "Opdracht downloaden", en onder niets anders. Ze heette ooit
   "Opdracht en verslag downloaden", en dat leest als twee bestanden waarvan de
   student er dan één mist. Het is er één: de opdracht staat erin, en hij vult
   ze in dat document in en dient het zo in. Dat het daarna een verslag is,
   merkt hij bij het indienen, niet bij het downloaden.

12. Twee introducties van hetzelfde labo vertellen niet hetzelfde. Elk labo
   heeft drie of vier leads, een per menu-item in Orion, en ze hebben elk een
   eigen taak: overview.html zegt waar het labo over gaat en waarom, de
   theoriehub zegt wat er in de theorie staat en in welke volgorde,
   Opdracht.html zegt wat je doet en indient. Die van de opdracht komt
   bovendien op de eerste bladzijde van het verslag terecht (regel 8), dus ze
   moet op zichzelf leesbaar zijn.

   Samenvoegen tot een enkele tekst kan niet: het zijn aparte items in het
   Orion-menu en er linkt niets zijwaarts (regel 10), dus elke ingang moet
   alleen staan. Wat wel kan, is dat er geen twee dezelfde zin in staat. Die
   ontstaat vanzelf: je herschrijft er een, en de andere twee blijven de oude
   versie navertellen. Zo zei de hub van Industrieel netwerk de opdracht bijna
   woordelijk voor, en begon de theoriehub met "In de opdracht bouw je ...".

   De regel grijpt op een letterlijk gedeelde woordenreeks van zeven woorden of
   meer tussen twee leads van hetzelfde labo. Ze kijkt niet naar betekenis, dus
   een herhaling die herschreven is glipt erdoor, en een feit dat in twee leads
   thuishoort (de Pi neemt de rol van PLC op) mag gerust, zolang het er niet
   twee keer hetzelfde staat.

13. De syllabus-PDF is niet ouder dan de pagina's waaruit ze gegenereerd is.
   Dezelfde regel als 6 voor de verslagsjablonen, en om een scherpere reden: van
   de hele syllabus is de PDF het enige dat de student te zien krijgt. Een
   pagina onder Theorie/Syllabus/Theorie/ aanpassen zonder
   scripts/export-syllabus.py opnieuw te draaien, verandert dus niets aan wat
   hij leest. Op het scherm klopt alles, en niets anders zou het merken.

14. Elke vraag van een Test jezelf in de syllabus draagt haar antwoord. Een
   meerkeuzevraag duidt precies een mogelijkheid aan met class="juist", een open
   vraag draagt <!-- oplossing: ... -->. Uit die markering drukt
   scripts/export-syllabus.py de sectie Oplossingen achter de Test jezelf, en de
   letter (a, b, c) wordt daarbij geteld in plaats van overgeschreven, zodat een
   verwisselde mogelijkheid geen fout antwoord kan opleveren.

   De export is alles of niets: ontbreekt er een antwoord, dan drukt ze voor dat
   hoofdstuk helemaal geen oplossingen, want een lijst waar vraag 3 uit
   weggevallen is laat de student denken dat hij vraag 3 goed heeft. Dat is de
   juiste keuze en tegelijk een stille: op het scherm is er niets aan te zien,
   en in de uitvoer van de export is het een regel "let op" tussen de andere.
   Vandaar deze regel, die het meldt voor er gedrukt wordt.

Wat hier NIET in staat, en bewust niet: patroon 18 van SCHRIJFSTIJL.md, dat zegt
dat een pagina niet mag verwijzen naar de geschiedenis van het materiaal zelf
("de theorie blijft wel op de site staan"). De woorden die zoiets verraden komen
ook legitiem voor, dus een woordenlijst zou vooral goede zinnen afkeuren. Dat
blijft een leesregel.

Cisco-configuratie en terminaloutput vallen bewust buiten regel 5: die worden
letterlijk overgenomen uit een toestel, en daar mag niets aan geformatteerd
worden.
"""

import os
import re
import subprocess
import sys
from difflib import SequenceMatcher
from pathlib import Path
from urllib.parse import urlparse, unquote

REPO = Path(__file__).resolve().parent.parent

ORION_CSS = "https://tdmts.github.io/OrionCSS/style.css"
ORION_JS = "https://tdmts.github.io/OrionCSS/main.js"

# Pagina's die geen Orion-pagina zijn en dus buiten de meeste regels vallen.
EXEMPT = {"pasteInOrion.html"}

DOCUMENT_RE = re.compile(r"\.(pdf|zip|docx?|pptx?|xlsx?)(?:[?#]|$)", re.I)

fouten = []
warnings = []


def fout(pad, boodschap):
    fouten.append(f"{pad}: {boodschap}")


def waarschuw(pad, boodschap):
    warnings.append(f"{pad}: {boodschap}")


def getrackte_bestanden():
    try:
        uit = subprocess.run(["git", "ls-files"], cwd=REPO, capture_output=True,
                             text=True, check=True).stdout
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None
    return set(uit.split("\n"))


def exacte_hoofdletters(doel):
    """Staat elk segment onder REPO er precies zo op schijf?

    Windows en macOS zijn hoofdletterongevoelig, GitHub Pages niet. Een link
    naar 'opdracht.html' opent dus lokaal en geeft 404 in productie. Daarom
    vergelijken we elk segment met de echte inhoud van zijn map.
    """
    try:
        rel = doel.relative_to(REPO)
    except ValueError:
        return True  # buiten de repo, dat vangt een andere regel
    huidig = REPO
    for segment in rel.parts:
        if segment not in os.listdir(huidig):
            return False
        huidig = huidig / segment
    return True


# De staging-mappen uit .gitignore. In _incoming/ staat ruwe Brightspace-inhoud
# die nog door orion-convert moet: geen OrionCSS-link, YouTube-embeds zonder
# referrerpolicy, em-dashes. Dat is precies wat hier verboden is, en terecht,
# maar het is nog geen pagina van deze site. Ze meetellen zou elke import de
# volledige check rood maken en de Stop-hook laten roepen bij elke beurt tot de
# laatste pagina omgezet is, waardoor je de echte fouten niet meer ziet.
STAGING = {"_incoming", "_export"}


def html_paginas():
    for pad in sorted(REPO.rglob("*.html")):
        if ".git" in pad.parts or STAGING.intersection(pad.parts):
            continue
        yield pad


# --------------------------------------------------------------- 1. links

def check_links(tracked):
    for pad in html_paginas():
        rel = pad.relative_to(REPO)
        tekst = pad.read_text(encoding="utf-8")
        for m in re.finditer(r'(?:href|src)\s*=\s*"([^"]+)"', tekst):
            url = m.group(1)
            if url.startswith(("http://", "https://", "#", "mailto:", "data:")):
                continue
            doelpad = unquote(urlparse(url).path)
            if not doelpad:
                continue
            # Bewust geen Path.resolve(): dat corrigeert op Windows de
            # hoofdletters naar wat er op schijf staat, en dan controleren we
            # de gecorrigeerde naam in plaats van wat er in de pagina staat.
            # normpath werkt de '..' weg zonder de schijf te raadplegen.
            doel = Path(os.path.normpath(pad.parent / doelpad))
            if doel.name.startswith("TODO-"):
                waarschuw(rel, f"nog te maken asset: {url}")
                continue
            if not doel.exists():
                fout(rel, f"link wijst nergens heen: {url}")
                continue
            if not exacte_hoofdletters(doel):
                fout(rel, f"hoofdletters kloppen niet, dit geeft 404 op Pages: {url}")
                continue
            if tracked is not None:
                doel_rel = doel.relative_to(REPO).as_posix()
                if doel_rel not in tracked:
                    fout(rel, f"nog niet in git, dus 404 op Pages: {url}")


# ------------------------------------------------------------ 2. manifest

def _moduleblokken():
    """reference.js is JS, geen JSON. We lezen wat we nodig hebben met regexen.

    Dat is grof, maar het alternatief is een JS-parser meeslepen voor één
    bestand dat we zelf schrijven en dat één vaste vorm heeft.
    """
    tekst = (REPO / "reference.js").read_text(encoding="utf-8")
    for mod in re.finditer(r"^    (\w+):\s*\{", tekst, re.M):
        naam = mod.group(1)
        start = mod.end()
        diepte = 1
        i = start
        while i < len(tekst) and diepte:
            if tekst[i] == "{":
                diepte += 1
            elif tekst[i] == "}":
                diepte -= 1
            i += 1
        yield naam, tekst[start:i]


def lees_manifest():
    """De onderwerpen per module."""
    modules = {}
    for naam, blok in _moduleblokken():
        topics = []
        for t in re.finditer(r"\{\s*id:.*?\}", blok, re.S):
            velden = dict(re.findall(r"(\w+):\s*'((?:[^'\\]|\\.)*)'", t.group(0)))
            topics.append(velden)
        modules[naam] = topics
    return modules


def lees_categorieen():
    """De categorieen per module, met de reeks die ze dragen.

    lees_manifest() haalt het niveau eronder eruit. De reeks staat op de
    categorie, en die bepaalt bij welk Orion-menu-item ze hoort.
    """
    categorieen = {}
    for naam, blok in _moduleblokken():
        gevonden = []
        for c in re.finditer(r"name:\s*'([^']*)',\s*(?:reeks:\s*'([^']*)',\s*)?topics:", blok):
            gevonden.append({"name": c.group(1), "reeks": c.group(2)})
        categorieen[naam] = gevonden
    return categorieen


def check_manifest():
    modules = lees_manifest()
    if not modules:
        fout("reference.js", "geen enkele module gevonden")
        return modules

    # Een categorie zonder reeks hoort bij geen enkel Orion-menu-item, en
    # reference-dashboard.js laat ze dan gewoon weg: de hub rendert perfect met
    # een categorie minder erop.
    for naam, categorieen in lees_categorieen().items():
        if not categorieen:
            fout("reference.js", f"module '{naam}' heeft geen enkele categorie")
        for categorie in categorieen:
            if not categorie["reeks"]:
                fout("reference.js",
                     f"{naam}: categorie '{categorie['name']}' heeft geen reeks, "
                     "dus ze valt stil van de hub")

    for naam, topics in modules.items():
        theorie = REPO / "Labo" / naam.upper() / "Theorie"
        # De mapnaam is niet af te leiden uit de sleutel (rs485 -> RS485), dus
        # we zoeken de map waarvan de kleine-letterversie overeenkomt.
        for track in ("Labo", "Theorie"):
            basis = REPO / track
            if not basis.is_dir():
                continue
            for kandidaat in basis.iterdir():
                if kandidaat.is_dir() and kandidaat.name.lower() == naam:
                    theorie = kandidaat / "Theorie"
        if not theorie.is_dir():
            fout("reference.js", f"module '{naam}' heeft geen Theorie-map")
            continue

        ids = set()
        vermeld = set()
        for topic in topics:
            for veld in ("id", "name", "blurb", "href"):
                if not topic.get(veld):
                    fout("reference.js", f"{naam}: veld '{veld}' ontbreekt of is leeg")
            href = topic.get("href", "")
            if href.startswith("http"):
                fout("reference.js",
                     f"{naam}/{topic.get('id')}: absolute URL, gebruik een relatief pad")
            tid = topic.get("id")
            if tid in ids:
                fout("reference.js", f"{naam}: id '{tid}' komt twee keer voor")
            ids.add(tid)
            # Geen resolve(), om dezelfde reden als in check_links: dat maakt de
            # hoofdletters stil in orde en dan controleren we niets meer.
            doel = Path(os.path.normpath(theorie / href))
            if not doel.exists():
                fout("reference.js", f"{naam}/{tid}: href bestaat niet ({href})")
            elif not exacte_hoofdletters(doel):
                fout("reference.js",
                     f"{naam}/{tid}: hoofdletters kloppen niet, dit geeft 404 op Pages ({href})")
            elif not DOCUMENT_RE.search(href):
                vermeld.add(str(doel))

        # rglob en niet glob: de syllabus zet een map per hoofdstuk onder
        # Theorie/, en met glob() bleef alles daarin ongecontroleerd. Vergelijken
        # gaat op het volledige pad en niet op de bestandsnaam, want zes
        # hoofdstukken hebben allemaal een Overzicht.html en vijf een
        # Inleiding.html: op naam zou de ene de andere afdekken.
        for pagina in theorie.rglob("*.html"):
            if pagina.name == "reference.html":
                continue
            if str(pagina) not in vermeld:
                fout(pagina.relative_to(REPO),
                     "staat niet in reference.js, dus onbereikbaar via de hub")
    return modules


# -------------------------------------------------------------- 3. wiring

def check_wiring():
    for pad in html_paginas():
        rel = pad.relative_to(REPO)
        if pad.name in EXEMPT:
            continue
        tekst = pad.read_text(encoding="utf-8")

        if ORION_CSS not in tekst:
            fout(rel, "linkt de gehoste OrionCSS style.css niet")
        if ORION_JS not in tekst:
            fout(rel, "linkt de gehoste OrionCSS main.js niet")

        in_module = "Labo" in rel.parts or "Theorie" in rel.parts
        if not in_module:
            continue

        if pad.name != "overview.html" and "back-link.js" not in tekst:
            fout(rel, "laadt back-link.js niet, dus geen navigatiebalk")

        if pad.parent.name == "Theorie" or pad.name == "Opdracht.html":
            if "reference.js" not in tekst:
                fout(rel, "laadt reference.js niet, dus de volgende-link verdwijnt stil")

        if pad.name == "reference.html":
            module = pad.parent.parent.name.lower()
            if f"initReferenceHub('{module}')" not in tekst and \
               f'initReferenceHub("{module}")' not in tekst:
                fout(rel, f"roept initReferenceHub('{module}') niet op voor zijn eigen module")


# ------------------------------------------------------------ 4. hygiëne

def check_assets():
    for pad in html_paginas():
        rel = pad.relative_to(REPO)
        tekst = pad.read_text(encoding="utf-8")
        if "/content/enforced/" in tekst:
            fout(rel, "hotlinkt naar Brightspace (/content/enforced/), dat breekt elk jaar")
        for m in re.finditer(r'<img[^>]+src="(https?://[^"]+)"', tekst):
            fout(rel, f"externe afbeelding, host ze zelf in img/: {m.group(1)}")
        for m in re.finditer(r'href="(https?://[^"]+)"', tekst):
            if DOCUMENT_RE.search(m.group(1)):
                fout(rel, f"externe documentlink, host ze zelf: {m.group(1)}")
        for m in re.finditer(r"<iframe[^>]+youtube[^>]*>", tekst, re.I):
            if "referrerpolicy" not in m.group(0):
                fout(rel, "YouTube-embed zonder referrerpolicy (geeft error 153)")


# ----------------------------------------------------------- 5. codestijl

CODEBLOK_RE = re.compile(
    r'<pre class="code-wrapper[^"]*language-(arduino|cpp|c|csharp|python)[^"]*">(.*?)</pre>',
    re.S)

OPERATOR_RE = re.compile(r"[A-Za-z0-9_\)\]](==|!=|<=|>=|&&|\|\||=(?!=))[A-Za-z0-9_\(\"']"
                         r"|[A-Za-z0-9_\)\]](?<![<>!=])=(?!=)[A-Za-z0-9_\(\"']")


def check_codestijl():
    for pad in html_paginas():
        rel = pad.relative_to(REPO)
        tekst = pad.read_text(encoding="utf-8")

        for m in re.finditer(r"&mdash;|—", tekst):
            fout(rel, "em-dash in de tekst, gebruik een komma of een dubbele punt")
            break

        for blok in CODEBLOK_RE.finditer(tekst):
            code = blok.group(2)
            for nummer, regel in enumerate(code.split("\n"), 1):
                kaal = re.sub(r"//.*$", "", regel).rstrip()
                if not kaal.strip():
                    continue
                # Allman: een openende accolade staat op haar eigen regel.
                # Een initialiser (= { ... }) is de uitzondering.
                if kaal.endswith("{") and kaal.strip() != "{" and "=" not in kaal:
                    fout(rel, f"codeblok regel {nummer}: K&R-accolade, "
                              f"zet '{{' op zijn eigen regel -> {kaal.strip()}")
                if OPERATOR_RE.search(kaal):
                    fout(rel, f"codeblok regel {nummer}: zet spaties rond de operator "
                              f"-> {kaal.strip()}")


# ------------------------------------------------------------- 6. verslag

# Een opdracht die bewust geen verslagsjabloon heeft, zegt dat zelf. Vandaag is
# dat PacketTracer/Opdracht.html: dat deel levert een .pka op en geen document,
# de zeven begeleide oefeningen controleren zichzelf, en een sjabloon zonder iets
# om in te vullen is erger dan geen sjabloon. Het moet in de pagina staan en niet
# in een lijst hier, anders verhuist de reden weg van de pagina waar ze geldt.
GEEN_VERSLAG_RE = re.compile(r"<!--\s*geen-verslag[\s:]")


def opdracht_paginas():
    """Elke Opdracht.html, ook een niveau dieper dan de modulemap.

    Meestal staat er één in de modulemap zelf (Labo/RS485/Opdracht.html). Labo
    ManagedSwitch heeft er twee, in ProCurve/ en PacketTracer/, omdat het één
    opgave is in twee helften met twee aparte indienmomenten. Een glob op
    */*/Opdracht.html ziet die tweede laag niet, en dan zwijgen regel 6 en 8
    stil over allebei in plaats van te klagen.
    """
    gezien = set()
    for patroon in ("*/*/Opdracht.html", "*/*/*/Opdracht.html"):
        for pad in sorted(REPO.glob(patroon)):
            if pad not in gezien:
                gezien.add(pad)
                yield pad


def check_verslag():
    for opdracht in opdracht_paginas():
        module = opdracht.parent
        naam = f"{module.parent.name}-{module.name}-verslag.docx"
        # Het pad dat de pagina zelf aanbiedt is leidend.
        tekst = opdracht.read_text(encoding="utf-8")
        if GEEN_VERSLAG_RE.search(tekst):
            continue
        m = re.search(r'href="([^"]*downloads/[^"]+\.docx)"', tekst)
        if not m:
            waarschuw(opdracht.relative_to(REPO), "biedt geen verslagsjabloon aan")
            continue
        docx = (opdracht.parent / unquote(m.group(1))).resolve()
        if not docx.exists():
            fout(opdracht.relative_to(REPO),
                 f"verslagsjabloon ontbreekt, draai: python scripts/export-verslag.py "
                 f"{module.relative_to(REPO).as_posix()}")
            continue
        if docx.stat().st_mtime < opdracht.stat().st_mtime:
            fout(docx.relative_to(REPO),
                 f"is ouder dan Opdracht.html, draai: python scripts/export-verslag.py "
                 f"{module.relative_to(REPO).as_posix()}")


# ------------------------------------------------- 7. verslag in commentaar

COMMENTAAR_RE = re.compile(r"<!--(.*?)-->", re.S)
TABEL_RE = re.compile('<table class="[^"]*verslag-tabel[^"]*">(.*?)</table>', re.S)
RIJ_RE = re.compile("<tr[^>]*>(.*?)</tr>", re.S)
# Met de sluitende punthaak of een spatie erachter, anders telt <thead> mee
# als kolomkop en klopt elke tabel per definitie niet.
TH_RE = re.compile("<th[ >]")
LEAD_RE = re.compile('<p class="[^"]*lead[^"]*"')
TD_RE = re.compile("<td[ >]")
VERSLAG_MARKUP_RE = re.compile(r'class="[^"]*\b(vragen|verslag-kader)\b', re.I)


def check_verslagmarkup():
    """De vragen horen in <!-- verslag ... -->, niet op het scherm.

    Een student die een vraag op de pagina leest, heeft daar geen plaats om te
    antwoorden, en gaat zich afvragen of hij ze twee keer moet beantwoorden.
    Daarom staan ze in commentaar: het bestand houdt ze, de pagina toont ze
    niet, en export-verslag.py haalt ze eruit.
    """
    for pad in html_paginas():
        rel = pad.relative_to(REPO)
        tekst = pad.read_text(encoding="utf-8")

        # Niet de "-->" in het hele bestand tellen: er staan ook gewone
        # commentaren in, en die brengen hun eigen afsluiting mee. Wat telt is
        # of dit blok afgesloten is voor het volgende commentaar begint. Zo
        # niet, dan slikt de parser alles ertussen op en verdwijnt het stil.
        onafgesloten = False
        for opening in re.finditer(r"<!--", tekst):
            i = opening.end()
            sluiting = tekst.find("-->", i)
            volgende = tekst.find("<!--", i)
            if sluiting == -1 or (volgende != -1 and volgende < sluiting):
                regel = tekst.count("\n", 0, opening.start()) + 1
                fout(rel, f"het commentaar op regel {regel} is niet afgesloten met -->; "
                          "alles tot het volgende commentaar verdwijnt stil uit de pagina")
                onafgesloten = True
        if onafgesloten:
            continue

        zonder_commentaar = COMMENTAAR_RE.sub("", tekst)
        m = VERSLAG_MARKUP_RE.search(zonder_commentaar)
        if m:
            fout(rel, f"'{m.group(1)}' staat buiten een <!-- verslag --> blok, "
                      "dus de student ziet de vragen zonder plaats om te antwoorden")

        for blok in COMMENTAAR_RE.finditer(tekst):
            inhoud = blok.group(1).strip()
            if not inhoud.startswith("verslag"):
                continue
            if not VERSLAG_MARKUP_RE.search(inhoud):
                fout(rel, "een <!-- verslag --> blok bevat geen vragenlijst of kader, "
                          "dus het levert niets op in het sjabloon")

        # Een invultabel met een scheve rij levert een scheve tabel in Word op,
        # zonder dat er iets stukgaat. In de browser zie je het niet, want de
        # tabel staat in commentaar.
        for tabel in TABEL_RE.finditer(tekst):
            body = tabel.group(1)
            kolommen = len(TH_RE.findall(body))
            if not kolommen:
                fout(rel, "een verslag-tabel heeft geen <th>, dus geen kolomkoppen")
                continue
            for n, rij in enumerate(RIJ_RE.finditer(body), start=1):
                cellen = len(TD_RE.findall(rij.group(1)))
                if cellen and cellen != kolommen:
                    fout(rel, f"verslag-tabel rij {n}: {cellen} cellen tegenover "
                              f"{kolommen} kolomkoppen")


# ------------------------------------------------- 8. de introductie

def check_introductie():
    """Elke Opdracht.html heeft een <p class="lead"> buiten het commentaar.

    Die lead is de introductie van het labo, en export-verslag.py zet ze op de
    eerste bladzijde van het verslag. Zonder lead begint het document dat de
    student offline invult met een invulregel en verder niets, en weet hij niet
    waar zijn labo over gaat. Het script stopt er zelf ook op, maar dan pas bij
    het genereren; hier merk je het bij de gewone controle.
    """
    for opdracht in opdracht_paginas():
        rel = opdracht.relative_to(REPO)
        tekst = opdracht.read_text(encoding="utf-8")
        zichtbaar = COMMENTAAR_RE.sub("", tekst)
        if not LEAD_RE.search(zichtbaar):
            fout(rel, 'geen <p class="lead"> buiten het commentaar, dus het verslag '
                      "begint zonder te zeggen waar het labo over gaat")


# ------------------------------------------------- 9. geen verloop op de hub

VERLOOP_KOP_RE = re.compile(r'<h[1-6][^>]*\bid="verloop"|<h[1-6][^>]*>\s*verloop\b', re.I)
STAPPEN_RE = re.compile(r'class="[^"]*\bsteps-container\b', re.I)
TAGS_RE = re.compile(r"<[^>]+>")
SESSIETELLING_RE = re.compile(
    r"\b(een|één|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|\d+)\s+"
    r"sessies?\b[^.]{0,80}?\bvoorzien\b", re.I)
PERCENTAGE_RE = re.compile(r"\[\s*\d{1,3}\s*%\s*\]")


def check_geen_verloop():
    """overview.html beschrijft geen verloop.

    De hub draagt de doelstellingen, het studiemateriaal en de evaluatie. Een
    stappenplan erbovenop herhaalt wat de theoriehub en Opdracht.html zelf al
    tonen, en het doet dat met getallen die het niet bezit: hoeveel
    theoriepagina's er zijn staat in reference.js, hoeveel schakelingen er zijn
    staat in het verslagcommentaar. Komt daar iets bij, dan klopt de hub niet
    meer en faalt er niets.
    """
    for overview in REPO.glob("*/*/overview.html"):
        rel = overview.relative_to(REPO)
        tekst = overview.read_text(encoding="utf-8")
        zichtbaar = COMMENTAAR_RE.sub("", tekst)
        if VERLOOP_KOP_RE.search(zichtbaar):
            fout(rel, "een kop Verloop hoort niet op de hub: de volgorde staat op de "
                      "theoriehub en in de opdracht, en loopt hier stil uit de pas")
        if STAPPEN_RE.search(zichtbaar):
            fout(rel, "een steps-container hoort niet op de hub: dat is een stappenplan "
                      "dat herhaalt wat de theoriehub en de opdracht zelf al tonen")
        platte_tekst = " ".join(TAGS_RE.sub(" ", zichtbaar).split())
        if SESSIETELLING_RE.search(platte_tekst):
            fout(rel, "een sessietelling hoort niet op de hub: hoeveel sessies dit labo "
                      "krijgt staat in Algemeen/Planning.html en verschilt per groep")
        if PERCENTAGE_RE.search(zichtbaar):
            fout(rel, "een gewicht in procent hoort niet op de hub: wat een onderdeel "
                      "bijdraagt staat in Algemeen/Evaluatie.html, naast de andere labo's")


# --------------------------------------------------------- 10. topicgrenzen

def topic_van(pad):
    """Bij welk Orion-menu-item hoort deze pagina?

    De indeling zit in de mapstructuur, dus we lezen ze daar af.
    overview.html is Inleiding; alles in een submap hoort bij het item van die
    map (Theorie, ProCurve, PacketTracer); wat los in de modulemap staat, is de
    opdracht.
    """
    delen = pad.relative_to(REPO).parts
    if pad.name == "overview.html":
        return (delen[1], "inleiding")
    tussen = delen[2:-1]
    return (delen[1], tussen[0] if tussen else "opdracht")


ANKER_RE = re.compile(r"<a\s[^>]*>", re.I | re.S)
HREF_RE = re.compile(r"""href\s*=\s*["']([^"']+)["']""", re.I)
BLANK_RE = re.compile(r"""target\s*=\s*["']_blank["']""", re.I)


def check_topicgrenzen():
    for pad in html_paginas():
        delen = pad.relative_to(REPO).parts
        if len(delen) < 3 or delen[0] != "Labo":
            continue
        rel = pad.relative_to(REPO)
        # Het verslagcommentaar staat niet op het scherm. Wat daarin staat komt
        # in de docx terecht, en een document heeft geen iframe om te verwisselen.
        tekst = COMMENTAAR_RE.sub("", pad.read_text(encoding="utf-8"))
        hier = topic_van(pad)

        for anker in ANKER_RE.findall(tekst):
            m = HREF_RE.search(anker)
            if not m:
                continue
            href = m.group(1)
            if href.startswith(("http", "#", "mailto:", "/")):
                continue
            doel = Path(os.path.normpath(pad.parent / unquote(href.split("#")[0])))
            if doel.suffix.lower() != ".html" or not doel.exists():
                continue
            try:
                doeldelen = doel.relative_to(REPO).parts
            except ValueError:
                continue
            if len(doeldelen) < 3 or doeldelen[0] != "Labo":
                continue
            if topic_van(doel) == hier or BLANK_RE.search(anker):
                continue
            fout(rel, f"linkt in de iframe naar {doel.relative_to(REPO)}, dat is een "
                      "ander Orion-menu-item: laat de link weg of open hem met "
                      'target="_blank"')


# --------------------------------------------- 11. het opschrift van de knop

# Niet vast aan <a href=...>: een knop met een class ervoor zou er stil
# tussenuit glippen, en dan keurt deze regel niets meer af zonder te falen.
VERSLAGKNOP_RE = re.compile(
    r'<a\b[^>]*href="[^"]*downloads/[^"]+\.docx"[^>]*>(.*?)</a>', re.S | re.I)
KNOPTEKST = "Opdracht downloaden"


def check_verslagknop():
    """Eén bestand, één naam.

    De docx is de opdracht: de student downloadt ze, vult ze in en dient ze in.
    Een opschrift dat twee dingen opsomt, laat hem zoeken naar een tweede
    bestand dat niet bestaat.
    """
    for opdracht in opdracht_paginas():
        tekst = opdracht.read_text(encoding="utf-8")
        if GEEN_VERSLAG_RE.search(tekst):
            continue
        m = VERSLAGKNOP_RE.search(tekst)
        if not m:
            # Regel 6 klaagt hier al over: er wordt geen sjabloon aangeboden.
            continue
        opschrift = " ".join(re.sub("<[^>]+>", " ", m.group(1)).split())
        if opschrift != KNOPTEKST:
            fout(opdracht.relative_to(REPO),
                 f'de downloadknop heet "{opschrift}"; de docx is het enige '
                 f'bestand dat deze pagina aanbiedt, dus dat is "{KNOPTEKST}"')


# ----------------------------------------------- 12. geen dubbele introducties

LEAD_BLOK_RE = re.compile(r'<p class="[^"]*\blead\b[^"]*"[^>]*>(.*?)</p>', re.S | re.I)
ENTITEIT_RE = re.compile(r"&[a-z]+;|&#\d+;", re.I)
WOORD_RE = re.compile(r"[\w/-]+", re.UNICODE)

# Vanaf zoveel woorden op een rij is het geen toeval meer maar een kopie. Acht
# liet "een HP ProCurve via de seriele console" nog door, zes greep op wendingen
# die toevallig samenvielen ("verkeer van je eigen computer").
GEDEELDE_WOORDEN = 7


def leadwoorden(pagina):
    """De lead van een pagina als kale woordenlijst, of een lege lijst."""
    tekst = COMMENTAAR_RE.sub("", pagina.read_text(encoding="utf-8"))
    m = LEAD_BLOK_RE.search(tekst)
    if not m:
        return []
    plat = ENTITEIT_RE.sub(" ", TAGS_RE.sub(" ", m.group(1))).lower()
    return WOORD_RE.findall(plat)


def leadpaginas(module):
    """De pagina's van een module die een introductie dragen, in leesvolgorde."""
    kandidaten = [module / "overview.html", module / "Theorie" / "reference.html"]
    kandidaten += sorted(module.glob("Opdracht.html"))
    kandidaten += sorted(module.glob("*/Opdracht.html"))
    return [p for p in kandidaten if p.is_file()]


def check_dubbele_introductie():
    """Geen twee leads van hetzelfde labo zeggen letterlijk hetzelfde.

    Elke lead heeft een eigen taak: de hub zegt waarover en waarom, de
    theoriehub wat er te lezen valt, de opdracht wat je doet en indient. Ze
    staan in aparte Orion-items en kunnen dus niet samengevoegd worden, maar
    ze mogen elkaar ook niet navertellen: herschrijf je er een, dan blijft de
    ander de oude versie vertellen en faalt er niets.
    """
    for overview in sorted(REPO.glob("*/*/overview.html")):
        module = overview.parent
        paginas = leadpaginas(module)
        woorden = {p: leadwoorden(p) for p in paginas}
        for i, eerste in enumerate(paginas):
            for tweede in paginas[i + 1:]:
                a, b = woorden[eerste], woorden[tweede]
                if not a or not b:
                    continue
                m = SequenceMatcher(None, a, b, autojunk=False).find_longest_match(
                    0, len(a), 0, len(b))
                if m.size >= GEDEELDE_WOORDEN:
                    zin = " ".join(a[m.a:m.a + m.size])
                    fout(eerste.relative_to(REPO),
                         f'de lead deelt "{zin}" met '
                         f"{tweede.relative_to(REPO).as_posix()}; die twee "
                         "introducties horen elk iets anders te zeggen")


def check_syllabus_pdf():
    """Regel 13: de syllabus-PDF is niet ouder dan de pagina's waar ze uit komt.

    Dezelfde redenering als regel 6 voor de verslagsjablonen. De PDF is afgeleid
    materiaal dat toch gecommit wordt, want Pages serveert alleen wat in git
    zit, en de student krijgt niets anders te zien dan die PDF. Een pagina
    aanpassen zonder scripts/export-syllabus.py opnieuw te draaien, verandert
    dus niets aan wat hij leest, en niets anders zou dat opmerken.
    """
    bron = REPO / "Theorie" / "Syllabus" / "Theorie"
    pdf = REPO / "downloads" / "Datacommunicatie-en-netwerken-syllabus.pdf"
    if not bron.is_dir():
        return
    paginas = [p for p in bron.rglob("*.html") if p.name != "reference.html"]
    if not paginas:
        return
    if not pdf.exists():
        fout(pdf.relative_to(REPO),
             "bestaat niet; draai scripts/export-syllabus.py")
        return
    stempel = pdf.stat().st_mtime
    for pagina in sorted(paginas):
        if pagina.stat().st_mtime > stempel:
            fout(pdf.relative_to(REPO),
                 f"is ouder dan {pagina.relative_to(REPO)}; "
                 "draai scripts/export-syllabus.py opnieuw")
            return


# ------------------------------------------- 14. elke vraag heeft een antwoord

def _lijstitems(fragment, tag):
    """De <li> op het eerste niveau van de eerste <tag>, als (openingstag, inhoud).

    Dezelfde telling als in scripts/export-syllabus.py, en om dezelfde reden:
    de mogelijkheden van een meerkeuzevraag zijn zelf <li>'s binnen het item,
    dus een reguliere expressie alleen komt er niet uit. De twee scripts staan
    los van elkaar (deze draait op een kale checkout, zonder pypdf en zonder
    Chrome), net zoals ze allebei hun eigen lezer van reference.js hebben.
    """
    opening = re.search(rf"<{tag}\b[^>]*>", fragment)
    if not opening:
        return []
    rest = fragment[opening.end():]
    items = []
    lijstdiepte = lidiepte = 0
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
                break
            lijstdiepte -= 1
        else:
            lijstdiepte += 1
    return items


def _top_lijsten(fragment):
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
            items = _lijstitems(fragment[m.start():], "ol")
            uit.append((begin, items))
            volgende = begin + len(items)
        diepte += 1
    return uit


def _vragen(fragment):
    """(nummer, openingstag, inhoud) per vraag, over alle <ol>'s van de pagina heen."""
    return [(begin + i, tag, inhoud)
            for begin, items in _top_lijsten(fragment)
            for i, (tag, inhoud) in enumerate(items)]


def check_testjezelf():
    """Regel 14: elke vraag van een Test jezelf draagt haar antwoord.

    Zonder markering laat de export de hele sectie Oplossingen van dat hoofdstuk
    weg, en dat is aan niets te zien behalve aan een regel in haar uitvoer.
    """
    bron = REPO / "Theorie" / "Syllabus" / "Theorie"
    if not bron.is_dir():
        return
    for pagina in sorted(bron.rglob("TestJezelf.html")):
        tekst = pagina.read_text(encoding="utf-8")
        vragen = _vragen(tekst)
        if not vragen:
            fout(pagina.relative_to(REPO),
                 "geen genummerde vragen; een Test jezelf is een <ol> met een "
                 "<li> per vraag")
            continue
        for nummer, _, inhoud in vragen:
            keuzes = _lijstitems(inhoud, "ul")
            if keuzes:
                juist = [tag for tag, _ in keuzes
                         if re.search(r'class="[^"]*\bjuist\b', tag)]
                if len(juist) != 1:
                    fout(pagina.relative_to(REPO),
                         f"vraag {nummer} heeft {len(juist)} mogelijkheden met "
                         'class="juist"; het moeten er precies een zijn, anders '
                         "drukt de export voor dit hoofdstuk geen oplossingen")
            elif not re.search(r"<!--\s*oplossing:\s*\S.*?-->", inhoud, re.S):
                fout(pagina.relative_to(REPO),
                     f"vraag {nummer} is een open vraag zonder "
                     "<!-- oplossing: ... -->; zonder dat antwoord drukt de "
                     "export voor dit hoofdstuk geen oplossingen")


def main():
    tracked = getrackte_bestanden()
    if tracked is None:
        warnings.append("git niet beschikbaar, de controle op getrackte bestanden is overgeslagen")

    check_links(tracked)
    check_manifest()
    check_wiring()
    check_assets()
    check_codestijl()
    check_verslag()
    check_verslagmarkup()
    check_introductie()
    check_geen_verloop()
    check_topicgrenzen()
    check_verslagknop()
    check_dubbele_introductie()
    check_syllabus_pdf()
    check_testjezelf()

    for w in warnings:
        print(f"  waarschuwing  {w}")
    for f in fouten:
        print(f"  FOUT          {f}")

    if fouten:
        print(f"\n{len(fouten)} fout(en), {len(warnings)} waarschuwing(en).")
        return 1
    print(f"\nAlles in orde. {len(warnings)} waarschuwing(en).")
    return 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python3
"""Druk een deck uit Hoorcollege/ af als de handout die de student meebrengt.

    python scripts/export-handout.py Sessie1
    python scripts/export-handout.py Sessie1 --html-only   # zonder Chrome

De uitvoer is downloads/DeN-handout-<naam>.pdf en die is GECOMMIT, net als de
syllabus: Pages serveert alleen wat in git zit, en van een deck is de PDF het
enige dat de student ooit te zien krijgt.

HET IS DEZELFDE SLIDE, ALLEEN KLEINER. De bundel laadt hoorcollege.css (wat een
slide van binnen is) en legt daar handout.css bovenop (wat het blad ermee doet).
Er wordt hier dus niets hertekend en er staat hier geen opmaak; staat er iets
niet goed op papier, dan hoort dat in handout.css opgelost te worden.

Een gang door Chrome volstaat. De syllabus heeft er drie nodig omdat haar
inhoudstafel paginanummers draagt die pas na het drukken bekend zijn; een
handout heeft geen inhoudstafel. De kop- en voettekst worden er wel op dezelfde
manier achteraf op gestempeld met reportlab, want via de commandoregel zet
Chrome alleen zijn eigen voettekst, met de datum en de bestands-URL erin.

Chrome zoeken en aanroepen doet scripts/export-syllabus.py al, en dat wordt hier
hergebruikt in plaats van overgeschreven: twee kopieen van dezelfde lijst
zoekpaden lopen uit elkaar zodra er ergens een browser bijkomt.
"""

import argparse
import html
import io
import importlib.util
import re
import shutil
import sys
import tempfile
from pathlib import Path

try:
    from pypdf import PdfReader, PdfWriter
except ImportError:
    sys.exit("pypdf ontbreekt:  pip install pypdf")

try:
    from reportlab.lib.units import mm
    from reportlab.pdfgen import canvas as rl_canvas
except ImportError:
    sys.exit("reportlab ontbreekt:  pip install reportlab")

REPO = Path(__file__).resolve().parent.parent
DECKS = REPO / "Hoorcollege"
UIT = REPO / "downloads"
VAK = "Datacommunicatie en netwerken"


def syllabus_module():
    """export-syllabus.py als module; de streep verhindert een gewone import."""
    pad = Path(__file__).with_name("export-syllabus.py")
    spec = importlib.util.spec_from_file_location("export_syllabus", pad)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


# ------------------------------------------------------------- de bundel

def slides_uit(deck):
    """De <section class="slide">-blokken van een deck, in volgorde."""
    tekst = deck.read_text(encoding="utf-8")
    return re.findall(r'<section class="slide.*?</section>', tekst, re.S)


def absolute_paden(fragment, map_van_deck):
    """../img/x.png wordt een file-URI, want de bundel staat elders.

    Chrome leest de bundel uit een tijdelijke map, dus een relatief pad wijst
    daar naar niets. Een ontbrekende afbeelding drukt af als een leeg vlak en
    zegt verder niets, dus dit mag niet stilletjes misgaan.
    """
    def vervang(match):
        attribuut, waarde = match.group(1), match.group(2)
        if waarde.startswith(("http:", "https:", "mailto:", "data:", "file:",
                              "#")):
            return match.group(0)
        doel = (map_van_deck / waarde).resolve()
        if not doel.exists():
            sys.exit(f"de bundel verwijst naar {waarde}, en dat bestaat niet")
        return f'{attribuut}="{doel.as_uri()}"'

    return re.sub(r'(src|href)="([^"]+)"', vervang, fragment)


def bouw_bundel(slides, titel, map_van_deck):
    # Vijf vakken van 9mm, elk met een lijn eronder, zodat de onderste gelijk
    # valt met de onderkant van de slide. Met zes wordt het 7.5mm en dat is krap
    # om met de hand in te schrijven. Als elementen, want een Een verloop wordt bij het drukken een
    # verloop wordt bij het drukken een patroon, en niet elke PDF-lezer tekent
    # dat: de eerste proefdruk gaf roze vlakken waar de schrijfruimte hoorde.
    ruimte = '<div class="ruimte">' + "<i></i>" * 5 + "</div>"
    rijen = []
    for nr, slide in enumerate(slides, 1):
        rijen.append(f'<div class="rij"><div class="nr">{nr}</div>'
                     f'<div class="kader">{slide}</div>{ruimte}</div>')
    css = "\n".join(
        f'<link rel="stylesheet" href="{(map_van_deck / naam).as_uri()}">'
        for naam in ("hoorcollege.css", "handout.css"))
    return ("<!DOCTYPE html>\n"
            '<html lang="nl">\n<head>\n<meta charset="utf-8">\n'
            f"<title>{html.escape(titel)}</title>\n{css}\n</head>\n"
            '<body style="--slide-breedte: 254mm; --slide-hoogte: 143mm">\n'
            + "\n".join(rijen)
            + "\n</body>\n</html>\n")


# ------------------------------------------------------- kop- en voettekst

def stempel(bron_pdf, titel, letters):
    """De titel linksonder, het bladnummer rechtsonder.

    Onderaan en niet bovenaan zoals in de syllabus: daar staat het nummer boven
    omdat de Word dat doet, hier is de bovenrand de eerste slide en zou een
    nummer ertegenaan lezen als een onderschrift bij de verkeerde slide.
    """
    gewoon, vet = letters
    lezer = PdfReader(str(bron_pdf))
    schrijver = PdfWriter()
    for i, bladzijde in enumerate(lezer.pages):
        breedte = float(bladzijde.mediabox.width)
        hoogte = float(bladzijde.mediabox.height)
        laag = io.BytesIO()
        c = rl_canvas.Canvas(laag, pagesize=(breedte, hoogte))
        c.setFont(gewoon, 8)
        c.setFillGray(0.45)
        c.drawString(14 * mm, 9 * mm, titel)
        c.setFont(vet, 8)
        c.drawRightString(breedte - 14 * mm, 9 * mm,
                          f"{i + 1} / {len(lezer.pages)}")
        c.save()
        laag.seek(0)
        bladzijde.merge_page(PdfReader(laag).pages[0])
        schrijver.add_page(bladzijde)
    return schrijver


# -------------------------------------------------------------------- main

def leesbaar(naam):
    """Sessie1 wordt "Sessie 1"; het cijfer hoort niet tegen het woord."""
    return re.sub(r"(?<=[a-z])(?=\d)", " ", naam)


def kebab(naam):
    return re.sub(r"(?<!^)(?=[A-Z0-9])", "-", naam).lower()


def main():
    p = argparse.ArgumentParser()
    p.add_argument("naam", help="de bestandsnaam van het deck, zonder .html")
    p.add_argument("--titel", help="wat er onderaan elk blad staat")
    p.add_argument("--chrome")
    p.add_argument("--html-only", action="store_true")
    args = p.parse_args()

    deck = DECKS / f"{args.naam}.html"
    if not deck.exists():
        sys.exit(f"geen deck gevonden: {deck.relative_to(REPO)}")

    titel = args.titel or f"{VAK}, {leesbaar(args.naam).lower()}"
    slides = slides_uit(deck)
    if not slides:
        sys.exit(f"{deck.relative_to(REPO)} bevat geen enkele slide")

    bundel = absolute_paden(bouw_bundel(slides, titel, DECKS), DECKS)
    werkmap = Path(tempfile.mkdtemp(prefix="handout-"))
    bundel_pad = werkmap / "handout.html"
    bundel_pad.write_text(bundel, encoding="utf-8")

    if args.html_only:
        print(f"{bundel_pad}: {len(slides)} slides")
        return

    syl = syllabus_module()
    chrome = syl.zoek_chrome(args.chrome)
    rauw = werkmap / "rauw.pdf"
    syl.druk_af(chrome, bundel_pad, rauw)

    UIT.mkdir(exist_ok=True)
    doel = UIT / f"DeN-handout-{kebab(args.naam)}.pdf"
    schrijver = stempel(rauw, titel, syl.stempelletters())
    with open(doel, "wb") as f:
        schrijver.write(f)
    shutil.rmtree(werkmap, ignore_errors=True)

    bladen = len(PdfReader(str(doel)).pages)
    print(f"{doel.relative_to(REPO)}: {len(slides)} slides op {bladen} bladen")


if __name__ == "__main__":
    main()

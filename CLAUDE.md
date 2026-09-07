# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## What this is

The course site for **Datacommunicatie en Netwerken** (Dutch, "je"-vorm), one of the Orion course
repos under `tdmts/`. Static HTML on **GitHub Pages** at `https://tdmts.github.io/DeN/`, iframed
into a Brightspace/Orion topic through [pasteInOrion.html](pasteInOrion.html) (edit only the iframe
`src` per topic).

> **The only file ever uploaded to Orion is [pasteInOrion.html](pasteInOrion.html).** Everything
> else is served from GitHub Pages. Inside it, the iframe `src` must point at a
> `https://tdmts.github.io/DeN/...` URL, not a local file.

## De indeling in Orion, en waarom niets zijwaarts linkt

A lab is not one Orion topic but four, each a separate entry in the menu beside the iframe, each
with its own copy of `pasteInOrion.html` pointing at one page:

| Menu-item | Pagina |
|---|---|
| Inleiding | `Labo/<Naam>/overview.html` |
| Theorie | `Labo/<Naam>/Theorie/reference.html` |
| Opdracht | `Labo/<Naam>/Opdracht.html` |
| Verslag indienen | a Brightspace dropbox, no page of ours |

ManagedSwitch has two assignments and therefore two of the last two: `ProCurve/Opdracht.html` and
`PacketTracer/Opdracht.html`, each with a dropbox. Two submissions are two menu entries, the same
reason they are two folders.

**That menu does not move when the iframe does,** and this is the constraint the whole navigation is
built around. Navigating **downward** inside an entry is fine: click a theory page and Orion says
"Theorie" while you read Wat is RS485. The menu is then coarser than where you are, and not untrue.
Navigating **sideways** to another entry is not fine. The menu says "Inleiding" while the opdracht
is on screen, and the one list the student orients himself by is telling him something false.

So **nothing in this site links sideways inside the iframe.** Two ways to refer to another part:

- **Name it and drop the link.** The overviews do this ("staan samen bij **Theorie**"), because in
  the menu those entries sit directly below the one being read. A link would be a second, worse copy
  of a navigation the student already has.
- **`target="_blank"`.** For a reference the student needs *while working*, not before starting.
  Two Packet Tracer exercises name the theory page that explains what they are about; a new tab
  keeps the exercise open and the iframe, and so the menu, exactly where it was. Same treatment a
  PDF and `Algemeen/Planning.html` already got.

**An `Opdracht.html` says nothing about the theory at all.** It used to carry a "Theorie bij dit
labo" box telling the student to read it first. With Theorie sitting directly above Opdracht in the
menu, that box is a worse copy of a navigation he already has, and "lees de theorie voor je begint"
is on the overview and on the theory hub as well. Draadloos netwerk never had one, which is what
made the redundancy visible.

Rule 10 of the content check fails a same-frame link between two entries. It caught two on the day
it was written, both in `PacketTracer/` pointing at a theory page, which is precisely the link you
write without thinking about it.

**`reeks` in `reference.js` is the machine-readable version of that table.** One reeks is one menu
entry, and every engine stays inside it: `back-link.js` builds its back link, its counter, its menu
and its "Volgende" from the current reeks, and `reference-dashboard.js` renders one reeks per hub.
A page at the top of a reeks (`reference.html`, a landing `Opdracht.html`) gets **no nav row at
all**, the way `overview.html` never had one: there is nothing above an Orion entry that this site
may send you to. The way out is the Orion menu.

No build system and no test suite. You edit HTML/CSS/JS directly. `scripts/` holds all the tooling:
seven Python scripts, of which `check-content.py` and `import-brightspace.py` are stdlib only.
`export-verslag.py` and `import-syllabus.py` need `python-docx` (and `import-syllabus.py` also
`pillow`, but only to crop an image the Word crops), `import-slides.py` needs `pillow` for the same
reason, and `export-syllabus.py` and `export-handout.py` need `pypdf` and `reportlab` plus a
headless Chrome or Edge. There is also one Node script,
`check-nav.js`, which needs `jsdom` and is the single reason a `node_modules/` may exist here. It is
gitignored and nothing else depends on it.

## Relation to tdmts/Microcontrollers

This repo was started from Microcontrollers and **deliberately diverges**. Read that repo's
`CLAUDE.md` for the reasoning behind the shared parts; read this section before you copy anything
across, in either direction.

| | Microcontrollers | DeN |
|---|---|---|
| Module folder | `Labo1/` … `Labo7/`, numbered | `Labo/RS485/`, named |
| Exercises | ~8 small ones per lab, XP + badges | one large assignment per module |
| Manifests | `exercises.js` + `reference.js` | `reference.js` only |
| Engines | 4 | 3 (`back-link.js`, `reference-dashboard.js`, `oplossingen.js`) |
| Theory folder | `Reference/` | `Theorie/` |
| Module hub | `Exercises/dashboard.html` | `overview.html` |
| Student output | a working circuit | a **verslag** (docx) they hand in |

**Numbered vs named folders.** Microcontrollers labs build on each other, so labo 3 genuinely comes
after labo 2. DeN's labs are independent modules and groups rotate through them (there is a
*Groepsverdeling*), so a number would assert an order that does not exist, and renaming a folder on
rotation would break links and wipe `localStorage` flags.

**No XP.** A DeN module is one assignment of three sessions, not ten cards to tick off. `dashboard.js`,
`exercises.js` and `checklist-sync.js` were not copied over, and `back-link.js` was cut down to
match: one menu section instead of two, no done-flag, no tab strip.

**What was kept identical on purpose,** so the two engines stay mergeable: the `window.LAB_REFERENCE`
global, the `reference.js` filename, the `reference.html` hub filename, and the
`msDashboard:{labId}:theory:{topicId}` storage key. Consolidating the engines into a shared repo is
the open question; it becomes answerable once ICEES exists and there are two real diffs to compare.
`back-link.js` resolves its sibling manifest off `document.currentScript.src`, so moving it to a
shared origin is a rewrite, not a copy.

## Layout

```
Labo/<Naam>/
    overview.html      the module hub: doelstellingen, studiemateriaal, evaluatie
    Opdracht.html      landing page; the assignment itself is in a <!-- verslag --> comment
    Theorie/
        reference.html the theory hub
        *.html         one page per topic
Theorie/Syllabus/      the lecture track: the source of the syllabus PDF
    overview.html      the Orion topic "Theorie": one button, "Syllabus downloaden"
    syllabus.css       the printed document's house style, the only place it lives
    NOTITIES.md        editorial findings, written by hand
    IMPORT.md          what the importer had to guess, written by import-syllabus.py
    Theorie/
        reference.html the hub
        <Hoofdstuk>/   one folder per chapter, one page per Heading 2 of the Word
Hoorcollege/           the lecture decks: the source of the handout PDFs
    Sessie1.html       one deck, one <section class="slide"> per slide
    hoorcollege.css    how a slide looks, the only place it lives
    hoorcollege.js     the projection: one slide at a time, and the fit check
    handout.css        what the printed sheet does with a slide, nothing more
    IMPORT.md          what the importer had to guess, written by import-slides.py
Algemeen/Planning.html the labo and theory schedule; the single source for session counts
Algemeen/Evaluatie.html how the course is graded; the single source for every weight
img/  datasheets/  downloads/  scripts/
reference.js           the manifest of every theory page, per module
back-link.js  reference-dashboard.js  reference-dashboard.css
oplossingen.js         the reveal that shows an answer, on every page with questions
```

**A module with two assignments puts each one in its own folder.** `Labo/ManagedSwitch/` is the
first: one opgave in two halves, an HP ProCurve on campus and Cisco Packet Tracer at home, each
with its own submission and each worth 35%. Two submissions are two assignments, so there are two
`Opdracht.html` files, and `Theorie/` stays a sibling of both because the theory is what the two
halves share. That sharing is the whole reason it is one module and not two.

```
Labo/ManagedSwitch/
    overview.html               links to both assignments
    Theorie/                    shared by both halves
    ProCurve/Opdracht.html      campus, with a verslag docx
    PacketTracer/Opdracht.html  home, plus the eight exercise pages
```

The two halves do not deliver the same thing, and that is the point. The ProCurve half is a guided
lab with written answers, so it has a `<!-- verslag -->` comment and a docx. The Packet Tracer half
is seven guided exercises that check themselves with Packet Tracer's *Check Results*, and what the
student hands in is the `.pka` of the eighth. A template with nothing to fill in is worse than no
template, so that page carries a `<!-- geen-verslag: … -->` comment saying so, and rule 6 skips it.
Put the reason in that comment, not in a list inside the check, or it drifts away from the page it
is about.

The exercise pages live in `PacketTracer/` and are listed in `reference.js` as a second category
with hrefs like `../PacketTracer/VlanBasic.html`, resolved against `Theorie/` like every other href.

**`back-link.js` needed two fixes for this**, and both failed silently, so they are worth knowing
about before you move pages around again.

- **The manifest decides what is in the reading sequence, not the folder.** The chain used to be
  built only for a page with a `Theorie` segment in its path, which was the same question as long
  as every page in the chain lived there. The Packet Tracer exercises do not, so all eight got no
  forward link *and* no read-flag, because `markVisited()` hangs off that same chain. The page
  rendered perfectly with one link missing.
- **A page is matched on its resolved path, not on its filename.** With two `Opdracht.html` in one
  module, `ProCurve/Opdracht.html` answered to the manifest entry of `PacketTracer/Opdracht.html`:
  it offered the wrong "volgende" and ticked off the wrong topic.

What did survive untouched: the module id and the `localStorage` key come from the URL
(`Labo/<Naam>/…`), so a page one level deeper still lands in the right module, and with no
`Theorie` segment the back link falls through to `overview.html`, correct for both an exercise and
an opdracht.

`PacketTracer/Opdracht.html` **is** in the manifest, as the first topic of its category, so it
leads into the exercise it introduces. `ProCurve/Opdracht.html` is not, like RS485's: nothing
follows it. A missing manifest entry is warned about in the console for every page except an
`Opdracht.html`, which may legitimately stay out.

None of this is covered by the content check, because none of it exists until `back-link.js` has
run. [`scripts/check-nav.js`](scripts/check-nav.js) covers it instead: it loads every page in jsdom
on its real Pages URL, reads the nav row off the DOM, and asserts against `reference.js` that every
page in the chain has the right forward link and writes its own read-flag and no one else's. Both
bugs above fail it, which was verified by putting each one back.

It also asserts the topic boundary described above: back points at the root of the current reeks and
at nothing else, a page at that root and a page in no reeks get no row at all, and nothing runs past
the end of a reeks. "Points at a file that exists" was the old assertion and it let `overview.html`
straight through, which is exactly the jump that leaves the Orion menu lying.

```
npm install jsdom          # once; node_modules/ is gitignored
node scripts/check-nav.js
```

Run it whenever you move a page between folders, rename one, or touch `back-link.js` or
`reference.js`. It is deliberately **not** in the `Stop` hook and not part of the content check:
those must keep working on a clean checkout with nothing installed. Reasoning about this from the
source instead of running it is how the first of the two bugs got in.

**The check did need one.** Rules 6 and 8 globbed `*/*/Opdracht.html`, which does not reach
`Labo/ManagedSwitch/ProCurve/Opdracht.html`, so both rules would have gone quiet about both
assignments without saying anything. They now share `opdracht_paginas()`, which looks one level
deeper as well. Rule 7 was never affected: it walks every page.

What the check still does *not* do is verify that the pages in `PacketTracer/` are in the manifest.
Rule 2 only walks `Theorie/`, so if you add a page there and forget `reference.js`, nothing
complains.

- `img/` — self-hosted images, descriptive filenames. Never hotlink Brightspace
  (`/content/enforced/...`): those paths break every academic year. **A `syllabus-*` file no page
  refers to fails rule 16**, because it is evidence that content went missing rather than clutter:
  the importer wrote the file and then failed to place it. Chapter 2 shipped three topology
  drawings that way, so three questions asking "which topology is this?" printed with no picture
  and nothing failed. The rule catches a figure cut from a page with the file left behind just as
  well, so it outlives the importer. `syllabus-cover-logo.png` is referenced from
  `export-syllabus.py` rather than a page, which is why the rule reads the scripts too.

  **Een figuur zonder `syllabus-` in de naam is met de hand getekend en niet uit de Word
  geïmporteerd.** Zo'n bestand is een `.svg` en draagt zijn eigen reden en maatvoering in zich; het
  palet staat in [`img/signaal-amplitude-frequentie-fase.svg`](img/signaal-amplitude-frequentie-fase.svg),
  de eerste van de reeks. Ze zijn vervangingen van importfiguren, dus een tweede
  `import-syllabus.py --hoofdstuk 2` gooit ze eruit en zet de PNG's terug, net zoals een tweede
  `import-slides.py` een deck overschrijft. De Word is na de import archief, niet bron.
- `datasheets/` — self-hosted PDFs a page links to. Same reason: a vendor URL dies mid-semester.
- `downloads/` — what the student downloads. Four kinds live here, and the difference matters when
  you edit one. The **verslag templates** are derived: regenerate them in the same commit as a
  change to the `Opdracht.html` they came from, which rule 6 of the check enforces by mtime. The
  **Packet Tracer start files** (`Labo-ManagedSwitch-*.pka`, `*.pkt`) are not derived from anything
  in this repo; they came out of the Brightspace export and there is no source to regenerate them
  from. The third is **vendor material the student installs**, so far only
  `Labo-IndustrieelNetwerk-EtherCAT-XML.zip`, the 32 MB of Beckhoff ESI descriptors that CODESYS
  needs before it recognises an EK1100. That one is self-hosted for the reason `datasheets/` exists:
  a vendor URL dies mid-semester, and this file is a prerequisite of the assignment rather than
  background reading. It is big, it never changes, and nothing regenerates it.
  The fourth is the **syllabus PDF**, `Datacommunicatie-en-netwerken-syllabus.pdf`, derived like
  the verslag templates but from `Theorie/Syllabus/` and by `export-syllabus.py`; rule 13 keeps it
  in step. The fifth is a **handout PDF**, one per deck under
  `Hoorcollege/`, derived by `export-handout.py`. All five are committed, because Pages serves only
  tracked files. The `_oplossing.pkt` solutions stay on Brightspace and are deliberately absent.

  **A `handouts/` used to sit beside this one** and no longer does. It held the three handout PDFs
  the Brightspace export shipped, parked because nothing linked to them. Once the decks existed,
  two of the three were the same lecture as a deck here and so a second copy of a PDF this repo
  generates, which is the one thing a derived file may not be; the third's deck was imported and
  the folder went with it. A handout lives in `downloads/` because that is where a file the student
  downloads lives, and it has exactly one source, the deck it is printed from.

  **A handout's filename is an agreement with Orion, so it is fixed.** The lecture track has no
  landing page: its Orion topic links straight at
  `https://tdmts.github.io/DeN/downloads/DeN-handout-sessie-1.pdf`, so a new export is in front of
  the student the moment it is pushed. That is why there is no `overview.html` here and why one
  should not be added. The price is that the URL is now public: `export-handout.py` derives the
  name from the deck (`Sessie1` becomes `sessie-1`), so renaming the deck or passing another
  `--naam` moves the file and the Orion link 404s, with nothing in this repo failing. Rename the
  deck only together with the link in Orion.

**The planning owns the session counts, and nothing else may repeat them.**
[`Algemeen/Planning.html`](Algemeen/Planning.html) carries the labo schedule and the theory
schedule, imported from the two Brightspace topics. Every `overview.html` links to it instead of
saying how many sessions a lab gets, and rule 9 of the content check fails a page that says it
anyway.

The reason is not only drift, though drift already happened: the hub of Labo TCP/IP said one
session because its Brightspace Evaluatie topic said so, while the planning schedules it in
sessions 8 and 9. The deeper reason is that **the count is per group**. A1 and B1 do Draadloos
netwerk in sessions 6 and 7, A2 and B2 in sessions 4 and 5, so a single number on a lab page is
wrong for half the cohort no matter which number you pick. What stays on the hub is the working
rule that follows from sessions ("zorg dat je klaar bent voor het einde van een sessie"), because
that is a rule and not a count.

The page sits outside `Labo/` and `Theorie/` on purpose. `back-link.js` derives the module id from
a `Labo/<Naam>/` segment, so a page elsewhere gets `moduleIndex = -1` and its back link would point
at an `overview.html` that does not exist. Rule 3 skips a page outside those two tracks, so
`Planning.html` correctly loads no `back-link.js` and carries no nav row. The overviews therefore
link to it with `target="_blank"`, the same treatment a PDF gets and for the same reason: a wide
table inside the narrow Orion iframe is unreadable, and a page without a nav row is a dead end
inside it.

**The Groepsverdeling stays on Brightspace.** It is in the export as an empty template, and the
moment it is filled in it holds a list of students by name. Pages here are served publicly from
GitHub Pages, so that table belongs behind the Orion login and the planning page links to it in
words rather than with a URL.

**The evaluation page owns every weight, for the same reason.**
[`Algemeen/Evaluatie.html`](Algemeen/Evaluatie.html) carries the two halves of the course (theory
40%, the labs together 60%) and a table of what counts inside each lab. No `overview.html` states a
percentage any more; rule 9 fails one that does.

A weight behaves differently from a session count, and it is worth being precise about why it still
moved. It was never wrong on the hub. It was **incomplete**: `[60%]` on the RS485 hub is a fraction
without a denominator, true inside that lab and silent about what the lab is worth for the course.
Only a page that puts the five labs beside each other and adds the theory can answer the question a
student actually has. So the whole set moved to one page rather than the hubs each keeping a piece.

What stays on the hub is what does not need the other labs to mean something: the **form** of the
evaluation (a test gesloten boek, a verslag that carries no mark of its own) and the working rules
that follow from it ("je laat elke schakeling ter plaatse controleren"). A hub therefore says what
happens and links out for what it is worth.

Both pages under `Algemeen/` follow the same wiring as the planning: outside `Labo/` and `Theorie/`
so rule 3 skips them and they carry no nav row, and linked from the hubs with `target="_blank"`.

The **studiewijzer** is not reproduced here. It holds the official regulation, the conditions and
the second exam chance, and it changes on its own schedule; the page points at it in words.

## Styling comes from OrionCSS

`style.css` and `main.js` live in `tdmts/OrionCSS` and are linked by **absolute URL** on every page:

```html
<link rel="stylesheet" href="https://tdmts.github.io/OrionCSS/style.css">
<script type="text/javascript" src="https://tdmts.github.io/OrionCSS/main.js"></script>
```

Never copy or edit them here. A styling bug is reported there, not worked around here.
`tdmts/OrionContent/template.html` renders every component with its exact markup: read it before
authoring rather than reproducing markup from memory. Adding a component to OrionCSS changes every
course at once, so prefer composing what exists. The zelftest pages are accordions for exactly that
reason.

## The engines

- [reference.js](reference.js) → `window.LAB_REFERENCE.<module>` — the single source of truth for
  every theory list. A page is added here, not in another page's HTML. An `href` is a bare filename
  next to `reference.html`, or a relative path to a document; never an absolute Pages URL, which
  would send every click in a local preview to the live site.
- **`reeks` in `reference.js` says which categories are one Orion menu entry**, and within it, one
  reading order. Categories sharing a `reeks` are one chain; a different `reeks` is a different
  entry and nothing runs across. The name shown is that of the **first** category in the reeks.

  Both directions of getting this wrong are real, and each one was shipped once. RS485's
  **Zelftest** shares the theory's reeks, so `WatIsRS485.html` still pages into it and the button
  reads "Theorie 7 / 7": the zelftest is the last step of the theory, and a student who does not
  page into it will not go looking. ManagedSwitch's **Packet Tracer** exercises have a reeks of
  their own, so the last theory page does not page into an exercise and no exercise ever reports
  itself as "Theorie 12 / 16". Practical work and theory are not one list; a zelftest and the
  theory it tests are.

  A category of nothing but documents (Datasheets, Handleidingen, Software) carries the reeks it
  belongs to, which is `theorie`: those files sit on the theory hub. They never enter a chain, since
  a PDF cannot carry the nav row, so such a category contributes zero steps and changes no counter.
  **Every category states its reeks**; rule 2 of the check asserts it, because a category without
  one belongs to no entry and simply drops off the hub with nothing failing.
- [reference-dashboard.js](reference-dashboard.js) `initReferenceHub('<module>'[, '<reeks>'])` —
  renders the hub for **one reeks**, `theorie` by default, which is where every `reference.html`
  sits. Rendering the lot would put the Packet Tracer exercises of ManagedSwitch on the theory hub,
  and clicking one would swap the iframe to another Orion entry while the menu keeps saying
  "Theorie". A topic already opened carries a green check; a reset link at the bottom clears this
  hub's checks and nothing else. A document topic (`.pdf`, `.zip`, …) opens in a new tab, because a
  PDF inside the narrow Orion iframe is unreadable, and never gets a check: a PDF cannot carry
  `back-link.js`, so a slot that is always empty would read as a fault.
- [back-link.js](back-link.js) — self-running, no init. Injects one sticky nav row above the `<h1>`:
  back on the left, the module menu in the middle, "Volgende" on the right. Its header comment
  documents the DeN-specific behaviour in full. **A theory page must load `reference.js`** or the
  page renders perfectly and only the forward link silently vanishes, which is why rule 3 of the
  check asserts the include.

  Everything it offers stays inside the current reeks. **Back** points at the root of that reeks:
  `reference.html` for the theory (read off the path, so it survives a missing manifest), the first
  manifest entry for any other. The forward link on the last page of a reeks points there too, and
  is dropped when the back link already does. The **menu** lists that one reeks; it used to carry a
  tab per reeks, which was right while a whole module was one entry in Orion and is a jump to
  another entry now. A page at the root, or in no reeks at all, gets none of the three and therefore
  no row.

- [oplossingen.js](oplossingen.js) — self-running, no init, syllabus only. Folds the answer of every
  question on the page into a `spoiler-container`, the same reveal OrionCSS draws for the labo
  zelftest. It puts down the markup `main.js` expects and lets `main.js` build the button, so it
  belongs at the end of the `<body>` and not in a `DOMContentLoaded` of its own. Rule 14 asserts the
  include: without it the PDF shows the answers and the site does not. What it reads is described
  under the syllabus, below.

Progress is `localStorage` only, no backend, and only one flag exists:
`msDashboard:{moduleId}:theory:{topicId}` = `'1'`, written by `back-link.js` when it recognises the
page in the manifest. A theory page has nothing to complete, so "opened" is the only honest thing to
record. Every read is wrapped in a `try`: a browser that blocks storage for an embedded third-party
frame throws on the first one, and losing the ticks beats losing the whole nav row.

## The verslag is a file the student owns

Students work through a lab **while their network connection is down** (they are reconfiguring the
switch), must paste screenshots, must be able to change PC, and must have a backup. Browser storage
fails four of those five, so the verslag is a **docx on the student's OneDrive**, not fields on a
page.

[`scripts/export-verslag.py`](scripts/export-verslag.py) generates it **from `Opdracht.html`**, so
the template cannot drift from the page. You give it the folder that holds the `Opdracht.html`, and
the default filename is that path with dashes, so a module with two assignments cannot land on one
name:

```
python scripts/export-verslag.py Labo/RS485                 -> downloads/Labo-RS485-verslag.docx
python scripts/export-verslag.py Labo/ManagedSwitch/ProCurve -> downloads/Labo-ManagedSwitch-ProCurve-verslag.docx
```

**The whole assignment lives in a `<!-- verslag ... -->` comment** in `Opdracht.html`. That page is
a landing page: what the lab is about and the button to download the document. The work happens in
the docx.

**That button reads "Opdracht downloaden", on every one of them.** It said "Opdracht en verslag
downloaden" for a while, which names two files where there is one, and a student who reads it that
way goes looking for the second. There is one: the assignment is in the docx, he fills it in there,
and he hands that same file in. That it is a verslag by then is something he meets at the dropbox,
not at the download. Rule 11 of the content check asserts the wording literally, because a button
label is exactly the kind of thing that gets reworded on one page and nowhere else.

**The docx is exactly three things: the `<h1>`, the `<p class="lead">`, and that comment block.**
Nothing else on the landing page reaches it. That contract exists because screen furniture leaks
badly into a document a student fills in offline: a download button he is already past, a link to a
page he does not have open, a note about where the theory lives. The lead goes on the front page, so
someone who opens the document without having seen the site still knows what the lab is about. Rule
8 of the check asserts the lead is there; the generator refuses to run without it.

Anything that belongs in *both* (the safety warning, for instance) goes inside the comment, and the
page repeats it if the page needs it too.

That is a deliberate call, and the reason is worth keeping. The same assignment in two places makes
a student wonder where to answer, and a question rendered on a web page has nowhere to answer it at
all. Keeping the source in the page, in place, is what stops the template from drifting from the
assignment it belongs to, and it keeps the assignment editable with the same Orion components as the
rest of the site. Rule 7 of the check enforces both halves: nothing may escape the comment, and the
comment may not be left unterminated.

Inside the block:

- `<ol class="vragen">` — a question list. Each `<li>` becomes a numbered question with an empty box
  under it. Add `class="screenshot"` to an `<li>` that asks for one and the box gets room for it.
- `<div class="verslag-kader" data-verslag="...">` — an explicit box with that caption, for a photo.
- `<table class="verslag-tabel">` **inside an `<li>`** — a grid the student fills in, instead of a
  blank box. Column headings come from the `<thead>` `<th>`s and the row labels from the first
  `<td>` of each row; the remaining cells are emptied, so the table itself is the answer space and
  no box is added. Question 2 of RS485 uses it for the pin table (pin against voeding / input /
  output / in- en uitgang, one cross per row). The check verifies that every row has as many cells
  as there are headings, because a short row produces a crooked Word table and nothing fails.
- `<figure>` — the image itself, **embedded**, with its figcaption under it. Not a reference to the
  page: the assignment is not there any more. PNG dimensions are read from the file header (no
  Pillow) and capped at 15 cm, so a small image is not blown up.
- `.accordion-item` — a hint, rendered open. On screen it folds shut; here it cannot, and anything
  left out of this document does not exist for the student.

Numbering runs across sections, so question 11 follows question 10 with two headings in between.

**Two things must never appear inside that comment.** An `-->` from a nested comment terminates it
early and silently swallows the rest, so author notes go in a *separate* comment above it (see the
AUTEURSNOTITIES block, which records that the Allman braces are deliberate and that the two
compile errors in Schakeling 3 are the exercise, not a bug). The same goes for any bare `--`.

A service worker so the *theory* stays readable offline is agreed but not built yet. It would be
`sw.js` at the repo root, served from Pages like everything else, scoped to `/DeN/`. The known risk
is that registration fails silently inside the Brightspace iframe, where the site is a third-party
context; the docx is the fallback that makes that survivable.

## The syllabus is a PDF that comes out of HTML

The lecture track works the other way round from a lab. A lab is a website that happens to produce
a docx; the syllabus is **a PDF that happens to be authored as HTML**. The student downloads one
file of a hundred-odd pages and prints it. He is not meant to browse `Theorie/Syllabus/` at all, and
nothing on the site sends him there: the Orion topic "Theorie" is `Theorie/Syllabus/overview.html`,
a landing page with one button, exactly the shape of an `Opdracht.html`.

**The Word is the origin of the text, not its source.** `Datacommunicatie en netwerken.docx` on
OneDrive is where the syllabus was written, and after a chapter is imported it is *archived, not
edited*. Two sources that are both edited drift apart, and that had already happened when this
started: the docx was dated 29 November 2025 and the PDF in Brightspace 12 September 2025, so
students had been reading a version two and a half months behind.

[`scripts/import-syllabus.py`](scripts/import-syllabus.py) does the conversion, one chapter at a
time (`--hoofdstuk 2`, plus `--voorwoord` for the front matter). **It translates formatting, never
words**: no typo is fixed, no sentence is rewritten. What it had to guess goes into
`Theorie/Syllabus/IMPORT.md`, which it rewrites for the chapters of that run and leaves alone for
the others. Editorial findings go in `NOTITIES.md` beside it, by hand.

**A guess that only lands in `IMPORT.md` is a guess nobody resolves.** That log is a record of one
run: it is frozen per chapter at import time, so the moment you change a rule here or edit the HTML
by hand, it describes something that is no longer true. That is not hypothetical. After the
header-row rule was corrected, `IMPORT.md` still claimed a header row on three tables that no
longer had one, citing a reason the code no longer knows, and nothing detected the contradiction.
It also does not get read: 137 lines, 34 of them saying "nakijken".

So where the Word gives no signal at all, the importer writes **`data-geraden`** on the element
itself, and **rule 15** of the content check fails on any that is still there. The mark sits with
the markup it describes, so it cannot go stale; the check is red until you look, so it cannot go
unread; and you resolve it by deleting the attribute, which makes the deletion itself the record
that a person decided. Only the no-evidence case is marked. A one-column table is a stated
exception rather than a guess, and a header the Word actually indicates is evidence, so neither
gets a mark.

This does not catch the importer being *confidently* wrong, which is what the header-row bug
was: it asserted a reason it had never checked. The discipline that covers that class is narrower
and cannot be automated away. **A reason the importer prints must be a reason it actually read.**
Each `want ...` string in `noteer()` should have a predicate behind it that genuinely tests that
reason, not a proxy for it.

Six things it does interpret, and none of them touch a word:

- **A two-row table whose second row spans the width is a captioned box** (Kernpunten,
  Studievragen) and becomes an `info-box`. The icon in the first cell is dropped, because the
  component draws its own, and the bold is dropped when the *whole* box is bold, because there the
  bold is the box's styling and the component supplies that too.
- **A table with no text in any cell is writing space** and stays an empty table: on paper that is
  where the student answers. So is a table with **one column empty all the way down**: the
  definition on the left, the blank the student fills in on the right. Question 3 of chapter 2's
  Test jezelf is one, and it has to be recognised, because a table that closes the list restarts
  the numbering behind it. **That column also needs the width the Word gives it,** carried across
  as a `--kolom-breedte` on a `<col>` the same way `--figuur-breedte` is carried: Chrome sizes a
  table to its content and gives an empty cell nothing but its padding, so the one column the
  student has to write in came out a few millimetres wide and the question was unanswerable on
  paper. The cells get `class="invulruimte"`, the table `invulkolom`, and `syllabus.css` decides
  what the sheet does with both.
- **Merged cells become `rowspan` and `colspan`.** Skip this and every such table silently shifts a
  column.
- **A header row is only set when the Word says so.** The giveaway is not bold and not shading:
  this document's header rows carry no run formatting at all, and are made up by the table style's
  conditional first-row format. The flag that switches that on is `tblLook firstRow`, and it is the
  only thing that separates the table that has a header from the one that has not. One-column
  tables are excluded: those stack layers and their first row is the top layer.

  **That flag only counts on a style that defines the first-row format.** `Onopgemaaktetabel1`
  does; `Tabelraster` and `TableGrid` define no conditional formatting at all, so there the flag is
  on and Word draws nothing. Twenty-one tables were getting a header row that does not exist in the
  document, among them the AND calculation of 4.7, whose top row is simply the IP address, and the
  fill-in table of 4.18, whose first row is one of three the student writes in. Two of the
  twenty-one happened to be real headers, which is exactly why this was invisible for four
  chapters: the rule was right often enough. Without a style that draws something, there is no
  signal, so the importer now logs it as "nakijken" and a person decides.
- **The width of an image comes from the Word,** as `wp:extent`, and is carried across as a
  `--figuur-breedte` on the `<figure>`. Without it an image falls back to its own pixel size at
  96 dpi, which says nothing at all: it records how the screenshot happened to be taken. The
  photograph of an ethernet cable is 550 pixels wide, so it printed at 145mm, all but the full
  text width, for a cable; the Word puts it at 50.4mm. Nineteen of chapter 2's 34 images were
  oversized that way and the chapter ran three pages long. The other fifteen are 160mm in the
  Word, the text width exactly, so a diagram that needs the whole page still gets it.
- **A cropped image is cropped on the way out.** Word keeps a cropped image whole: the file in
  the docx is the original and `a:srcRect` says which part of it is shown, in hundred-thousandths.
  Extract the file and you print back exactly what the author cut away. Eight of chapter 2's
  images are cropped and two of them badly: `syllabus-02-fysieke-laag-15.png` and `-16.png` show
  their top half in the Word and were printing their bottom half as well. An uncropped image
  gets an *empty* `a:srcRect` from Word, so four zeroes count as no crop. This is the one thing
  in the importer that needs **Pillow**, and only when a crop is actually met; a JPEG is written
  back with the quantisation tables of the original, so cropping is not a second compression.

Four Word habits shape the reader as well. **A sentence is chopped into runs** the moment it has ever
been corrected in Word, so eight adjacent runs with identical formatting are welded back into one
before any `<strong>` is emitted. And **an empty paragraph never closes a list**: Word puts one
between every question of a Test jezelf, and closing on it restarts the numbering at 1 for every
single question. For the same reason a bullet list right after a numbered question is that
question's answer options (Word gives them their own `numId` rather than a second level), and an
empty table right after one is its answer space; both are nested inside the `<li>`.

**An image inside the paragraph of a list item stays in that item.** The three topology questions of
chapter 2 each carry their drawing that way, and the drawing is the question: which topology is this?
The image branch used to run only for a paragraph that was not a list item, so all three files were
written to `img/` and referenced by nothing, and the questions printed with the picture missing and
nothing failing. They get no figcaption, because the paragraph's text is the question itself.

**A paragraph carrying nothing but an image does not close a numbered list either.** Chapter 3 puts
the drawing of questions 13 and 19 in an ordinary paragraph between the question and its options,
where chapter 2 put it inside the question's own paragraph. The list closed on it, and the options
then sat *beside* the question instead of inside it: `oplossingen_uit()` finds no `<ul>` in the
question, so there is no letter to count and no answer to print, and the page looks perfectly
ordinary. Only while an `<ol>` is open, the same guard the options rule carries, because after a
plain bullet list a figure really is a figure.

**A paragraph in the List Paragraph style that carries no numbering is the explanation under the
bullet above it**, and goes inside that `<li>`. Word marks it no other way: no indent of its own, no
second level, only the style. Miss it and a list of six bullets with a sentence under each comes out
as six lists of one bullet with the sentence beside it, which is what chapter 2's Glasvezelkabel
did until the rule existed.

**A numbered list broken by an ordinary paragraph keeps counting.** In Word it is one list with one
`numId` throughout; in HTML that paragraph genuinely closes the `<ol>`, so what follows gets
`start=`. Chapter 2's Test jezelf is eight questions with a sentence before question 6, and without
this it printed 1-5 and then 1-3 while the Oplossingen beside it said 6, 7, 8. That sentence belongs
neither to the question above it nor to the one below, so it stays where the Word puts it and the
numbering is what has to survive.

**The chapter structure comes from `reference.js`, and the numbering with it.** A category is a
chapter, a topic is a section, and the chapter number is the category's *place* in the list rather
than a field, so a number cannot contradict the order. `genummerd: false` marks the Voorwoord, which
carries none. The first topic of a chapter is `Overzicht.html`, the chapter opening with the
kernpunten and the studievragen; it takes the chapter title as its heading and does not count as a
section, so OSI model is 1.1 and not 1.2.

**[`Theorie/Syllabus/syllabus.css`](Theorie/Syllabus/syllabus.css) is the only place that says
what the document looks like.** The exporter links it and carries no styling of its own; a style
attribute on a page or a CSS rule in the script is a second source and belongs there instead. The
one style attribute the pages do carry, `--figuur-breedte`, is not an exception to that but falls
outside it: it is a measurement read out of the Word, the way a `rowspan` is, and what the printed
page does with it is decided in the stylesheet like everything else. The
bundle does **not** load OrionCSS: that is the house style of the *site*, and two stylesheets over
each other means guessing which one wins at every difference. This is the one stylesheet that
legitimately lives in this repo rather than in OrionCSS, because it styles a *document* and not a
page: the HOGENT cover, numbered chapters, a running head and foot, and the black and teal
Kernpunten and Studievragen bars.

Every measurement in it is **taken off the existing syllabus**, not chosen: each page of
`DEN Syllabus 20250912.pdf` was rendered and measured in millimetres, which is why the values carry
a decimal. Changing one is a decision to diverge from that document. The pages under
`Theorie/Syllabus/` do *not* load it; on screen they stay ordinary site pages with OrionCSS, because
that is what the nav row hangs on.

The markup stays OrionCSS's (`.info-box`), so the same page still works on the site, and the
importer adds `data-kader="kernpunten"` to say *which* box it is: the colour and the icon belong to
the kind of box, not to the OrionCSS class. The two icons are lifted straight out of the Word into
`img/syllabus-kader-*.png`.

Three things about the printed page are worth knowing before you touch the CSS. The chapter opening
(title, kernpunten, studievragen) sits **alone on its page**, and that break hangs on the wrapping
`.hoofdstuk-opening` rather than on the `h1` inside it: within its wrapper that `h1` is the first of
its type again, so an `h1:first-of-type` exception silently let every chapter run on at the bottom
of the previous page. Chapter and section numbers sit in a `.kop-nr` span of fixed width, because
the syllabus puts every title on the same tab stop and `1.1` is wider than `1`. And bullets are
drawn with `::before` rather than `list-style`, since the browser picks the marker distance itself
and it does not match.

That last one has a catch worth stating, because it cost a wrong number in a printed test. A
`::before` needs a counter, and an **own** counter (`counter-reset: item`) restarts at every `<ol>`
and cannot see the `start` attribute, which is precisely what carries a Test jezelf across the
paragraph that splits it. So the numbers come from **`counter(list-item)`**, the one the browser
keeps itself and the only one that honours `start`. The marker is still drawn by hand; only the
counting is the browser's.

**A question carries its own answer, and both the PDF and the site read it there.** A question list
is an `<ol class="vragen">`. The correct option of a meerkeuzevraag is marked `class="juist"` on the
`<li>`; any question may carry a `<div class="oplossing">` with the written answer or the reasoning,
and an open question always has one, because there is nothing to mark. Those two markings are the
whole source: `export-syllabus.py` prints a section **Oplossingen** from them, and
[`oplossingen.js`](oplossingen.js) turns them into a reveal on the site, in the `spoiler-container`
of OrionCSS. Two renderings, one text.

The reason the answer sits with the question rather than on a page of its own is the **letter**. A
written solutions page has to repeat it ("2. b"), and the day two options get swapped that letter is
silently wrong with nothing looking odd on either page. Marked in place, the letter is counted at
print time and cannot drift. The labo zelftest under `Labo/RS485/` still writes "Antwoord c." by
hand; that is older than this arrangement, not a pattern to copy. The price paid deliberately is
that the letter is now counted in two places, Python and JS: that is a mechanical rule (which `<li>`
carries `juist`) and not content, so there is nothing there to go stale.

Those letters are also why `syllabus.css` gives the options a, b, c instead of bullets: an answer
that says "b" needs a "b" to point at. That lettering hangs on `ol.vragen`, so an ordinary bullet
list stays an ordinary bullet list.

**Exactly one option is marked, and a question with more correct answers gets rewritten rather than
the rule relaxed.** This comes up once a chapter or so, because the Word asks plenty of questions in
the plural, and it is settled: adapt the question, not the contract. Chapter 3 hit it twice (two and
three correct answers) and chapter 6 once, and all three were reworked. Two techniques cover every
case met so far. **Pair the options** so that exactly one pairing is right, and say in the question
how many there are, which is what 3.12 question 1 does. Or **invert the stem** to "which one is
not", which works whenever precisely one option is wrong: 6.7 question 3 named four fields a
programme needs and only the MAC address does not belong, so turning the question around kept all
four options, in their original order, and changed nothing but the sentence asking.

Relaxing the rule looks cheaper and is not. `class="juist"` is read in three places
(`check-content.py` rule 14, `export-syllabus.py`, `oplossingen.js`), so a plural answer means
keeping a letter list in step across two renderers, in two languages, forever. And the rewrite is
worth having on its own: a multiple-answer question that does not say how many to tick is a worse
question, which is why 3.12 states the count out loud. The decision was recorded only in
`NOTITIES.md` under chapter 3 for a while, and was duly missed the next time it came up; that is
why it is here.

**An answer is a `<div>`, never a comment.** It lived in `<!-- oplossing: ... -->`, which made it
content only one renderer could ever see, and a nested `-->` silently eats the rest of the file, the
way the verslag block in an `Opdracht.html` warns about. Everything is in the HTML; what does not
belong on screen is taken away there, not left out.

**Not everything with questions is called `TestJezelf.html`.** Section 2.3 RJ-45 vs M12 and 2.6
Oefening: switch bekabelen ask exactly the same kind of question halfway through a chapter, and for
a while they carried no answers at all, because the export recognised a question page by its
*filename*. It now recognises it by `class="vragen"`, which is also what rule 14, the export and
`syllabus.css` each keyed off separately before. The gap the class leaves is that forgetting it is
silent, so rule 14 carries a tripwire: an `<ol>` with an `invulruimte` under it but no
`class="vragen"` fails the check.

That class is the same word the verslag block in an `Opdracht.html` uses for its question list, and
the two mean different things: there it is markup that must stay inside a comment, here it is a list
that must be on screen. Rule 7 therefore only looks at pages under `Labo/`, which is the only place
a verslag exists.

**One Oplossingen per chapter, at the end**, covering every question page of that chapter with a
subheading per source ("2.3 RJ-45 vs M12"), and taking the next section number. Not one behind each
exercise: a chapter would then carry three sections called Oplossingen and the table of contents
would say the word three times without saying what about. It also keeps the answer off the leaf
right behind the question.

That section is **not in `reference.js`**, and it is the one thing in the printed document that is
not. The manifest still decides where the questions go; the Oplossingen are derived from them and
follow at the end of the chapter, the way the verslag docx is derived from `Opdracht.html`.

**A section with questions ends the page.** The export marks such a section `data-vragen` and
`syllabus.css` gives it `page-break-after`, the same division of labour `data-sectie` already has:
the script states a fact about the section, the stylesheet decides what the paper does with it.
Without it 2.4 Glasvezelkabel started halfway down the sheet 2.3 RJ-45 vs M12 ended on, so an
exercise the student fills in shared a page with theory that has nothing to do with it. Only after,
never before: where a question list *begins* differs per kind (a Test jezelf gets its own page, an
exercise halfway through a chapter does not), but where it ends does not. A Test jezelf is followed
by the Oplossingen, which breaks before as well; the two forced breaks collapse into one and no
blank page appears between them.

**A question list is not always one `<ol>`,** and both the export and rule 14 stitch the pieces back
together on the `start` attribute before they count a question. They each used to read the first
`<ol>` on the page and stop, which for chapter 2 meant questions 6 to 8 were never looked at: rule
14 passed without checking them and the export printed five answers for eight questions, and both
looked exactly like a page in order.

**That `start` is now checked as well,** because the stitching hides the case where it is missing.
An `<ol class="vragen">` that is not the first on the page must carry a `start` that continues from
the question before it. Leave it off and the browser and the PDF restart at 1 while the Oplossingen
section keeps counting, so answer 1 belongs to question 3 and only the number itself gives it away.
Chapter 2 shipped exactly that: 1 to 5, then 1 to 3, with 6, 7 and 8 in the solutions beside it.
Note that the check may not compare against the stitched number, which falls back to the expected
value when the attribute is absent and is therefore always equal; it reads whether the attribute is
declared at all.

The export is **all or nothing** per chapter: one question without an answer and it prints no
solutions for that chapter at all, because a list that skips question 3 lets a student believe he
got question 3 right. That is the right call and a silent one, since it is a "let op" line among the
others, so rule 14 of the content check says it before anything is printed. The answers themselves
are not in the Word (nothing is marked there), so every one of them is an editorial decision;
`NOTITIES.md` records what each one rests on and which ones still need checking.

[`scripts/export-syllabus.py`](scripts/export-syllabus.py) bundles that into
`downloads/Datacommunicatie-en-netwerken-syllabus.pdf`, which **is committed**, because Pages serves
only tracked files and this PDF is the whole of what the student gets. Rule 13 of the content check
fails it when it is older than any page under `Theorie/Syllabus/Theorie/`, for a sharper reason than
rule 6 has: editing a page without re-running the export changes nothing at all about what the
student reads.

**Why the printing takes three passes.** Chrome cannot make a table of contents with page numbers:
CSS has `target-counter()` and Chrome does not. So the *content* is printed first and numbered from
1, `pypdf` reads the text back to find which page each heading landed on, and only then are the
cover and the table of contents printed with those numbers in them. That works only because the
cover and the contents do **not** count in the numbering, exactly as in the Word. Number them along
and the length of the table of contents shifts the very numbers printed inside it, and you are
iterating until it settles.

The running head and foot are stamped on afterwards with `reportlab`: through the command line
Chrome will only add *its own* header and footer, with the date and the file URL in them, and there
is no way to change that. The layout follows the Word: the page number at the top, the chapter title
at the bottom.

**Both checks needed one change each, and both were failing silently.** Rule 2 walked
`Theorie/*.html` and compared on filename, which reaches neither a chapter folder nor six different
`Overzicht.html` files; it now walks recursively and compares full paths.
[`scripts/check-nav.js`](scripts/check-nav.js) only ever walked `Labo/`, so every syllabus page was
reported as "recognised by no page" while in truth it had never been measured, and the message
pointed at `reference.js` instead of at the check.

## The hoorcollege is a deck that becomes a handout

A third track, and it ends where the syllabus ends: a PDF the student downloads. What the PDF is
for differs. The syllabus is a document he reads at home; a handout is the sheet he brings to the
lecture, so half of every row on it is left blank for him to write in.

**This section says where a fact lives, not what it says.** Each of the files below carries its
reasoning in its own header, next to the code it explains. Repeating any of that here would give
every one of those facts a second copy to drift from, which is exactly how
`Theorie/Syllabus/IMPORT.md` came to describe header rows that no longer existed.
What belongs here is only what no single file can own: how the pieces divide the work.

```
Hoorcollege/Sessie1.html     a deck: one <section class="slide"> per slide, and nothing else
Hoorcollege/Sessie2.html     one file per hoorcollege, named after the session it is given in
Hoorcollege/Sessie3.html
Hoorcollege/hoorcollege.css  what a slide IS, on screen and on paper
Hoorcollege/handout.css      only what the printed sheet DOES with a slide
Hoorcollege/hoorcollege.js   the projection, and the fit check
Hoorcollege/IMPORT.md        what the import had to guess, one section per deck
scripts/import-slides.py     pptx -> deck, once; after that the HTML is the source
scripts/export-handout.py    deck -> downloads/DeN-handout-<naam>.pdf
```

**The split between the two stylesheets is what makes the handout trustworthy.** The bundle loads
`hoorcollege.css` and lays `handout.css` over it, so a slide on paper is the same slide as on the
beamer, only smaller. Something that prints wrong is fixed in `handout.css`; a slide that *is*
wrong is fixed in `hoorcollege.css` and is then right in both. A rule that only paper needs does
not belong in the first file, and a rule about the slide itself does not belong in the second.

**The pptx is archived after the import, not edited,** the same rule as the syllabus and for the
same reason. The consequence bites the other way round here: `import-slides.py` rewrites a deck
completely, so a second run throws away every correction made by hand, and those corrections are
exactly the work `IMPORT.md` pointed at. It cost a hand-rebuilt grid on slide 7 of Sessie1 once,
during a re-import meant to verify a one-line fix.

**The fit check exists on screen only.** A slide is 143mm and `overflow: hidden`, so what does not
fit is clipped in silence, and at 45mm on paper it is past noticing. `hoorcollege.js` measures each
slide and marks it; the handout bundle carries no scripts, so that mark cannot reach paper.

**A deck is not a site page**, so `check-content.py` does not ask it for OrionCSS; `GEEN_SITEPAGINA`
there says why. Every other rule still applies, and has to: a link or an image that does not exist
prints as an empty box.

**Where the PDF goes** is under `downloads/` above, with the reason its filename is fixed and the
reason this track has no `overview.html`.

## Each lead has one job

A lab has three or four `<p class="lead">` intros, one per Orion menu entry, and they used to
retell each other. They cannot be merged into one: they are separate entries, nothing links
sideways, and each entrance has to stand on its own. So the fix is not one place but one job each.

| Page | Answers | Never says |
|---|---|---|
| `overview.html` | what the lab is about, and why the subject exists | the steps of the assignment |
| `Opdracht.html` | what you do and what you hand in | what the theory covers |
| `Theorie/reference.html` | what the theory covers, in what order | what the assignment is |

Two consequences that are easy to get wrong. **The hub owns "lees de theorie voor je begint"**, and
the theory hub no longer repeats it: a student reading the hub is already in the theory, in order.
And **a lead never enumerates what the page below it already lists**: the theory hub used to name
its own topics one by one while `reference-dashboard.js` rendered exactly those titles underneath,
and the RS485 hub said "in zes stappen", a count owned by `reference.js`, the same species of drift
rule 9 exists for.

Repeating a *fact* across two leads is fine when a reader needs it in both, and one is deliberate:
the Industrieel netwerk opdracht says the Pi takes the role of PLC, because that lead is the front
page of the docx and a student filling it in offline has no other page open. What is not fine is
the same sentence twice.

Rule 12 fails a run of seven or more identical words between two leads of one lab. It is a
tripwire, not a proof: it reads no meaning, so a retold summary that got rephrased passes. Eight
words let "een HP ProCurve via de seriële console" through and six caught coincidences, which is
how the number was picked.

## The content check

[`scripts/check-content.py`](scripts/check-content.py) is the single "is this repo publishable"
check. Run it before finishing any content edit; a `Stop` hook in
[`.claude/settings.json`](.claude/settings.json) also runs it. Its docstring lists the sixteen
rules.
Two of them are worth repeating here because they fail *silently* otherwise:

1. **Case.** Windows and macOS are case-insensitive, GitHub Pages is not, so a link to
   `opdracht.html` opens locally and 404s in production. The check compares every path segment
   against the real directory listing, and deliberately does **not** use `Path.resolve()`, which
   silently corrects the case and would make the rule test nothing. It got this wrong once already.
2. **Manifest completeness.** A theory page missing from `reference.js` is unreachable from the hub
   and earns no read-flag, and nothing about it looks wrong in a browser.

Rule 9 says the hub carries no *verloop*: no `Verloop` heading, no `steps-container` in
`overview.html`. A step plan there restates what the theory hub and `Opdracht.html` already
show, and it does so with counts it does not own (how many theory pages live in
`reference.js`, how many circuits live in the verslag comment), so it goes stale the moment
one of those grows and nothing fails. The order belongs to the pages that carry it.

The check skips `_incoming/` and `_export/`, the staging folders from `.gitignore`. Raw Brightspace
content is exactly what these rules forbid (no OrionCSS link, YouTube embeds without
`referrerpolicy`, em-dashes), so counting it would turn the whole check red for the length of an
import and make the `Stop` hook shout on every turn, which is how you stop reading it.

Rule 5 (Allman braces, spacing around operators, no em-dashes) applies to Arduino/C++ code blocks
only. **Cisco IOS configuration and terminal output are deliberately out of scope**: those are
copied verbatim from a device, and reformatting them would be a lie about what the device printed.
Assets named `TODO-*` are warnings rather than errors, for artwork that is planned but not drawn.

## Prose style

[`SCHRIJFSTIJL.md`](SCHRIJFSTIJL.md), copied from Microcontrollers, is the single source of truth
for how the Dutch reads. **It has one rule Microcontrollers does not have yet**, pattern 18: a page
never refers to the history of the course material itself. "De theorie blijft wel op de site staan"
is meaningless to a student who never saw the previous version, and such sentences are written
precisely while you are moving things around, when they still sound reasonable. Not automated, and
deliberately so: the giveaway words all occur legitimately too ("Vroeger was parallel populair" is
about the technology). Worth porting back to the Microcontrollers copy. The short version: keep the didactics, drop the theatre. All content in
Dutch, students addressed with **`je`**. `led` not `LED` in prose (code keeps its capitals). No
em-dashes, which is the one style rule the check enforces.

Filenames are **PascalCase Dutch nouns**: `WatIsRS485.html`, `Opdracht.html`. The exceptions are the
two hub filenames, `overview.html` and `reference.html`, which the engines match on.

`reference.html` is titled **Overzicht**, not Theorie, in every module. It grew past the theory: it
carries the zelftest of RS485 and the Packet Tracer exercises and switch manuals of ManagedSwitch.
The filename stays `reference.html` because `back-link.js` and `reference-dashboard.js` match on it.

## Where the content comes from

The Brightspace export (`D2LExport_15640_...zip`) holds the current course.
[`scripts/import-brightspace.py`](scripts/import-brightspace.py) stages it into `_incoming/`, one
raw page per topic, with every image and document pulled out of the zip into `img/` and
`datasheets/`:

```
python scripts/import-brightspace.py <export>.zip --only "Managed Switch" --fetch-remote
```

**Drive the import from `imsmanifest.xml`, never from the file listing**, which is what that script
does and why the pollution below costs nothing. Two things about the package explain the rule:

- **The export dumps the org unit's entire Manage Files area.** That area fills up on every Course
  Copy, including files whose topics you deselected, and it never empties when a topic is deleted.
  This course was copied from a programming course, so `VisionDetection`, `BinairNaarDecimaal`,
  `DebugColors`, `Spanningsdeler`, `OntbindenVanKrachten`, `Test1-Voorbeeld` and the `bios uefi/`
  folder are all in there with **zero** references from any topic or XML. Nothing is wrong with the
  export; it is simply not a list of what the course contains.
- **A filename says nothing.** The Evaluatie topic of Labo RS485 is stored as
  `Zonder titel - Copy (1).html`, and VLAN Advanced as `Zonder titel - Copy.html`. D2L names the
  file after whatever the editor last saved, and every click on "Copy" writes a `- Copy` duplicate.
  Only the manifest knows the real title.

`--fetch-remote` is the one flag that touches the network. Several pages hotlink their screenshots
to `chamilo-downloads.hogent.be`, the platform this course lived on before Brightspace, through
URLs with an expiring `security_code` and no file extension; those images are not in the export.
The flag downloads them so they can be self-hosted. It works only while that server is up.

Three more things to know:

- `migration/paginas/` has 65 pages already in Orion markup, plus `- Copy` duplicates and eight
  988-byte stubs named `Labo.html`, `Theorie.html` and so on. Triage before importing.
- `migration/documenten/` is polluted with material from **another course** (`BinairNaarDecimaal`,
  `DebugColors`, `OntbindenVanKrachten`, `Spanningsdeler`, `VisionDetection`, `Test1-Voorbeeld`).
  Do not carry those over.
- There are no PowerPoints in it. The theory exists as `DEN Syllabus 20250912.pdf` plus three
  handouts (sessie 1, datalink laag, netwerk laag). The syllabus is the source for the `Theorie/`
  track, and the page split gets approved before anything is written. The decks under
  `Hoorcollege/` came later and from OneDrive, not from this export, which is why those three
  handouts are no longer in the repo.

**Solutions:** the theory exercises (subnetting) get their solution on the site behind a reveal,
because that is self-study. Lab solutions and the `_oplossing.pkt` Packet Tracer files stay on
Brightspace, because that is assessed work.

**The QR pages** (`QROrion.html`) call the Brightspace API for the dropbox submission and cannot
work from Pages. They stay on Brightspace.

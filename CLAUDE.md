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
three Python scripts, of which `export-verslag.py` needs `python-docx` and the other two are stdlib
only, plus one Node script, `check-nav.js`, which needs `jsdom` and is the single reason a
`node_modules/` may exist here. It is gitignored and nothing else depends on it.

## Relation to tdmts/Microcontrollers

This repo was started from Microcontrollers and **deliberately diverges**. Read that repo's
`CLAUDE.md` for the reasoning behind the shared parts; read this section before you copy anything
across, in either direction.

| | Microcontrollers | DeN |
|---|---|---|
| Module folder | `Labo1/` … `Labo7/`, numbered | `Labo/RS485/`, named |
| Exercises | ~8 small ones per lab, XP + badges | one large assignment per module |
| Manifests | `exercises.js` + `reference.js` | `reference.js` only |
| Engines | 4 | 2 (`back-link.js`, `reference-dashboard.js`) |
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
Theorie/               the lecture track (hoorcolleges), not built yet
Algemeen/Planning.html the labo and theory schedule; the single source for session counts
Algemeen/Evaluatie.html how the course is graded; the single source for every weight
img/  datasheets/  downloads/  scripts/
reference.js           the manifest of every theory page, per module
back-link.js  reference-dashboard.js  reference-dashboard.css
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
  (`/content/enforced/...`): those paths break every academic year.
- `datasheets/` — self-hosted PDFs a page links to. Same reason: a vendor URL dies mid-semester.
- `downloads/` — what the student downloads. Three kinds live here, and the difference matters when
  you edit one. The **verslag templates** are derived: regenerate them in the same commit as a
  change to the `Opdracht.html` they came from, which rule 6 of the check enforces by mtime. The
  **Packet Tracer start files** (`Labo-ManagedSwitch-*.pka`, `*.pkt`) are not derived from anything
  in this repo; they came out of the Brightspace export and there is no source to regenerate them
  from. The third is **vendor material the student installs**, so far only
  `Labo-IndustrieelNetwerk-EtherCAT-XML.zip`, the 32 MB of Beckhoff ESI descriptors that CODESYS
  needs before it recognises an EK1100. That one is self-hosted for the reason `datasheets/` exists:
  a vendor URL dies mid-semester, and this file is a prerequisite of the assignment rather than
  background reading. It is big, it never changes, and nothing regenerates it.
  All three are committed, because Pages serves only tracked files.
  The `_oplossing.pkt` solutions stay on Brightspace and are deliberately absent.

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
[`.claude/settings.json`](.claude/settings.json) also runs it. Its docstring lists the twelve rules.
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
  track, and the page split gets approved before anything is written.

**Solutions:** the theory exercises (subnetting) get their solution on the site behind a reveal,
because that is self-study. Lab solutions and the `_oplossing.pkt` Packet Tracer files stay on
Brightspace, because that is assessed work.

**The QR pages** (`QROrion.html`) call the Brightspace API for the dropbox submission and cannot
work from Pages. They stay on Brightspace.

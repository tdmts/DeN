/* ============================================================
   Adds the navigation row above the <h1> of a theory page or an
   assignment page: "Terug naar ..." on the left, the module menu in the
   middle and "Volgende: ..." on the right. The row is sticky, so it is
   the only one. Self-running -- just include the script, no init call:

     <script src="../../../back-link.js"></script>

   This file started as a copy of the same file in tdmts/Microcontrollers
   and was cut down for DeN. The differences are deliberate and worth
   knowing before you merge anything back:

     - A module is a NAMED folder under Labo/ or Theorie/ (Labo/RS485),
       not a numbered LaboN/. DeN modules are independent and groups
       rotate through them, so a number would suggest an order that does
       not exist.
     - There is no exercises.js and no XP. A DeN module has one large
       assignment instead of a numbered list of small ones, so there is
       no "Oefeningen" tab, no done-flag and no dashboard.
     - The theory folder is Theorie/, not Reference/. The hub inside it
       is still reference.html, and the manifest is still reference.js
       under window.LAB_REFERENCE, so the two engines stay mergeable.
     - The module hub is overview.html.

   EEN ORION-TOPIC IS DE GRENS
   ---------------------------
   Every page of this site is read inside an iframe on Orion, and Orion
   has a menu of its own beside it. A lab has one entry there per part:
   Inleiding (overview.html), Theorie (Theorie/reference.html), Opdracht
   (Opdracht.html), plus the dropbox the student hands his verslag in to.
   ManagedSwitch has two opdrachten, so it has two of each.

   That menu does not move when the iframe does. Navigating downward
   inside a topic is therefore fine, and the menu is merely coarser than
   where you are: click a theory page and Orion says "Theorie" while you
   read Wat is RS485. Navigating sideways to another topic is not fine.
   The menu then says "Inleiding" while the opdracht is on screen, and
   the one list the student can orient himself by is telling him
   something untrue.

   So: this row never leaves its topic. A reeks of reference.js is one
   topic, and everything the row offers (back, the menu, volgende) stays
   inside it. Crossing over is done with target="_blank" from a link in
   the text, which opens a second window and leaves the iframe, and
   therefore the Orion menu, exactly where it was.

   TARGET (TERUG)
   --------------
   The root of the topic: the page the Orion menu entry points at. For a
   page under Theorie/ that is that folder's reference.html, read off the
   path so it survives a missing manifest. For any other reeks it is the
   first entry of that reeks, which for the Packet Tracer exercises of
   ManagedSwitch is PacketTracer/Opdracht.html.

   A page that IS that root gets no back link, and neither does a page in
   no reeks at all. Both used to point at overview.html, which is exactly
   the sideways jump described above. With no menu and no forward link
   left either, those pages get no row at all, the way overview.html
   never had one.

   "TERUG NAAR WAAR JE VANDAAN KWAM"
   ---------------------------------
   If the student arrived by clicking a link on another page of this same
   topic (document.referrer, same origin, a different .html page, and in
   this reeks or its root), the link points back to THAT page instead.
   Anything else (a bookmark, a direct visit, a page from another topic
   opened in a new tab) falls back to the root.

   When the referrer happens to be the root anyway, the specific label is
   kept instead of the neutral "Terug naar vorige pagina".

   TARGET (VOLGENDE)
   -----------------
   The next entry WITHIN THE SAME CATEGORY of reference.js, in array
   order. A category is a sequence of its own and they are not chained
   together: the theory of Labo ManagedSwitch and its Packet Tracer
   exercises are different kinds of work, so the last theory page does
   not page into the first exercise. On the last entry of a category the
   link points at the hub rather than leaving a dead end, unless the back
   link already points there, in which case it is dropped instead of
   shown twice. Datasheets are skipped: a PDF carries no nav of its own.

   A page gets a forward link when reference.js lists it, whatever folder
   it sits in. The manifest decides, not the path: Labo ManagedSwitch has
   its Packet Tracer exercises in PacketTracer/ rather than Theorie/, and
   they are part of the same reading order. A page it does not list, such
   as the landing page ProCurve/Opdracht.html, simply has no forward link
   and no read-flag, which is what a landing page wants.

   On the last entry of a reeks the forward link goes to the root of the
   topic, the same page the back link points at everywhere else in it.
   The root itself has no forward link when it is also the last, which
   would be a link to the page you are on.

   Pages are matched on their resolved path, not on their filename. A
   module may hold two pages with the same name (ProCurve/Opdracht.html
   and PacketTracer/Opdracht.html), and on filenames the one would answer
   to the other's manifest entry.

   This means a page in the chain must load reference.js. Without it the
   page renders perfectly and only the forward link disappears, which is
   exactly the kind of silent failure the content check asserts against.

   HET LABOMENU
   ------------
   The sticky row carries the module's menu in the middle: a button
   ("Theorie 3 / 7", "Packet Tracer 5 / 9") opening a panel with the
   topics of this module, each with a tick for the ones already read. It
   exists because these pages are read inside an iframe on Orion, where
   clicking a topic replaces the only list the student had.
   orion-embed.css gives that iframe a fixed height, so the page scrolls
   inside it and a sticky bar stays put at the top of the Orion content
   pane.

   The panel lists the reeks this page is in, and nothing else. The
   button names that reeks and counts within it, so a Packet Tracer
   exercise never reports itself as a theory page. A reeks holding one
   page is named and not numbered ("Zelftest", not "Zelftest 1 / 1").

   It used to carry a tab per reeks. That was right while a whole module
   was one entry in Orion, because the tab strip was then the only way to
   reach the other list; now every reeks is an entry there and a tab is a
   jump out of this topic. Microcontrollers builds its two sections from
   two manifests, so this reads differently there.

   A page in no reeks gets no menu. The only list it could show belongs
   to another topic, and an empty panel reads as a fault rather than as
   "you are not in a sequence".

   GELEZEN
   -------
   A theory page has nothing to finish, so the only honest thing to
   record is that it was opened. This file writes that flag --
   msDashboard:{labId}:theory:{topicId} -- as soon as it recognises the
   page in reference.js, and reads it back for the menu and the hub. It
   is the one write this script does; everything else here only reads.
   Every read is wrapped in a try: a browser that blocks storage for an
   embedded third-party frame throws on the first one, and losing the
   ticks beats losing the whole nav row.

   Skips itself on overview.html (and any page without a .container/<h1>),
   and builds no row on a page with nothing to put in one.
   ============================================================ */

(function () {
    'use strict';

    // reference.js is a separate <script> tag at the end of body, and pages
    // load the two in either order, so the global may not exist yet at the
    // moment this file runs. DOMContentLoaded fires only after every
    // parser-inserted script has executed, so by then both the DOM and the
    // manifest are there, whatever the order in the page.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    function run() {
        var parts = window.location.pathname.split('/').filter(Boolean);
        var currentFile = (parts[parts.length - 1] || '').toLowerCase();
        // overview.html is the module hub: it already lists everything, so a
        // nav row above it would only point at itself.
        if (currentFile === 'overview.html') return;

        var container = document.querySelector('.container');
        var heading = container && container.querySelector('h1');
        if (!heading) return;

        // A module is a folder directly under Labo/ (Labo/RS485) or under
        // Theorie/ (Theorie/Hoorcollege1). Unlike Microcontrollers, the folder
        // is named after its subject rather than numbered, because the modules
        // are independent and groups rotate through them.
        var moduleIndex = -1;
        var trackIndex = parts.findIndex(function (p) { return /^(labo|theorie)$/i.test(p); });
        if (trackIndex !== -1 && parts.length > trackIndex + 1) {
            moduleIndex = trackIndex + 1;
        }
        var labId = moduleIndex !== -1 ? parts[moduleIndex].toLowerCase() : null;

        // The theory folder inside a module. Every manifest href resolves
        // against that folder and not against the page doing the linking:
        // a theory topic is a bare filename sitting next to reference.html, and
        // a page elsewhere in the module is written relative to it as well
        // (../PacketTracer/VlanBasic.html). Opdracht.html sits a level away and
        // would resolve every one of them wrong.
        var moduleBase = null, referenceBase = null;
        if (moduleIndex !== -1) {
            var upToModule = new Array(Math.max(parts.length - moduleIndex - 2, 0) + 1).join('../');
            // "" would resolve to the page itself rather than to its folder.
            moduleBase = new URL(upToModule || './', window.location.href);
            referenceBase = new URL('Theorie/', moduleBase);
        }

        var referenceIndex = parts.findIndex(function (p) { return /^theorie$/i.test(p); });
        // Theorie/ is also the name of the top-level track, so a page at
        // Theorie/Hoorcollege1/X.html would match the track segment rather than
        // the folder holding it. Only a Theorie segment *after* the module
        // counts as the theory folder.
        if (referenceIndex !== -1 && referenceIndex <= moduleIndex) {
            referenceIndex = parts.findIndex(function (p, i) {
                return i > moduleIndex && /^theorie$/i.test(p);
            });
        }

        // The back link is derived from the reeks this page belongs to, and
        // only the manifest knows that, so it is built further down, right
        // after the reeks is resolved. See TARGET (TERUG) in the header.

        function referrerIfUsable() {
            if (!document.referrer) return null;
            var url;
            try {
                url = new URL(document.referrer);
            } catch (e) {
                return null;
            }
            if (url.origin !== window.location.origin) return null;
            if (!/\.html?$/i.test(url.pathname)) return null;
            if (url.pathname === window.location.pathname) return null;
            return url;
        }

        /* --------------------------------------------- reeks of this page */

        // "Which manifest entry is this page?" is answered on the resolved
        // path, not on the filename. Comparing basenames was enough while every
        // manifest href was a bare filename next to reference.html, and it is
        // wrong the moment two pages in one module share a name: Labo
        // ManagedSwitch has ProCurve/Opdracht.html and PacketTracer/Opdracht.html,
        // and on basenames the first one answers to the second one's entry. It
        // would then offer the wrong "volgende" and tick the wrong topic off.
        // Case-insensitive because a local preview on Windows or macOS can
        // reach the same file through a different capitalisation; on Pages it
        // cannot, and rule 1 of the check keeps the links honest anyway.
        function samePage(href) {
            try {
                return new URL(href, window.location.href).pathname.toLowerCase() ===
                    window.location.pathname.toLowerCase();
            } catch (e) {
                return false;
            }
        }

        // Same list as reference-dashboard.js: a reference topic may point at a
        // datasheet instead of a page. Extend both together.
        var DOCUMENT_RE = /\.(pdf|zip|docx?|pptx?|xlsx?)(?:[?#]|$)/i;

        function slug(naam) {
            return String(naam).toLowerCase().replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '') || 'reeks';
        }

        // The reading order comes from the manifest's "reeks", not from the
        // categories one by one. Categories sharing a reeks are one chain; a
        // different reeks is a different chain and "volgende" does not cross
        // over. reference.js explains which lab groups what, and why.
        //
        // The two ends of that: the Zelftest of RS485 shares the theory's reeks,
        // because it is the last step of the theory and a student who never
        // pages into it will not find it. The Packet Tracer exercises of
        // ManagedSwitch have their own, because paging out of the last theory
        // page into an exercise, under a counter reading "Theorie 8 / 16",
        // claims a continuity that is not there.
        //
        // The name shown is the FIRST category of the reeks, which is what puts
        // "Theorie 7 / 7" and not "Zelftest 1 / 1" on the zelftest.
        //
        // A category with no reeks forms one on its own, so a manifest that
        // never heard of the field still works. The tab strip renderPanel() has
        // been carrying all along, unused since exercises.js was dropped, is
        // one tab per reeks.
        function referenceGroups() {
            var data = window.LAB_REFERENCE && window.LAB_REFERENCE[labId];
            if (!data || !Array.isArray(data.categories) || !referenceBase) return null;
            var groups = [];
            var byKey = {};
            data.categories.forEach(function (category) {
                var items = [];
                (category.topics || []).forEach(function (topic) {
                    // Datasheets are left out of the chain, and out of the menu
                    // with it. A PDF cannot carry this script, so it would be a
                    // dead end, and the hub opens documents in a new tab on
                    // purpose because a PDF inside the narrow Orion iframe is
                    // unreadable -- a same-tab link would undo exactly that.
                    if (DOCUMENT_RE.test(String(topic.href))) return;
                    items.push({ id: topic.id, name: topic.name, href: new URL(topic.href, referenceBase).href });
                });
                // A category holding nothing but documents (Datasheets,
                // Handleidingen) would otherwise become an empty tab.
                if (!items.length) return;
                var key = slug(category.reeks || category.name);
                if (byKey[key]) {
                    byKey[key].items = byKey[key].items.concat(items);
                } else {
                    byKey[key] = { name: category.name, key: key, items: items };
                    groups.push(byKey[key]);
                }
            });
            return groups.length ? groups : null;
        }

        var groups = null;
        var group = null;
        var chain = null;
        var manifestName = null;
        // reference.html and overview.html are the hubs: they already show
        // every card, so there is no single "next" for them. (overview.html
        // returned at the top of run(); reference.html is excluded here.)
        // The manifest decides whether a page is part of the reading sequence,
        // not the folder it sits in. That used to be the same question: every
        // page in the chain lived in Theorie/, so testing the path was a cheap
        // proxy. Labo ManagedSwitch broke that. Its Packet Tracer exercises are
        // listed in reference.js but live in PacketTracer/, and while the path
        // was the test they got no forward link *and* no read-flag, because
        // markVisited() below hangs off this same chain. Both failures were
        // invisible: the page rendered fine and one link was missing.
        //
        // A page that is not in the manifest simply comes out with index === -1
        // below, which is the same "no forward link" it had before.
        if (labId && currentFile !== 'reference.html') {
            manifestName = 'reference.js';
            groups = referenceGroups();
        }

        var forwardHref = null;
        var forwardLabel = null;
        // Hoisted: the menu below labels its button with this position
        // ("Packet Tracer 3 / 9"), which is the same lookup.
        var index = -1;

        if (groups) {
            for (var g = 0; g < groups.length && index === -1; g++) {
                for (var i = 0; i < groups[g].items.length; i++) {
                    if (samePage(groups[g].items[i].href)) {
                        group = groups[g];
                        chain = group.items;
                        index = i;
                        break;
                    }
                }
            }
        }

        /* ---------------------------------------------------- terug-link */

        // The root of this Orion topic: the page its menu entry points at, and
        // the top of everything below it. For the theory that is reference.html;
        // for any other reeks it is the first entry of that reeks, which for
        // ManagedSwitch is PacketTracer/Opdracht.html. A page that IS the root
        // gets no back link, the way overview.html never had one. There is
        // nothing above an Orion topic that this site may send you to: the way
        // out is the Orion menu itself, and a link that goes there anyway
        // leaves that menu pointing at an entry the student is not reading.
        var rootHref = null;
        var rootName = null;
        var backLabel = null;

        if (referenceIndex !== -1 && currentFile !== 'reference.html') {
            // referenceIndex points at the Theorie/ segment itself, since
            // reference.html (the hub) lives directly inside that folder. This
            // branch asks the path and not the manifest, so a theory page whose
            // reference.js failed to load still finds its way back.
            var depth = parts.length - referenceIndex - 2;
            var prefix = new Array(Math.max(depth, 0) + 1).join('../');
            rootHref = new URL(prefix + 'reference.html', window.location.href).href;
            rootName = 'het overzicht';
            backLabel = '← Terug naar de theorie';
        } else if (chain && chain.length) {
            rootHref = chain[0].href;
            rootName = chain[0].name;
            backLabel = '← Terug naar ' + rootName;
        }

        // Absolute URL of the default target, so we can compare it to the
        // referrer below. It doubles as the end-of-sequence forward target.
        var defaultHref = rootHref && !samePage(rootHref) ? new URL(rootHref) : null;
        var backHref = defaultHref ? defaultHref.href : null;
        if (!backHref) backLabel = null;

        // Prefer "back to where you came from" when we can trust the referrer:
        // same origin, an actual .html page, not the page we are already on,
        // and inside this topic. That last condition is what keeps the row
        // honest. A student who opens the theory from the opdracht does so in
        // a new tab, because the pages link across topics with target="_blank",
        // so a referrer from another topic means two windows that disagree
        // about where he is, and following it would move the wrong one.
        var ref = backHref ? referrerIfUsable() : null;
        if (ref && inThisTopic(ref)) {
            if (ref.pathname === defaultHref.pathname) {
                // Came from the default target anyway -> keep its nicer label,
                // but honour the exact referrer URL (preserves any anchor).
                backHref = ref.href;
            } else {
                backHref = ref.href;
                backLabel = '← Terug naar vorige pagina';
            }
        }

        // Inside the topic: the root itself, or a page of this same reeks.
        function inThisTopic(url) {
            if (defaultHref && url.pathname === defaultHref.pathname) return true;
            if (!chain) return false;
            for (var t = 0; t < chain.length; t++) {
                if (new URL(chain[t].href).pathname === url.pathname) return true;
            }
            return false;
        }

        /* -------------------------------------------------- forward link */

        if (groups) {
            if (index === -1) {
                // An Opdracht.html is a landing page and may legitimately stay
                // out of the manifest: RS485 has one, and so does the ProCurve
                // half of ManagedSwitch, because nothing follows them. Warning
                // there would train you to ignore the warning. Every other page
                // in a module is meant to be in the chain, so say so.
                if (currentFile !== 'opdracht.html') {
                    console.warn('back-link.js: no entry for ' + labId + ' in ' + manifestName +
                        ' matches this page ("' + currentFile + '"), so there is no forward link.');
                }
            } else if (index === chain.length - 1) {
                // Last one: name the destination and nothing else. A sentence
                // ("dit was de laatste oefening, ...") is longer than the link
                // next to it and says what the student can already see. It
                // lands on the root of this topic, never on overview.html,
                // which is a topic of its own.
                forwardHref = defaultHref ? defaultHref.href : null;
                forwardLabel = forwardHref ? 'Terug naar ' + rootName + ' →' : null;
            } else {
                forwardHref = chain[index + 1].href;
                forwardLabel = 'Volgende: ' + chain[index + 1].name + ' →';
            }
            // Both links landing on the same page reads as a mistake rather than
            // as a choice. Happens only on the last item of a chain, and only
            // without a usable referrer (a bookmark, a direct link), because
            // arriving via "Volgende" makes the back link point at the previous
            // item instead. Dropping the forward one leaves no dead end: the way
            // out is the link on the left, pointing exactly where this one did.
            if (forwardHref === backHref) {
                forwardHref = null;
                forwardLabel = null;
            }
        } else if (manifestName) {
            console.warn('back-link.js: this page needs ' + manifestName +
                ' loaded (with a ' + labId + ' block in it) to show a forward link.');
        }

        /* ------------------------------------------ voortgang (storage) */

        // The same key reference-dashboard.js reads, so a topic opened from the
        // hub shows up there as a tick without any extra state. The prefix is
        // kept identical to Microcontrollers so the two engines can be merged
        // back together later without a storage migration.
        var STORAGE_PREFIX = 'msDashboard:';

        // A theory page is "gelezen" once it has been opened -- see GELEZEN in
        // the header. The "theory:" segment is what this repo actually uses;
        // there is no exercise flag in DeN, since a module has one large
        // assignment rather than a list of small ones.
        function theoryKey(topicId) {
            return STORAGE_PREFIX + labId + ':theory:' + topicId;
        }

        function isVisited(topicId) {
            try {
                return window.localStorage.getItem(theoryKey(topicId)) === '1';
            } catch (e) {
                return false;
            }
        }

        function markVisited(topicId) {
            try {
                window.localStorage.setItem(theoryKey(topicId), '1');
            } catch (e) {
                // Blocked storage, or a full quota. Same reasoning as isDone:
                // the nav row matters more than the tick, and this runs before
                // the row is built.
            }
        }

        // Record this visit. "chain" and "index" were resolved above for the
        // forward link, and manifestName is reference.js on exactly the pages
        // that qualify: a theory topic listed in its own lab's manifest.
        // reference.html is excluded from the chain, so the hub never marks
        // itself, and a datasheet is not in there either.
        if (manifestName === 'reference.js' && chain && index !== -1) {
            markVisited(chain[index].id);
        }

        /* -------------------------------------------------- lab menu */

        // The menu lists this reeks, and a reeks is one Orion topic. A page
        // that is in no reeks has no list of its own to show: the hubs
        // (overview.html, reference.html) already show every card, and a
        // landing page such as RS485/Opdracht.html could only offer the
        // theory, which has an entry in the Orion menu of its own. Both get no
        // menu, and with no back link and no forward link either that leaves
        // them without a row at all, which is what a topic root wants.
        var showMenu = !!group;

        var panelEl = null;
        var buttonEl = null;

        // One section, and it is the reeks this page sits in. The panel used
        // to carry a tab per reeks, which was right while a whole module was
        // one entry in Orion: the tab strip was then the only way to reach the
        // other list. Now every reeks has an entry of its own there, and a tab
        // to another one is a jump out of this topic behind the student's back.
        // Microcontrollers still builds two sections from two manifests, which
        // is why this reads differently there.
        function section() {
            return {
                items: group.items,
                isMarked: isVisited,
                markTitle: 'Gelezen',
                // The way out of the panel is the root of this topic, the same
                // page the back link points at, and never overview.html.
                hubHref: rootHref && !samePage(rootHref) ? rootHref : null,
                hubLabel: 'Naar ' + rootName + ' →'
            };
        }

        // reference.js is not fetched afterwards any more. It is a
        // parser-inserted <script> in the page, so it is there by the time
        // DOMContentLoaded fires; when it is missing, this page has no reeks,
        // and a menu is exactly what it must not get. Rule 3 of
        // check-content.py asserts the include and run() warns above when it
        // is gone, which beats a panel that fills itself in half a second late.

        function menuLabel() {
            // "Zelftest 1 / 1" is a counter that counts nothing, so a reeks
            // with a single page is named and not numbered.
            return chain.length > 1
                ? group.name + ' ' + (index + 1) + ' / ' + chain.length
                : group.name;
        }

        function renderPanel() {
            while (panelEl.firstChild) panelEl.removeChild(panelEl.firstChild);

            var active = section();

            var list = document.createElement('ul');
            list.className = 'ms-lab-list';
            active.items.forEach(function (item, position) {
                var isCurrent = samePage(item.href);
                var li = document.createElement('li');
                if (isCurrent) li.className = 'ms-lab-current';

                var link = document.createElement('a');
                link.href = item.href;
                if (isCurrent) link.setAttribute('aria-current', 'page');

                var marked = active.isMarked(item.id);
                var mark = document.createElement('span');
                mark.className = 'ms-lab-mark ' +
                    (marked ? 'ms-lab-mark--done' : 'ms-lab-mark--todo');
                mark.textContent = marked ? '✓' : '○';
                // The tick is decoration next to a label that already reads
                // as a link; the state itself is announced on the text.
                mark.setAttribute('aria-hidden', 'true');

                var text = document.createElement('span');
                text.textContent = (position + 1) + '. ' + item.name;
                if (marked) text.title = active.markTitle;

                link.appendChild(mark);
                link.appendChild(text);
                li.appendChild(link);
                list.appendChild(li);
            });
            panelEl.appendChild(list);

            if (active.hubHref) {
                var hub = document.createElement('a');
                hub.className = 'ms-lab-hub';
                hub.href = active.hubHref;
                hub.textContent = active.hubLabel;
                panelEl.appendChild(hub);
            }
        }

        // The panel is centred under the button in CSS. That is already inside
        // the text column on any sane width, but the panel is wider than the
        // button, so on a squeezed pane it can still reach past one edge.
        // Measured rather than guessed: shifted by exactly the overshoot, and
        // never past the opposite edge.
        var CENTRE = 'translateX(-50%)';

        function positionPanel() {
            panelEl.style.transform = CENTRE;
            var panel = panelEl.getBoundingClientRect();
            var limits = container.getBoundingClientRect();
            var shift = 0;
            if (panel.right > limits.right) shift = limits.right - panel.right;
            if (panel.left + shift < limits.left) shift = limits.left - panel.left;
            if (shift) {
                panelEl.style.transform = CENTRE + ' translateX(' + Math.round(shift) + 'px)';
            }
        }

        function openPanel() {
            renderPanel();
            panelEl.hidden = false;
            positionPanel();
            buttonEl.setAttribute('aria-expanded', 'true');
        }

        function closePanel() {
            panelEl.hidden = true;
            buttonEl.setAttribute('aria-expanded', 'false');
        }

        function buildMenu(row) {
            buttonEl = document.createElement('button');
            buttonEl.type = 'button';
            buttonEl.className = 'ms-lab-menu-btn';
            buttonEl.id = 'ms-lab-menu-btn';
            buttonEl.setAttribute('aria-haspopup', 'true');
            buttonEl.setAttribute('aria-expanded', 'false');
            buttonEl.setAttribute('aria-controls', 'ms-lab-panel');
            buttonEl.appendChild(document.createTextNode(menuLabel()));
            var caret = document.createElement('span');
            caret.className = 'ms-lab-caret';
            caret.setAttribute('aria-hidden', 'true');
            caret.textContent = '▾';
            buttonEl.appendChild(caret);

            panelEl = document.createElement('div');
            panelEl.className = 'ms-lab-panel';
            panelEl.id = 'ms-lab-panel';
            panelEl.hidden = true;
            panelEl.setAttribute('aria-labelledby', 'ms-lab-menu-btn');

            buttonEl.addEventListener('click', function (event) {
                event.stopPropagation();
                if (panelEl.hidden) { openPanel(); } else { closePanel(); }
            });
            // Clicking a link inside the panel navigates, so only a click that
            // lands outside it has to close anything.
            panelEl.addEventListener('click', function (event) { event.stopPropagation(); });
            document.addEventListener('click', function () {
                if (panelEl && !panelEl.hidden) closePanel();
            });
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape' && panelEl && !panelEl.hidden) {
                    closePanel();
                    buttonEl.focus();
                }
            });
            window.addEventListener('resize', function () {
                if (panelEl && !panelEl.hidden) positionPanel();
            });

            // The panel hangs off the button rather than off the row, so it
            // reads as belonging to it. The button sits on the left half of the
            // row (the forward link takes the free space), so aligning the
            // panel's left edge to it cannot push it past the right margin.
            var menu = document.createElement('span');
            menu.className = 'ms-lab-menu';
            menu.appendChild(buttonEl);
            menu.appendChild(panelEl);
            row.appendChild(menu);
        }

        /* -------------------------------------------------- rendering */

        var style = document.createElement('style');
        style.textContent =
            '.ms-back-link{display:inline-flex;align-items:center;gap:0.4rem;' +
            'color:#4f46e5;font-weight:600;font-size:0.9rem;text-decoration:none;}' +
            '.ms-back-link:hover{text-decoration:underline;}' +
            // Sticky against the top of the iframe: orion-embed.css gives the
            // frame a fixed height, so this is the top of the Orion content
            // pane. The background is opaque because content scrolls under it.
            //
            // Three grid columns, because the menu has to sit dead centre
            // whatever stands beside it: the two outer columns are always the
            // same width, so the middle one is centred even when the last
            // exercise of a lab has no "Volgende" link to fill column three.
            // minmax(0,1fr) lets a long label wrap inside its own column
            // instead of pushing the menu off centre.
            '.ms-page-nav{position:sticky;top:0;z-index:60;margin-bottom:0.75rem;' +
            'display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);' +
            'align-items:center;gap:0.75rem;background:var(--bs-body-bg,#fff);' +
            'padding:0.5rem 0;border-bottom:1px solid rgba(0,0,0,.08);}' +
            '.ms-page-nav--forward{justify-self:end;text-align:right;}' +
            '.ms-lab-menu{justify-self:center;}' +
            '.ms-lab-menu-btn{display:inline-flex;align-items:center;gap:0.35rem;' +
            'border:1px solid rgba(0,0,0,.18);background:var(--bs-body-bg,#fff);' +
            'color:inherit;border-radius:999px;padding:0.25rem 0.8rem;font:inherit;' +
            'font-size:0.85rem;font-weight:600;line-height:1.5;cursor:pointer;}' +
            '.ms-lab-menu-btn:hover,.ms-lab-menu-btn[aria-expanded="true"]' +
            '{border-color:#4f46e5;color:#4f46e5;}' +
            '.ms-lab-caret{font-size:0.7em;}' +
            '.ms-lab-menu{position:relative;display:inline-flex;}' +
            // Centred under the button, and capped against the viewport as well
            // as in rem so it stays inside the pane when Orion is squeezed into
            // a narrow column.
            '.ms-lab-panel{position:absolute;top:100%;left:50%;' +
            'transform:translateX(-50%);z-index:70;' +
            'width:min(28rem,88vw);margin-top:0.4rem;padding:0.5rem;' +
            'max-height:65vh;overflow-y:auto;background:var(--bs-body-bg,#fff);' +
            'border:1px solid rgba(0,0,0,.12);border-radius:0.6rem;' +
            'box-shadow:0 12px 32px rgba(0,0,0,.18);text-align:left;}' +
            '.ms-lab-panel[hidden]{display:none;}' +
            '.ms-lab-list{list-style:none;margin:0;padding:0;}' +
            '.ms-lab-list a{display:flex;align-items:baseline;gap:0.5rem;' +
            'padding:0.3rem 0.5rem;border-radius:0.4rem;color:inherit;' +
            'text-decoration:none;font-size:0.85rem;line-height:1.35;}' +
            '.ms-lab-list a:hover{background:rgba(79,70,229,.09);color:#4f46e5;}' +
            '.ms-lab-current a{background:rgba(79,70,229,.14);color:#4f46e5;font-weight:600;}' +
            '.ms-lab-mark{flex:0 0 1rem;text-align:center;font-size:0.8rem;}' +
            '.ms-lab-mark--done{color:#16a34a;}' +
            '.ms-lab-mark--todo{color:rgba(0,0,0,.3);}' +
            '.ms-lab-hub{display:block;margin-top:0.35rem;padding:0.45rem 0.5rem;' +
            'border-top:1px solid rgba(0,0,0,.08);font-size:0.82rem;font-weight:600;' +
            'color:#4f46e5;text-decoration:none;}' +
            '.ms-lab-hub:hover{text-decoration:underline;}' +
            // On paper the bar is a page element like any other, and a panel
            // that is closed anyway would only leave a gap.
            '@media print{.ms-page-nav{position:static;border-bottom:0;}' +
            '.ms-lab-menu-btn,.ms-lab-panel{display:none;}}' +
            // A jump to #indienen would otherwise put that heading exactly
            // under the bar.
            'h1[id],h2[id],h3[id],h4[id]{scroll-margin-top:3.75rem;}';

        document.head.appendChild(style);

        function makeLink(href, label, extraClass) {
            var a = document.createElement('a');
            a.className = 'ms-back-link' + (extraClass ? ' ' + extraClass : '');
            a.href = href;
            a.textContent = label;
            return a;
        }

        // One row, at the top, and it stays in view: there is no second copy
        // at the end of the page. A page that ends without an exit was the
        // reason for the bottom one, and a bar that never scrolls away answers
        // that better than a duplicate does. The row is built even when it
        // holds nothing but the back link (a TestJezelf page), because that is
        // precisely the page that used to need the bottom copy.
        //
        // A row with nothing in it is not built at all. That is not a
        // degenerate case but the normal state of a topic root: reference.html
        // and a landing Opdracht.html have nothing above them, nothing after
        // them and no list to offer, exactly like overview.html.
        function buildNav() {
            if (!backHref && !showMenu && !forwardHref) return null;
            var row = document.createElement('nav');
            row.className = 'ms-page-nav';
            row.setAttribute('aria-label', 'Navigatie');
            if (backHref) {
                row.appendChild(makeLink(backHref, backLabel));
            } else {
                // The row is a three-column grid so the menu sits dead centre
                // whatever stands beside it. With the first column left out
                // entirely the menu slides into it, so it is filled with an
                // empty span instead. Happens on the root of a reeks that has
                // pages after it: PacketTracer/Opdracht.html.
                row.appendChild(document.createElement('span'));
            }
            if (showMenu) buildMenu(row);
            if (forwardHref) {
                var forward = makeLink(forwardHref, forwardLabel, 'ms-page-nav--forward');
                forward.rel = 'next';
                row.appendChild(forward);
            }
            return row;
        }

        var nav = buildNav();
        if (nav) heading.parentNode.insertBefore(nav, heading);
    }
})();

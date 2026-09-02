#!/usr/bin/env node
/*
 * check-nav.js -- load every page in a browser and read its navigation row.
 *
 * back-link.js decides three things per page: where "terug" points, whether
 * there is a "volgende", and which read-flag gets written. All three are
 * derived from the URL and from reference.js, and all three fail SILENTLY when
 * they are wrong: the page renders perfectly and a link is simply absent, or
 * points somewhere plausible but wrong. scripts/check-content.py cannot see any
 * of it, because none of it exists until the script has run.
 *
 * Three real problems got in that way, all while moving pages around for Labo
 * ManagedSwitch, and all three are asserted here now:
 *
 *   1. The chain was built only for pages with a "Theorie" segment in their
 *      path, so the eight pages in PacketTracer/ had no forward link and no
 *      read-flag at all.
 *   2. Pages were matched to their manifest entry on FILENAME, so with two
 *      Opdracht.html in one module, ProCurve/Opdracht.html answered to the
 *      entry of PacketTracer/Opdracht.html: wrong "volgende", wrong flag.
 *   3. Every category was one long chain, so the last theory page paged into
 *      the first Packet Tracer exercise and the button counted straight
 *      through: "Theorie 12 / 16" on an exercise. The manifest's "reeks" now
 *      says which categories are one reading order, and both the counter and
 *      the end of the chain follow it. Getting that wrong in the other
 *      direction is just as bad: with every category on its own, the zelftest
 *      of RS485 fell out of the theory chain and a student had to know it was
 *      there. Both directions are asserted.
 *
 * Since then a fourth rule joined them, and it is the one this file now checks
 * hardest: THE ROW NEVER LEAVES ITS ORION TOPIC. Each part of a lab is its own
 * entry in the Orion menu (Inleiding, Theorie, Opdracht, and the dropbox), and
 * that menu does not move when the iframe does. A link from the row to another
 * topic therefore leaves the menu naming a page the student is not reading. So
 * every back link, and the forward link at the end of a reeks, must point at
 * the root of the current topic: reference.html for the theory, the first entry
 * of the reeks for anything else. Never at overview.html, which is a topic of
 * its own. A page that IS that root gets no row at all.
 *
 * Reasoning about this from the source is what produced the first one. Read it
 * off the DOM instead.
 *
 *     node scripts/check-nav.js
 *     node scripts/check-nav.js --quiet     only the failures
 *
 * NOT part of the content check and NOT in the Stop hook, on purpose: it needs
 * jsdom, and this repo has no package manager. Install it when you want to run
 * it, which is whenever you move a page between folders, rename one, or touch
 * back-link.js or reference.js:
 *
 *     npm install jsdom
 *
 * node_modules/ is gitignored. Nothing else in the repo depends on it.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
// The real thing, not a file:// URL: back-link.js splits location.pathname on
// "/" to find the module, and a Windows file path would not survive that.
const BASE = 'https://tdmts.github.io/DeN/';
const QUIET = process.argv.includes('--quiet');

let JSDOM;
try {
    ({ JSDOM } = require('jsdom'));
} catch (e) {
    console.error('check-nav: jsdom ontbreekt. Installeer het met:\n\n    npm install jsdom\n');
    process.exit(2);
}

/* ------------------------------------------------------------------ pages */

function htmlPages(dir, out = []) {
    for (const naam of fs.readdirSync(dir).sort()) {
        const p = path.join(dir, naam);
        if (fs.statSync(p).isDirectory()) {
            if (!['.git', 'node_modules', '_incoming', '_export'].includes(naam)) htmlPages(p, out);
        } else if (naam.endsWith('.html')) {
            out.push(p);
        }
    }
    return out;
}

const rel = p => path.relative(REPO, p).split(path.sep).join('/');

// The engines, read once and evaluated per page. The pages load them through
// <script src>, which jsdom does not fetch, so we run them ourselves in the
// order the page lists them.
const ENGINES = {};
for (const naam of ['reference.js', 'back-link.js', 'reference-dashboard.js']) {
    ENGINES[naam] = fs.readFileSync(path.join(REPO, naam), 'utf8');
}

/* --------------------------------------------------- what should be there */

// reference.js on its own, so the expectation comes from the manifest and not
// from the same code path we are testing.
function manifest() {
    const sandbox = { window: {} };
    new Function('window', ENGINES['reference.js']).call(sandbox, sandbox.window);
    return sandbox.window.LAB_REFERENCE || {};
}

// Same rule as back-link.js and reference-dashboard.js: a topic may point at a
// document, and a document carries no nav of its own, so it is not in the chain.
const DOCUMENT_RE = /\.(pdf|zip|docx?|pptx?|xlsx?)(?:[?#]|$)/i;

// The sequences, grouped by the manifest's "reeks" exactly as back-link.js
// does: categories sharing one are a single reading order, and the name shown
// is that of the first category in it. Built here straight from reference.js,
// so the expectation never comes from the code under test.
function groepen(LAB_REFERENCE) {
    const out = {};
    for (const [labId, data] of Object.entries(LAB_REFERENCE)) {
        const lijst = [];
        const perSleutel = {};
        for (const category of data.categories || []) {
            const items = (category.topics || [])
                .filter(t => !DOCUMENT_RE.test(String(t.href)))
                .map(t => ({ id: t.id, href: t.href }));
            if (!items.length) continue;
            const sleutel = category.reeks || category.name;
            if (perSleutel[sleutel]) {
                perSleutel[sleutel].items.push(...items);
            } else {
                perSleutel[sleutel] = { naam: category.name, items };
                lijst.push(perSleutel[sleutel]);
            }
        }
        out[labId] = lijst;
    }
    return out;
}

/* ------------------------------------------------------------- measuring */

async function measure(bestand) {
    const pagina = rel(bestand);
    const warns = [];
    const dom = new JSDOM(fs.readFileSync(bestand, 'utf8'), {
        url: BASE + pagina,
        runScripts: 'outside-only',
        beforeParse(window) {
            window.console.warn = (...a) => warns.push(a.join(' '));
        },
    });
    const { window } = dom;

    // back-link.js hangs itself on DOMContentLoaded when readyState is still
    // "loading". Measuring before that event would show an empty page and look
    // exactly like the bug this script exists to catch.
    await new Promise(res => {
        if (window.document.readyState === 'complete') return res();
        window.addEventListener('load', res);
    });

    for (const el of window.document.querySelectorAll('script[src]')) {
        const src = el.getAttribute('src');
        const naam = src.split('/').pop();
        if (!ENGINES[naam]) continue;
        // back-link.js derives MANIFEST_ROOT from document.currentScript.src,
        // so it has to look like it was loaded from where the page says it is.
        Object.defineProperty(window.document, 'currentScript', {
            value: { src: new window.URL(src, window.location.href).href },
            configurable: true,
        });
        window.eval(ENGINES[naam]);
    }

    const row = window.document.querySelector('nav.ms-page-nav');
    // Beide links dragen .ms-back-link (het is de opmaak, niet de rol), dus
    // zonder terug-link vindt querySelector anders de vooruit-link en meet dit
    // script een terug-link die er niet is.
    const back = row && row.querySelector('a.ms-back-link:not(.ms-page-nav--forward)');
    const forward = row && row.querySelector('a.ms-page-nav--forward');
    const button = row && row.querySelector('button.ms-lab-menu-btn');
    const pad = a => (a ? decodeURIComponent(new window.URL(a.href).pathname) : null);

    const flags = [];
    try {
        for (const k of Object.keys(window.localStorage)) {
            if (k.includes(':theory:')) flags.push(k.split(':').pop());
        }
    } catch (e) { /* geen opslag in deze omgeving */ }

    dom.window.close();
    return {
        pagina,
        row: !!row,
        back: pad(back),
        forward: pad(forward),
        label: button ? button.textContent.replace(/\s*▾\s*$/, '').trim() : null,
        flags,
        warns,
    };
}

/* ------------------------------------------------------------ assertions */

const fouten = [];
const fout = (pagina, tekst) => fouten.push({ pagina, tekst });

// labId -> mapnaam, gelezen van de schijf en niet uit een lijstje hier. Een
// lijstje zou bij elke nieuwe module stilzwijgend achterlopen, en dan wijst
// urlOf() naar "undefined": geen enkele pagina matcht nog en de melding is dat
// alles buiten reference.js staat. Dat is precies gebeurd bij Draadloos netwerk.
const MODULES = (() => {
    const out = {};
    for (const track of ['Labo', 'Theorie']) {
        const dir = path.join(REPO, track);
        if (!fs.existsSync(dir)) continue;
        for (const naam of fs.readdirSync(dir)) {
            if (fs.statSync(path.join(dir, naam)).isDirectory()) {
                out[naam.toLowerCase()] = `${track}/${naam}`;
            }
        }
    }
    return out;
})();

function urlOf(labId, href) {
    // Every manifest href resolves against the module's Theorie/ folder, hub or
    // not. Same rule as back-link.js; if that ever changes, it changes here too.
    const map = MODULES[labId];
    if (!map) {
        throw new Error(`check-nav: geen map gevonden voor module "${labId}" uit reference.js`);
    }
    const base = new URL(`${BASE}${map}/Theorie/`);
    return decodeURIComponent(new URL(href, base).pathname);
}

function moduleOf(pagina) {
    const parts = pagina.split('/');
    return parts.length > 2 && /^(Labo|Theorie)$/i.test(parts[0]) ? parts[1].toLowerCase() : null;
}

(async () => {
    const LAB_REFERENCE = manifest();
    const alleGroepen = groepen(LAB_REFERENCE);

    // Beide tracks, niet alleen Labo/. MODULES en moduleOf() kenden Theorie/ al,
    // maar hier werd alleen Labo/ doorlopen, en dan wordt elke syllabuspagina
    // gemeld als "door geen enkele pagina herkend" terwijl ze gewoon nooit
    // gemeten is. De melding wijst dan naar reference.js in plaats van hierheen.
    const paginas = ['Labo', 'Theorie']
        .map((track) => path.join(REPO, track))
        .filter((dir) => fs.existsSync(dir))
        .flatMap((dir) => htmlPages(dir));
    const metingen = [];
    for (const p of paginas) metingen.push(await measure(p));

    // Which page answers to which manifest entry. Two pages on one entry means
    // two hrefs in reference.js resolve to the same file, so one of them is a
    // typo: the second page would silently take over the first one's flag.
    // (The engine mixing two pages up, bug 2 above, surfaces one assertion
    // lower: the page that should not be in the chain turns up with a forward
    // link and a flag that are not its own.)
    const geclaimd = new Map();

    for (const m of metingen) {
        const labId = moduleOf(m.pagina);
        const bestand = m.pagina.split('/').pop().toLowerCase();
        const groepenVanModule = (labId && alleGroepen[labId]) || [];
        const pad = '/DeN/' + m.pagina;

        // In welke categorie staat deze pagina, en op welke plaats daarbinnen?
        let groep = null, index = -1;
        for (const g of groepenVanModule) {
            const i = g.items.findIndex(t => urlOf(labId, t.href) === pad);
            if (i !== -1) { groep = g; index = i; break; }
        }
        for (const w of m.warns) fout(m.pagina, 'console.warn: ' + w);

        // De twee hubs staan altijd bovenaan een Orion-topic, en boven een
        // topic zit niets: geen terug, geen menu, geen balk.
        if (bestand === 'overview.html' || bestand === 'reference.html') {
            if (m.row) fout(m.pagina, 'krijgt een navigatiebalk, maar staat bovenaan een Orion-topic');
            continue;
        }

        if (index === -1) {
            // Niet in het manifest: een landingspagina die zelf de wortel van
            // zijn topic is (RS485/Opdracht.html, ProCurve/Opdracht.html). Die
            // hoort ook geen balk te krijgen. Terug zou naar overview.html
            // wijzen, dat is een ander menu-item, en het labomenu zou de
            // theorie opsommen, dat is er nog een.
            if (m.row) fout(m.pagina, 'staat niet in reference.js maar krijgt toch een navigatiebalk');
            if (m.forward) fout(m.pagina, 'staat niet in reference.js maar heeft toch een volgende-link naar ' + m.forward);
            if (m.flags.length) fout(m.pagina, 'staat niet in reference.js maar zet toch een vinkje: ' + m.flags.join(', '));
            continue;
        }

        if (!m.row) {
            fout(m.pagina, 'krijgt geen navigatiebalk');
            continue;
        }

        // De wortel van het topic waar deze pagina in zit: reference.html voor
        // de theorie, de eerste regel van de reeks voor al de rest. Terug wijst
        // daarnaar en nergens anders. Wees hier streng: "een bestand dat
        // bestaat" liet overview.html gewoon door, en dat is precies de sprong
        // die het Orion-menu op "Inleiding" laat staan terwijl de student de
        // opdracht leest.
        const isTheorie = m.pagina.split('/').includes('Theorie');
        const wortel = isTheorie
            ? `/DeN/${MODULES[labId]}/Theorie/reference.html`
            : urlOf(labId, groep.items[0].href);
        const verwachtTerug = wortel === pad ? null : wortel;

        if (m.back !== verwachtTerug) {
            fout(m.pagina, `terug-link wijst naar ${m.back || 'nergens'} in plaats van naar ${verwachtTerug || 'nergens'}`);
        }
        if (m.back) {
            const doel = path.join(REPO, m.back.replace(/^\/DeN\//, ''));
            if (!fs.existsSync(doel)) fout(m.pagina, 'terug-link wijst naar een bestand dat niet bestaat: ' + m.back);
        }

        const topic = groep.items[index];
        const eerder = geclaimd.get(topic.id);
        if (eerder) {
            fout(m.pagina, `deelt de manifest-entry "${topic.id}" met ${eerder}, dus een van de twee krijgt de verkeerde volgende-link en het verkeerde vinkje`);
        }
        geclaimd.set(topic.id, m.pagina);

        if (m.flags.length !== 1 || m.flags[0] !== topic.id) {
            fout(m.pagina, `zet het vinkje "${m.flags.join(', ') || 'geen'}" in plaats van "${topic.id}"`);
        }

        const volgende = groep.items[index + 1];
        if (volgende) {
            const verwacht = urlOf(labId, volgende.href);
            if (!m.forward) {
                fout(m.pagina, 'mist de volgende-link naar ' + verwacht);
            } else if (m.forward !== verwacht) {
                fout(m.pagina, `volgende-link wijst naar ${m.forward} in plaats van ${verwacht}`);
            }
        } else if (m.forward) {
            // Laatste van zijn reeks, dus er is niets meer om naar door te
            // lopen. De wortel van het topic zou het enige zinnige doel zijn,
            // en daar wijst terug hier al naar: twee links naar dezelfde pagina
            // leest als een fout in plaats van als een keuze, dus back-link.js
            // laat de vooruit-link dan weg. Elke vooruit-link die hier toch
            // staat, wijst dus naar een pagina uit een andere reeks, en dat is
            // een sprong naar een ander Orion-topic.
            fout(m.pagina, `is de laatste van reeks "${groep.naam}" maar loopt door naar ${m.forward}`);
        }

        // Het label op de menuknop noemt de reeks waar je in zit en telt binnen
        // die reeks. Stond hier "Theorie 12 / 16" op een Packet Tracer-oefening,
        // dan telt hij door twee reeksen heen en klopt de naam niet.
        const verwachtLabel = groep.items.length > 1
            ? `${groep.naam} ${index + 1} / ${groep.items.length}`
            : groep.naam;
        if (m.label !== verwachtLabel) {
            fout(m.pagina, `menuknop zegt "${m.label}" in plaats van "${verwachtLabel}"`);
        }
    }

    // Elk onderwerp in het manifest moet door precies een pagina opgeeist zijn.
    for (const [labId, gs] of Object.entries(alleGroepen)) {
        for (const topic of gs.flatMap(g => g.items)) {
            if (!geclaimd.has(topic.id)) {
                fout(`reference.js (${labId})`, `"${topic.id}" -> ${topic.href} wordt door geen enkele pagina herkend`);
            }
        }
    }

    if (!QUIET) {
        const b = (s, n) => String(s === null ? '-' : s).padEnd(n);
        const kort = s => (s ? s.replace('/DeN/', '') : '-');
        console.log(b('pagina', 52) + b('terug naar', 42) + b('volgende', 46) + 'vinkje');
        console.log('-'.repeat(160));
        for (const m of metingen) {
            console.log(b(m.pagina, 52) + b(kort(m.back), 42) + b(kort(m.forward), 46) + (m.flags.join(',') || '-'));
        }
        console.log('');
    }

    for (const f of fouten) console.log(`  FOUT          ${f.pagina}: ${f.tekst}`);
    console.log(fouten.length
        ? `\n${fouten.length} fout(en) in de navigatie.`
        : `Navigatie in orde: ${metingen.length} pagina's nagekeken.`);
    process.exit(fouten.length ? 1 : 0);
})();

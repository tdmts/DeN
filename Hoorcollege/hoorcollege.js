/*
 * hoorcollege.js -- de projectie van een deck. Zelfstartend, geen init.
 *
 * Toont een slide tegelijk en zet --schaal naar het venster. De slide zelf is
 * 254 bij 143mm en wordt alleen vergroot of verkleind (zie hoorcollege.css),
 * dus dit script rekent niets uit over de inhoud. Het meet er wel een ding
 * aan: past ze op de 143mm. Zo niet, dan draagt ze een rood "past niet" en
 * zegt de teller hoeveel er zo zijn.
 *
 *   pijl rechts, spatie, page down   volgende
 *   pijl links, page up              vorige
 *   home, end                        eerste, laatste
 *   f                                volledig scherm
 *   n                                de notities van de spreker
 *
 * Het nummer in de URL is dat van de slide in de reeks, niet dat van de
 * PowerPoint: data-slide houdt het oude nummer bij zodat IMPORT.md nog
 * aanwijst welke slide het was, maar wie #7 doorgeeft bedoelt de zevende.
 */

(function () {
    'use strict';

    var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
    if (!slides.length) { return; }

    var teller = document.createElement('div');
    teller.className = 'teller';
    document.body.appendChild(teller);

    var huidig = 0;
    var teVol = 0;

    // Een slide is 143mm hoog en overflow: hidden, dus wat er niet op past
    // wordt weggeknipt en er gaat verder niets mis. In de handout staat die
    // slide op 45mm en dan valt het helemaal niet meer op. Daarom wordt elke
    // slide gemeten en draagt een te volle slide een rood label.
    //
    // Meten kan alleen op een zichtbare slide, want van display: none is
    // scrollHeight nul. De klasse gaat er dus even op en meteen weer af; dat
    // gebeurt in een keer, dus de browser tekent er niets van.
    //
    // Twee pixels speling: scrollHeight en clientHeight zijn afgeronde gehele
    // getallen en alles op een slide staat in millimeter.
    function meet() {
        var aantal = 0;
        slides.forEach(function (slide) {
            var stond = slide.classList.contains('actief');
            slide.classList.add('actief');
            var vol = slide.scrollHeight - slide.clientHeight > 2;
            slide.classList.toggle('past-niet', vol);
            if (!stond) { slide.classList.remove('actief'); }
            if (vol) { aantal += 1; }
        });
        return aantal;
    }

    function schaal() {
        var eersteSlide = slides[0];
        var breed = eersteSlide.offsetWidth;
        var hoog = eersteSlide.offsetHeight;
        if (!breed || !hoog) { return; }
        var factor = Math.min(window.innerWidth / breed, window.innerHeight / hoog);
        document.documentElement.style.setProperty('--schaal', factor);
    }

    function toon(index) {
        huidig = Math.max(0, Math.min(slides.length - 1, index));
        slides.forEach(function (slide, i) {
            slide.classList.toggle('actief', i === huidig);
        });
        teller.textContent = (huidig + 1) + ' / ' + slides.length;
        if (teVol) {
            // Een punt en geen spaties: HTML trekt twee spaties samen tot een.
            teller.textContent += teVol === 1
                ? ' · 1 slide past niet'
                : ' · ' + teVol + ' slides passen niet';
        }
        if (window.location.hash !== '#' + (huidig + 1)) {
            history.replaceState(null, '', '#' + (huidig + 1));
        }
    }

    function uitHash() {
        var nummer = parseInt(window.location.hash.replace('#', ''), 10);
        return isNaN(nummer) ? 0 : nummer - 1;
    }

    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey || e.altKey || e.metaKey) { return; }
        switch (e.key) {
        case 'ArrowRight': case ' ': case 'PageDown': toon(huidig + 1); break;
        case 'ArrowLeft': case 'PageUp': toon(huidig - 1); break;
        case 'Home': toon(0); break;
        case 'End': toon(slides.length - 1); break;
        case 'n':
            document.body.classList.toggle('notities-zichtbaar');
            break;
        case 'f':
            if (document.fullscreenElement) { document.exitFullscreen(); }
            else { document.documentElement.requestFullscreen(); }
            break;
        default: return;
        }
        e.preventDefault();
    });

    document.addEventListener('click', function (e) {
        if (e.target.closest('a')) { return; }
        toon(huidig + 1);
    });

    window.addEventListener('load', function () {
        teVol = meet();
        toon(huidig);
        schaal();
    });

    window.addEventListener('resize', schaal);
    window.addEventListener('hashchange', function () { toon(uitHash()); });

    // Eerst tonen, dan meten: van een slide met display:none is offsetWidth 0.
    toon(uitHash());
    schaal();
}());

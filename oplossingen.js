/*
 * oplossingen.js - de antwoorden van een vragenlijst op de site tonen.
 *
 * Zelfdraaiend, geen init. Laad het na back-link.js op elke pagina met een
 * <ol class="vragen">.
 *
 * WAAROM DIT BESTAAT
 *
 * Het antwoord van een vraag staat bij die vraag in de HTML, en nergens anders:
 * een meerkeuzevraag duidt de juiste mogelijkheid aan met class="juist" op de
 * <li>, en elke vraag mag een <div class="oplossing"> dragen met het geschreven
 * antwoord of de toelichting erbij. Dat is de hele bron.
 *
 * scripts/export-syllabus.py leest diezelfde twee markeringen en drukt er
 * achteraan het hoofdstuk een sectie Oplossingen uit. Dit bestand doet er op de
 * site een uitklap van. Twee weergaven van dezelfde inhoud dus, en niet twee
 * plaatsen waar ze staat: er valt niets uit de pas te lopen, want er is maar
 * een tekst.
 *
 * DE LETTER WORDT GETELD, NOOIT GESCHREVEN
 *
 * Bij een meerkeuzevraag komt "Antwoord b" uit de plaats van de <li> met
 * class="juist". Verwissel morgen twee mogelijkheden en de letter volgt mee.
 * Een geschreven "Antwoord b" zou dat niet doen en zou stil fout staan, aan de
 * pagina niet te zien. De labozelftest onder Labo/ doet het nog wel zo; dat is
 * handwerk van voor deze afspraak en geen voorbeeld om na te volgen.
 *
 * Dit is de tweede plaats waar die letter geteld wordt, naast het exportscript.
 * De prijs is bewust betaald: het is een mechanische regel (de hoeveelste <li>
 * draagt juist) en geen inhoud, dus er valt niets aan te schrijven dat kan
 * verouderen.
 *
 * HOE DE UITKLAP GEMAAKT WORDT
 *
 * Er wordt hier niets opgemaakt. De uitklap is de spoiler-container van
 * OrionCSS: dit bestand zet de markup neer die main.js verwacht (een .button
 * met data-shown en een .hidden ernaast) en main.js bouwt hem op DOMContentLoaded
 * om tot een echte knop. Vandaar dat dit script aan het eind van de <body> hoort
 * en niet in een eigen DOMContentLoaded: het moet er staan voor main.js kijkt.
 *
 * Draait het script niet, dan blijft de oplossing gewoon staan als tekst onder
 * de vraag. Dat is de goede kant om op te falen: de inhoud is er dan wel en ze
 * is alleen niet weggevouwen.
 */

(function ()
{
    var lijsten = document.querySelectorAll('ol.vragen');
    if (!lijsten.length)
    {
        return;
    }

    lijsten.forEach(function (lijst)
    {
        Array.prototype.forEach.call(lijst.children, function (vraag)
        {
            if (vraag.tagName !== 'LI')
            {
                return;
            }
            bouwUitklap(vraag);
        });
    });

    function bouwUitklap(vraag)
    {
        var geschreven = vraag.querySelector(':scope > .oplossing');
        var antwoord = document.createElement('p');

        // De keuzelijst van een meerkeuzevraag is de eerste <ul> in de vraag.
        // De letter is de plaats van de aangeduide mogelijkheid daarin.
        var keuzes = vraag.querySelector(':scope > ul');
        if (keuzes)
        {
            var mogelijkheden = Array.prototype.filter.call(keuzes.children, function (el)
            {
                return el.tagName === 'LI';
            });
            var juist = mogelijkheden.findIndex(function (el)
            {
                return el.classList.contains('juist');
            });
            if (juist < 0)
            {
                return;
            }
            var letter = String.fromCharCode(97 + juist);
            var kop = document.createElement('strong');
            kop.textContent = 'Antwoord ' + letter + '.';
            antwoord.appendChild(kop);
            var kern = mogelijkheden[juist].textContent.trim();
            if (geschreven && kern && '.?!:;'.indexOf(kern.slice(-1)) < 0)
            {
                // De mogelijkheid is vaak een los woord ("M12"), en dan plakt de
                // toelichting eraan vast tot er een punt tussen staat.
                kern += '.';
            }
            antwoord.appendChild(document.createTextNode(' ' + kern));
            if (geschreven)
            {
                antwoord.appendChild(document.createTextNode(' '));
                while (geschreven.firstChild)
                {
                    antwoord.appendChild(geschreven.firstChild);
                }
            }
        }
        else
        {
            if (!geschreven)
            {
                return;
            }
            while (geschreven.firstChild)
            {
                antwoord.appendChild(geschreven.firstChild);
            }
        }

        if (geschreven)
        {
            geschreven.remove();
        }

        var knop = document.createElement('div');
        knop.className = 'button';
        knop.setAttribute('data-shown', 'Verberg antwoord');
        knop.textContent = 'Toon antwoord';

        var verborgen = document.createElement('div');
        verborgen.className = 'hidden';
        verborgen.appendChild(antwoord);

        var houder = document.createElement('div');
        houder.className = 'spoiler-container';
        houder.appendChild(knop);
        houder.appendChild(verborgen);
        vraag.appendChild(houder);
    }
})();

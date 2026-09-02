# Notities bij de syllabus

Wat bij het overzetten opviel en wat jij moet beslissen. De tekst zelf is
letterlijk overgenomen, dus hier staat niets dat al veranderd is.

Wat de omzetting zelf moest raden of liet vallen, staat in
[IMPORT.md](IMPORT.md), en dat bestand wordt door de importer geschreven.

## Hoofdstuk 1, TCP/IP model

**De antwoorden op Test jezelf: nakijken.** In de Word is bij geen enkele
meerkeuzevraag een mogelijkheid aangeduid, niet vet, niet gekleurd en niet
gemarkeerd. De afspraak is nu dat de juiste mogelijkheid in TestJezelf.html
gemerkt wordt met `class="juist"` en dat de export daaruit een sectie
Oplossingen drukt achter de Test jezelf. Wat hieronder staat, is dus **niet uit
de Word overgenomen maar afgeleid uit de theorie van het hoofdstuk**, en het is
het enige in deze import dat een inhoudelijke keuze is in plaats van een
opmaakkeuze. Kijk het na voor het gedrukt wordt.

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 Som de vijf lagen op | Fysiek, datalink, netwerk, transport en applicatie | 1.2, de tabel TCP/IP updated en het ezelsbrugje Please Do Not Take Anything |
| 2 Nut van OSI en TCP/IP | b, afspraken waardoor machines over verschillende netwerken heen communiceren | woordelijk het eerste kernpunt van het hoofdstuk |
| 3 Vendor lock in | b, een product niet compatibel maken met dat van een ander | 1.1, "die hardware was natuurlijk niet compatibel met de hardware van een andere fabrikant" |
| 4 Welke lagen komen overeen | a, fysiek, datalink, netwerk, transport | 1.2, in de tabel OSI naast TCP/IP staan die vier een op een |
| 5 Wat omvat de applicatie laag | c, sessie, presentatie, applicatie | 1.2, in diezelfde tabel beslaat Application drie OSI-lagen |

Vraag 1 is een open vraag, dus daar is het antwoord geschreven en niet
aangeduid. Het staat in `<!-- oplossing: ... -->` bij de vraag. De formulering
is van mij; de inhoud staat in 1.2.

Voor de vijf hoofdstukken die nog komen, geldt hetzelfde: de import brengt de
vragen mee, de antwoorden moeten erbij gezet worden. Regel 14 van
`scripts/check-content.py` faalt op een vraag zonder antwoord, dus je kan er
niet over kijken.

**Vraag 1 van Test jezelf staat ook bij Studievragen.** "Som de vijf lagen, in
volgorde, op van het TCP/IP model" staat woordelijk in het kader vooraan het
hoofdstuk en als eerste vraag achteraan. Dat kan opzet zijn (de studievragen
kondigen aan wat de test vraagt), maar dan is het de enige van de twee
studievragen die terugkomt.

**De tabel met Upper en Lower layers heeft geen kopregel.** De eerste rij
(Upper layers / Application / Protocols zoals HTTP) is gewoon de eerste
gegevensrij, en de Word bevestigt dat. Dat klopt inhoudelijk, maar het is de
enige tabel van het hoofdstuk zonder kop, dus het is het nakijken waard of dat
zo bedoeld is.

**Het lagenstapeltje in het Voorwoord is een tabel van vijf rijen op een
kolom.** In de Word is dat een tekening van de stapel, geen gegevens. Op papier
werkt het, maar als je die stapel ooit als afbeelding wil, is dit de plek.

## Hoofdstuk 2, Fysieke laag

**De antwoorden op Test jezelf: nakijken.** Zelfde afspraak als bij hoofdstuk 1,
en zelfde voorbehoud: in de Word is niets aangeduid, dus dit is afgeleid en geen
overname. De acht vragen staan in de Word als een doorlopende lijst, en dat
nummer is nu ook wat de PDF drukt.

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 Som de vijf lagen op | Fysiek, datalink, netwerk, transport en applicatie | zelfde vraag als vraag 1 van hoofdstuk 1, zie 1.2 |
| 2 Omschrijving van een STP kabel | b, afscherming rond alle individuele aderparen | 2.2, "Als die afscherming niet voldoende is gebruikt men STP kabel. Er wordt dan rond de individuele aderparen een folie gewikkeld" |
| 3 Benaming bij de definities | unicast en broadcast, in die volgorde | 2.7 Ster, waar hub en access point broadcast heten en switch en router unicast |
| 4 Hoe ziet een MAC adres eruit | c, 00-09-0F-FE-00-01 | de twee andere zijn een IPv4- en een IPv6-adres; het MAC adres komt in 2.7 Bus ter sprake |
| 5 Maximale snelheid van cat7 over 100m | 10 Gbps | 2.2, "kan een cat7 kabel deze snelheid halen over de volledige 100 meter", en de tabel eronder |
| 6 EtherCAT | Ring | de tekening bij de vraag: de kabel loopt van de master langs vier nodes en komt bij de master terug |
| 7 EtherCAT | Ster | de tekening bij de vraag: alles waaiert uit vanaf een EtherCAT junction |
| 8 Profibus | Bus | de tekening bij de vraag: een doorlopende lijn waar de veldapparaten op aftakken |

**Vraag 6 en 7 heten allebei EtherCAT en zijn toch niet dezelfde vraag.** Wat ze
onderscheidt is de tekening: de ene toont een ring, de andere een junction waar
alles op uitkomt. Kijk die twee antwoorden na, want ze staan of vallen met hoe je
de tekening leest, en de tekst van de vraag zegt niets.

**De zin erboven kondigt PROFINET aan en er komt geen PROFINET-vraag.** Er staan
drie vragen, tweemaal EtherCAT en eenmaal Profibus. Dat kan opzet zijn nu vraag 6
en 7 twee verschillende EtherCAT-opstellingen tonen, maar dan klopt de aankondiging
niet meer.

**Vraag 1 is woordelijk vraag 1 van hoofdstuk 1.** "Som de vijf lagen in volgorde
op van het TCP/IP model" staat in allebei de tests. In hoofdstuk 1 is dat de
vraag waar het hoofdstuk over ging, hier is het een opfrissing. Dat kan opzet
zijn, maar het is de enige vraag die in twee hoofdstukken terugkomt.

**De test vraagt naar frames en MAC adressen.** Vraag 3 en 4 gaan over unicast,
broadcast en het MAC adres, en dat is datalink en niet fysiek. Ze zijn wel te
beantwoorden: 2.7 Netwerktopologie voert die begrippen in bij bus en ster, met
"Voorlopig mag je onthouden dat". Als de volgorde van de hoofdstukken ooit
wijzigt, is dit de plek waar dat pijn doet.

**RJ-45 vs M12 stelt zeven vragen bij een tekst die er niet bij zit.** De vragen
verwijzen naar de secties Abstract en Introduction van een artikel, en noch de
Word noch deze pagina zegt welk artikel dat is of waar het staat. Zonder die
tekst is de oefening onmaakbaar. Er hoort dus een verwijzing bij, en als het
artikel online staat een link.

**RJ-45 vs M12 en Oefening: switch bekabelen dragen geen oplossingen.** Alleen
een pagina die TestJezelf.html heet, krijgt in de PDF een sectie Oplossingen.
Deze twee zijn ook oefeningen met een juist antwoord, en dat antwoord staat
nergens. Als je wil dat ze het krijgen, is dat een uitbreiding van
`export-syllabus.py` en geen tekstwijziging.

**De tekeningen bij vraag 6, 7 en 8 dragen geen bijschrift.** Ze zaten in de Word
in de alinea van de vraag zelf, dus er is geen tekst die erbij hoort, en de
alt-tekst zegt daarom alleen "Afbeelding uit de syllabus". Voor de PDF maakt dat
niets uit, voor de pagina op de site wel: wie hem met een schermlezer leest, hoort
niet wat er staat. Een bijschrift of een alt-tekst schrijven is een tekstwijziging
en dus aan jou.

**De netwerkkaarten staan in een tabel van twee op twee.** Bovenin twee foto's,
eronder de bijschriften. In de Word is dat een indeling en geen gegevenstabel,
dus ze heeft terecht geen kopregel gekregen, maar als je ooit twee `figure`'s
naast elkaar wil in plaats van een tabel, is dit de plek.

**Typfouten die uit de Word meekomen.** Letterlijk overgenomen, dus ze staan er
nog:

- 2.7 Netwerktopologie: "er zijn natuurlijke meerdere manieren" (natuurlijk)
- 2.7 Bus: "een vorm van van channel access control" (van van)
- 2.7 Ster: "gedraag het systeem zich dan als een bus netwerk" (gedraagt)
- 2.7 Ster: "wat als meerdere hosts een frame wilen sturen" (willen)
- 2.7 Mesh: "waarbij niet alle verbinden worden gelegd" (verbindingen)
- 2.7 Mesh: "hoe verder een client zich van dit apparaat verwijderd" (verwijdert)

Verbeter je ze, doe het dan in de HTML: die is vanaf nu de bron, en de Word wordt
gearchiveerd.

## Voor de hele syllabus, gezien tijdens het lezen

**Typfout in de inhoudstafel van hoofdstuk 3:** "Securtiy mode" moet
"Security mode" zijn. Die staat in de Word en komt dus mee zodra hoofdstuk 3
geimporteerd wordt.

**De Word is nieuwer dan de PDF die nu in Orion staat.** De docx is van
29 november 2025, de PDF van 12 september 2025. Wat er de laatste maanden in de
Word bij gekomen is, hebben de studenten dus nooit gezien. De import vertrekt
van de Word, dus dat lost zichzelf op, maar het is goed om te weten dat de
nieuwe PDF meer zal bevatten dan de oude.

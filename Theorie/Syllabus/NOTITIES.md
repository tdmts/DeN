# Notities bij de syllabus

Wat bij het overzetten opviel en wat jij moet beslissen. De tekst zelf is
letterlijk overgenomen, dus hier staat niets dat al veranderd is.

Wat de omzetting zelf moest raden of liet vallen, staat in
[IMPORT.md](IMPORT.md), en dat bestand wordt door de importer geschreven.

## Hoofdstuk 1, TCP/IP model

**De antwoorden op Test jezelf: nakijken.** In de Word is bij geen enkele
meerkeuzevraag een mogelijkheid aangeduid, niet vet, niet gekleurd en niet
gemarkeerd. De afspraak is nu dat de juiste mogelijkheid gemerkt wordt met
`class="juist"` op de `<li>` en dat de export daaruit een sectie Oplossingen
drukt achteraan het hoofdstuk. Wat hieronder staat, is dus **niet uit de Word
overgenomen maar afgeleid uit de theorie van het hoofdstuk**, en het is het
enige in deze import dat een inhoudelijke keuze is in plaats van een
opmaakkeuze. Kijk het na voor het gedrukt wordt.

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 Som de vijf lagen op | Fysiek, datalink, netwerk, transport en applicatie | 1.2, de tabel TCP/IP updated en het ezelsbrugje Please Do Not Take Anything |
| 2 Nut van OSI en TCP/IP | b, afspraken waardoor machines over verschillende netwerken heen communiceren | woordelijk het eerste kernpunt van het hoofdstuk |
| 3 Vendor lock in | b, een product niet compatibel maken met dat van een ander | 1.1, "die hardware was natuurlijk niet compatibel met de hardware van een andere fabrikant" |
| 4 Welke lagen komen overeen | a, fysiek, datalink, netwerk, transport | 1.2, in de tabel OSI naast TCP/IP staan die vier een op een |
| 5 Wat omvat de applicatie laag | c, sessie, presentatie, applicatie | 1.2, in diezelfde tabel beslaat Application drie OSI-lagen |

Vraag 1 is een open vraag, dus daar is het antwoord geschreven en niet
aangeduid. Het staat in `<div class="oplossing">` bij de vraag. De formulering
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

**De tekst achter RJ-45 vs M12 is gevonden.** De vragen verwijzen naar de
secties Abstract en Introduction van een artikel, en dat artikel staat wel
degelijk in de syllabus: het is *M12 versus RJ45 Ethernet connection systems*
van Dietmar Röring (Phoenix Contact), drie bladzijden die als scan achteraan
Ethernetkabel staan (`syllabus-02-fysieke-laag-06/07/08.png`). Er stond alleen
nergens dat het een artikel was, laat staan welk. De oefening zegt dat nu in
haar openingszin. De vierde bladzijde van het artikel (Conclusion) zit niet in
de syllabus; geen van de vragen heeft ze nodig.

**De antwoorden op RJ-45 vs M12: nakijken.** Zelfde voorbehoud als bij de twee
Test jezelfs: in de Word is niets aangeduid, dus dit is afgeleid uit het artikel
en geen overname.

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 Kleinere RJ-45 variant | RJ-11 | staat er met opzet niet in; de RJ-11 is de connector van een vaste telefoonlijn, zes posities in plaats van acht |
| 2 Vier problemen | vocht, temperatuurschommelingen, trillingen, schokken | woordelijk de Introduction: "humidity, drastic temperature changes, vibration and shock" |
| 3 Ander type connector | de RJ-45 push-pull connector | blz. 2, de PNO legde die in 2002 voor Profinet vast |
| 4 IP67 | c, water- en stofbestendigheid | algemeen bekend, en het artikel gebruikt IP67 en IP20 als beschermingsgraad |
| 5 EMC | b, M12 | blz. 3, de M12 Quickon sluit 360 graden rond de kabel en is daarom geschikt bij veel EMC |
| 6 FastEthernet | 100 Mbps | blz. 3, "Fast Ethernet (100Base-T) ... at a transmission rate of 100 Mbps" |
| 7 Acht pin M12 | 1000 Mbps | blz. 3, acht pinnen zijn er voor Gigabit Ethernet (1000Base-T) |

**Vraag 3 is de wankelste van de zeven.** Ze vraagt naar een connector "behalve
RJ-45 en M12", en het enige wat het artikel bij Profinet noemt is de RJ-45
push-pull. Dat is een ander type connector (hij klikt vast en haalt IP67), maar
hij heet nog altijd RJ-45, dus de vraag spreekt zichzelf half tegen. Kijk na of
jij iets anders bedoeld hebt.

**Oefening: switch bekabelen is herschreven naar genummerde vragen.** In de Word
staan de vier opdrachten als bullets met "omcirkel" eronder. Een oplossing kan
naar een bullet niet wijzen, dus het zijn nu de vier items van een
`<ol class="vragen">`; de omcirkeltabellen en de invullijnen staan er
onveranderd onder. Dit is de enige plaats in deze import waar de opmaak van de
Word bewust niet gevolgd is.

**De antwoorden op Oefening: switch bekabelen: nakijken.**

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 10/100 Base T, < 30 m | cat5e / RJ45 | de poort haalt 100 Mbps; de tabel in 2.2 geeft cat5e 1 Gbps over 100 m, dus alles erboven kost meer en levert niets |
| 2 Gig-T, 70 m | cat6 / RJ45 | zie hieronder |
| 3 SFP module, < 1 km | J4859C | de datasheets bij de vraag: de eerste is koper met RJ-45, de tweede haalt 550 m over multimode, de derde 10 km over singlemode |
| 4 Glasvezelkabel | LC OS2 | de J4859C is 1310 nm over SMF met duplex LC; OM3 en OM4 zijn multimode en SC is de verkeerde connector |

**Vraag 2 is een keuze en geen gevolgtrekking.** De tabel in 2.2 geeft cat5e
1 Gbps over 100 meter, en een Gig-T poort vraagt 1 Gbps over 70 meter. Strikt
genomen volstaat cat5e dus, en dan is vraag 2 hetzelfde antwoord als vraag 1 en
vraagt ze niets nieuws. cat6 is hier ingevuld omdat "performante" in de
vraagstelling naar marge wijst en omdat twee vragen anders samenvallen. Beslis
jij welke van de twee je bedoelt; het is de enige oplossing in dit hoofdstuk die
niet uit het materiaal volgt.

**De SFP in de tabel heet J8117C en op zijn datasheet J8177C.** Twee cijfers
omgewisseld, in de Word al. Welke van de twee juist is, maakt voor het antwoord
niets uit (die module is koper en valt sowieso af), maar een van de twee is een
typfout.

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

## Hoofdstuk 3, Datalink laag

**De antwoorden: nakijken.** Zelfde afspraak en zelfde voorbehoud als bij
hoofdstuk 1 en 2. In de Word is niets aangeduid, dus alles hieronder is afgeleid
uit de theorie van het hoofdstuk en geen overname. Het hoofdstuk draagt 32 vragen
over drie pagina's, en dat is meer dan de twee vorige samen.

**Vraag 1 en 3 van Test jezelf zijn herschreven, en dat is een ingreep.** Ze
stonden in de Word in het meervoud ("welke taken", "welke beweringen") met twee
en drie juiste mogelijkheden. De afspraak is dat een meerkeuzevraag er precies
een aanduidt, want de letter van het antwoord wordt geteld en niet geschreven, en
die afspraak is de moeite waard om te houden. Dus zijn de vragen aangepast in
plaats van de regel.

- **Vraag 1** zegt nu zelf dat het er twee zijn en zet de mogelijkheden twee aan
  twee. Alle vier de uitspraken uit de Word staan er nog, elk tweemaal, dus de
  student moet nog altijd het transmissiemedium (fysiek) en de globale
  adressering (netwerk) wegstrepen. Alleen b combineert de twee taken die wel van
  de datalink laag zijn.
- **Vraag 3** vraagt nu welke bewering *niet* waar is. Van de vijf beweringen
  waren er twee fout, dus een moest weg: "Het is een volledig willekeurig adres"
  staat er nu als de juiste versie van datzelfde feit uit 3.3, namelijk dat de
  fabrikant het vastlegt. Wat overblijft als de foute bewering, is dat een hub
  met MAC adressen overweg kan, en dat is het onderscheid dat de vraag hoort te
  testen.

Beide zijn een inhoudelijke ingreep en geen opmaakkeuze. Kijk ze na.

### Test jezelf (3.12)

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 Welke twee taken | b, adressering in een lokaal netwerk en controle van de gegevens | 3.1, "In de datalink laag zit dus een foutcontrole mechanisme ingebouwd ... zit er bijgevolg ook adresinformatie". Het transmissiemedium is fysiek, adressering globaal is netwerk |
| 2 Hoe ziet een MAC adres eruit | b, 80-32-53-43-31-5D | 3.3, precies dat adres staat er als voorbeeld; de andere twee zijn een IP adres en een domeinnaam |
| 3 Welke bewering is niet waar | e, een hub kan overweg met MAC adressen | 3.6 Hub, een hub werkt op de fysieke laag en zet elk signaal op al zijn poorten. De vier andere beweringen kloppen: de fabrikant legt het adres vast (3.3), het zegt niets over de plaats, het geldt binnen het LAN en het moet er uniek zijn (de kernpunten) |
| 4 Twee bedrade en een draadloze NIC | drie | 3.3, "Iedere netwerkkaart heeft zijn eigen MAC adres" |
| 5 Vul de lege velden van het frame aan | Destination MAC Address, Source MAC Address, Length / Type, Frame Check Sequence | 3.2, dezelfde tabel staat daar volledig |
| 6 Waarvoor staat LAN | Local Area Network | 3.4 |
| 7 LAN of WAN | b, een WAN is een verzameling LANs | 3.5, "een computernetwerk dat meerdere LAN's met elkaar verbindt" |
| 8 Het HOGENT netwerk | a, LAN | 3.4, "de fysieke grootte van dat gebied doet er niet echt toe ... binnen een bedrijf" |
| 9 Het internet | b, WAN | 3.5, "het ultieme voorbeeld van een WAN (het internet)" |
| 10 Communiceren met een ander netwerk | c, router | 3.6 Switch, "Deze taak zal opgenomen moeten worden door een router" |
| 11 Meerdere netwerken op dezelfde hardware | b, VLAN | 3.7, de hele aanleiding van het VLAN |
| 12 Onbekend destination MAC adres | flooden, en daarna leren | 3.6 Switch, "De switch gedraagt zich dan even als een hub en stuurt het frame naar alle poorten" |
| 13 Door hoeveel VLANs te vervangen | b, 2 | de tekening bij de vraag: twee switches, twee gescheiden netwerken |
| 14 Waarvoor staat QOS | Quality Of Service | 3.8 |
| 15 QOS voor een kritisch proces | b, QOS 5 of 6 | 3.8, de PCP-tabel, en de tekst over tijdkritische processen |
| 16 Waarom ARP | b, MAC adres opvragen op basis van het IP adres | 3.9, woordelijk |
| 17 Dual band | c, 2.4 GHz en 5 GHz | 3.10 ISM band |
| 18 Meest performante standaard | d, 802.11 be | 3.10, Wifi 7 is de nieuwste en de snelste van de zes |
| 19 Welk principe toont de figuur | c, channel bonding | de tekening: onder de kanalen van 20 MHz een rij van 40 MHz, telkens twee buren samen |
| 20 Voorwaarden voor een goede PSK | lang en niet te raden | 3.10 Securtiy mode, de alinea die daar nu bij geschreven is, en het artikel: "the main weaknesses would be brute-force attacks (prevented by using a strong passphrase)" |
| 21 Security mode en encryptie | WPA3, anders WPA2, in beide gevallen AES | 3.10 Securtiy mode en de Key Takeaways van het artikel |

**Er staan nu twee alinea's over PSK in 3.10, en die zijn geschreven en niet
overgenomen.** Vraag 20 hier en vraag 5 van de oefening vragen naar PSK, terwijl
de afkorting in de hele syllabus alleen voorkwam als deel van "WPA2-PSK", in het
artikel *Wi-Fi Security: Should You Use WPA2-AES, WPA2-TKIP, or Both?* van
How-To Geek, dat er als schermafdruk in staat. Wat de afkorting voluit is, hoe
Personal van Enterprise verschilt en waaraan een goede sleutel voldoet, stond
nergens in woorden. Die twee alinea's staan nu onder Securtiy mode, tussen de
keuze voor WPA2 of WPA3 en de verwijzing naar het artikel.

**Dit is het enige stuk tekst in de syllabus dat niet uit de Word komt.** Alles
wat er verder staat, is letterlijk overgenomen. Lees het na en zet er je eigen
formulering voor in de plaats als je die liever hebt; en als de Word ooit nog de
herkomst moet zijn van een herwerking, weet dan dat dit stuk er niet in staat.

### Oefening Wifi security mode (3.11)

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 Rangschik van oud naar nieuw | WEP, WPA, WPA2, WPA3 | het artikel: WEP is de oudste, WPA verbeterde die, WPA2 daarna, WPA3 kwam in 2018 |
| 2 Welke zijn onveilig | WEP en WPA | het artikel, "WEP ... has proven to be vulnerable ... WPA improved security but is now also considered vulnerable" |
| 3 Wat gebeurt er met je frames | ze worden versleuteld | het artikel, over meeluisteren binnen bereik van de router |
| 4 WPA/TKIP op een moderne router | de snelheid zakt | 3.10 Securtiy mode en het artikel, TKIP is de oude standaard |
| 5 Waarvoor staat PSK | Pre-Shared Key, de Personal-variant, thuisnetwerk | 3.10 Securtiy mode, de alinea die daar nu bij geschreven is |
| 6 Welke mode op een Wifi 6 router | WPA3, anders WPA2, met AES | de Key Takeaways van het artikel |

### Industriële switch (3.6)

Vijf vragen halverwege het hoofdstuk, bij de datasheet van de Beckhoff CU20xx.
Die vier bladzijden staan als tekst in de syllabus, dus deze vijf antwoorden zijn
de enige van het hoofdstuk die letterlijk in het materiaal te vinden zijn.

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 Kabel op een RJ-45 poort | a, ethernet | de datasheet, "Ethernet with RJ45" |
| 2 Welke uitvoering haalt 1 Gbps | b, CU2208 | "10/100 Mbaud (CU2208: 1000 Mbaud)" |
| 3 Te korte frames | worden niet doorgestuurd, onder 64 bytes | Store and Forward |
| 4 Te lange frames | boven 1536 bytes niet, de CU2208 wel tot 9720 | Store and Forward, en Jumbo Frames |
| 5 Nut van 1000 adressen per poort | een heel netwerksegment achter een poort | Address Memory, "it is also suitable for connecting entire network segments" |

### Wat verder opviel

**Een lege kop in de Word, weggehaald.** Vlak voor de drie schermafdrukken van
het artikel staat een Heading 3 zonder tekst. De import nam die letterlijk over
als `<h2></h2>`, en dat is op papier en op het scherm een lege regel met kopruimte
eromheen. Ze is weg. Wil je er een kop, dan is dit de plek: het artikel heeft er
geen titel in de syllabus.

**Bij Wifi 7 is een onafgemaakte zin weggehaald.** Er stond "Verder maakt Wifi 7
gebruik van slimmere signaalversleuteling (4096-QAM), waardoor er meer gegevens
per seconde verzonden kunnen worden. Je mag dit echter niet verwarren met hoe een
Ook is het systeem beter geworden in het efficiënt verdelen van het netwerk
tussen meerdere gebruikers." Daar is een halve zin over QAM blijven hangen met de
volgende zin ertegenaan geplakt. Het onafgemaakte stuk is weg; de zin over het
verdelen van het netwerk staat er nog, nu op zichzelf. Wat de waarschuwing over
QAM had moeten zeggen, staat er dus niet meer; wil je ze terug, dan is dit de
plek.

**Twee em-dashes zijn een leesteken geworden**, want regel 5 van de check laat er
geen door. In 3.10 werd het een komma, in de datasheettekst van 3.6 een punt. De
woorden zijn niet aangeraakt.

**De en-dashes in de reeksen zijn blijven staan.** "(46 – 1500 bytes)" en
"(1501–1535)" in 3.2, en dezelfde tabel in 3.6. Dat is een gedachtestreepje in
een getallenreeks en geen em-dash, dus de check zwijgt erover. In de tabel van
Test jezelf staat dezelfde reeks als "46 tot 1500 bytes", dus de Word is er zelf
niet consequent in.

**Twee vragen dragen hun tekening en hun keuzes gescheiden in de Word.** Bij
vraag 13 en 19 staat de figuur in een gewone alinea tussen de vraag en haar
mogelijkheden. De importer sloot de vraag daarop af, en dan stonden de keuzes
ernaast in plaats van erin: geen enkele letter te tellen, en dus geen oplossing
te drukken. Hij houdt de lijst nu open over zo'n alinea heen. Wat er verder van
de import verandert, staat in [IMPORT.md](IMPORT.md).

**De tabel bij vraag 5 staat naast de vraag en niet erin.** Het frame dat de
student aanvult, is een tabel met tekst erin, en de regel die een tabel in een
vraag trekt, kijkt naar een lege tabel of een lege kolom. Op papier staat ze
onder de vraag waar ze hoort, dus het is niet erg; het splitst de vragenlijst
alleen in twee `<ol>`'s, en de nummering loopt over die breuk door.

**Typfouten die uit de Word meekomen.** Letterlijk overgenomen, dus ze staan er
nog:

- 3.10: "Securtiy mode" als kop (Security)
- 3.10: "Sinlge User Multiple Input Multiple Output" (Single)
- 3.10: "Ment noemt dit ook wel channel bonding" (Men)
- 3.6 Switch: "Een switch opent iedere frame die aankomt" (ieder frame)

Verbeter je ze, doe het dan in de HTML: die is vanaf nu de bron, en de Word wordt
gearchiveerd.

## Voor de hele syllabus, gezien tijdens het lezen

**De Word is nieuwer dan de PDF die nu in Orion staat.** De docx is van
29 november 2025, de PDF van 12 september 2025. Wat er de laatste maanden in de
Word bij gekomen is, hebben de studenten dus nooit gezien. De import vertrekt
van de Word, dus dat lost zichzelf op, maar het is goed om te weten dat de
nieuwe PDF meer zal bevatten dan de oude.

# Notities bij de syllabus

Wat bij het overzetten opviel, en wat erover beslist is. Een hoofdstuk dat
nog geen redactionele doorloop gehad heeft, staat hier met wat jij moet
beslissen; een hoofdstuk dat er wel een gehad heeft, met wat er beslist is en
waarom.

Wat de omzetting zelf moest raden of liet vallen, staat in
[IMPORT.md](IMPORT.md), en dat bestand wordt door de importer geschreven.

## Hoofdstuk 1, TCP/IP model

**De antwoorden op Test jezelf: nagekeken en beslist.** De juiste mogelijkheid
staat als `class="juist"` op de `<li>`, en de export drukt daaruit een sectie
Oplossingen achteraan het hoofdstuk. Die aanduiding komt niet uit de brontekst
maar is hier gekozen, en ze is getoetst aan de theorie van dit hoofdstuk zelf.

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 Som de vijf lagen op | Van onder naar boven: fysiek, datalink, netwerk, transport en applicatie | 1.2, het ezelsbrugje Please Do Not Take Anything |
| 2 Nut van OSI en TCP/IP | b, afspraken waardoor machines over verschillende netwerken heen communiceren | woordelijk het eerste kernpunt van het hoofdstuk |
| 3 Vendor lock in | b, een product niet compatibel maken met dat van een ander | 1.1, "die hardware was natuurlijk niet compatibel met de hardware van een andere fabrikant" |
| 4 Welke lagen komen overeen | a, fysiek, datalink, netwerk, transport | 1.2, in de tabel OSI naast TCP/IP staan die vier een op een |
| 5 Wat omvat de applicatie laag | c, sessie, presentatie, applicatie | 1.2, in diezelfde tabel beslaat Application drie OSI-lagen |
| 6 Welk model gebruikt de praktijk | b, TCP/IP, want OSI heeft nog enkel een academische betekenis | 1.1, "In de praktijk wordt TCP/IP gebruikt", en het vierde kernpunt |

Vraag 1 is een open vraag, dus daar is het antwoord geschreven en niet
aangeduid. Het staat in `<div class="oplossing">` bij de vraag.

**De richting staat nu in het antwoord op vraag 1.** "Som de vijf lagen, in
volgorde, op" zegt niet van onder naar boven of van boven naar onder, en de twee
bronnen in 1.2 spreken elkaar daarin tegen: het ezelsbrugje loopt van fysiek
naar applicatie, de tabel TCP/IP updated van applicatie naar fysiek. Het antwoord
begint daarom met "Van onder naar boven", zodat de student ziet welke van de twee
gedrukt staat. De vraag zelf is niet aangeraakt.

**Vraag 6 is hier bijgeschreven.** Het kader vooraan stelt twee studievragen. De
eerste kwam woordelijk terug als vraag 1 van Test jezelf, de tweede kwam nergens
terug, dus van de twee vragen die het hoofdstuk aankondigt werd er maar een
getoetst. Vraag 6 sluit dat gat, met dezelfde vraagstelling als de studievraag.
Ze is niet uit de brontekst overgenomen maar hier geschreven; het feit staat in
1.1 en in het vierde kernpunt. De blurb van Test jezelf in `reference.js` zegt
daarom "Zes vragen".

Dat vraag 1 twee keer in het hoofdstuk staat, blijft zo: een studievraag die
terugkomt in de test is wat een studievraag hoort te doen.

**De tabel met Upper en Lower layers heeft geen kopregel, en dat is beslist.** De
eerste rij (Upper layers / Application / Protocols zoals HTTP) is een
gegevensrij: Upper layers overspant drie rijen als categorie van lagen, niet als
kolomtitel. Het is de enige tabel van het hoofdstuk zonder kop, en dat hoort zo.
De twee tabellen die wel een kopregel dragen, TCP/IP original naast TCP/IP
updated en OSI naast TCP/IP, hebben allebei echte kolomtitels.

**Het lagenstapeltje in het Voorwoord blijft een tabel van vijf rijen op een
kolom.** Het is een tekening van de stapel en geen gegevens, en op papier werkt
die vorm. Wat eraan ontbrak was een bijschrift: er stond nergens waar de stapel
voor staat. De tabel zit nu in een `<figure>` met een `<figcaption>`, dezelfde
vorm die een afbeelding krijgt, dus er is geen nieuwe CSS voor nodig. Een echte
tekening is niet gemaakt: die levert alleen opmaak op voor iets wat nu al goed
drukt.

### Taalfouten

Deze horen niet bij de stijl maar bij de taal, en `SCHRIJFSTIJL.md` vraagt om ze
te verzamelen zodat een ronde er een diff van een soort van maakt.

Rechtgezet:

- Kernpunt 3 schreef "de lagen waarmee de eindgebruiker het meest mee in
  aanraking komt", met het voorzetsel twee keer. In dezelfde zin stonden de twee
  laagnamen in twee vormen ("fysiek" tegenover "de applicatie laag"); dat is mee
  gelijkgetrokken naar "de fysieke laag".

Blijft open, voor een aparte ronde over de zes hoofdstukken:

- 1.1 schrijft "ezelsbrug**get**je", 1.2 schrijft "ezelsbrug**j**e". Twee
  opeenvolgende secties, twee vormen. `SCHRIJFSTIJL.md` noemt `ezelsbruggetje`
  bij naam, dus dat is de vorm die wint.
- Vraag 1 van Test jezelf eindigt zonder leesteken, terwijl vraag 2 tot 6 op een
  vraagteken eindigen en dezelfde zin bij Studievragen een punt draagt.

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

## Hoofdstuk 4, Netwerk laag

**De antwoorden: nakijken.** Zelfde afspraak en zelfde voorbehoud als bij de drie
vorige hoofdstukken. In de Word is niets aangeduid, dus alles hieronder is
afgeleid uit de theorie van het hoofdstuk en geen overname. Het hoofdstuk draagt
28 vragen over vijf pagina's, en dat is meer dan hoofdstuk 3.

**Vier oefeningpagina's stelden hun vragen als gewone alinea's, en zijn nu
vragenlijsten.** Dat is een ingreep in de opmaak en ze is bewust genomen. In de
Word staat de vraag van 4.8, 4.10 en 4.17 als een losse alinea met invulruimte
eronder; zonder `ol class="vragen"` kent de export ze niet en drukt ze er ook
geen oplossing bij, en op de site verschijnt er geen reveal. De woorden van de
vragen zijn niet aangeraakt en de invulruimte staat er nog: de vraag krijgt er
alleen een nummer voor. Waar de Word de oplossing zelf al voorstructureert
(Stap 1, Stap 2, Stap 3 in 4.8 en 4.10), blijft die structuur staan waar ze
stond.

**De drie oefeningen van 4.14 zijn doorlopend genummerd, van 1 tot 9.** Ze
begonnen elk opnieuw bij 1. De oplossingensectie drukt per pagina één lijst, dus
drie keer een vraag 1 zou drie antwoorden geven waarvan er twee bij het verkeerde
nummer staan. Hetzelfde geldt voor de zes vragen van 4.17.

**De invulruimte bij vraag 7 van Test jezelf stond in de mogelijkheid "Nee".** De
importer trekt een lege tabel vlak na een vraag in die vraag, en hier zat de
tabel achter het laatste keuzevakje. Op papier stond de rekenruimte dan onder
"Nee" in plaats van onder de vraag. Ze staat nu na de mogelijkheden, in de vraag
zelf.

**Drie en-dashes zijn een koppelteken geworden**, want ze staan er als minteken:
"32 – 6" en "22 = 32 – 10" in 4.12, en "2^24 – 2" in 4.9. Dezelfde bladzijden
schrijven elders "2^6 - 2", dus de Word is er zelf niet consequent in. Het gaat
om het rekenteken en niet om een gedachtestreepje, dus dit is opmaak en geen
woord.

### Oefening op subnetmasker (4.8)

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 172.19.1.2 en 172.19.5.12 met /22 | nee, 172.19.0.0 tegen 172.19.4.0 | 4.7, de AND bewerking. 252 is 11111100, dus 1 wordt 0 en 5 wordt 4 |

### Oefeningen op Private IP range (4.10)

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 192.168.60.38 en .41 met /29 | nee, 192.168.60.32 tegen 192.168.60.40 | 4.7 en 4.9. 248 is 11111000, dus de subnetten liggen om de acht adressen |
| 2 10.140.64.5 en 10.159.12.8 met /11 | ja, beide 10.128.0.0 | 224 is 11100000, dus om de 32 adressen; 140 en 159 vallen allebei in het blok dat op 128 begint |
| 3 172.16.4.9 en 172.17.9.4 met /16 | nee, 172.16.0.0 tegen 172.17.0.0 | 4.9, hetzelfde voorbeeld staat daar met 172.16.0.1 en 172.17.0.1 |

### Oefeningen op subnets (4.14)

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 Waarom statisch en niet DHCP | het adres moet vast zijn, want het staat in het programma van de PLC | 4.3, de nadelen van DHCP staan er omgekeerd: een lease loopt af en het adres kan veranderen |
| 2 Hoeveel apparaten in 172.19.0.0 /22 | 1022 | 4.12, 2^n - 2 met n de hostbits |
| 3 Eerste en laatste bruikbare adres | 172.19.0.1 tot 172.19.3.254 | idem, netwerk ID en broadcast vallen weg |
| 4 Hoeveel apparaten in /26 | 62 | 4.12, "2^6 - 2 is 62" staat er woordelijk |
| 5 Eerste en laatste bruikbare adres | 192.168.6.65 tot 192.168.6.126 | de blokgrenzen liggen om de 64 en 120 valt in het blok 64 tot 127 |
| 6 Kleinste subnet waarin alles past | /28, 255.255.255.240 | zes laadpalen plus de databankcomputer is zeven, en een /29 geeft er maar zes |
| 7 Welk masker aanraden, en waarom | /28, maar meer dan een keuze is te verdedigen | 4.12, "marge voor als er nog een printer zou bij komen"; 14 adressen is het dubbele van wat er nodig is |
| 8 Netwerk ID en broadcast | 192.168.1.128 en 192.168.1.143 | 192.168.0.0 /24 en 192.168.1.0 /25 zijn bezet, dus het eerste vrije /28 blok begint op .128 |
| 9 Kleinste en grootste bruikbare adres | 192.168.1.129 tot 192.168.1.142 | idem |

**Vraag 6 is herschreven, en dat is een ingreep.** In de Word staat "Wat is het
kleinste subnetmasker dat je kan gebruiken?", en als getal is 255.255.255.240 net
het grootste van de twee. Wat de vraag test, is hoeveel hostbits zeven apparaten
nodig hebben, en dat vraagt ze nu: "Wat is het kleinste subnet waarin alle
apparaten passen? Geef het subnetmasker." Het antwoord blijft /28.

**Vraag 7 vraagt nu ook waarom.** Ze heeft geen enkel juist antwoord: vraag 6
vraagt de ondergrens, vraag 7 de afweging. Zonder "en waarom" leest de
oplossingensectie /28 af als het antwoord, terwijl een student die /27 verdedigt
de vraag even goed beantwoordt. Het antwoord zegt dat nu zelf in zijn eerste zin.

### Routing decision oefeningen (4.17)

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 Welke rijen matchen op 10.5.6.3 | 1, 2, 3, 4 en 5 | 4.15, de mask bewerking per rij. Rij 6 geeft 10.0.0.0 tegen 84.12.9.1 |
| 2 Beste match | rij 5 | 4.15, "de beste match is de langste match ... dan wordt de rij gekozen met de laagste metric": rij 4 en 5 zijn allebei /24, en 110 is minder dan 112 |
| 3 Hoeveel netwerkkaarten | twee | 4.15, de kolom Interface; er staan maar twee adressen in |
| 4 Verbonden met | a, hetzelfde netwerk | beide interfaces staan on-link bij 172.29.8.0 /24 en delen dezelfde default gateway |
| 5 Welke rijen matchen op 172.29.8.14 | 1, 2, 3 en 6 | de rijen met /32 vragen een exacte match op .2, .3 of .255 |
| 6 Beste match | rij 3 | rij 3 en 6 zijn allebei /24, en 54 is minder dan 67 |

### Test jezelf (4.18)

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 De vijf lagen met hun adressering | Application, Transport, Network, Datalink, Physical; IP en MAC | 4.1, de tabel en de alinea eronder |
| 2 Voorbeeldadres en aantal bits | MAC 48, IPv4 32, IPv6 128 bits | 4.1 en 4.5, met precies die drie voorbeeldadressen |
| 3 Ontbrekende velden van de IPv4 header | Time to live, Protocol, source IP adres, destination IP adres | 4.2, dezelfde tabel staat daar volledig |
| 4 TCP of UDP | a, TCP | 4.2, de aankondiging van de transport laag; TCP bevestigt en hertransmitteert |
| 5 Betekenis van 127.0.0.1 | c, het loopback adres | 4.4, waar het naast het APIPA bereik 169.254 staat |
| 6 De drie private klassen | zie 4.9 | 4.9, alle zes de rijen staan daar per klasse uitgeschreven |
| 7 10.1.0.1 en 10.2.0.1 met /9 | a, ja, beide 10.0.0.0 | 4.7 en 4.9. Van het tweede byte telt alleen de hoogste bit, en die is bij 1 en 2 nul |
| 8 172.16.1.1 valt in | b, privaat klasse B | 4.9, "van 172.16.0.1 tot 172.31.255.254" |
| 9 De vier DHCP pakketten | discover, offer, request, acknowledge | 4.3, de handshake staat er woordelijk, met het broadcast adres en met wat de acknowledge meegeeft |

**Vraag 9 is vervangen, en dat is een ingreep.** In de Word vroeg ze naar de
meest performante wifistandaard, uit ac, ax en g. Dat is 3.10 en geen netwerk
laag, en 3.12 stelt dezelfde vraag als vraag 18 met be erbij, dus met een ander
antwoord; twee bijna gelijke vragen met een verschillend antwoord onthoudt een
student verkeerd. Wat er nu staat, vraagt naar de vier pakketten van de DHCP
handshake.

Weglaten kon ook, maar dan bleef er een gat: de Test jezelf raakte de lagen, de
IPv4 header, het loopback adres, de private klassen en het subnetmasker, en niets
van DHCP, DNS, APIPA, default gateway of routing. De handshake staat woordelijk
in 4.3 en sluit aan bij vraag 5, die over 127.0.0.1 en APIPA gaat.

**Twee typfouten uit de Word zijn verbeterd.** In de HTML, want die is vanaf nu
de bron:

- 4.16: "dan zal de default row altjid een match zijn" is altijd geworden
- 4.14: "gescheiden kan worden van de rest het netwerk" is "van de rest van het
  netwerk" geworden

**Identifier is blijven staan.** Het derde veld van de IPv4 header heet in
RFC 791 Identification, en de Word schrijft op beide plaatsen (4.2 en 4.18)
Identifier. Dat is geen schrijffout maar een andere naam voor hetzelfde veld, en
ze staat in een tekening die de student moet aanvullen. Verander je ze, verander
ze dan op allebei de plaatsen tegelijk.

## Hoofdstuk 5, Transport laag

**De antwoorden: nakijken.** Zelfde afspraak en zelfde voorbehoud als bij de vier
vorige hoofdstukken. In de Word is niets aangeduid, dus alles hieronder is
afgeleid uit de theorie van het hoofdstuk en geen overname. Het hoofdstuk draagt
elf vragen op twee pagina's.

**De vragen van 5.5 Firewall stonden als losse alinea's en zijn nu een
vragenlijst**, net zoals bij vier oefeningpagina's van hoofdstuk 4. De tabel met
ACCEPT / DENY / DROP stond achter de lijst en hoort bij vraag 3; ze staat nu in
die vraag. In 5.6 Test jezelf stonden de tabel van vraag 3, de tabel van vraag 4
en de schrapzin van vraag 5 elk buiten hun vraag, zodat de lijst drie keer brak
en met `start=` verder telde. Ze staan nu in de vraag waar ze bij horen en de
lijst is er weer een. De woorden zijn niet aangeraakt.

**5.5 Firewall is drie schermafbeeldingen van een Engelse tekst en geen letter
eigen tekst.** De drie afbeeldingen dragen de hele uitleg over host based tegen
network based, over ACCEPT / DENY / DROP en over firewall rules, en de student
moet er drie vragen over beantwoorden. Dat werkt op papier, maar het staat wel
haaks op de rest van de syllabus: het is niet doorzoekbaar, niet vertaald en het
verschilt van formaat met alles eromheen. Herschrijven is werk voor later; het
staat hier omdat het geen importfout is maar een keuze in de Word.

**De TCP header van vraag 4 schrijft bytes waar bits bedoeld zijn.** De tekening
noteert de poortvelden als (16 bytes) en de sequence en acknowledge velden als
(32 bytes), terwijl 5.2 Headers dezelfde velden correct 2 bytes en 4 bytes
noemt. 16 bits is 2 bytes en 32 bits is 4 bytes, dus het gaat om de eenheid en
niet om het getal. Niet aangepast, want het staat in een tekening die de student
moet aanvullen en de fout is de moeite van het opmerken waard; de oplossing zegt
het er wel bij. Verbeter je ze, doe het dan in de HTML.

**De TCP header staat twee keer in 5.2, de tweede keer zonder de veldgroottes.**
Er is verder geen enkel verschil: geen arcering, geen vet, geen kleur. De zin
erboven kondigt het sequence en acknowledge number aan, dus vermoedelijk waren
die twee rijen ooit gemarkeerd en is die opmaak weg. Zoals ze er nu staat, leest
de tweede tabel als een herhaling van de eerste. Overgenomen zoals de Word ze
geeft.

**Vraag 1 van Test jezelf kan in twee volgordes.** "De transportlaag is de link
tussen de (a) laag en de (b) laag." De Kernpunten schrijven applicatie en dan
netwerk, 5.1 en 5.2 schrijven netwerk en dan applicatie. De oplossing rekent
allebei goed, want de Word kiest zelf niet.

### Firewall (5.5)

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 Windows firewall | host based | de derde afbeelding: een host based firewall staat op een individuele computer |
| 2 waarom toch een network based firewall | een plaats om de regel te zetten, ook voor apparaten waarop je niets kan instellen | staat niet in de tekst, dat zegt de vraag zelf |
| 3 surfen blokkeren | DROP, OUTGOING, TCP, poort 80 | de tweede afbeelding blokkeert verkeer van binnen naar externe websites; de eerste zegt dat de meeste firewalls alleen ACCEPT en DROP gebruiken |

### Test jezelf (5.6)

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 tussen welke lagen | applicatie en netwerk, beide volgordes goed | 5.1 en de Kernpunten, die het zelf omgekeerd schrijven |
| 2 waarmee gescheiden | c, poortnummer | 5.1: MAC en IP horen bij de machine, de poort bij de applicatie |
| 3 standaard poorten | 80, 25, 22 | 5.1 en 5.2 noemen alle drie letterlijk |
| 4 TCP header aanvullen | source port, destination port, sequence number, acknowledge number | de tabel van 5.2, met dezelfde rijen |
| 5 schrap wat niet past | eenvoudiger, snelle, niet | 5.2, UDP header: vier velden, gericht op snelheid, geen hertransmissie |
| 6 hoeveel IPv4 adressen | ongeveer 4 miljard, in de praktijk 3 | 5.3, eerste twee alinea's |
| 7 private en publieke adressen | computers 4 en 0, router 1 en 1 | 5.3 en de tekening: vier PC's achter de switch, de router met een LAN kant en een WAN kant |
| 8 server bereiken vanaf WAN | c, port forwarding | 5.4, de hele sectie |

## Hoofdstuk 6, Applicatie laag

Het laatste hoofdstuk. Hiermee is de hele Word overgezet en is de HTML vanaf nu
de enige bron.

**De antwoorden: nakijken.** Zelfde afspraak en zelfde voorbehoud als bij de vijf
vorige hoofdstukken. In de Word is niets aangeduid. Het hoofdstuk draagt drie
vragen, alle drie in de Test jezelf.

**De drie vragen stonden los van hun tabel.** De tabel van vraag 1 en die van
vraag 2 stonden achter de lijst in plaats van erin, waardoor de lijst brak en
met `start=` verder telde. Ze staan nu in de vraag waar ze bij horen. De woorden
zijn niet aangeraakt.

**Vraag 3 is herschreven, en dat is een ingreep.** In de Word vraagt ze welke
velden je in een gebruikersinterface moet voorzien, met vier mogelijkheden
waarvan er drie juist zijn: IP adres, poortnummer en de keuze TCP of UDP, en het
MAC adres niet. De afspraak is dat een meerkeuzevraag er precies een aanduidt,
dus is de vraag aangepast in plaats van de regel, net zoals bij vraag 1 en 3 van
hoofdstuk 3.

Ze vraagt nu welk veld er *niet* bij hoort. Alle vier de mogelijkheden uit de
Word staan er nog en in dezelfde volgorde; alleen de vraagzin is omgedraaid. Dat
gaat hier makkelijker dan in hoofdstuk 3, want er was al precies een verkeerde
bij, dus er hoefde geen mogelijkheid te verdwijnen of verdubbeld te worden. Wat
de vraag test, blijft hetzelfde: dat een MAC adres niets is wat een gebruiker
intypt.

**Een losse "en" in de invultabel van vraag 1 is weg.** In de Word staat in de
tweede rij, eerste kolom het woordje "en", in een cel waar de student de poort
van HTTP moet schrijven. Er staat verder niets in die rij. Het is een restje en
geen inhoud, en op papier zou de student in een vakje moeten schrijven waar al
iets in staat. Verbeterd in de HTML, want die is vanaf nu de bron.

**De twee gokken van de import zijn opgelost: geen van beide tabellen krijgt een
kopregel.** Bij vraag 1 is de bovenste rij de vraag zelf (de vier protocollen)
en zijn de twee rijen eronder de invulruimte; bij vraag 2 is de bovenste rij de
applicatielaag, de eerste van vijf lagen. Dezelfde keuze als bij de
protocoltabel van 5.6, zodat de twee er op papier hetzelfde uitzien.

**De HTTP requests en responses zijn gewone alinea's.** In 6.2 staan een request
en twee responses uitgeschreven, regel per regel, en elke regel is in de Word een
aparte alinea zonder eigen stijl. Op papier komt er dus alinearuimte tussen
"Host: hogent.be" en "Connection: close". Zo staat het in de Word en zo is het
overgenomen. Wil je er een blok van maken, dan is dat een stijlbeslissing in
`syllabus.css` en geen importkwestie.

**De twee bijschriften op de SSH pagina staan boven hun afbeelding**, niet
eronder: "Commando ingegeven via SSH" en "Commando onderschept in Wireshark".
Dat is de volgorde van de Word en ze is bewust gehouden. Het zijn geen
`figcaption`, want dan zouden ze onder de afbeelding springen en zou de tweede
bij de eerste afbeelding komen te staan.

### Test jezelf (6.7)

| Vraag | Antwoord | Waarop het steunt |
|---|---|---|
| 1 poorten en protocol | HTTP 80, HTTPS 443, SMTP 25, SSH 22, FTP 21, alle vier TCP | 6.2 tot 6.5, elk noemt zijn eigen poort; TCP omdat elk van de vier een volledige overdracht wil |
| 2 encapsulatie aanvullen | applicatie, transport, netwerk, datalink, fysiek | 6.6, dat de vijf lagen in die volgorde doorloopt |
| 3 welk veld hoort er niet bij | a, het MAC adres | 6.6: het destination MAC adres is niet gekend en verandert bij elke hop |

## De kopregel van een tabel: de regel was te ruim

Hoofdstuk 5 bracht een fout in de importer aan het licht die de vier vorige
hoofdstukken ook al raakte. `tblLook firstRow` is alleen een signaal als de
tabelstijl voorwaardelijke opmaak voor de eerste rij ook echt definieert.
Onopgemaaktetabel1 doet dat; Tabelraster en TableGrid definieren helemaal geen
voorwaardelijke opmaak, dus daar staat de vlag aan zonder dat Word ook maar iets
tekent. Een en twintig tabellen in deze Word kregen zo een kopregel die in het
document niet bestaat.

Twee daarvan waren zichtbaar fout en zijn met de hand rechtgezet:

- 4.7 Subnetmasker: de bovenste rij van de AND berekening is het IP adres en niet
  een kop
- 4.18 Test jezelf: de rij MAC van de invultabel is de eerste van drie rijen die
  de student invult

Twee andere waren per toeval juist en zijn blijven staan, nu als gewone
kopregel: de kolomtitels van de Beckhoff tabel in 3.5 en de rij Klasse A / B / C
in 4.18. De importer meldt ze voortaan als "nakijken", en dat is eerlijker: een
vlag die niets tekent is geen bewijs.

## Voor de hele syllabus, gezien tijdens het lezen

**De Word is nieuwer dan de PDF die nu in Orion staat.** De docx is van
29 november 2025, de PDF van 12 september 2025. Wat er de laatste maanden in de
Word bij gekomen is, hebben de studenten dus nooit gezien. De import vertrekt
van de Word, dus dat lost zichzelf op, maar het is goed om te weten dat de
nieuwe PDF meer zal bevatten dan de oude.

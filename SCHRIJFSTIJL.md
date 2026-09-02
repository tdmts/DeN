# Schrijfstijl

Hoe het proza op deze pagina's klinkt. Dit is de enige plek waar die regels staan;
[CLAUDE.md](CLAUDE.md) verwijst hierheen in plaats van de lijst te herhalen.

Het gaat hier **alleen over de vorm van de tekst**. Of een pagina correct aan elkaar hangt is een
technische vraag en hoort bij [`scripts/check-content.py`](scripts/check-content.py). Of een pagina
genoeg uitlegt is een didactische vraag, en die heeft in deze repo nog geen eigen protocol.

**Waar het geldt: overal waar een student meeleest.** Lopende tekst, koppen en kadertitels, de
`lead`, `alt`-teksten, `figcaption`s, en de `name` en `blurb` in [`reference.js`](reference.js). De
site hoort als één stem te klinken, en een blurb op een theoriekaart is even goed tekst als een
alinea.

**Ook in het verslag.** De opdracht staat in een `<!-- verslag -->` blok in `Opdracht.html` en
`scripts/export-verslag.py` maakt daar de docx van. Die tekst is dus gewone paginatekst en valt
hier volledig onder, ook al leest de student ze in Word.

**Waar het niet geldt: de documentatie van de repo zelf.** Dit bestand en CLAUDE.md zijn
werkmateriaal voor wie hier schrijft. De patroontitels hieronder zijn zelf werkwoordloos en
ontkennend, en dat blijft zo: ze zijn de naam van een regel en worden ook zo geciteerd ("patroon 6").

**Taalfouten vallen er buiten.** Een kommasplitsing, een spatiefout, een verkeerd onderwerp bij het
werkwoord: dat is geen stijl. Verzamel ze en leg ze apart voor, zodat de diff van een stijlronde één
soort wijziging bevat.

## Waar dit document vandaan komt

Het is overgenomen uit `tdmts/Microcontrollers`, waar het geschreven is tegen een tekst met een heel
ander probleem: die was *opgevoerd*, met een pointe per alinea. **De tekst van dit vak heeft dat
probleem niet.** Ze komt uit een Brightspace-export en uit Word-documenten, is over meerdere jaren
gegroeid, en is vooral zakelijk tot kaal. Wat er wél in zit: een grapje hier en daar, een emoji, een
terzijde dat niets uitlegt, en de gewone slijtage van tekst die nooit in één keer herlezen is.

Dat betekent twee dingen. De patronen 1 tot 10 zullen hier minder vaak aanslaan dan in de repo waar
ze vandaan komen, en dat is geen reden om ze te schrappen: ze slaan wél aan zodra er nieuwe tekst bij
geschreven wordt, en dat is precies het moment waarop ze nodig zijn. En de voorbeelden hieronder
komen deels nog uit die andere repo, omdat de tekst van dit vak nog geen enkele stijlronde gehad
heeft. Waar deze repo zelf al een echt voorbeeld levert, staat dat er; de rest wordt vervangen
naarmate er hier doorlopen gebeuren.

**Deze repo automatiseert bijna niets hiervan.** `scripts/check-content.py` dwingt één stijlregel af,
de em-dash, als onderdeel van regel 5. Er is geen `--audit` en geen `--fix`. Alles hieronder is dus
een leesregel, en dat is een bewuste keuze: de meeste van deze patronen hebben woorden nodig die ook
volkomen legitiem voorkomen, en een woordenlijst zou vooral goede zinnen afkeuren.

## Wat blijft

Lees dit eerst. Alles hieronder gaat over vorm, en niets ervan is een excuus om korter of karig te
schrijven.

- **Het waarom** achter elke stap, in gewone mededelende zinnen. Een student die niet weet waarom er
  een afsluitweerstand aan elk uiteinde van de bus hoort, heeft aan de opdracht alleen niets.
- **De terugkoppeling** naar wat de student al kan, maar als feit en niet als opbouw. Let hier op de
  bijzonderheid van dit vak: zie patroon 17, want je mag niet zomaar naar een ander labo verwijzen.
- **Concrete voorbeelden.** Die horen in de hoofdzin, niet tussen haakjes. Als een walkietalkie het
  beste voorbeeld van half duplex is, dan is de walkietalkie belangrijk genoeg voor een eigen zin.
- **De kruislinks** naar de theoriepagina's, waar de student het kan nalezen.
- **De je-vorm**, warm en niet formeel. De warmte komt uit de je-vorm en uit het uitleggen van het
  waarom, niet uit ritme of woordkeuze. `men` en `we` gaan allebei naar de je-vorm: `men` is formeel,
  en de inclusieve `we` schuift de student weg van wat hij zelf doet.

  > **Voor:** Voor grotere afstanden of storingsgevoelige omgevingen gebruikt men differential
  > signaling.
  >
  > **Na:** Voor grotere afstanden of storingsgevoelige omgevingen gebruik je differential signaling.

- **Kadertitels die iets zeggen** ("Om reflecties tegen te gaan hoort er 120 &Omega; aan elk
  uiteinde") in plaats van "Belangrijk". Een kop noemt wel zijn onderwerp en niet zijn pointe, en
  bevat geen `geen` of `niet`: zie patroon 6.
- **Volledige code** in een voorbeeld, geen fragmenten, behalve waar de opdracht juist vraagt om een
  fragment aan te vullen.

## Wat eruit gaat

Negentien patronen. Geen enkel patroon is op zich fout: het probleem is dat ze allemaal samen, op
elke pagina, van uitleg een voordracht maken. Patroon 1 tot 11 gaan over opsmuk, 12 en 13 over
woordkeuze, 14 en 15 kwamen er later bij (allebei opsmuk). De nummers liggen vast, ook al loopt de
indeling daardoor niet meer netjes door.

Patroon 16 en 17 zitten een niveau hoger: ze gaan niet over een zin maar over de vorm van een alinea,
en daarom overleeft elke zin afzonderlijk de andere vijftien.

Patroon 18 en 19 staan nog een niveau hoger en zijn in deze repo geschreven: ze gaan niet over de
vorm maar over het onderwerp. Een zin die door 1 tot 17 komt, kan nog altijd over de verkeerde zaak
gaan. Ze horen bij elkaar, want ze zijn de twee sporen die een beslissing van de docent op de pagina
achterlaat: de uitleg waarom (18) en het voorschrift dat eruit volgt (19).

### 1. Geen slotzin die moet blijven hangen

Eindig op de laatste zin die iets vertelt, niet op een zin die iets doet.

> **Voor:** Hier schrijf jij het met `digitalRead()` en `digitalWrite()`, en bewaakt niemand iets.
>
> **Na:** Hier doe je dat zelf met `digitalRead()` en `digitalWrite()`, en de cyclustijd wordt niet
> bewaakt.

Andere voorbeelden van hetzelfde: "Verbind je Tx met Tx, dan zitten twee zenders tegen elkaar te
roepen en luistert er niemand."

### 2. Geen retorische drieslag

Drie parallelle **stellingen** als betoogfiguur.

> **Voor:** Omdat je in echte code programmeert in plaats van in functieblokken, omdat de chip een
> paar euro kost en in het product zelf past, en omdat jij bepaalt wat er aan de pinnen hangt.
>
> **Na:** Zo'n chip kost een paar euro en is klein genoeg om in het product zelf te zitten. Je
> programmeert hem in C++ in plaats van in functieblokken, en je bepaalt zelf wat er aan elke pin
> hangt.

Een opsomming van drie concrete dingen ("USB, Ethernet en SATA") mag wel. Dat is een lijst en geen
figuur.

### 3. Geen retorische vraag als overgang

Zet de bewering neer.

> **Voor:** Waarom? Omdat de compiler slim is, en die slimheid hier tegen je werkt.
>
> **Na:** De reden zit in de compiler, die de variabele in de processor bijhoudt in plaats van hem
> telkens opnieuw uit het geheugen te halen.

Een echte vraag **aan** de student mag natuurlijk wel, want daar hoort een antwoord bij: "Is de
input /RE active low of active high?"

### 4. Geen dubbele punt als aankondiging van een pointe

> **Voor:** Serieel betekent: achter elkaar.
>
> **Na:** Serieel betekent dat de bits achter elkaar over één draad gaan.

Een dubbele punt voor een opsomming, een tabel of een codevoorbeeld is gewoon interpunctie en blijft.

### 5. Geen korte zin voor het effect

> **Voor:** Nu zet je er één regel bij. Eentje maar.
>
> **Na:** Nu zet je er één regel bij.

Ook zo: "Zonder uitzondering.", "Terecht.", "Eén draad." Voeg ze samen met de zin ervoor of laat ze
weg.

De toets is de persoonsvorm. Een zin zonder werkwoord ("Eentje maar.", "Terecht.") gaat weg of gaat
op in de zin ervoor; een korte zin mét persoonsvorm blijft, ook wanneer hij nadruk legt. Hier zijn
geen uitzonderingen op, want dan wordt het opnieuw een oordeel. Een vaste aankondiging die je wil
houden, krijgt gewoon een werkwoord: "Nog een denkoefening." wordt "Denk hier eerst zelf na."

**Alleen in lopende tekst.** Koppen, kadertitels, `alt`-teksten, `figcaption`s en blurbs zijn van
nature naamwoordgroepen ("Het probleem", "Voordelen", "Oplossing"). Daar is een fragment de normale
vorm en geen effectbejag.

### 6. Geen ontkennende opening

Begin bij wat het ding wél is, niet bij wat het niet is.

> **Voor:** Een unmanaged switch kan je niet configureren. Hij leert de MAC-adressen zelf.
>
> **Na:** Een unmanaged switch leert zelf welk MAC-adres achter welke poort zit, en werkt zonder dat
> je er iets aan instelt.

Hier is geen uitzondering op, ook niet wanneer de zin een misvatting corrigeert die de student echt
heeft. De correctie komt dan in dezelfde alinea, na de bewering: niet "Differential signaling heeft
geen massa nodig", maar "Bij differential signaling meet de ontvanger het verschil tussen de twee
draden, dus een gedeelde massa is voor de signaaloverdracht niet meer nodig."

**In koppen geldt dit strenger.** Een kop of kadertitel bevat helemaal geen `geen` of `niet`, ook
niet in het midden. Een beschrijvend `zonder` valt er niet onder. De `id` van een kop blijft
ongewijzigd wanneer de tekst verandert, want andere pagina's linken ernaar.

### 7. Geen bemenste machines

> **Voor:** Wanneer de compiler ziet dat je steeds dezelfde variabele uitleest, denkt hij: die
> verandert hier toch nergens.
>
> **Na:** Wanneer de compiler ziet dat je steeds dezelfde variabele uitleest, houdt hij die waarde
> bij in de processor omdat er in je `loop()` niets aan verandert.

In dit vak ligt dit dichterbij dan het lijkt: een bus, een switch en een transceiver krijgen snel
menselijke werkwoorden. "De switch beslist" en "de transceiver luistert" mogen als vakjargon, want zo
heet het echt; "de switch weet niet goed wat hij ermee moet" is patroon 7.

### 8. Geen verplichte tegenhanger

Niet elke bewering hoeft haar nuance mee. Zet die er alleen bij wanneer de student de afweging echt
zelf moet maken, en dan als informatie en niet als evenwicht.

> **Voor:** Seriële communicatie is trager dan parallel. Al wordt dat natuurlijk ruimschoots
> gecompenseerd, en in de praktijk valt het dus wel mee.
>
> **Na:** Seriële communicatie is per bit trager dan parallel, maar haalt door hogere klokfrequenties
> in de praktijk meer doorvoer.

### 9. Geen vaste openingsformule

"Hier lees je...", "Op deze pagina zie je..." Elke lead die op dezelfde manier begint, maakt de
volgende voorspelbaar. Zeg waar de pagina over gaat in de vorm die bij díe pagina past, en soms is
dat gewoon de eerste feitelijke zin van het onderwerp.

Dit geldt ook voor `overview.html` en `reference.html`. Hun `lead` is de verleiding om boilerplate te
worden, en zes labo's met dezelfde openingszin is precies waar dit patroon over gaat. Elk overzicht
krijgt een `lead` die bij dát labo past.

De `lead` van `Opdracht.html` verdient extra aandacht: die staat ook op de eerste bladzijde van het
verslag, en is voor veel studenten de eerste zin die ze van het labo lezen. Regel 8 van
`scripts/check-content.py` eist dat hij bestaat, niet dat hij goed is.

### 10. Geen theatrale nadruk

Vet en cursief zijn om een **term**, een pinnaam of een componentnaam te markeren, niet om een zin te
laten landen.

> **Voor:** Door hogere klokfrequenties en efficiënte protocollen is seriële communicatie vaak
> **sneller én betrouwbaarder** dan parallel.
>
> **Na:** Door hogere klokfrequenties en efficiënte protocollen haalt seriële communicatie in de
> praktijk meer doorvoer dan parallel, met minder kans op fouten.

Een vetgedrukte **deelzin** valt hier ook onder. De grens ligt niet bij hele zinnen: vet komt om een
woord, een term, een pinnaam of een getal, nooit om een zinsdeel.

### 11. Geen verkleinwoorden als opsmuk

Een verkleinwoord dat een technisch onderdeel gezellig moet maken, klinkt aanstellerig. Noem het ding
bij zijn naam.

> **Voor:** Zoek naar het tekeningetje van het IC met acht pootjes en de namen ernaast.
>
> **Na:** Zoek naar de tekening van het IC met acht aansluitingen en de namen ernaast.

De uitzondering, en die is echt: **een verkleinwoord dat de gangbare vakterm is, blijft.** De
buitenste **pootjes** van een potentiometer heten zo, en een `ezelsbruggetje` heet niet anders. Ook
vaste uitdrukkingen ("tussen haakjes", "een beetje") zijn geen opsmuk. De vraag is niet of er een
verkleinvorm staat, maar of er een gewoon woord bestaat dat hetzelfde zegt.

Dat deze vorm juist hier stoort, heeft een taalkundige grond. Het Nederlands van Nederland gebruikt
verkleinwoorden veel vrijer als verzachter dan het Nederlands van Vlaanderen ("een vraagje", "een
momentje"). Wie in Vlaanderen lesgeeft, leest die vorm dus sneller als aanstellerij dan als
vriendelijkheid. Zie ook patroon 12.

### 12. Belgisch-Nederlands, geen Noord-Nederlandse woordkeuze

De studenten zijn Vlaams, en de cursus is dat ook. Schrijf dus **Nederlands zoals het in Vlaanderen
geschreven wordt**, en vermijd woorden die typisch Noord-Nederlands aanvoelen.

> **Voor:** Met `map()` kun je een waarde van het ene bereik omzetten naar een ander.
>
> **Na:** Met `map()` kan je een waarde van het ene bereik omzetten naar een ander.

Let bij `kunt` en `wilt` op waar het onderwerp staat. In "een waarde die je in je programma kunt
gebruiken" staat er van alles tussen `je` en het werkwoord, en toch is het dezelfde vorm. De Vlaamse
standaardvorm is `kan` en `wil`, waar het onderwerp ook staat.

Verder: `flink` wordt `ruim` of `stevig`, `prima` wordt `goed` of `zonder problemen`, en `eventjes`
wordt `even` of `kort`, of het gaat helemaal weg wanneer de zin het niet nodig heeft (patroon 13).
Preventief ook `hartstikke`, `gaaf`, `lekker` als versterker, en `hoor` of `nou` als toevoegsel aan
het einde van een zin.

**Twee waarschuwingen, en dit is waar zo'n regel misgaat.**

Ten eerste: bij twijfel **wint het Belgische woord**. De scheidslijn ligt niet tussen Belgisch en
standaard, maar tussen schrijftaal en spreektaal. Wat je in een Vlaamse cursus- of krantentekst
geschreven ziet, blijft staan, ook wanneer een woordenboek er "in België" bij zet: "neem daarvoor
best een weerstand van 120 &Omega;", "op het eerste zicht", "verderzetten". Wat alleen in een gesprek
voorkomt, gaat weg: "deftig" voor behoorlijk, "een pak beter", "vijs", "kuisen", "de linkse knop".
Liever een Belgicisme dan een Hollandisme.

Ten tweede: er zijn woorden die alleen Noord-Nederlands *lijken*. `netjes` is gewoon Nederlands en
wordt in Vlaanderen even goed gebruikt, dus dat is geen regionale fout (het is er wel vaak een van
patroon 13). `best` in "je neemt best" is Belgisch en niet Noord-Nederlands. Meet voor je een woord
aan de lijst toevoegt of het in deze repo wel is wat je denkt dat het is.

### 13. Geen vulwoorden

Een bijwoord dat niets toevoegt aan de zin, laat je weg.

> **Voor:** Parallelle communicatie. Dat maakt het zeer complex, want je moet niet alleen je code
> aanpassen maar ook je schakeling.
>
> **Na:** Parallelle communicatie. Dat maakt het complex, want je moet niet alleen je code aanpassen
> maar ook je schakeling.

Let ook op `heel even` (een verzachter op een verzachter), en kijk met dezelfde blik naar
`eigenlijk`, `uiteraard` en `netjes`. `letterlijk` in "`digitalWrite()` zet letterlijk 5 V op een
pin" blijft, want daar betekent het echt iets.

Hier staat met opzet **geen woordenlijst**. De toets is één vraag: verliest de zin iets wanneer je
het bijwoord schrapt? `gewoon` en `precies` zijn de lastigste twee, want die betekenen vaak wel iets
("een gewone digitale uitgang", "precies even breed") en zijn toch vaak vulling. Die vragen een
lezer.

### 14. Geen terzijde als knipoog

Een grapje tussen haakjes dat niets uitlegt, gaat weg. Een emoji ook.

> **Voor:** Het is echt niet eenvoudig om dat betrouwbaar te laten werken. Als je me niet gelooft,
> probeer gerust eens uit :-). Dit lijkt misschien moeilijker maar we spelen 'vals' :-). Bill Gates
> zei ooit dat luie mensen de beste werknemers zijn, omdat luie mensen een moeilijk probleem
> eenvoudig proberen op te lossen.
>
> **Na:** Dat betrouwbaar laten werken is niet eenvoudig. Probeer het gerust eens uit. De oplossing
> is om in plaats van losse bits meer betekenisvolle commando's door te sturen.

Dat voorbeeld komt uit de oorspronkelijke opgave van labo RS485 en is bij het omzetten al geschrapt.
Dezelfde grond als patroon 1: het staat er om te charmeren en niet om te informeren. Een terzijde dat
wél iets zegt, is geen knipoog en blijft, al staat het meestal beter in de hoofdzin (zie de proef
hieronder).

Informele opmaak is iets anders dan een knipoog. `TLDR:` boven een samenvatting kondigt aan wat er
komt en blijft dus staan.

### 15. Beeldspraak alleen waar het gewone woord ontbreekt

Bestaat er een letterlijk woord voor wat je bedoelt, dan schrijf je dat.

> **Voor:** ... terwijl je maar drie pinnen van je Arduino opoffert.
>
> **Na:** ... terwijl je maar drie pinnen van je Arduino gebruikt.

Een beeld dat een mechanisme uitlegt, is uitleg en valt onder *Wat blijft*. Het verschil zit in wat
er gebeurt als je het beeld schrapt: verdwijnt er alleen kleur, dan was het opsmuk; verdwijnt er
begrip, dan hoort het er.

Een stijlronde vervangt een beeld **alleen wanneer de letterlijke formulering al op de pagina staat**,
zoals `opoffert` naast `gebruikt`. Vraagt de vervanging een technisch feit dat er nog niet staat, dan
is het geen stijlingreep meer en gaat de zin naar de vragenlijst van die doorloop. Zo blijft overeind
dat een stijlronde nooit verzint wat een pagina beweert.

### 16. Stel vast, beoordeel niet

Een alinea zegt wat er gebeurt. Ze zegt er niet bij hoe erg, hoe belangrijk of hoe gemeen dat is.

> **Voor:** Zonder afsluitweerstand krijg je reflecties op de lijn, en dat is meteen de vervelendste
> fout van allemaal om te vinden.
>
> **Na:** Zonder afsluitweerstand weerkaatst het signaal aan het uiteinde van de lijn en stoort het
> zichzelf. De ontvanger leest dan bits die de zender niet gestuurd heeft.

Het oordeel komt in drie vormen, en alle drie gaan ze weg. **De rangschikking:** "Dit is de
gevaarlijkste van de drie", "die test is geen luxe". **De aankondiging:** "Twee dingen zijn de moeite
om apart te bekijken", die alleen zegt dat er iets komt en het meteen weegt. **De slotwaardering:**
een zin die het feit uit de vorige zin nog eens beoordeelt in plaats van het te zeggen.

De toets: schrap het waarderende zinsdeel. Staat het feit er dan nog, dan was het een oordeel.

Dit is niet hetzelfde als patroon 1, al overlappen ze aan het eind van een alinea. Patroon 1 gaat
over een zin die moet blijven hangen en die je schrapt. Hier gaat het over de gewoonte om de lezer te
vertellen wat hij van een feit moet vinden, en de ingreep is meestal geen schrapping maar een
verplaatsing: het gewicht gaat de mededeling in.

Een waarschuwing is geen oordeel. "Sluit niets aan voor je schema gecontroleerd is" is een instructie
en blijft, ook in een `warning`-kader. "Dit is de gevaarlijkste fout van de drie" is een rangschikking
en gaat weg. En één keer per pagina mag een echte klemtoon: het probleem is de herhaling, want een
tekst die alles weegt, weegt niets meer.

### 17. Bekend materiaal krijgt minder plaats, maar reken niet op een ander labo

Alles even diep uitleggen is zelf een vorm van opvoering. Wat de student aantoonbaar al gezien heeft,
krijgt één regel en een verwijzing; het nieuwe krijgt de ruimte.

**En hier wijkt dit vak af van de repo waar dit document vandaan komt.** Bij Microcontrollers bouwen
labo 0 tot 7 op elkaar voort, dus daar mag een pagina rekenen op het vorige labo. **Hier niet.** De
labo's zijn onafhankelijke modules en de groepen roteren erdoor, dus je weet niet welke labo's een
student al gedaan heeft, en zelfs niet in welke volgorde. Een zin als "zoals je in het labo over
wireshark gezien hebt" is voor de helft van de groep onzin.

Waar je wél op mag rekenen, en dat is de hele lijst:

1. **De theorietrack**, de hoorcolleges en de syllabus. Die loopt wel in volgorde en gaat aan de
   labo's vooraf.
2. **Een eerdere theoriepagina van hetzelfde labo.** Binnen een module ligt de volgorde vast in
   `reference.js`, en de hub toont ze in die volgorde. `DifferentialSignaling.html` mag dus rekenen
   op `SingleEndedSignaling.html`, en doet dat ook.
3. **Een eerdere schakeling van dezelfde opdracht.** Schakeling 6 mag rekenen op schakeling 5.

Moet een labo iets uit een ander labo hebben, dan hoort die stof in de theorietrack of in de
theoriepagina's van dat labo zelf, niet in een verwijzing.

Zelfde rem als bij patroon 15. Een stijlronde krimpt een uitleg **alleen wanneer een van de drie
bronnen hierboven de stof aantoonbaar behandelt**, en de verwijzing komt ervoor in de plaats. Kan je
dat niet aanwijzen, dan is inkorten geen stijlingreep. Nieuwe stof korter maken valt hier nooit
onder.

### 18. De student was niet bij het gesprek

Schrijf over het vak, nooit over de cursus als bouwwerk. Twee soorten zinnen sluipen hier binnen, en
ze hebben dezelfde oorzaak: ze bestaan door een gesprek waar de lezer niet bij was.

**De geschiedenis van het materiaal.** Wat vroeger ergens anders stond, wat verplaatst is, wat er
nieuw bij komt. Een student die dit vak voor het eerst doet heeft geen vorige versie gezien, en kan
zo'n zin dus alleen lezen als een raadsel.

> **Voor:** De theorie blijft wel op de site staan. De zes theoriepagina's en de zelftest lees je op
> het scherm.
>
> **Na:** Lees de zes theoriepagina's en maak de zelftest voor je aan de opdracht begint.

**De verantwoording van een keuze.** Waarom het een document is en geen invulveld, waarom het een PDF
is en geen pagina: dat is een afweging van de docent. De student heeft de instructie nodig, niet het
argument. Geef je hem het argument toch, dan lees je als iemand die zich verdedigt tegen een bezwaar
dat hij niet gemaakt heeft.

> **Voor:** Vul dit document in terwijl je werkt en bewaar het op je OneDrive. Zo blijft het bewaard
> als je computer crasht of als je van pc wisselt, en kan je eraan verder werken wanneer je
> netwerkverbinding wegvalt.
>
> **Na:** Vul dit document in terwijl je werkt.

Let op wat er in dat voorbeeld overblijft. Schrap je alleen de verantwoording, dan houd je "bewaar
het op je OneDrive" over, en dat is een voorschrift dat uit hetzelfde gesprek komt. Zie patroon 19:
de twee treden bijna altijd samen op, en de tweede is de makkelijkste om te missen.

Het verraderlijke is dat zulke zinnen ontstaan op het moment dat je iets verandert of beslist, en dan
volkomen logisch klinken: het argument ligt vers op tafel en je schrijft het mee op. Een dag later
zijn het de enige zinnen op de pagina die niemand kan plaatsen. Let dus vooral op wat je schrijft
tijdens een verbouwing, en op de woorden die erbij horen: *blijft wel*, *staat nu*, *voortaan*,
*vanaf dit jaar*, *zoals vroeger*, en elke *zo blijft*, *zodat je* of *dan kan je* die uitlegt waarom
de opdracht is zoals ze is.

Dit is een leesregel, geen scriptregel, en dat is een bewuste keuze: de woorden hierboven komen ook
volkomen legitiem voor. "Vroeger was parallel populair" op de pagina over seriële communicatie gaat
over de techniek, niet over de cursus, en een woordenlijst kan dat verschil niet zien.

De uitzondering is de vakinhoud zelf, en die is ruim. De geschiedenis van een standaard, een techniek
of een component hoort er wel bij, en een reden die iets **technisch** verklaart ook: "zet er een
pull-up op, anders zweeft de ingang" is geen verantwoording maar leerstof. De scheidslijn ligt niet
tussen instructie en reden, maar tussen een reden over het vak en een reden over de cursus.

### 19. Alleen de instructies die bij de opdracht horen

Zeg wat je van de student nodig hebt, niet hoe hij zijn werk organiseert. Waar hij zijn bestand
bewaart, in welke map, met welke naam, op welk toestel: dat is zijn zaak.

> **Voor:** Vul dit document in terwijl je werkt en bewaar het op je OneDrive.
>
> **Na:** Vul dit document in terwijl je werkt.

De toets is één vraag: **verandert het iets aan wat wij ontvangen of beoordelen?** Zo ja, dan is het
een instructie en hoort ze er. "Je dient dit in via de opdracht op Orion" blijft, want anders komt
het nergens aan. "Laat je schakeling controleren voor je verder gaat" blijft, want dat is de
werkvorm van het labo. "Zet je naam bovenaan" blijft, als je die naam nodig hebt om te verbeteren.
"Bewaar het op je OneDrive" gaat weg, want of hij dat doet zien wij nooit.

Dit patroon en patroon 18 komen uit dezelfde bron. Een keuze die wij maken, laat twee sporen na op
de pagina: de uitleg waarom (18) en het voorschrift dat eruit volgt (19). De eerste valt op, want die
klinkt defensief. De tweede klinkt als een gewone instructie en blijft daardoor staan, ook nadat de
uitleg geschrapt is. Kom je een zin uit 18 tegen, kijk dan meteen naar de zin ernaast.

Er is een randgeval, en dat is waar deze regel misgaat: een voorschrift over de werkwijze **wordt**
onze zaak zodra het de evaluatie raakt. In een labo waar twee studenten samen één opstelling delen,
is "spreek af wie zendt en wie ontvangt" wél een instructie, want het bepaalt wat elk van beiden
kan tonen. De vraag is niet of het over zijn werkwijze gaat, maar of wij het merken.

## Spelling en notatie

### `led`, niet `LED`

In de lopende tekst schrijf je `led` en `leds`, met een hoofdletter alleen waar een zin of een titel
begint.

> **Voor:** De LED zou moeten branden als je de D lijn van de zender op hoog zet.
>
> **Na:** De led hoort te branden als je de D-lijn van de zender hoog zet.

In code blijft alles zoals het is. `pinLED1` is een naam die de student overtypt, en in labo RS485 is
`"LED1"` de boodschap die over de bus gaat (`mySerial.println("LED1")`), dus daar is de kapitaal
gegeven. Schrijft een pagina de afkorting ooit voluit, dan blijft `LED` staan in "LED staat voor
Light Emitting Diode".

### De naam van een standaard houdt zijn streepje, een mapnaam niet

In de lopende tekst schrijf je de standaard zoals de standaard zichzelf schrijft: **RS-485**,
**RS-232**. In een bestandsnaam, een mapnaam, een module-id in `reference.js` en een `<h1>` of
`<title>` die daarnaar verwijst, gebruik je de vorm zonder leesteken: `Labo/RS485/`, `rs485`,
"Labo RS485".

Dat is dezelfde scheiding als bij `led` tegenover `pinLED`: proza volgt de taal, een identifier volgt
wat een pad en een sleutel kunnen dragen. Zonder die afspraak staan beide vormen door elkaar op één
pagina, wat vandaag al bijna gebeurde.

### Toestelinvoer en toestelantwoord blijven letterlijk

Cisco-configuratie, terminaloutput en wat een toestel terugstuurt, neem je over zoals het is. Geen
herformattering, geen ingekorte prompts, geen rechtgezette hoofdletters, ook niet wanneer het lelijk
staat. De student vergelijkt wat op zijn scherm staat met wat op de pagina staat, en elk verschil
dat wij aanbrengen is er een dat hij moet uitzoeken. `scripts/check-content.py` houdt daarom regel 5
bewust weg van `.terminal-window` en `.config-window`.

Dit geldt niet voor code die de student overtypt. Die volgt wel de huisstijl: Allman-accolades en
spaties rond de operatoren, afgedwongen door regel 5.

### En, nog steeds: geen em-dashes

Geen `—` en geen `&mdash;`, nergens in de tekst. Gebruik een komma, een dubbele punt, een punt of
"en"/"maar". Dit is de enige stijlregel die de check afdwingt, als onderdeel van regel 5. Er is geen
`--fix` in deze repo, dus je repareert ze zelf.

## De proef

Bij twijfel over een alinea, drie vragen:

1. **Zou ik dit zo tegen een student zeggen die naast me zit?** Een pointe die je aan een tafel niet
   uitspreekt, hoort ook niet op de pagina.
2. **Wat gebeurt er als ik de laatste zin schrap?** Verdwijnt er informatie, dan hoort ze er. Voelt
   de alinea alleen minder af, dan was het een slotzin uit patroon 1.
3. **Staat het interessantste stuk in de hoofdzin?** Als je beste voorbeeld tussen haakjes of achter
   een dubbele punt staat, staat het op de verkeerde plaats.

En sinds patroon 18 en 19 nog twee, voor alles wat je schrijft terwijl je aan de repo verbouwt:

4. **Zou deze zin er ook staan als de cursus altijd al zo geweest was?** Zo niet, dan gaat ze over
   ons werk en niet over het vak (patroon 18).
5. **Merken wij het als hij dit niet doet?** Zo niet, dan is het geen instructie maar bemoeienis
   (patroon 19).

**Er is nog geen ijkpunt.** Bij Microcontrollers is er één pagina die volledig volgens dit document
herschreven is en die je naast haar vorige versie kan leggen. Hier heeft nog geen enkele pagina een
volledige stijlronde gehad: de theoriepagina's van labo RS485 komen uit de Brightspace-export en zijn
bij het omzetten alleen op de duidelijkste punten aangepast. `Labo/RS485/Theorie/WatIsRS485.html` is
de kandidaat, want die is kort en staat het dichtst bij wat de andere labo's nodig gaan hebben.

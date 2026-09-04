/*
 * reference.js -- het manifest van alle theoriepagina's, per module.
 *
 * Dit is de enige plaats waar een theoriepagina wordt opgesomd. Voeg een pagina
 * hier toe, niet in de HTML van een andere pagina: de theoriehub
 * (reference-dashboard.js) en de navigatiebalk (back-link.js) lezen allebei
 * dit bestand.
 *
 * Een module-id is de sleutel hieronder (rs485, procurve, ...). Het is de
 * mapnaam onder Labo/ in kleine letters, en het staat ook in de
 * localStorage-sleutels, dus hernoemen wist de vinkjes van je studenten.
 *
 * Een href is een kale bestandsnaam naast reference.html, of een relatief pad
 * naar een document (../../../datasheets/...). Nooit een volledige
 * https://tdmts.github.io/DeN/-URL: die stuurt elke klik in een lokale preview
 * door naar de live site.
 *
 * REEKS -- welke categorieen samen een Orion-topic vormen
 *
 * Een labo heeft meerdere menu-items in Orion: Inleiding (overview.html),
 * Theorie (Theorie/reference.html), Opdracht (Opdracht.html), en de opdracht
 * waar de student zijn verslag indient. Bij ManagedSwitch zijn dat er meer,
 * want dat labo heeft twee opdrachten.
 *
 * Een reeks is zo'n menu-item. Alles wat dezelfde reeks draagt, hoort bij
 * hetzelfde item: het is een leesvolgorde met een eigen begin, en de hele
 * navigatie blijft erbinnen. back-link.js hangt er zijn "Volgende"-ketting,
 * zijn teller en zijn labomenu aan op, en reference-dashboard.js toont per hub
 * de categorieen van een reeks. Een andere reeks is een ander menu-item, en
 * daar loopt niets naartoe: het Orion-menu verspringt niet mee met de iframe,
 * dus zo'n sprong laat het menu een pagina aanwijzen die de student niet leest.
 *
 * Bij RS485 horen Theorie en Zelftest in dezelfde reeks: de zelftest gaat over
 * de theorie ervoor en is de laatste stap ervan, dus de student komt er met
 * "Volgende" vanzelf uit. Bij ManagedSwitch zijn de theorie en de oefeningen in
 * Packet Tracer wel twee reeksen: dat is ander werk, met een eigen indiening en
 * een eigen menu-item, en na de laatste theoriepagina doorklikken naar een
 * oefening zou een volgorde suggereren die er niet is.
 *
 * De naam die de student op de knop ziet is de naam van de EERSTE categorie van
 * de reeks. Daarom staat er op de zelftest van RS485 "Theorie 7 / 7" en niet
 * "Zelftest 1 / 1": hij is de zevende stap van de theorie.
 *
 * Een categorie met alleen documenten (Datasheets, Handleidingen, Software)
 * draagt de reeks waar ze bij hoort, en dat is de theorie: die documenten
 * staan op de theoriehub en horen bij dat menu-item. In een ketting komen ze
 * niet terecht, want een PDF kan de navigatiebalk niet dragen, dus zo'n
 * categorie levert nul stappen en verandert niets aan de teller.
 *
 * Elke categorie zet zijn reeks er expliciet bij. Zonder die regel valt ze van
 * de hub, en dat is precies het soort stille fout waar regel 2 van
 * scripts/check-content.py op staat.
 */
window.LAB_REFERENCE = {
    /*
     * De syllabus is de hoorcollegetrack, en ze werkt anders dan een labo: wat
     * de student krijgt is een PDF, en die wordt uit deze pagina's gegenereerd
     * door scripts/export-syllabus.py. Het manifest bepaalt daarbij de
     * volgorde van het gedrukte document, precies zoals het hier de volgorde
     * van de hub bepaalt, zodat de twee niet uit elkaar kunnen lopen.
     *
     * Een categorie is een hoofdstuk en krijgt in de PDF zijn nummer uit haar
     * plaats in deze lijst, niet uit een veld: een nummer dat hier staat, is
     * een tweede waarheid naast de volgorde. Het Voorwoord draagt geen nummer
     * en zegt dat met genummerd: false.
     */
    syllabus: {
        name: 'Syllabus',
        categories: [
            {
                name: 'Voorwoord',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'voorwoord',
                        name: 'Voorwoord',
                        blurb: 'Waarom een computernetwerk afspraken nodig heeft, en welk lagenmodel deze cursus als referentie gebruikt.',
                        href: 'Voorwoord.html'
                    }
                ],
                genummerd: false
            },
            {
                name: 'TCP/IP model',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'tcpip-overzicht',
                        name: 'Kernpunten en studievragen',
                        blurb: 'Wat je uit dit hoofdstuk moet meenemen, en de vragen waarop je achteraf een antwoord hoort te hebben.',
                        href: 'TcpIpModel/Overzicht.html'
                    },
                    {
                        id: 'tcpip-osi-model',
                        name: 'OSI model',
                        blurb: 'Zeven lagen, ontstaan uit de standaardisatie die een eind maakte aan hardware die alleen met zichzelf praatte.',
                        href: 'TcpIpModel/OsiModel.html'
                    },
                    {
                        id: 'tcpip-tcpip-model',
                        name: 'TCP/IP model',
                        blurb: 'Het model dat in de praktijk gebruikt wordt, in de vijflagenvorm die deze cursus aanhoudt, naast OSI gelegd.',
                        href: 'TcpIpModel/TcpIpModel.html'
                    },
                    {
                        id: 'tcpip-test-jezelf',
                        name: 'Test jezelf',
                        blurb: 'Vijf vragen over de lagen en waar ze voor dienen.',
                        href: 'TcpIpModel/TestJezelf.html'
                    }
                ]
            },
            {
                name: 'Fysieke laag',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'fysiek-overzicht',
                        name: 'Kernpunten en studievragen',
                        blurb: 'Wat je uit dit hoofdstuk moet meenemen, en de vragen waarop je achteraf een antwoord hoort te hebben.',
                        href: 'FysiekeLaag/Overzicht.html'
                    },
                    {
                        id: 'fysiek-inleiding',
                        name: 'Inleiding',
                        blurb: 'Waar de fysieke laag over gaat: het transmissiemedium, de connectoren en de signalen die erop gezet worden.',
                        href: 'FysiekeLaag/Inleiding.html'
                    },
                    {
                        id: 'fysiek-ethernetkabel',
                        name: 'Ethernetkabel',
                        blurb: 'Aderparen, afschermingsgraad en categorie: waarin UTP van SFTP verschilt en wat een cat5e, cat6 of cat7 aankan.',
                        href: 'FysiekeLaag/Ethernetkabel.html'
                    },
                    {
                        id: 'fysiek-rj45-vs-m12',
                        name: 'RJ-45 vs M12',
                        blurb: 'Vragen bij een tekst over de twee connectoren, en waarom de industrie er een nodig heeft die tegen trillingen en stof kan.',
                        href: 'FysiekeLaag/Rj45VsM12.html'
                    },
                    {
                        id: 'fysiek-glasvezelkabel',
                        name: 'Glasvezelkabel',
                        blurb: 'Licht in plaats van stroom. Singlemode of multimode, LC of SC, en welk OM- of OS-type bij welke afstand hoort.',
                        href: 'FysiekeLaag/Glasvezelkabel.html'
                    },
                    {
                        id: 'fysiek-netwerkkaarten',
                        name: 'Netwerkkaarten',
                        blurb: 'Waar de kabel in gaat: een netwerkinterface voor koper via RJ-45, of voor glasvezel via een SFP module.',
                        href: 'FysiekeLaag/Netwerkkaarten.html'
                    },
                    {
                        id: 'fysiek-oefening-switch-bekabelen',
                        name: 'Oefening: switch bekabelen',
                        blurb: 'Kies voor de HP ProCurve uit het labo een koperkabel, een SFP module en een glasvezelkabel, en verklaar je keuze.',
                        href: 'FysiekeLaag/OefeningSwitchBekabelen.html'
                    },
                    {
                        id: 'fysiek-netwerktopologie',
                        name: 'Netwerktopologie',
                        blurb: 'Line, bus, ring, ster en mesh: hoe je hosts aan elkaar knoopt, en wat elke vorm kost aan kabel en aan betrouwbaarheid.',
                        href: 'FysiekeLaag/Netwerktopologie.html'
                    },
                    {
                        id: 'fysiek-test-jezelf',
                        name: 'Test jezelf',
                        blurb: 'Acht vragen over kabels, connectoren en topologieën.',
                        href: 'FysiekeLaag/TestJezelf.html'
                    }
                ]
            },
            {
                name: 'Datalink laag',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'datalink-overzicht',
                        name: 'Kernpunten en studievragen',
                        blurb: 'Wat je uit dit hoofdstuk moet meenemen, en de vragen waarop je achteraf een antwoord hoort te hebben.',
                        href: 'DatalinkLaag/Overzicht.html'
                    },
                    {
                        id: 'datalink-inleiding',
                        name: 'Inleiding',
                        blurb: 'De laag die van een reeks enen en nullen een frame maakt, het op fouten controleert en nagaat voor wie het bestemd is.',
                        href: 'DatalinkLaag/Inleiding.html'
                    },
                    {
                        id: 'datalink-frame',
                        name: 'Frame',
                        blurb: 'Veld voor veld door een ethernet frame: preamble, adressen, EtherType, data en de controlesom achteraan.',
                        href: 'DatalinkLaag/Frame.html'
                    },
                    {
                        id: 'datalink-mac-adres',
                        name: 'MAC adres',
                        blurb: 'Achtenveertig bits die de fabrikant vastlegt, in twee helften: wie de kaart maakte en het hoeveelste exemplaar ze is.',
                        href: 'DatalinkLaag/MacAdres.html'
                    },
                    {
                        id: 'datalink-lan',
                        name: 'Local Area Network (LAN)',
                        blurb: 'Een netwerk binnen een begrensd gebied, waarin apparaten elkaar via een switch en hun MAC adres bereiken.',
                        href: 'DatalinkLaag/LocalAreaNetworkLan.html'
                    },
                    {
                        id: 'datalink-wan',
                        name: 'Wide Area Network (WAN)',
                        blurb: 'Wat er nodig is om lokale netwerken op verschillende locaties aan elkaar te knopen, met het internet als grootste voorbeeld.',
                        href: 'DatalinkLaag/WideAreaNetworkWan.html'
                    },
                    {
                        id: 'datalink-apparaten',
                        name: 'Apparaten op een computernetwerk',
                        blurb: 'Hub, netwerkkaart, powerline adapter en switch, tot de industriële en de managed uitvoering, met vragen bij de datasheet.',
                        href: 'DatalinkLaag/ApparatenOpEenComputernetwerk.html'
                    },
                    {
                        id: 'datalink-vlan',
                        name: 'Virtual LAN (VLAN)',
                        blurb: 'Eén set switches logisch opdelen in gescheiden netwerken, en de tag in het frame waarmee dat gebeurt.',
                        href: 'DatalinkLaag/VirtualLanVlan.html'
                    },
                    {
                        id: 'datalink-qos',
                        name: 'Layer 2 Quality Of Service (QOS)',
                        blurb: 'Drie bits in dezelfde tag geven een frame voorrang, wat telt zodra spraak, video of een machine over het netwerk gaat.',
                        href: 'DatalinkLaag/Layer2QualityOfServiceQos.html'
                    },
                    {
                        id: 'datalink-arp',
                        name: 'Address Resolution Protocol (ARP)',
                        blurb: 'Hoe een host bij een IP adres het bijbehorende MAC adres opvraagt, en waarom hij het antwoord bijhoudt.',
                        href: 'DatalinkLaag/AddressResolutionProtocolArp.html'
                    },
                    {
                        id: 'datalink-wifi',
                        name: '802.11 Wifi',
                        blurb: 'De ISM banden, de standaarden van 802.11b tot Wifi 7, en waar SSID, channel bonding en MIMO vandaan komen.',
                        href: 'DatalinkLaag/80211Wifi.html'
                    },
                    {
                        id: 'datalink-oefening-wifi-security',
                        name: 'Oefening Wifi security mode',
                        blurb: 'Zes vragen over WEP, WPA, WPA2 en WPA3: welke je vandaag nog instelt en welke je beter laat staan.',
                        href: 'DatalinkLaag/OefeningWifiSecurityMode.html'
                    },
                    {
                        id: 'datalink-test-jezelf',
                        name: 'Test jezelf',
                        blurb: 'Eenentwintig vragen over frames, MAC adressen, switches, virtuele netwerken en wifi.',
                        href: 'DatalinkLaag/TestJezelf.html'
                    }
                ]
            }
        ]
    },

    rs485: {
        name: 'Labo RS485',
        categories: [
            {
                name: 'Theorie',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'informatie-overdragen',
                        name: 'Informatie overdragen',
                        blurb: 'Welk medium draagt een signaal, en welke afspraken moeten zender en ontvanger maken voor ze elkaar begrijpen?',
                        href: 'InformatieOverdragen.html'
                    },
                    {
                        id: 'single-ended-signaling',
                        name: 'Single ended signaling',
                        blurb: 'Een datalijn en een massalijn. De eenvoudigste manier om een bit op een kabel te zetten, en waar ze tekortschiet.',
                        href: 'SingleEndedSignaling.html'
                    },
                    {
                        id: 'differential-signaling',
                        name: 'Differential signaling',
                        blurb: 'Twee datalijnen met tegengestelde signalen. Waarom ruis daardoor grotendeels wegvalt en de massa niet meer nodig is.',
                        href: 'DifferentialSignaling.html'
                    },
                    {
                        id: 'serieel-vs-parallel',
                        name: 'Serieel vs parallel communiceren',
                        blurb: 'Twaalf bits over twaalf draden of over één draad na elkaar. Wat je wint en wat je verliest.',
                        href: 'SerieelVsParallel.html'
                    },
                    {
                        id: 'simplex-en-duplex',
                        name: 'Simplex en half / full duplex',
                        blurb: 'In hoeveel richtingen mag het verkeer, en wat gebeurt er als twee partijen tegelijk beginnen te zenden?',
                        href: 'SimplexEnDuplex.html'
                    },
                    {
                        id: 'wat-is-rs485',
                        name: 'Wat is RS-485?',
                        blurb: 'De standaard zelf: bustopologie, 1200 meter, afsluitweerstanden, en het verschil met RS-232.',
                        href: 'WatIsRS485.html'
                    }
                ]
            },
            {
                name: 'Zelftest',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'test-jezelf-rs485',
                        name: 'Test jezelf',
                        blurb: 'Controleer of de theorie hierboven blijft hangen. Bij elk antwoord staat waar je het kan nalezen.',
                        href: 'TestJezelf.html'
                    }
                ]
            },
            {
                name: 'Datasheets',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'datasheet-sn75176a',
                        name: 'Datasheet SN75176A',
                        blurb: 'De transceiver die je in het labo gebruikt. Je hebt ze nodig voor het eerste deel van de opdracht.',
                        href: '../../../datasheets/sn75176a.pdf'
                    }
                ]
            }
        ]
    },
    managedswitch: {
        name: 'Labo Managed switch',
        categories: [
            {
                name: 'Theorie',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'lan',
                        name: 'LAN',
                        blurb: 'Wat een lokaal netwerk is, en welke twee toestellen je erin terugvindt.',
                        href: 'LAN.html'
                    },
                    {
                        id: 'unmanaged-switch',
                        name: 'Unmanaged switch',
                        blurb: 'De gewone switch: werkt met frames op laag 2, en verder valt er niets in te stellen.',
                        href: 'UnmanagedSwitch.html'
                    },
                    {
                        id: 'managed-switch',
                        name: 'Managed switch',
                        blurb: 'Wat er bovenop komt zodra je de switch wel kan configureren, en langs welke drie wegen je dat doet.',
                        href: 'ManagedSwitch.html'
                    },
                    {
                        id: 'vlan',
                        name: 'VLAN',
                        blurb: 'Eén fysiek netwerk opsplitsen in logisch gescheiden netwerken, zonder een tweede kabel te trekken.',
                        href: 'VLAN.html'
                    },
                    {
                        id: 'trunk-port-vs-access-port',
                        name: 'Trunk port vs access port',
                        blurb: 'Welke poort draagt één VLAN naar een toestel, welke draagt ze allemaal naar de volgende switch, en wat tagged betekent.',
                        href: 'TrunkPortVsAccessPort.html'
                    },
                    {
                        id: 'spanning-tree-protocol',
                        name: 'Spanning Tree Protocol',
                        blurb: 'Waarom een ring van switches zonder STP het netwerk platlegt, en hoe het protocol dat voorkomt.',
                        href: 'SpanningTreeProtocol.html'
                    },
                    {
                        id: 'quality-of-service',
                        name: 'Quality of Service (QoS)',
                        blurb: 'Dringend verkeer voorrang geven, en waarom dat een voorrangsregel is en geen garantie.',
                        href: 'QualityOfService.html'
                    }
                ]
            },
            {
                name: 'Zelftest',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'test-jezelf-managedswitch',
                        name: 'Test jezelf',
                        blurb: 'Controleer of de theorie hierboven blijft hangen. Bij elk antwoord staat waar je het kan nalezen.',
                        href: 'TestJezelf.html'
                    }
                ]
            },
            {
                name: 'Packet Tracer',
                reeks: 'oefeningen',
                topics: [
                    {
                        id: 'opdracht-packet-tracer',
                        name: 'Opdracht Packet Tracer',
                        blurb: 'Wat je thuis doet, in welke volgorde, en wat je op het einde indient. Begin hier.',
                        href: '../PacketTracer/Opdracht.html'
                    },
                    {
                        id: 'soho-netwerk',
                        name: 'SOHO netwerk',
                        blurb: 'Een klein thuisnetwerk opbouwen: router met DHCP en wifi, een pc, een laptop en een server.',
                        href: '../PacketTracer/SohoNetwerk.html'
                    },
                    {
                        id: 'reset-factory-settings',
                        name: 'Reset factory settings',
                        blurb: 'Twee pc\'s die elkaar niet bereiken. Je zet de switch terug op fabrieksinstellingen via de CLI.',
                        href: '../PacketTracer/ResetFactorySettings.html'
                    },
                    {
                        id: 'save-settings',
                        name: 'Save settings',
                        blurb: 'Een wijziging die een herstart overleeft: van running-config naar startup-config.',
                        href: '../PacketTracer/SaveSettings.html'
                    },
                    {
                        id: 'vlan-basic',
                        name: 'VLAN op 1 switch',
                        blurb: 'Twee VLAN\'s op één switch, met de clients en de servers van elkaar gescheiden.',
                        href: '../PacketTracer/VlanBasic.html'
                    },
                    {
                        id: 'troubleshooting',
                        name: 'Troubleshooting',
                        blurb: 'Een netwerk dat niet werkt en waar resetten niet helpt. Je zoekt zelf waar het misloopt.',
                        href: '../PacketTracer/Troubleshooting.html'
                    },
                    {
                        id: 'vlan-advanced',
                        name: 'VLAN over 2 switches',
                        blurb: 'Dezelfde twee VLAN\'s, nu over twee switches, met access ports en een trunk ertussen.',
                        href: '../PacketTracer/VlanAdvanced.html'
                    },
                    {
                        id: 'spanning-tree',
                        name: 'Spanning Tree in Packet Tracer',
                        blurb: 'Drie switches in een ring met STP uitgeschakeld op VLAN 10. Je zet het terug aan.',
                        href: '../PacketTracer/SpanningTree.html'
                    },
                    {
                        id: 'zelfstandige-oefening',
                        name: 'Zelfstandige oefening',
                        blurb: 'Het deel dat je indient: drie switches, twee VLAN\'s, trunks en Spanning Tree, zelf opgebouwd.',
                        href: '../PacketTracer/ZelfstandigeOefening.html'
                    }
                ]
            },
            {
                name: 'Handleidingen',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'handleiding-hp-procurve-2810',
                        name: 'Handleiding HP ProCurve 2810',
                        blurb: 'De switch die in het labo op tafel staat. Je hebt ze nodig zodra een commando niet doet wat je verwacht.',
                        href: '../../../datasheets/hp-procurve-2810-switch-series-handleiding.pdf'
                    },
                    {
                        id: 'handleiding-cisco-2960',
                        name: 'Handleiding Cisco Catalyst 2960',
                        blurb: 'De switch uit de oefeningen in Packet Tracer. Ter info, je hebt ze niet nodig om de oefeningen te maken.',
                        href: '../../../datasheets/cisco-catalyst-2960-handleiding.pdf'
                    }
                ]
            }
        ]
    },
    draadloosnetwerk: {
        name: 'Labo Draadloos netwerk',
        categories: [
            {
                name: 'Theorie',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'ip-adres-en-dhcp',
                        name: 'IP-adres en DHCP',
                        blurb: 'Welk adres je toestel krijgt, wie het uitdeelt, en waarom je in dit labo op automatisch zet.',
                        href: 'IPAdresEnDHCP.html'
                    },
                    {
                        id: 'ssid',
                        name: 'SSID',
                        blurb: 'De naam van een draadloos netwerk, waarom je router er twee uitzendt, en waarom die naam niets bewijst.',
                        href: 'SSID.html'
                    },
                    {
                        id: 'wireless-mode',
                        name: 'Wireless mode',
                        blurb: 'b, g, n, ac: opeenvolgende generaties, wat mixed mode je kost, en welke band welke draagt.',
                        href: 'WirelessMode.html'
                    },
                    {
                        id: 'wireless-channels',
                        name: 'Wireless channels',
                        blurb: 'De band is opgedeeld in kanalen. Hoe je in inSSIDer ziet met wie je die deelt, en hoe je kiest.',
                        href: 'WirelessChannels.html'
                    },
                    {
                        id: 'channel-bonding',
                        name: 'Channel bonding',
                        blurb: 'Twee of acht kanalen aan elkaar plakken voor meer snelheid, en wanneer dat je net trager maakt.',
                        href: 'ChannelBonding.html'
                    },
                    {
                        id: 'beveiliging',
                        name: 'Beveiliging',
                        blurb: 'WEP, WPA, WPA2 en WPA3, het verschil tussen TKIP en AES, en waar een PSK voor staat.',
                        href: 'Beveiliging.html'
                    }
                ]
            },
            {
                name: 'Zelftest',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'test-jezelf-draadloosnetwerk',
                        name: 'Test jezelf',
                        blurb: 'Controleer of de theorie hierboven blijft hangen. Bij elk antwoord staat waar je het kan nalezen.',
                        href: 'TestJezelf.html'
                    }
                ]
            },
            {
                name: 'Artikel',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'artikel-van-wep-tot-wpa',
                        name: 'Van WEP tot WPA',
                        blurb: 'Hoe de beveiliging van wifi zich ontwikkelde, en waarom WEP niet meer meetelt. Je hebt het nodig voor het laatste deel van de opdracht.',
                        href: '../../../datasheets/artikel-van-wep-tot-wpa.pdf'
                    }
                ]
            }
        ]
    },
    tcpip: {
        name: 'Labo TCP/IP met Wireshark',
        categories: [
            {
                name: 'Theorie',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'wireshark-gebruiken',
                        name: 'Wireshark gebruiken',
                        blurb: 'De juiste netwerkkaart kiezen, een opname starten, filteren op een protocol en het resultaat wegschrijven.',
                        href: 'WiresharkGebruiken.html'
                    },
                    {
                        id: 'ip-adressering',
                        name: 'IPv4 en IPv6',
                        blurb: 'De twee schrijfwijzen die je in elk pakket terugziet, en hoe je je eigen adres opzoekt.',
                        href: 'IPAdressering.html'
                    },
                    {
                        id: 'icmp',
                        name: 'ICMP en ping',
                        blurb: 'Wat een echo request en een echo reply zijn, wat de response time zegt, en waarom een stille host toch online kan zijn.',
                        href: 'ICMP.html'
                    },
                    {
                        id: 'dns',
                        name: 'DNS',
                        blurb: 'Van een naam naar een adres: hoe een query en een response eruitzien, en waarom er twee antwoorden terugkomen.',
                        href: 'DNS.html'
                    },
                    {
                        id: 'dhcp',
                        name: 'DHCP',
                        blurb: 'Discover, Offer, Request en Acknowledge, en wat je toestel naast een adres nog meekrijgt.',
                        href: 'DHCP.html'
                    },
                    {
                        id: 'modbus-tcp',
                        name: 'Modbus TCP',
                        blurb: 'Een industrieel protocol op poort 502: master en slave, holding registers, en de twee simulatoren waarmee je ze naspeelt.',
                        href: 'ModbusTCP.html'
                    },
                    {
                        id: 'verkeer-onderscheppen',
                        name: 'Verkeer tussen twee andere toestellen',
                        blurb: 'Meelezen zonder zelf een van de twee partijen te zijn, met een mirror port of met je laptop als bridge.',
                        href: 'VerkeerOnderscheppen.html'
                    }
                ]
            },
            {
                name: 'Zelftest',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'test-jezelf-tcpip',
                        name: 'Test jezelf',
                        blurb: 'Controleer of de theorie hierboven blijft hangen. Bij elk antwoord staat waar je het kan nalezen.',
                        href: 'TestJezelf.html'
                    }
                ]
            },
            {
                name: 'Software',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'diagslave',
                        name: 'Modbus slave (diagslave)',
                        blurb: 'De slave-simulator die zich als een Modbus TCP-toestel gedraagt. Pak hem uit in een eigen map voor je aan het laatste deel begint.',
                        href: '../../../datasheets/diagslave-3-5.zip'
                    },
                    {
                        id: 'modpoll',
                        name: 'Modbus master (modpoll)',
                        blurb: 'De master waarmee je een waarde naar een holding register schrijft en ze weer uitleest.',
                        href: '../../../datasheets/modpoll-3-16.zip'
                    }
                ]
            }
        ]
    },
    industrieelnetwerk: {
        name: 'Labo Industrieel netwerk',
        categories: [
            {
                name: 'Theorie',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'plc-coupler-io-eiland',
                        name: 'PLC, coupler en I/O-eiland',
                        blurb: 'De drie delen van de opstelling: wie beslist, wie doorgeeft en wie de draden draagt.',
                        href: 'PlcCouplerIoEiland.html'
                    },
                    {
                        id: 'bekabeling-24v',
                        name: 'Bekabeling op 24 V',
                        blurb: 'Plus en massa, de DIN-rail, hoe een knop op een ingang komt en een lamp aan een uitgang, en wat je met de multimeter nameet.',
                        href: 'Bekabeling24V.html'
                    },
                    {
                        id: 'signaaltoren',
                        name: 'De signaaltoren',
                        blurb: 'Modules stapelen en vergrendelen, en welk klemnummer bij welke lamp hoort.',
                        href: 'Signaaltoren.html'
                    },
                    {
                        id: 'ethercat',
                        name: 'EtherCAT',
                        blurb: 'Een netwerk zonder IP: een frame dat door elke slave passeert en onderweg gelezen en beschreven wordt.',
                        href: 'EtherCAT.html'
                    },
                    {
                        id: 'codesys',
                        name: 'CODESYS en de ESI-bestanden',
                        blurb: 'De ontwikkelomgeving, de runtime op de Raspberry Pi, programmeren in FBD, en waarom je de ESI-bestanden nodig hebt.',
                        href: 'Codesys.html'
                    }
                ]
            },
            {
                name: 'Zelftest',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'test-jezelf-industrieelnetwerk',
                        name: 'Test jezelf',
                        blurb: 'Controleer of de theorie hierboven blijft hangen. Bij elk antwoord staat waar je het kan nalezen.',
                        href: 'TestJezelf.html'
                    }
                ]
            },
            {
                name: 'Datasheets',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'datasheet-ek1100',
                        name: 'Coupler EK1100',
                        blurb: 'De aansluitingen van de coupler, en welk klempunt de voeding van de elektronica en van de veldzijde krijgt.',
                        href: '../../../datasheets/beckhoff-ek1100-ethercat-coupler.pdf'
                    },
                    {
                        id: 'datasheet-el1004',
                        name: 'Ingangsklem EL1004',
                        blurb: 'De vier digitale ingangen: het aansluitschema en de spanningen waarbij een ingang hoog of laag leest.',
                        href: '../../../datasheets/beckhoff-el1004-digitale-ingangen.pdf'
                    },
                    {
                        id: 'datasheet-el2004',
                        name: 'Uitgangsklem EL2004',
                        blurb: 'De vier digitale uitgangen: het aansluitschema en de stroom die een kanaal aankan.',
                        href: '../../../datasheets/beckhoff-el2004-digitale-uitgangen.pdf'
                    },
                    {
                        id: 'datasheet-signaaltoren',
                        name: 'Signaaltoren Modul-Signal 70',
                        blurb: 'De datasheet van de toren: de modules, de spanningen en de afmetingen.',
                        href: '../../../datasheets/signaaltoren-modulsignal-70-datasheet.pdf'
                    }
                ]
            },
            {
                name: 'Software',
                reeks: 'theorie',
                topics: [
                    {
                        id: 'ethercat-esi-bestanden',
                        name: 'Beckhoff EtherCAT XML',
                        blurb: 'De ESI-bestanden van de drie toestellen. Pak ze uit voor je ze in de Device Repository van CODESYS installeert.',
                        href: '../../../downloads/Labo-IndustrieelNetwerk-EtherCAT-XML.zip'
                    }
                ]
            }
        ]
    }
};

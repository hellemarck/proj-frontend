## Introduktion (redovisningstext krav 2)

Det här är front-end-repot som hör ihop med `proj-backend` och `proj-socket-server` för ett projekt i kursen jsramverk (BTH).

Jag har valt att jobba med React, som är ett just nu väldigt utbrett och populärt Javascript-ramverk med bra dokumentation och därför mitt givna val. Jag har använt mig av komponenter för att dela upp gränssnittet och majoriteten av koden är skriven i klasser. På grund av tidspress under projektets gång har det blivit en del native JavaScript, förbättringspotential finns absolut i att implementera mer effektiv JSX.
Användaren möts av en förstasida med en header och presentation av sidans syfte, vilket är att sälja och köpa posters vars priser är dynamiska. Användaren måste registrera sig och logga in för att kunna köpa och sälja, men kan se och följa aktuell värdeutveckling via live-grafen utan att vara autentiserad. Försöker man köpa posters utan att vara inloggad redirectas man till “Logga in”-sidan, och är man inloggad men försöker handla för en större summa än vad som finns disponibelt informeras man om detta och redirectas till “Min sida” där man kan fylla på sitt konto. “Min sida” visar också upp vilka posters man för tillfället äger, när dessa säljs markeras de som sålda i databasen och försvinner från “Min sida”, samtidigt som användarens saldo ökar motsvarande värdet. Köp och försäljning sköts på varje posters egen vy-sida. Med hjälp av webbsockets och fetch mot API:er hämtas all information från databasen (som JSON-data) och från socket-servern.

Jag har använt mig av localStorage för att lagra det token som hanterar användarens giltiga inloggningstid, jag är medveten om säkerhetsriskerna men på klientsidan verkar cookies inte heller helt vattentätt, och React State ger problem vid sidomladdning. Jag skrev ner på min “i mån av tid”-lista att kolla på React State istället, men här sitter jag nu efter deadline med min localStorage (som visserligen fungerat smidigt) och utan tid. Jag tar med mig varningen kring säkerhet till framtida projekt och kommer definitivt utforska alternativ mer när chans ges.

För att rita ut grafen över live-priserna använde jag chartjs (och react-chartjs-2 för bättre kombination med React) samt chartjs-plugin-streaming för live-rörelse. Jag testade först med Rickshaw, men tyckte det kändes lite väl rörigt och svårmanipulerat så jag bestämde mig för att testa något React-specifikt. Det var enkelt att hitta hjälpsam dokumentation och exempel så när jag väl fått socket-servern att rulla gick det fint att skriva ut grafen baserat på den responsen.

Sidan är responsiv sånär som på att graf-tabellen blir lite väl låg på en liten enhet; siffrorna på Y-axeln kläms ihop något, och då responsiviteten verkar vara inbyggd i chartjs fann jag det svårt att åtgärda. Vidare finns en fördröjning på fem sekunder innan grafen börjar visas, det är ett estetiskt “fel” som jag hoppas att användaren har översyn med då man informeras om att uppdatering kommer efter fem sekunder.   

## Klona repot

`git clone https://github.com/hellemarck/proj-frontend.git`

## Kom igång

`npm install`

`npm start`

Snurrar i development mode på [http://localhost:3003/](http://localhost:3003/).
Sidan uppdateras automatiskt när du gör ändringar.

Den driftsatta sidan hittar du på [https://posters.mh-jsramverk.me/](https://posters.mh-jsramverk.me/).

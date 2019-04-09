# API Elérése #
Az API Heroku ingyenes változatán keresztül deployolva lett, ez azt jelenti, hogy __nem kell localhoston a fejlesztőknek se a szervert, sem az adatbázist futtatni__ az API eléréséhez. Ennek a verziónak a javítása egy külön branchen folyik, a többi fejleszőt kérjük, hogy ne piszkáljanak ebbe a branchbe.
Az elérés a következő linken történik:
<https://oktatoappapi.herokuapp.com>
Innentől az Interface specifikációban leírt URI-k az érvényesek.
## Jelenlegi verzió ##
A jelenlegi deployolt verzió nem végleges. Rengeteget fogunk még rajta refaktorálni, bugokat javítani. Jelenleg a legnagyobb probléma az időzónákkal, és dátumokkal van az API-ban,
ezekről tudunk, igyekszünk megtalálni a probléma forrását.
## Localhoston futtatás ## 
__Előfeltételek:__ 
	* Node.js (10.15.3 LTS): https://nodejs.org/en/
	* Wamp vagy XAMPP: http://www.wampserver.com/en/ vagy https://www.apachefriends.org/hu/index.html
	* MySQL Workbench (opcionális, ha tudod hogy kell használni a phpMyAdmin-t): https://dev.mysql.com/get/Downloads/MySQLGUITools/mysql-workbench-community-8.0.15-winx64.msi

1. Indítsd el vagy a Wamp-ot vagy a XAMPP-ot (ha XAMPP, akkor az Apache és MySQL modulokat)
2. Pullold le a legfrissebb verziót a repobol
3. Navigájl el a projekt mappájába, azon belül is az OktatoAppAPI mappába
4. Az ott található oktatoappdb_main.sql fájlt nyisd meg MySQL Workbench-el, vagy phpMyAdmin-ba importáld be.
5. Ha ezek megvannak, és sikeresen be tudtad importálni az adatbázist, indítsd el először az INSTALL.bat-ot az API mappájából
6. Ha végigért, a szervert a START.bat-al tudod indítani.
	1. FONTOS: Ha rosszul küldöd el valamely POST vagy PUT műveletnél a JSON-t, a következő hibát fogja írni: Unexpected string in JSON at position. Ilyenkor ellenőrizd a kérés body-ját, és szükség esetén indítsd újra a szervert a parancssor bezárásával, és a START.bat újra elindításával.
7. Kész!

**FONTOS: AZ INSTALL.bat-OT CSAK EGYSZER KELL LEFUTTATNI, MÉGPEDIG AKKOR, AMIKOR TELJESEN FRISSEN KLÓNOZOD LE A REPOT, VAGY ELŐSZÖR HASZNÁLNÁD AZ API-T**


**HA BÁRMILYEN EXCEPTIONT KAPSZ (kivéve azt, amikor szól hogy nem található adatbázis), A TRELLOBA A BACKEND KÁRTYA ALÁ ÍRJ EGY KOMMENTET, ÉS TÖLTS FEL A PARANCSSORÓL EGY KÉPET**


***HA NEM MŰKÖDNEK A .BAT FÁJLOK***


8. Parancssorból navigálj el a projekt mappájába
	1. Windows gomb + R
	2. Írd be, hogy cmd
	3. Navigálj el a projekt mappába a következő módon:
		pl.: cd C:\2018_19_II_Félév\gitkraken\2018_IIAFP_B\OktatoAppAPI
		1. Ha D vagy más meghajtón van a projekt, akkor parancssorban lemezt úgy tudsz egyszerűen váltani, hogy beírod a lemez nevét, pl D:
9. Add ki a következő parancsot: npm install
10. Ha végzett, írd be ezt: node server.js
11. Kész!

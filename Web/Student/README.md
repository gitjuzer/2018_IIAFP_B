This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Elérhető parancsok
A Web/Student mappán belül futtasd az alábbi parancsokat:

### `npm install`
Telepíti a React-hez, és a CRA-hez szükséges node modulokat. <br>

### `SET PORT=3100`
Beállítja a portot 3100-ra. <br>
Ezen a porton fog futni a dev server, bármilyen PORT használható 3100 helyett, <br>
Csak azért van szükség port váltásra, mert a Back-end 3000-es porton fut, és ez a <br>
default port a dev server esetén is.

### `npm start`
Elindítja a dev serveren az appot ami a localhost-on lesz elérhető: [http://localhost:3100](http://localhost:3100)<br>
3100 a port száma, a SET PORT-nál megadott értéket kell ide behelyettesíteni.

Az oldal autómatikusan reload-ol a fájlok változtatásakor.
Errort dob ha valami hiba van valamelyik JS fájlban.<br>

### `npm run build`
Buildeli az appot optimalizálva, minify-olva egy `build` mappába onnan futtatható dev szerver nélkül is
a már kész app, de minden módosítás után új build szükséges.<br>
Erre nincs szükség a projekt feljesztési fázisában, csak ha kész az app, és deploy-olni szeretnénk.

Ha mégis csinálnál buildet, akkor azt ne töltsd fel a repoba, illetve lesznek problémák, mert nem fogja találni a<br>
css/js fájlokat, mert alapértelmezetten a gyökérkönyvtárban keresi.<br>
Ha a build/static mappát átmásolod a C:\ (legkívülre) meghajtóra akkor meg fogja találni, éles deploy előtt ejectelni kell majd a projektet, <br>
és módosítani a default Webpack configot.

Bővebben: [deployment](https://facebook.github.io/create-react-app/docs/deployment) <br>

## Hasznos linkek
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
[React documentation](https://reactjs.org/).
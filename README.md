# Vefforritun 1, 2023, hópverkefni 2

## Þáttakendur
### Daniel Frans Valdimarsson, @DanniFV
### hi: dfv1@hi.is
### Kristín Fríða Sigurborgardóttir, @KristinFrida
### hi: kfs14@hi.is
### Sölvi Hrafn Steinþórsson, @Solvikrummi
### hi: shs89@hi.is
### Matthías Veigar Ólafsson, @Colinbresgo
### hi: mvo3@hi.is

## Hvernig á að keyra verkefnið
  - `npm run sass`
  - `npm run dev`
  - `npm run lint`

## Létt lýsing á uppsetningu verkefnis
- Ath til þess að fá ákveðna vöru til þess að birtast þarf að ýta á myndina á vörunni.
- Við notuðum **scss** til þess að skipuleggja útlitið á verkefninu.
- Eftirfaraandi skipting var notuð:
- ...
- Við erum með möppu sem heitir **scr** sem inniheldur allar js. skrárnar okkar.
- index.js
 route sér um að skipta á milli síða
- api.js
  sér um að búa til rétta url fyrir hvert fall
- ui.js
inniheldur öll föllin okkar til þess að birta ákveðnar síður
- element.js
inniheldur fall sem býr til element (el) í staðinn fyrir að endurtaka sömu skipanirnar.

- Verkefnið inniheldur `package.json` og `package-lock.json` sem innihalda öll notuð tól sem voru notuð.


## Verkefnalýsing

Verkefnið felst í að tengjast gefnum vefþjónustum og út frá þeim útbúa vef.

Vefþjónusta sem skal tengjast er á:
`https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/`

### Forsíða

Á forsíðu skal birta sex nýjustu vörur með því að kalla á `/products?limit=6`.

Birta skal fyrir vörur:

- Titil
- Mynd
- Verð
- Heiti flokks

Hver vara skal vera hlekkur á viðeigandi vörusíðu.

Fyrir neðan vörur skal vera hlekkur sem fer á vörulista með öllum vörum.

### Vörulisti

Vörulisti birtir allar vörur með því að kalla á `/products`.

Birta skal fyrir vörur:

- Titil
- Mynd
- Verð
- Heiti flokks

Hver vara skal vera hlekkur á viðeigandi vörusíðu.

Fyrir neðan vörur skal vera hlekkur sem fer á forsíðu.

### Vörusíða

Vörusíða birtir vöru með því að kalla á `/products/{id}`.

Birta skal fyrir vöru:

- Titil
- Mynd
- Verð
- Heiti flokks
- Lýsingu á vöru

Fyrir neðan vöru skal birta þrjár sambærilegar vörur með því að kalla á `/products?limit=3&category={category}` þar sem `{category}` er auðkenni flokks vörunnar.

### Valin virkni

Við völdum eftirfarandi:

- Stuðningar við flokka: nota `/categories` til að birta flokka á forsíðu og `/products?category={id}` til að birta vörur á flokkasíðu.

### Slóðir

Fyrir hverja virkni skal vera slóð í vafrann sem hægt er að afrita og senda, eða endurhlaða síðu og virkni er sú sama og áður.

### Útlit

Á öllum síðum skal birta haus með einföldum titli sem fer með þig á forsíðu.

Allar síður skulu vera skalanlegar, ekki er krafa að gera eins útlit.

Ekki þarf að útfæra nýskrá, innskrá eða körfu virkni í haus.

## Hópavinna

Sjást ætti á _commit history_ að allir meðlimir hóps hafi tekið þátt í verkefni.

Útbúa þarf a.m.k. fimm Pull Request (PR) þar sem búið er að fara yfir af öðrum meðlim í hóp og yfirferð ásamt gagnrýni sést á GitHub.

## Hýsing

Setja skal verkefnið upp á Netlify, tengt GitHub.

## Mat

- 10% - README eftir forskrift, tæki og tól uppsett, vefur keyrir á Netilfy. Lint fyrir CSS/Sass og JavaScript.
- 10% - Git notað og PR eftir forskrift.
- 10% – Almenn tenging við vefþjónustur, „loading state“ og villumeðhöndlun.
- 10% – Almennt útlit og skalanleiki.
- 10% – Forsíða.
- 10% – Vörulisti.
- 20% – Vörusíða.
- 20% – Valin virkni.

## Skil

Tilnefna skal hópstjóra sem skráir sig í ákveðinn hóp undir „Hópverkefni 2“ í Canvas. Aðrir nemendur skrá sig í framhaldinu í sama hóp, hópstjóri getur líka skráð aðra nemendur í hópinn.

**Útbúa skal hóp jafnvel ef verkefnið er unnið sem einstaklingsverkefni**.

Hópstjóri skal skila fyrir hönd allra í Canvas í seinasta lagi föstudaginn 24. nóvember 2023.

**Mikilvægt er að öll skil séu gerð í hóp annars munu ekki allir nemendur fá einkunn.**

Skil skulu innihalda:

- GitHub notendanöfn allra (passa þarf að allir nemendur séu í hópnum!)
- Slóð á verkefnið keyrandi í hýsingu
- Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:
  - `ahp9`
  - `dawidniescier`
  - `osk`
  - `polarparsnip`
  - `sturla-freyr`

## Einkunn
Gildir 10%

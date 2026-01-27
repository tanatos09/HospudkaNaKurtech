# Hospůdka na Kurtech 🍺

Moderní a responzivní webová stránka pro hospůdku se zahrádkou, tenisovými kurty a dětským hřištěm v Praze.

## 📋 O projektu

Hospůdka na Kurtech je interaktivní webová aplikace určená pro prezentaci a správu akcí místní hospůdky. Projekt je plně responzivní, optimalizovaný pro SEO a umožňuje majiteli spravovat akce bez klasického backendu – veškerá data se budou ukládat pomocí **Netlify Functions**.

### Klíčové vlastnosti

- ✅ **Responzivní design** – Perfektní zobrazení na mobilech, tabletech i desktopu
- ✅ **Moderní UI/UX** – Čistý a intuitivní design s animacemi
- ✅ **SEO optimalizace** – Meta tagy, Open Graph, strukturovaná data
- ✅ **Administrační panel** – Správa akcí pro majitele (plánováno)
- ✅ **Netlify Functions** – Serverless architektura bez klasického backendu
- ✅ **Fotogalerie** – Přehledná galerie fotografií hospůdky
- ✅ **Informace o hodinách otevření** – Real-time indikátor otevření/zavření hospody
- ✅ **Přehled služeb** – Detailní informace o zahrádce, tenisových kurtech a dětském hřišti

## 🗂️ Struktura projektu

```
kurty/
├── index.html              # Hlavní stránka
├── admin.html              # Administrační panel (ve vývoji)
├── history.html            # Historie akcí
├── README.md               # Tento soubor
│
├── css/
│   ├── reset.css           # CSS reset a normalizace
│   ├── variables.css       # CSS proměnné a paleta barev
│   ├── layout.css          # Základní layout a grid
│   ├── components.css      # Komponenty (tlačítka, formuláře, karty)
│   └── responsive.css      # Media queries a responzivní design
│
├── js/
│   ├── main.js             # Hlavní JavaScript – inicializace, animace
│   ├── menu.js             # Mobilní menu a navigace
│   ├── modal.js            # Modální dialogy (detaily akcí, formuláře)
│   └── gallery.js          # Fotogalerie a lightbox
│
├── functions/
│   ├── addEvent.js         # Netlify Function – přidání nové akce
│   ├── deleteEvent.js      # Netlify Function – smazání akce
│   └── getEvents.js        # Netlify Function – načtení seznamu akcí
│
└── img/
    └── [obrázky a ikony]
```

## 🎯 Funkcionalita

### Veřejná stránka (index.html)

- **Header** – Logo, navigace, mobilní menu
- **Hero sekce** – Úvodní obsah, call-to-action
- **O nás** – Popis hospůdky a jejích služeb
- **Plánované akce** – Dynamický seznam nadcházejících akcí (ze serverových funkcí)
- **Amenities** – Přehled zahrádky, tenisových kurtů, dětského hřiště
- **Fotogalerie** – Interaktivní galerie s lightboxem
- **Kontakt** – Informace, mapa, kontaktní formulář
- **Status indikátor** – Real-time zobrazení, zda je hospoda otevřená

### Historie akcí (history.html)

- Archiv všech uplynulých akcí
- Filtrování podle typu, data atd.
- Propojení s administračním panelem

### Administrační panel (admin.html) – ve vývoji

- **Login** – Jednoduchá autentizace majitele
- **Přidání akce** – Formulář pro vytvoření nové akce
- **Úprava akcí** – Editace existujících akcí
- **Smazání akcí** – Bezpečné odstranění akcí
- **Náhled akcí** – Jak se bude akce zobrazovat veřejně

## ⚙️ Technologie

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (bez frameworků)
- **Backend:** Netlify Functions (serverless)
- **Data Storage:** [Volba dle potřeby – JSON soubory, Netlify BlueGreen, nebo třetí služba]
- **Hosting:** Netlify
- **Responzivita:** Mobile-first přístup

## 🔐 Bezpečnost a autentizace

Administrační panel bude chráněn jednoduchým systémem autentizace:

- **Login:** Přihlášení majitele přes heslo
- **Session:** Uložení tokenu v local/session storage
- **API ochrany:** Netlify Functions budou kontrolovat validitu tokenu
- **CORS:** Nakonfigurovaný pro bezpečný přístup

> ⚠️ Pro produkci se doporučuje použít Netlify Identity nebo Auth0 místo vlastního řešení.

## 🚀 Netlify Functions

Serverless funkce pro správu akcí bez klasického backendu:

### `/.netlify/functions/getEvents`
Načte seznam všech akcí (budoucích a minulých).
- **Metoda:** GET
- **Odpověď:** JSON pole akcí

### `/.netlify/functions/addEvent`
Přidá novou akci (pouze s ověřením majitele).
- **Metoda:** POST
- **Tělo:** JSON s detaily akce
- **Autentizace:** Vyžadován platný token

### `/.netlify/functions/deleteEvent`
Smaže akci (pouze s ověřením majitele).
- **Metoda:** DELETE
- **Parametry:** ID akce
- **Autentizace:** Vyžadován platný token

## 📱 Responzivní design

Projekt používá mobile-first přístup s breakpointy:

```css
/* Mobile: < 640px */
/* Tablet: 640px - 1024px */
/* Desktop: > 1024px */
```

Všechny komponenty jsou testovány na různých zařízeních a orientacích.

## 🎨 Styling

### CSS Architecture
- **Reset.css** – Normalizace výchozích stylů
- **Variables.css** – Centrální definice barev, fontů, spacing
- **Layout.css** – Grid, flexbox, základní layout
- **Components.css** – Znovupoužitelné komponenty
- **Responsive.css** – Media queries a responzivní úpravy

### Paleta barev
Definováno v `css/variables.css` pro snadné přizpůsobení.

## 📝 Otevírací doba

Realtime indikátor otevření/zavření:
- **Po-Pá:** 14:00 – 23:00
- **So-Ne:** 12:00 – 23:00

Status se automaticky aktualizuje na stránce (v JS `main.js`).

## 🔄 Workflowu vývoje

1. **Veřejné stránky** – index.html, history.html ✅
2. **Administrační panel** – admin.html (práce v průběhu)
3. **Frontend logika** – JavaScript moduly ✅
4. **Netlify Functions** – Serverless funkce (ve vývoji)
5. **Autentizace** – Login a session management
6. **Data persistence** – Volba úložiště (JSON, Firestore, apod.)
7. **Testování** – Cross-browser a mobilní testování
8. **Nasazení** – Publikování na Netlify

## 🛠️ Jak začít

### Lokální vývoj

```bash
# 1. Klonuj projekt
git clone <repo-url>
cd kurty

# 2. Otevři v editoru
code .

# 3. Spusť live server (doporučeno: VS Code Live Server extension)
# nebo otevři soubory přímo v prohlížeči

# 4. Netlify Functions (práce lokálně)
npm install -g netlify-cli
netlify dev
```

### Nasazení na Netlify

1. Pushni kód na GitHub/GitLab
2. Připoj projekt na Netlify
3. Nastav `netlify.toml` pro správné build a deployment
4. Nakonfiguruj environment variables (heslo, tokeny)
5. Deploy!

## 📄 netlify.toml

Příklad konfigurace:

```toml
[build]
  command = "npm install"
  functions = "functions"
  publish = "."

[dev]
  command = "npm run dev"
```

## 🐛 Známé problémy a TODO

### V přípravě
- [ ] Finalizace administračního panelu
- [ ] Implementace Netlify Functions
- [ ] Setup databáze pro ukládání akcí
- [ ] Autentizace majitele
- [ ] Testing (unit + e2e)
- [ ] Performance optimalizace
- [ ] Analytics setup (Google Analytics)

### Budoucí vylepšení
- [ ] PWA (Progressive Web App) support
- [ ] Notifikace o nových akcích
- [ ] Kalendarní integraci (Google Calendar, Apple Calendar)
- [ ] Recenzní systém
- [ ] Rezervace stolů online
- [ ] Payment gateway pro vstupenky

## 📞 Kontakt a podpora

Pro otázky, bugs reporty nebo návrhy vytvořte issue v repozitáři nebo kontaktujte majitele.

---

**Poslední aktualizace:** leden 2026  
**Status:** 🟡 Ve vývoji – administrační panel a Netlify Functions  
**Vytvořeno s ❤️ pro Hospůdku na Kurtech**

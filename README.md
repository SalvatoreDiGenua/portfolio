# Portfolio v2 — Salvatore Di Genua

Portfolio web personale, monopagina, minimale e responsive, di Salvatore Di Genua — Senior Frontend Engineer specializzato in Angular.

## Stack tecnologico

- **Angular 22** — standalone components, Signals, zoneless change detection, nuova sintassi di controllo flusso (`@for`, `@if`)
- **Tailwind CSS** — utility-first styling con palette custom dark-mode (design system "Developer Portfolio" — minimalismo + accenti indigo/cyan, ispirato alle linee guida della skill [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill))
- **TypeScript strict mode**

## Struttura del progetto

```
src/app/
├── core/
│   └── profile.data.ts       # Dati del CV centralizzati (esperienze, skill, formazione)
├── layout/
│   ├── navbar/                # Header sticky con menu responsive
│   └── footer/
├── sections/
│   ├── hero/                  # Sezione di apertura
│   ├── about/                 # Profilo professionale
│   ├── skills/                # Stack tecnologico a card
│   ├── experience/             # Timeline esperienze lavorative
│   ├── education/              # Percorso di formazione
│   └── contact/                # Call to action e contatti
├── app.ts / app.html
├── app.config.ts
└── main.ts
```

## Design system

Palette pensata per un portfolio da sviluppatore: sfondo scuro (`ink-950/900/800`), colore primario **indigo** (`primary-500` `#6366f1`), accento **cyan** (`accent-500` `#06b6d4`), tipografia `Inter` (testo) + `JetBrains Mono` (elementi tecnici/label). Componenti con glassmorphism leggero, bordi sottili, hover con leggero glow, animazioni contenute e rispetto di `prefers-reduced-motion`.

## Avvio in locale

```bash
npm install
npm start
```

L'app sarà disponibile su `http://localhost:4200`.

## Build di produzione

```bash
npm run build
```

L'output verrà generato in `dist/portfolio-v2`.

## Sviluppo assistito da AI

Il progetto è stato scaffoldato seguendo le convenzioni delle skill ufficiali Angular:

- [`angular-new-app`](https://github.com/angular/skills/tree/main/angular-new-app) per la struttura del progetto
- [`angular-developer`](https://github.com/angular/skills/tree/main/angular-developer) per pattern architetturali, Signals e best practice sui componenti standalone

## Licenza

Progetto personale — tutti i diritti riservati.

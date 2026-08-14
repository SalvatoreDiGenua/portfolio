# Portfolio v2 — Salvatore Di Genua

Portfolio personale monopagina realizzato con Angular 22 e Tailwind CSS.

## Funzionalità

- Angular standalone components e zoneless change detection.
- Tailwind CSS con design system dark indigo/cyan.
- Multilingua italiano/inglese con Transloco.
- Selettore lingua responsive nella navbar.
- Metadati SEO aggiornati dinamicamente per lingua.
- Canonical, Open Graph, Twitter Cards e JSON-LD `Person`.
- `robots.txt`, `sitemap.xml`, web manifest e asset social.
- Prettier con configurazione coerente con `ngx-request-lock-docs`.

## Avvio

```bash
npm install
npm start
```

## Formattazione

```bash
npm run format
npm run format:check
```

## SEO

Prima del deploy, sostituire in `src/index.html`, `SeoService`, `robots.txt` e `sitemap.xml` il dominio di esempio con il dominio pubblico definitivo. Aggiornare anche l'URL LinkedIn nel JSON-LD quando sarà disponibile.

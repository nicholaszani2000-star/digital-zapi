# PLUMPY — Siero Rimpolpante Labbra

Landing page di prodotto ultra-premium (bianco, minimal, luxury; hero e CTA su
fondo nero cinematografico) + sezione **Shopify Online Store 2.0**, in italiano,
con claim solo cosmetici. Peptidi **GHK-Cu** (Copper Tripeptide-1) e
**Acido Ialuronico**.

> **Slogan:** *Più piene, naturalmente.*

## Struttura

```
index.html                     Landing statica (apri in locale o pubblica)
styles.css                     Design system + tutte le sezioni
script.js                      Interazioni (slider, form Klaviyo, sticky, reveal)
assets/                        Immagini (hero, before, after, texture, og, favicon)
input/                         ← metti qui le 3 foto ufficiali (vedi input/README.md)
tools/
  make-placeholders.mjs        Genera i placeholder eleganti (già eseguito)
  prepare-assets.mjs           Ritaglia le foto reali da input/ → assets/
  serve.mjs                    Micro server statico per l'anteprima locale
sections/plumpy-landing.liquid Sezione Shopify OS 2.0 (schema completo, Theme Check VALID)
SHOPIFY.md                     Guida passo-passo per pubblicare su Shopify
```

## Immagini: placeholder → foto reali (swap 1:1)

Le immagini in `assets/` sono **placeholder eleganti** con gli **stessi nomi e
proporzioni** delle foto finali (etichetta discreta "ESEMPIO"). Per usare le
foto ufficiali:

```bash
npm install                 # una volta (installa sharp)
# metti hero.jpg, before-after.jpg, texture.jpg in ./input
npm run assets              # sovrascrive i placeholder con i ritagli reali
```

Lo script divide `before-after.jpg` in due metà 4:5 allineate rimuovendo la
fascia con le scritte, e ritaglia la texture 1:1. **L'HTML non va toccato.**

## Anteprima locale

```bash
npm run serve               # http://localhost:4321
```

## Configurare Klaviyo (lista d'attesa)

In `script.js`, in cima, imposta:

```js
const KLAVIYO = { companyId: 'TUO_SITE_ID', listId: 'TUA_LISTA', revision: '2024-10-15' };
```

Se vuoti, la form valida l'email e mostra una conferma locale.
(Nella sezione Shopify gli stessi valori si impostano dal Theme Editor.)

## Qualità

- Mobile-first, **zero overflow orizzontale a 375px** (`overflow-x: clip`).
- Reveal on-scroll discreti, `prefers-reduced-motion` rispettato.
- Accessibilità AA: `focus-visible`, `aria-label` su slider e form, contrasti curati.
- SEO: title, meta description, Open Graph, **JSON-LD Product** (senza
  `aggregateRating` finché non esistono recensioni reali).
- Sezione Shopify: **Theme Check VALID (0 errori)**.

## Note di compliance

Prodotto cosmetico (UE, Reg. CE 1223/2009): prima della vendita completa
**INCI reale**, **Persona Responsabile UE**, **notifica CPNP** e **PAO**.
Queste informazioni si gestiscono in Shopify (descrizione/metafield del
prodotto e pagine Policy), non più in un riquadro della landing.
Claim solo cosmetici; nessuna recensione inventata.

---

## ⚠️ Da sapere (stato attuale)

- Le **3 foto ufficiali non erano leggibili come file** in questa sessione
  (in chat le immagini non arrivano come file su disco), quindi la pagina usa
  **placeholder** con nomi/proporzioni identici. Segui lo swap 1:1 qui sopra.
- Sul flacone della foto ufficiale compare la scritta **"PUMPLY"**: nel brand e
  in tutti i testi il nome corretto è **"PLUMPY"**. Verifica l'etichetta reale
  prima del lancio.

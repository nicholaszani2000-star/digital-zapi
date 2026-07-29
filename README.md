# PLUMPY — Siero Rimpolpante Labbra

Landing page di prodotto ultra-premium (bianco, minimal, luxury; hero e CTA su
fondo nero cinematografico) + sezione **Shopify Online Store 2.0**, in italiano,
con claim solo cosmetici. Peptidi **GHK-Cu** (Copper Tripeptide-1) e
**Acido Ialuronico**.

> **Slogan:** *Più piene, naturalmente.*

## Struttura

```
index.html                      Landing (apri in un browser o pubblica)
styles.css                      Design system + tutte le sezioni
script.js                       Interazioni (slider, form -15%, sticky, reveal)
assets/                         Immagini finali del prodotto
  hero.webp                     Flacone PLUMPY (hero, si sfuma nel fondo scuro)
  before.webp · after.webp      Prima / Dopo (slider comparativo)
  texture.webp                  Swatch del siero
  og.jpg · favicon.*            Social + favicon
sections/plumpy-landing.liquid  Sezione Shopify OS 2.0 (Theme Check VALID)
SHOPIFY.md                      Guida passo-passo per pubblicare su Shopify
```

## Anteprima locale

Apri direttamente **`index.html`** nel browser (è un sito statico), oppure
servilo con un qualsiasi server statico e visita l'indirizzo locale.

## Offerta -15% (lista email)

La sezione "Offerta di lancio" raccoglie l'email e sblocca uno sconto del 15%.

- **Landing statica:** configura Klaviyo in cima a `script.js` nell'oggetto
  `KLAVIYO` (`companyId` = Public API Key / Site ID, `listId` = List ID).
  Se vuoto, la form valida l'email e mostra una conferma locale.
- **Shopify:** gli stessi valori si impostano dal Theme Editor (gruppo
  "Lista d'attesa (Klaviyo)"). Il codice sconto va creato in Shopify e inviato
  con un Flow di benvenuto Klaviyo. Tutti i dettagli in `SHOPIFY.md`.

## Pubblicare su Shopify

Segui **`SHOPIFY.md`**: carichi le immagini negli Assets del tema, incolli
`sections/plumpy-landing.liquid`, crei la pagina e la sezione (già popolata),
colleghi il prodotto e Klaviyo.

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
prodotto e pagine Policy). Claim solo cosmetici; nessuna recensione inventata.

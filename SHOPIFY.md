# PLUMPY su Shopify — guida passo-passo

Questa guida ti porta dalla sezione `sections/plumpy-landing.liquid` a una
pagina prodotto **pubblicata**, con carrello e lista d'attesa Klaviyo
funzionanti. Tempo stimato: ~20 minuti.

> La sezione è **Online Store 2.0**, solo HTML/CSS/JS vanilla, con CSS e JS
> già "scoped" su `#plumpy-<id>` per non collidere col tema. Validata con
> **Shopify Theme Check: 0 errori**.

---

## 0) Cosa ti serve

- Un tema Online Store 2.0 (Dawn o qualsiasi tema moderno).
- Le 3 foto ufficiali ritagliate (vedi `README.md` → `npm run assets`):
  `hero.webp`, `before.webp`, `after.webp`, `texture.webp`.
- Un account Klaviyo (per la lista d'attesa) — opzionale ma consigliato.

---

## 1) Carica gli asset (le immagini)

Shopify admin → **Contenuti → File** *oppure* **Temi → ⋯ → Modifica codice →
Assets → Aggiungi asset**.

Carica: `hero.webp`, `before.webp`, `after.webp`, `texture.webp`.

> **Due modi per collegare le immagini nella sezione (scegline uno per foto):**
> 1. **image_picker** (consigliato): nel Theme Editor selezioni l'immagine dal
>    media della sezione. Nessun nome file da ricordare.
> 2. **Nome file in Assets**: se carichi i file nella cartella **Assets** del
>    tema, ti basta lasciare il nome file nei campi "…oppure nome file in
>    Assets" (già precompilati con `hero.webp`, `before.webp`, ecc.).

---

## 2) Incolla la sezione nel tema

1. **Temi → ⋯ → Modifica codice**.
2. Cartella **Sections → Aggiungi una nuova sezione** → nome `plumpy-landing`.
3. Cancella il contenuto generato e **incolla tutto** il contenuto di
   `sections/plumpy-landing.liquid`. Salva.

---

## 3) Crea la pagina e aggiungi la sezione

1. **Contenuti → Pagine → Aggiungi pagina**. Titolo es. "PLUMPY". Salva.
2. A destra, in **Tema modello**, crea un nuovo modello: **Crea modello** →
   nome `plumpy` (basato su "page"). Salva.
3. **Personalizza** (apre il Theme Editor sulla pagina).
4. Nella colonna sinistra: **Aggiungi sezione → PLUMPY — Landing**.
   La sezione arriva **già popolata** con tutti i testi e i 16 blocchi
   (4 USP, 2 scienza, 3 step, 3 garanzie, 4 FAQ).
5. (Opzionale) Rimuovi le sezioni di default del template "page" se non le vuoi.

> **Suggerimento:** puoi riordinare/aggiungere/rimuovere i blocchi (USP,
> card scienza, step, garanzie, FAQ) direttamente dal Theme Editor.

---

## 4) Collega il prodotto (carrello)

Nel Theme Editor, seleziona la sezione **PLUMPY — Landing** → gruppo
**"Prodotto & carrello"** → **Prodotto da collegare** → scegli il tuo prodotto.

- Con un prodotto selezionato, **tutti i pulsanti** "Aggiungi al carrello"
  aggiungono la **prima variante** (`/cart/<variant_id>:1`); "Aggiungi il Duo"
  aggiunge **quantità 2**.
- **Senza** prodotto selezionato, i pulsanti fanno **scroll morbido** alla
  sezione acquisto (nessun link rotto): utile in fase di anteprima.

> I prezzi **non** compaiono mai sui pulsanti (scelta di design del brand):
> il prezzo reale è quello del prodotto Shopify, visibile al carrello/checkout.

---

## 5) Collega Klaviyo (lista d'attesa)

Nel Theme Editor, sezione **PLUMPY — Landing** → gruppo **"Lista d'attesa
(Klaviyo)"**:

- **Public API Key (Site ID)** → in Klaviyo: **Settings → API keys →
  _Public API key / Site ID_** (una stringa tipo `AbCdE3`).
- **List ID** → in Klaviyo: **Audience → Lists** → apri la lista → in alto a
  destra **Settings** → **List ID** (tipo `XyZ123`).

Incolla i due valori nei rispettivi campi. Fatto: la form iscrive gli utenti
alla lista tramite l'endpoint client di Klaviyo (revision `2024-10-15`).

> Se lasci i campi **vuoti**, la form valida comunque l'email e mostra una
> conferma locale (comodo per i test, ma **non** raccoglie iscrizioni reali).

---

## 6) Spazio recensioni (nessuna recensione finta)

La sezione ha un contenitore vuoto pronto per la tua app recensioni
(**Judge.me / Loox / Yotpo / Shopify Product Reviews**). Finché non ci sono
recensioni reali resta un empty-state elegante.

Per attivarle: installa l'app, poi incolla lo snippet dell'app **dentro**
`.pl-reviews__mount` nella sezione (c'è un commento che indica il punto
esatto), oppure usa il blocco/app-embed dell'app nel Theme Editor.

---

## 7) Checklist pre-lancio ✅

Prima di pubblicare, verifica:

- [ ] **INCI**, **PAO**, **Persona Responsabile UE** (Reg. CE 1223/2009) e **notifica CPNP**:
      gestiti in Shopify (descrizione/metafield del prodotto e pagine Policy), non più nella sezione.
- [ ] Pagine legali (**Privacy**, **Termini**, **Contatti**) collegate nel footer del tema.
- [ ] **Prodotto** collegato e **prezzo/variante** corretti.
- [ ] **Klaviyo** company_id + list_id inseriti e testati (iscrizione reale).
- [ ] **Test checkout** completo (aggiungi al carrello → checkout → ordine test).
- [ ] **Test mobile** a 375px: niente overflow, sticky bar visibile, slider
      trascinabile, form funzionante.
- [ ] **Claim conformi**: solo cosmetici (volume ottico, idratazione, comfort,
      risultato progressivo). Nessun claim medico. Nessuna recensione inventata.
- [ ] **Immagini** definitive caricate (hero sfumato, before/after allineati,
      texture 1:1) e con `alt` in italiano.

---

## 8) Validare di nuovo con Theme Check (facoltativo)

Con la [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) installata,
dalla cartella del tema:

```bash
shopify theme check
```

La sezione è già **VALID (0 errori)**. Potresti vedere un solo *warning*
informativo `ExcessiveSettingsCount` (la sezione espone un setting per ogni
testo/immagine, come richiesto): è innocuo e non blocca la pubblicazione.

---

## 9) Pubblica

Nel Theme Editor: **Salva**. Poi imposta la pagina come home o linkala dal
menu (Online Store → Navigazione). Se usi un tema in bozza, ricordati di
**pubblicarlo**.

Buon lancio! 🖤

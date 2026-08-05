/* =========================================================================
   PUMPLY — interazioni landing
   Header blur · menu mobile · reveal · slider prima/dopo · form Klaviyo · toast
   ========================================================================= */
(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   *  CONFIG KLAVIYO
   *  Inserisci qui i tuoi valori per attivare la raccolta iscrizioni.
   *   - companyId : la tua Public API Key / Site ID di Klaviyo (es. "AbCdE3")
   *                 Klaviyo → Settings → API keys → "Public API key / Site ID"
   *   - listId    : l'ID della lista a cui iscrivere (es. "XyZ123")
   *                 Klaviyo → Audience → Lists → apri la lista → "List ID" (Settings)
   *  Se restano vuoti: la form valida l'email e mostra una conferma locale.
   * ------------------------------------------------------------------ */
  const KLAVIYO = {
    companyId: '',            // <-- Public API Key (Site ID)
    listId: '',               // <-- List ID
    revision: '2024-10-15',   // versione API richiesta dagli header
  };

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Anno corrente nel footer ------------------------------------ */
  const y = $('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Header: sfondo/blur quando si scrolla ----------------------- */
  const header = $('#site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Menu mobile -------------------------------------------------- */
  const toggle = $('.nav-toggle');
  const menu = $('#mobile-menu');
  if (toggle && menu) {
    const setMenu = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
      menu.hidden = !open;
    };
    toggle.addEventListener('click', () => setMenu(menu.hidden));
    $$('a,button', menu).forEach((el) => el.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---- Reveal on scroll -------------------------------------------- */
  const reveals = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
  } else {
    // piccolo stagger tra elementi "fratelli" nello stesso contenitore
    const seen = new Map();
    reveals.forEach((el) => {
      const p = el.parentElement;
      const i = seen.get(p) || 0;
      if (i) el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
      seen.set(p, i + 1);
    });
    const io = new IntersectionObserver((entries, ob) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); ob.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---- Slider Prima / Dopo ----------------------------------------- */
  $$('[data-ba]').forEach((ba) => {
    const handle = $('[data-ba-handle]', ba);
    let dragging = false;

    const setPos = (pct) => {
      const p = Math.max(0, Math.min(100, pct));
      ba.style.setProperty('--pos', p);
      handle.setAttribute('aria-valuenow', Math.round(p));
    };
    const fromEvent = (e) => {
      const rect = ba.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      setPos((x / rect.width) * 100);
    };

    const start = (e) => { dragging = true; ba.setPointerCapture?.(e.pointerId); fromEvent(e); };
    const move  = (e) => { if (dragging) { fromEvent(e); e.preventDefault(); } };
    const end   = () => { dragging = false; };

    ba.addEventListener('pointerdown', start);
    ba.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    // click semplice per spostare il cursore
    ba.addEventListener('click', (e) => { if (e.target !== handle && !handle.contains(e.target)) fromEvent(e); });

    // Tastiera
    handle.addEventListener('keydown', (e) => {
      const cur = parseFloat(ba.style.getPropertyValue('--pos')) || 50;
      const step = e.shiftKey ? 10 : 2;
      const map = { ArrowLeft: -step, ArrowRight: step, ArrowDown: -step, ArrowUp: step, Home: -100, End: 100 };
      if (e.key in map) { e.preventDefault(); setPos(cur + map[e.key]); }
    });
  });

  /* ---- Toast -------------------------------------------------------- */
  const toastEl = $('[data-toast]');
  let toastT;
  const toast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-show');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('is-show'), 4200);
  };

  /* ---- Pulsanti "Aggiungi al carrello" (landing statica) ------------ *
   * Nella landing autonoma non c'è checkout: guidiamo verso la lista
   * d'attesa. Nella sezione Shopify gli stessi pulsanti aggiungono al
   * carrello il prodotto collegato.                                     */
  $$('.js-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lista = $('#lista');
      lista?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      toast('Il checkout si attiva al lancio. Iscriviti per l’accesso anticipato ✨');
      setTimeout(() => $('#wl-email')?.focus({ preventScroll: true }), reduceMotion ? 0 : 600);
    });
  });

  /* ---- Form lista d'attesa (Klaviyo) -------------------------------- */
  const form = $('[data-waitlist]');
  if (form) {
    const input = $('#wl-email', form);
    const msg = $('#wl-msg', form);
    const btn = $('button[type="submit"]', form);
    const emailOK = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    const say = (text, ok) => {
      msg.textContent = text;
      msg.classList.toggle('is-ok', ok === true);
      msg.classList.toggle('is-err', ok === false);
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (!emailOK(email)) { say('Inserisci un indirizzo email valido.', false); input.focus(); return; }

      const configured = KLAVIYO.companyId && KLAVIYO.listId;
      if (!configured) {
        // Nessuna config: conferma locale (email validata lato client)
        console.info('[PUMPLY] Klaviyo non configurato: imposta companyId e listId in script.js per raccogliere le iscrizioni reali.');
        say('Grazie! Sei in lista: ti avviseremo al lancio.', true);
        form.reset();
        return;
      }

      btn.disabled = true;
      const prev = btn.textContent;
      btn.textContent = 'Invio…';
      try {
        const res = await fetch(
          `https://a.klaviyo.com/client/subscriptions/?company_id=${encodeURIComponent(KLAVIYO.companyId)}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', revision: KLAVIYO.revision },
            body: JSON.stringify({
              data: {
                type: 'subscription',
                attributes: {
                  profile: { data: { type: 'profile', attributes: { email } } },
                },
                relationships: { list: { data: { type: 'list', id: KLAVIYO.listId } } },
              },
            }),
          }
        );
        if (res.ok || res.status === 202) {
          say('Grazie! Sei in lista: ti avviseremo al lancio.', true);
          form.reset();
        } else {
          say('Ops, qualcosa è andato storto. Riprova tra poco.', false);
        }
      } catch {
        say('Connessione non riuscita. Controlla la rete e riprova.', false);
      } finally {
        btn.disabled = false;
        btn.textContent = prev;
      }
    });
  }
})();

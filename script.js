document.addEventListener('DOMContentLoaded', () => { 
  /* ---------- 1. Filter Projects ---------- */
  const filterButtons = document.querySelectorAll('.filters button');
  const projects = document.querySelectorAll('.project');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach(b => b.classList.toggle('active', b === btn));
      projects.forEach(p =>
        p.style.display = (filter === 'all' || p.classList.contains(filter)) ? 'block' : 'none'
      );
    });
  });

  /* ---------- 2. Contact Form ---------- */
  const form = document.getElementById('contactForm');
  const message = document.getElementById('formMessage');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (message) {
        message.textContent = 'Изпращане...';
        message.style.color = '';
      }

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          if (message) {
            message.textContent = 'Съобщението беше изпратено успешно!';
            message.style.color = 'green';
          }
          form.reset();
        } else {
          throw new Error('Bad response');
        }
      } catch {
        if (message) {
          message.textContent = 'Възникна грешка. Опитайте отново.';
          message.style.color = 'crimson';
        }
      }
    });
  }


  /* ---------- 3. Back‑to‑Top ---------- */
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () =>
    backToTop && (backToTop.style.display = window.scrollY > 300 ? 'block' : 'none')
  );

  /* ---------- 4. Carousel ---------- */
  const track = document.querySelector('.carousel-track');
  if (track) initCarousel(track);

  /* ---------- 5. Accordion (category‑header) ---------- */
  document.querySelectorAll('.category-header').forEach(h =>
    h.addEventListener('click', () =>
      h.nextElementSibling?.classList.toggle('active')
    )
  );

  /* ---------- 6. Product dropdown toggles ---------- */
  document.querySelectorAll('.dropdown-toggle').forEach(btn =>
    btn.addEventListener('click', () =>
      btn.nextElementSibling?.classList.toggle('open')
    )
  );

  /* Enable/disable qty input */
  document.querySelectorAll('.product-selection-dropdown input[type="checkbox"], .dropdown-content input[type="checkbox"]')
    .forEach(cb => cb.addEventListener('change', () => {
      const qty = cb.closest('.dropdown-content')?.querySelector(`input[name*="${cb.name}_qty"]`);
      if (qty) {
        qty.disabled = !cb.checked;
        if (!cb.checked) qty.value = 1;
      }
    })
  );

  /* ---------- 7. Mobile Navigation Dropdowns ---------- */
  initMobileNav();

  /* ---------- 8. Currency Switcher ---------- */
  const buttons = document.querySelectorAll(".currency-switcher button");
  const priceItems = document.querySelectorAll(".price-item");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const currency = button.getAttribute("data-currency");

      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      priceItems.forEach(item => {
        const priceValue = item.querySelector(".price-value");
        const symbol = item.querySelector(".currency-symbol");
        const newPrice = item.getAttribute(`data-price-${currency}`);
        priceValue.textContent = parseFloat(newPrice).toFixed(2);
        symbol.textContent = currency === "bgn" ? "лв" : "€";
      });
    });
  });
});

/* =======================================================================
   Carousel
======================================================================= */
function initCarousel(track) {
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  const cards = Array.from(track.querySelectorAll('.carousel-card'));
  if (!cards.length) return;

  const images = cards
    .map(c => c.querySelector('img'))
    .filter(Boolean);

  let index = 0;
  let auto = null;

  const getStep = () => {
    const card = cards[0];
    const r = card.getBoundingClientRect();
    const cs = getComputedStyle(card);
    const ml = parseFloat(cs.marginLeft) || 0;
    const mr = parseFloat(cs.marginRight) || 0;
    // gap е в track, но това е достатъчно стабилно за “1 карта напред”
    return r.width + ml + mr + 14; // 14 = gap (ако промениш gap, смени и тук)
  };

  const visibleCount = () => Math.max(1, Math.floor(track.clientWidth / getStep()));
  const maxIndex = () => Math.max(0, cards.length - visibleCount());

  const go = (i, smooth = true) => {
    const max = maxIndex();
    index = Math.min(Math.max(i, 0), max);
    track.scrollTo({ left: index * getStep(), behavior: smooth ? 'smooth' : 'auto' });
  };

  const start = () => {
    stop();
    auto = setInterval(() => {
      const max = maxIndex();
      go(index >= max ? 0 : index + 1);
    }, 6000);
  };

  const stop = () => {
    if (auto) clearInterval(auto);
    auto = null;
  };

  prevBtn?.addEventListener('click', () => go(index - 1));
  nextBtn?.addEventListener('click', () => go(index + 1));

  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);

  track.addEventListener('scroll', () => {
    index = Math.round(track.scrollLeft / getStep());
  }, { passive: true });

  window.addEventListener('resize', () => go(index, false));

  cards.forEach((card, i) => {
    const img = card.querySelector('img');
    if (!img) return;

    card.addEventListener('click', () => {
      stop();
      openLightbox(images, i, () => start());
    });
  });

  go(0, false);
  start();
}

/* =======================================================================
   Lightbox with prev/next inside preview
======================================================================= */
function openLightbox(images, startIndex, onClose) {
  let idx = startIndex;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';

  overlay.innerHTML = `
    <div class="lightbox" role="dialog" aria-modal="true">
      <button class="lb-close" aria-label="Затвори">×</button>
      <button class="lb-btn lb-prev" aria-label="Предишна">‹</button>
      <img class="lb-img" alt="" />
      <button class="lb-btn lb-next" aria-label="Следваща">›</button>
      <div class="lb-counter"></div>
    </div>
  `;

  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('.lb-img');
  const counterEl = overlay.querySelector('.lb-counter');

  const show = () => {
    const im = images[idx];
    imgEl.src = im.src;
    imgEl.alt = im.alt || '';
    counterEl.textContent = `${idx + 1} / ${images.length}`;
  };

  const prev = () => { idx = (idx - 1 + images.length) % images.length; show(); };
  const next = () => { idx = (idx + 1) % images.length; show(); };

  const close = () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    if (typeof onClose === 'function') onClose();
  };

  const onKey = (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  overlay.querySelector('.lb-close').addEventListener('click', close);
  overlay.querySelector('.lb-prev').addEventListener('click', prev);
  overlay.querySelector('.lb-next').addEventListener('click', next);

  // клик извън картинката затваря
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', onKey);

  show();
}

/* =======================================================================
   Zoom Helper
======================================================================= */
function zoomImage(img, resumeCallback) {
  const rect = img.getBoundingClientRect();
  const clone = img.cloneNode(true);
  Object.assign(clone.style, {
    position: 'fixed', top: `${rect.top}px`, left: `${rect.left}px`,
    width: `${rect.width}px`, height: `${rect.height}px`,
    borderRadius: '10px', boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
    transition: 'all .4s ease', zIndex: 1000, cursor: 'zoom-out'
  });
  document.body.appendChild(clone);

  const overlay = Object.assign(document.createElement('div'), {
    style: 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999;'
  });
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    Object.assign(clone.style, {
      top: '50%', left: '50%', transform: 'translate(-50%,-50%) scale(1.4)',
      width: 'auto', height: 'auto', maxWidth: '60vw', maxHeight: '60vh'
    });
  });

  const close = () => {
    Object.assign(clone.style, {
      transform: 'translate(0,0) scale(1)',
      top: `${rect.top}px`, left: `${rect.left}px`,
      width: `${rect.width}px`, height: `${rect.height}px`, maxWidth: '', maxHeight: ''
    });
    clone.addEventListener('transitionend', () => {
      clone.remove(); overlay.remove(); resumeCallback();
    }, { once: true });
  };
  overlay.addEventListener('click', close);
  clone.addEventListener('click', close);
}

/* =======================================================================
   Mobile Navigation Logic as function
======================================================================= */
function initMobileNav() {
  const BREAK = 769; // breakpoint

  const nav = document.querySelector('.main-nav');
  if (!nav) return;

  // Запазваме за второ кликване
  const tappedLinks = new Set();

  nav.addEventListener('click', e => {
    const link = e.target.closest('.has-dropdown > a');
    if (!link) return;
    if (window.innerWidth >= BREAK) return; // на десктоп не променяме

    e.preventDefault();

    const dropdown = link.nextElementSibling;
    if (!dropdown) return;

    if (!tappedLinks.has(link)) {
      // Първо кликване: отваряме dropdown
      tappedLinks.clear();
      tappedLinks.add(link);

      // Затваряме всички други dropdown-и
      nav.querySelectorAll('.dropdown.open').forEach(dd => dd.classList.remove('open'));

      dropdown.classList.add('open');
    } else {
      // Второ кликване - позволяваме да отиде към линка
      window.location.href = link.href;
    }
  });

  // Затваряне при клик извън менюто
  document.addEventListener('click', e => {
    if (window.innerWidth >= BREAK) return;
    if (!e.target.closest('.main-nav')) {
      nav.querySelectorAll('.dropdown.open').forEach(dd => dd.classList.remove('open'));
      tappedLinks.clear();
    }
  });

  // Затваряне при ресайз
  window.addEventListener('resize', () => {
    if (window.innerWidth >= BREAK) {
      nav.querySelectorAll('.dropdown.open').forEach(dd => dd.classList.remove('open'));
      tappedLinks.clear();
    }
  });
}

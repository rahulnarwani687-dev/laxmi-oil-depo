/**
 * Laxmi Oil Depo — Goddess Theme Client Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileClose = document.getElementById('mobileClose');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileNav = (open) => {
    if (open) {
      mobileNavOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNavOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle) mobileToggle.addEventListener('click', () => toggleMobileNav(true));
  if (mobileClose) mobileClose.addEventListener('click', () => toggleMobileNav(false));
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) toggleMobileNav(false);
    });
  }
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileNav(false));
  });

  // 2. Groundnut Oil Pack Size Switcher
  const gnPackButtons = document.querySelectorAll('[data-product="groundnut"] .pack-pill-btn');
  const gnShowcaseImg = document.getElementById('gnShowcaseImg');
  const gnActivePackLabel = document.getElementById('gnActivePackLabel');
  const gnActivePackDesc = document.getElementById('gnActivePackDesc');
  const gnOrderBtn = document.getElementById('gnOrderBtn');

  const gnPackData = {
    '15kg': {
      img: 'assets/tin-groundnut-15kg.png',
      packName: '15 kg Tin',
      title: '15 KG COMMERCIAL / HOUSEHOLD TIN',
      desc: 'Heavy-gauge traditional square tin with integrated handle and tamper-evident pourer cap. Engineered for bulk household use, restaurants, and caterers requiring reliable stock.'
    },
    '5l': {
      img: 'assets/can-groundnut-5l.png',
      packName: '5 L Can',
      title: '5 LITER CONVENIENCE CAN',
      desc: 'Sturdy food-grade container with ergonomic carry handle. Perfect balance of volume and kitchen counter convenience for monthly family consumption.'
    },
    '1l': {
      img: 'assets/bottle-groundnut-1l.png',
      packName: '1 L Bottle',
      title: '1 LITER DAILY BOTTLE',
      desc: 'Transparent food-grade PET bottle with grooved comfort grip and easy-dosing cap. Ideal for everyday culinary handling and compact pantry storage.'
    }
  };

  gnPackButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      gnPackButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const size = btn.getAttribute('data-size');
      if (gnPackData[size]) {
        if (gnShowcaseImg) {
          gnShowcaseImg.style.opacity = '0.3';
          setTimeout(() => {
            gnShowcaseImg.src = gnPackData[size].img;
            gnShowcaseImg.alt = gnPackData[size].title;
            gnShowcaseImg.style.opacity = '1';
          }, 120);
        }
        if (gnActivePackLabel) gnActivePackLabel.textContent = gnPackData[size].title;
        if (gnActivePackDesc) gnActivePackDesc.textContent = gnPackData[size].desc;
        if (gnOrderBtn) {
          gnOrderBtn.setAttribute('data-prefill-pack', gnPackData[size].packName);
          gnOrderBtn.textContent = `Order / Enquire for Groundnut Oil (${gnPackData[size].packName})`;
        }
      }
    });
  });

  // 3. Cottonseed Oil Pack Size Switcher
  const csPackButtons = document.querySelectorAll('[data-product="cottonseed"] .pack-pill-btn');
  const csShowcaseImg = document.getElementById('csShowcaseImg');
  const csActivePackLabel = document.getElementById('csActivePackLabel');
  const csActivePackDesc = document.getElementById('csActivePackDesc');
  const csOrderBtn = document.getElementById('csOrderBtn');

  const csPackData = {
    '15kg': {
      img: 'assets/tin-cottonseed-15kg.png',
      packName: '15 kg Tin',
      title: '15 KG COMMERCIAL / WHOLESALE TIN',
      desc: 'Sealed standard tin providing optimal freshness for heavy frying, commercial kitchens, sweet shops, and bulk food establishments.'
    },
    '5l': {
      packName: '5 L Can',
      desc: 'Durable molded can tailored for regular household cooking and deep-frying needs with easy pourability and stackable geometry.'
    },
    '1l': {
      packName: '1 L Bottle',
      desc: 'Ergonomic lightweight bottle with leak-proof seal, suited for daily versatile cooking, tempering, and high-heat sautéing.'
    }
  };

  csPackButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      csPackButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const size = btn.getAttribute('data-size');
      if (csPackData[size]) {
        if (csShowcaseImg) {
          csShowcaseImg.style.opacity = '0.3';
          setTimeout(() => {
            csShowcaseImg.src = csPackData[size].img;
            csShowcaseImg.alt = csPackData[size].title;
            csShowcaseImg.style.opacity = '1';
          }, 120);
        }
        if (csActivePackLabel) csActivePackLabel.textContent = csPackData[size].title;
        if (csActivePackDesc) csActivePackDesc.textContent = csPackData[size].desc;
        if (csOrderBtn) {
          csOrderBtn.setAttribute('data-prefill-pack', csPackData[size].packName);
          csOrderBtn.textContent = `Order / Enquire for Cottonseed Oil (${csPackData[size].packName})`;
        }
      }
    });
  });

  // 4. FAQ Accordion (accessible toggle)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        const btn = i.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 5. Pre-filling Contact Form via CTAs
  const orderLinks = document.querySelectorAll('[data-prefill-oil], [data-prefill-type]');
  const oilSelect = document.getElementById('formOilType');
  const packSelect = document.getElementById('formPackSize');
  const typeSelect = document.getElementById('formOrderType');

  orderLinks.forEach(link => {
    link.addEventListener('click', () => {
      const oil = link.getAttribute('data-prefill-oil');
      const pack = link.getAttribute('data-prefill-pack');
      const type = link.getAttribute('data-prefill-type');

      if (oilSelect && oil) oilSelect.value = oil;
      if (packSelect && pack) packSelect.value = pack;
      if (typeSelect && type) typeSelect.value = type;

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const nameInput = document.getElementById('formName');
          if (nameInput) nameInput.focus();
        }, 500);
      }
    });
  });

  // 6. Interactive Contact Form Submission Handler (Direct WhatsApp Redirection to 9429353514)
  const enquiryForm = document.getElementById('enquiryForm');
  const formSuccess = document.getElementById('formSuccess');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const oil = oilSelect ? oilSelect.value : '';
      const pack = packSelect ? packSelect.value : '';
      const orderType = typeSelect ? typeSelect.value : 'Retail';
      const message = document.getElementById('formMessage') ? document.getElementById('formMessage').value.trim() : '';

      if (!name || !phone) {
        alert('Please provide your name and contact phone number.');
        return;
      }

      const targetPhone = '919429353514';
      const waMsg = encodeURIComponent(
        `*New Order / Enquiry - Laxmi Oil Depo*\n\n` +
        `👤 *Customer Name:* ${name}\n` +
        `📞 *Contact Number:* ${phone}\n` +
        `🛢️ *Edible Oil:* ${oil || 'Edible Oil'}\n` +
        `📦 *Pack Size:* ${pack || 'Standard Pack'}\n` +
        `🏷️ *Order Type:* ${orderType}\n` +
        (message ? `📝 *Requirements / Qty:* ${message}\n` : '') +
        `\n_Order placed via Laxmi Oil Depo Online Website_`
      );

      const waUrl = `https://wa.me/${targetPhone}?text=${waMsg}`;

      if (formSuccess) {
        formSuccess.innerHTML = `
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5b324" stroke-width="2.2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h4 style="font-family: var(--font-display); font-size: 20px; color: var(--color-goddess-gold); margin: 0;">
              ORDER INITIATED FOR ${name.toUpperCase()}!
            </h4>
          </div>
          <p style="font-size: 13px; color: rgba(245, 179, 36, 0.95); line-height: 1.5; margin-bottom: 12px;">
            Thank you! Connecting you directly to <strong>Laxmi Oil Depo WhatsApp (+91 9429353514)</strong> with your order summary...
          </p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
            <a href="${waUrl}" class="btn btn-red" style="font-size: 13px; padding: 10px 22px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              <span>Continue to WhatsApp (+91 9429353514) ↗</span>
            </a>
          </div>
        `;
        formSuccess.style.display = 'block';
        enquiryForm.reset();
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Immediately redirect user to WhatsApp chat with 9429353514
      setTimeout(() => {
        window.location.href = waUrl;
      }, 700);
    });
  }

  // 6b. Product & Depo Gallery Lightbox Modal
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalImg = document.getElementById('galleryModalImg');
  const galleryModalTitle = document.getElementById('galleryModalTitle');
  const galleryModalDesc = document.getElementById('galleryModalDesc');
  const galleryModalBadge = document.getElementById('galleryModalBadge');
  const galleryModalCounter = document.getElementById('galleryModalCounter');
  const galleryCloseBtn = document.getElementById('galleryCloseBtn');
  const galleryBackdrop = document.getElementById('galleryBackdrop');
  const galleryPrevBtn = document.getElementById('galleryPrevBtn');
  const galleryNextBtn = document.getElementById('galleryNextBtn');

  let currentGalleryIndex = 0;
  const galleryItems = Array.from(galleryCards).map((card, idx) => ({
    src: card.getAttribute('data-gallery-src') || card.querySelector('img')?.src || '',
    title: card.getAttribute('data-gallery-title') || `Photo ${idx + 1}`,
    desc: card.getAttribute('data-gallery-desc') || '',
    badge: card.getAttribute('data-gallery-badge') || 'GALLERY',
    badgeCls: card.getAttribute('data-gallery-badge-cls') || 'badge-gold'
  }));

  const openGalleryModal = (index) => {
    if (!galleryModal || galleryItems.length === 0) return;
    currentGalleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentGalleryIndex];

    if (galleryModalImg) {
      galleryModalImg.style.opacity = '0';
      galleryModalImg.src = item.src;
      galleryModalImg.alt = item.title;
      galleryModalImg.onload = () => {
        galleryModalImg.style.opacity = '1';
      };
      setTimeout(() => {
        galleryModalImg.style.opacity = '1';
      }, 80);
    }
    if (galleryModalTitle) galleryModalTitle.textContent = item.title;
    if (galleryModalDesc) galleryModalDesc.textContent = item.desc;
    if (galleryModalCounter) galleryModalCounter.textContent = `${currentGalleryIndex + 1} / ${galleryItems.length}`;
    if (galleryModalBadge) {
      galleryModalBadge.textContent = item.badge;
      galleryModalBadge.className = `badge ${item.badgeCls}`;
    }

    galleryModal.classList.add('open');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (galleryCloseBtn) galleryCloseBtn.focus();
  };

  const closeGalleryModal = () => {
    if (!galleryModal) return;
    galleryModal.classList.remove('open');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (galleryCards[currentGalleryIndex]) {
      galleryCards[currentGalleryIndex].focus();
    }
  };

  const nextGalleryPhoto = () => openGalleryModal(currentGalleryIndex + 1);
  const prevGalleryPhoto = () => openGalleryModal(currentGalleryIndex - 1);

  galleryCards.forEach((card, idx) => {
    card.addEventListener('click', () => openGalleryModal(idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGalleryModal(idx);
      }
    });
  });

  if (galleryCloseBtn) galleryCloseBtn.addEventListener('click', closeGalleryModal);
  if (galleryBackdrop) galleryBackdrop.addEventListener('click', closeGalleryModal);
  if (galleryPrevBtn) galleryPrevBtn.addEventListener('click', prevGalleryPhoto);
  if (galleryNextBtn) galleryNextBtn.addEventListener('click', nextGalleryPhoto);

  document.addEventListener('keydown', (e) => {
    if (!galleryModal || !galleryModal.classList.contains('open')) return;
    if (e.key === 'Escape') closeGalleryModal();
    if (e.key === 'ArrowRight') nextGalleryPhoto();
    if (e.key === 'ArrowLeft') prevGalleryPhoto();
  });

  // 7. Global image fallback & loaded state
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      console.warn('Image resource not found:', this.src);
      this.style.opacity = '0.85';
    });
  });

  // 8. Card View Tab Switcher & Ambiance Toggle (From Uiverse.io by ilkhoeri)
  const tabProducts = document.getElementById('rd-tab-products');
  const tabAbout = document.getElementById('rd-tab-about');
  const tabWholesale = document.getElementById('rd-tab-wholesale');
  const themeModeToggle = document.getElementById('theme-mode');

  if (tabProducts) {
    tabProducts.addEventListener('change', () => {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  if (tabAbout) {
    tabAbout.addEventListener('change', () => {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  if (tabWholesale) {
    tabWholesale.addEventListener('change', () => {
      const el = document.getElementById('wholesale');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (themeModeToggle) {
    themeModeToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.add('ambiance-glow');
      } else {
        document.body.classList.remove('ambiance-glow');
      }
    });
  }
});

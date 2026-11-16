/**
 * Devata Massage & Spa & Wellness Experience
 * Core Interactive Scripts (Vanilla JavaScript)
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // Interactive Spa Treatments - Hover Pop-Up Expanding Cards Gallery
  // =========================================================================
  const gallery = document.getElementById('servicesGallery');
  const cards = document.querySelectorAll('.service-gallery-card');

  if (gallery && cards.length > 0) {
    cards.forEach((card) => {
      // Mouse Enter / Hover: Pop up and expand this card, shrink others
      card.addEventListener('mouseenter', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });

      // Mobile Touch / Click Support
      card.addEventListener('click', (e) => {
        // If clicking a link inside, let the link fire
        if (e.target.closest('a')) return;
        
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });

    // Return to the first card if mouse leaves the whole gallery
    gallery.addEventListener('mouseleave', () => {
      cards.forEach(c => c.classList.remove('active'));
      if (cards[0]) {
        cards[0].classList.add('active');
      }
    });
  }

  // =========================================================================
  // Mobile Drawer Menu
  // =========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeMobileMenu = () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (mobileClose) {
      mobileClose.addEventListener('click', closeMobileMenu);
    }

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // =========================================================================
  // FAQ Accordion
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });

  // =========================================================================
  // Smooth Scrolling for In-Page Anchor Links
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // =========================================================================
  // Treatment Cards Slider Arrows
  // =========================================================================
  const sliderGrid = document.getElementById('treatmentCardsGrid');
  const btnPrev = document.getElementById('sliderPrev');
  const btnNext = document.getElementById('sliderNext');

  if (sliderGrid && btnPrev && btnNext) {
    btnNext.addEventListener('click', () => {
      sliderGrid.scrollBy({ left: 380, behavior: 'smooth' });
    });
    btnPrev.addEventListener('click', () => {
      sliderGrid.scrollBy({ left: -380, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // WhatsApp Auto-Text Booking & Interactive Duration Selector
  // Target WA: +628561611108
  // =========================================================================
  const WA_PHONE = '628561611108';

  function createWaBookingUrl(treatmentName, durationMinutes, durationHours, price) {
    const message = `Hello Devata Home Spa, I would like to book a treatment:
• Treatment: ${treatmentName}
• Duration: ${durationMinutes} Minutes (${durationHours})
• Price: ${price}

Is there an available therapist slot right now? Thank you!`;
    return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
  }

  const treatmentCards = document.querySelectorAll('.treatment-card');

  treatmentCards.forEach(card => {
    const treatmentName = card.getAttribute('data-treatment') || 
                          card.querySelector('.treatment-card-title')?.textContent.trim() || 
                          'Spa Treatment';
    const chips = card.querySelectorAll('.treatment-duration-chip');
    const priceElement = card.querySelector('.selected-price');
    const durLabelElement = card.querySelector('.selected-dur');
    const waBtn = card.querySelector('.btn-card-wa');

    // Handle duration chip click
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation(); // Do not trigger card click

        // Update active class
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        // Extract duration details
        const duration = chip.getAttribute('data-duration') || '60';
        const hours = chip.getAttribute('data-hours') || '1 Hour';
        const price = chip.getAttribute('data-price') || 'IDR 300.000';

        // Update card text
        if (priceElement) {
          priceElement.textContent = price;
          // Subtle pulse animation
          priceElement.style.transform = 'scale(1.1)';
          setTimeout(() => {
            priceElement.style.transform = 'scale(1)';
          }, 180);
        }

        if (durLabelElement) {
          durLabelElement.textContent = `${duration} min`;
        }

        // Update WhatsApp button link
        const newWaUrl = createWaBookingUrl(treatmentName, duration, hours, price);
        if (waBtn) {
          waBtn.setAttribute('href', newWaUrl);
        }
      });
    });

    // Clicking anywhere on card (except buttons and links) opens WhatsApp with selected duration
    card.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('a')) return;

      const activeChip = card.querySelector('.treatment-duration-chip.active') || chips[0];
      if (activeChip) {
        const duration = activeChip.getAttribute('data-duration') || '60';
        const hours = activeChip.getAttribute('data-hours') || '1 Hour';
        const price = activeChip.getAttribute('data-price') || 'IDR 300.000';
        const waUrl = createWaBookingUrl(treatmentName, duration, hours, price);
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }
    });
  });

  console.log("Devata Spa: Glamour pink accents and WhatsApp auto-text booking ready!");
});

/**
 * Mirza Rahimi - Personal Portfolio Resume & Media Works
 * Pure Vanilla JavaScript (ES6+) - 10 Core Features
 */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();       // Feature 1: Theme persistence
  initReadingProgressBar(); // Feature 2: Scroll reading progress bar
  initMobileNav();          // Feature 3: Responsive navigation drawer
  initTypingEffect();       // Feature 4: Subtitle typewriter animation
  initProjectFilter();      // Feature 5: Multivariable filter system
  initProjectModals();      // Feature 6: Dynamic accessible project dialogs
  initAccordions();         // Feature 7: History & experience accordion
  initFormValidation();     // Feature 8: Client-side robust form validation
  initCharacterCounter();   // Feature 9: Real-time message length tracking
  initBackToTopAndNavSpy(); // Feature 10: Scroll spy + smooth Back-to-Top
  setFooterYear();          // Utility: dynamic copyright year
});

/* ==========================================================================
   Feature 1: Dark / Light Mode with LocalStorage
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const mobileThemeIcon = document.querySelector(".mobile-theme-icon");
  const themeLabel = document.getElementById("theme-label");
  const themeBadge = document.getElementById("theme-badge");
  const htmlRoot = document.documentElement;

  function updateThemeUI(theme) {
    htmlRoot.setAttribute("data-theme", theme);
    const isDark = theme === "dark";
    const iconChar = isDark ? "☀️" : "🌙";
    if (themeIcon) themeIcon.textContent = iconChar;
    if (mobileThemeIcon) mobileThemeIcon.textContent = iconChar;
    if (themeLabel) themeLabel.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
    if (themeBadge) themeBadge.textContent = isDark ? "Dark" : "Light";
  }

  const savedTheme = localStorage.getItem("mr_theme") || "dark";
  updateThemeUI(savedTheme);

  function toggleTheme() {
    const currentTheme = htmlRoot.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("mr_theme", nextTheme);
    updateThemeUI(nextTheme);
  }

  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener("click", toggleTheme);
}

/* ==========================================================================
   Feature 2: Scroll Reading Progress Indicator
   ========================================================================== */
function initReadingProgressBar() {
  const progressBar = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    if (scrollTotal > 0) {
      const percentage = (currentScroll / scrollTotal) * 100;
      progressBar.style.width = `${percentage}%`;
    }
  });
}

/* ==========================================================================
   Feature 3: Accessible Mobile Navigation Menu
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById("mobile-toggle");
  const siteSidebar = document.getElementById("site-sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  const closeBtn = document.getElementById("sidebar-close-btn");
  const navLinks = document.querySelectorAll(".nav-link");

  function openSidebar() {
    if (siteSidebar) siteSidebar.classList.add("open");
    if (backdrop) backdrop.classList.add("active");
    if (mobileToggle) {
      mobileToggle.classList.add("active");
      mobileToggle.setAttribute("aria-expanded", "true");
    }
    document.body.classList.add("sidebar-locked");
  }

  function closeSidebar() {
    if (siteSidebar) siteSidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("active");
    if (mobileToggle) {
      mobileToggle.classList.remove("active");
      mobileToggle.setAttribute("aria-expanded", "false");
    }
    document.body.classList.remove("sidebar-locked");
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = siteSidebar && siteSidebar.classList.contains("open");
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
  if (backdrop) backdrop.addEventListener("click", closeSidebar);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeSidebar();
    });
  });

  // Close on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && siteSidebar && siteSidebar.classList.contains("open")) {
      closeSidebar();
    }
  });
}

/* ==========================================================================
   Feature 4: Typewriter Subtitle Animation
   ========================================================================== */
function initTypingEffect() {
  const typedEl = document.getElementById("typed-text");
  const phrases = [
    "Interactive Multimedia.",
    "Photography (@mija.snapss).",
    "On-Site Video Editing.",
    "Web & Application Development."
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeCycle() {
    const currentPhrase = phrases[phraseIdx];

    if (!isDeleting) {
      typedEl.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeCycle, 2000);
        return;
      }
    } else {
      typedEl.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    const speed = isDeleting ? 35 : 75;
    setTimeout(typeCycle, speed);
  }

  typeCycle();
}

/* ==========================================================================
   Feature 5: Project Category Filter System
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

/* ==========================================================================
   Feature 6: Dynamic Project Detail Modals
   ========================================================================== */
function initProjectModals() {
  const modal = document.getElementById("project-modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");
  const modalBody = document.getElementById("modal-body");
  const triggerBtns = document.querySelectorAll(".modal-open-btn");

  const modalData = {
    "modal-p1": {
      title: "Montaj Karnival Citra Borneo 2025",
      subtitle: "Official Closing Montage | Universiti Malaysia Sarawak",
      content: "Executed end-to-end on-site event coverage with the media unit. Captured festival highlights, cultural displays, and dignitary speeches across high-intensity environments. Edited, color graded, and rendered the final reel live in Adobe Premiere Pro to broadcast directly at the grand closing ceremony."
    },
    "modal-p2": {
      title: "Eco Video Contest: Celestia Chrysalis",
      subtitle: "Short Film Contest Entry | Director & Editor",
      content: "Created a structured environmental concept video combining wide-angle framing, traffic pacing, and thematic editing. Highlighted ecological consciousness through rhythmic cutting and balanced color palettes."
    },
    "modal-p3": {
      title: "\"Kerana RM20\" - MPU3372 Integriti & Antirasuah",
      subtitle: "Anti-Corruption Awareness Short Film | Group 7",
      content: "Directed and edited a realistic narrative centered on bribery awareness. Addressed multi-character dialogue clarity, ambient noise reduction, golden hour exposure balancing, and clean sound effects."
    },
    "modal-p4": {
      title: "Official State & Campus Photography Series",
      subtitle: "Photojournalism Portfolio (@mija.snapss)",
      content: "Covered high-profile events including TYT Sarawak's Official Birthday Parade using high-speed telephoto optics (EF 70-200mm f/2.8L), the Kuching Cat Festival, and the PMU JKA Convocation ceremony. Post-processed through curated Adobe Lightroom CC profiles."
    },
    "modal-p5": {
      title: "Wildlife & Fast-Action Sports Photography",
      subtitle: "Action Portfolio (@mija.snapss)",
      content: "Tracked semi-wild Orangutans at Semenggoh Wildlife Reserve and crocodile feeding leaps at Jong's Crocodile Farm using telephoto optics. Covered indoor dynamic motion during the KESUMAS FCSIT Futsal tournament with strict high-ISO and shutter speed calibration."
    },
    "modal-p6": {
      title: "Ticketing & CRUD System Engineering",
      subtitle: "Internship | One Or Zero Technologies Sdn. Bhd.",
      content: "Constructed dynamic database CRUD logic, user authentication parameters, attendance clocking, and handled systematic bug tracing across internal web platforms."
    }
  };

  function openModal(id) {
    const data = modalData[id];
    if (!data) return;

    modalBody.innerHTML = `
      <h3 style="font-size: 1.45rem; margin-bottom: 0.25rem; color: var(--accent);">${data.title}</h3>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">${data.subtitle}</p>
      <p style="line-height: 1.7; color: var(--text-primary); font-size: 0.95rem;">${data.content}</p>
    `;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  triggerBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      openModal(modalId);
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Feature 7: History & Experience Accordion
   ========================================================================== */
function initAccordions() {
  const triggers = document.querySelectorAll(".accordion-trigger");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.parentElement;
      const panel = trigger.nextElementSibling;
      const isOpen = item.classList.contains("active");

      document.querySelectorAll(".accordion-item").forEach((i) => {
        i.classList.remove("active");
        i.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
        i.querySelector(".accordion-panel").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("active");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}

/* ==========================================================================
   Feature 8: Client-Side Robust Form Validation
   ========================================================================== */
function initFormValidation() {
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const messageInput = document.getElementById("contact-message");
  const feedback = document.getElementById("form-feedback");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  function isValidEmail(val) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(val);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let hasError = false;

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    feedback.className = "form-feedback";
    feedback.textContent = "";

    if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Please provide your name (at least 2 characters).";
      hasError = true;
    }

    if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      hasError = true;
    }

    if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Your message must be at least 10 characters long.";
      hasError = true;
    }

    if (!hasError) {
      feedback.classList.add("success");
      feedback.textContent = "Thank you! Your message has been prepared for transmission.";
      form.reset();
      document.getElementById("char-counter").textContent = "0 / 500";
    }
  });
}

/* ==========================================================================
   Feature 9: Real-time Message Character Counter
   ========================================================================== */
function initCharacterCounter() {
  const textarea = document.getElementById("contact-message");
  const counter = document.getElementById("char-counter");
  const maxLength = 500;

  textarea.setAttribute("maxlength", String(maxLength));

  textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    counter.textContent = `${len} / ${maxLength}`;
    if (len >= maxLength) {
      counter.style.color = "#ef4444";
    } else {
      counter.style.color = "";
    }
  });
}

/* ==========================================================================
   Feature 10: Scroll Spy & Smooth Back to Top
   ========================================================================== */
function initBackToTopAndNavSpy() {
  const topBtn = document.getElementById("back-to-top");
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.getElementById("site-header");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (scrollPos > 350) {
      topBtn.classList.add("visible");
    } else {
      topBtn.classList.remove("visible");
    }

    let currentId = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================================================
   Utility: Dynamic Footer Year
   ========================================================================== */
function setFooterYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
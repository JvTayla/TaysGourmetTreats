// scripts/back-to-top-enhanced.js
class BackToTop {
  constructor() {
    this.pageConfigs = {
      Home: {
        topElement: ".landing_page",
        scrollOffset: 0,
      },
      "About Us": {
        topElement: ".about-wrapper",
        scrollOffset: -20,
      },
      Gallery: {
        topElement: "#gallery",
        scrollOffset: -10,
      },
      Order: {
        topElement: ".gallery-cta",
        scrollOffset: -30,
      },
      Events: {
        topElement: ".events-hero",
        scrollOffset: 0,
      },
      "Kiddies Corner": {
        topElement: ".kiddies-hero",
        scrollOffset: -10,
      },
      "Contact Us": {
        topElement: ".faq-container",
        scrollOffset: -20,
      },
    };

    this.createButton();
    this.setupEventListeners();
  }

  createButton() {
    this.button = document.createElement("button");
    this.button.innerHTML = "↑";
    this.button.setAttribute("aria-label", "Back to top");
    this.button.className = "back-to-top";
    document.body.appendChild(this.button);

    // Initial hidden state
    gsap.set(this.button, { opacity: 0, scale: 0 });
  }

  setupEventListeners() {
    this.button.addEventListener("click", () => this.scrollToTop());
    window.addEventListener("scroll", () => this.toggleVisibility());

    // Also show/hide on focus for accessibility
    this.button.addEventListener("focus", () => this.showButton());
    this.button.addEventListener("blur", () => {
      if (window.scrollY <= 300) this.hideButton();
    });
  }

  scrollToTop() {
    const config = this.pageConfigs[currentPage] || {};
    const topElement =
      document.querySelector(config.topElement) ||
      document.querySelector("header") ||
      document.body;
    const offset = config.scrollOffset || 0;

    // Smooth scroll with GSAP for buttery smooth animation
    gsap.to(window, {
      scrollTo: {
        y: topElement,
        offsetY: offset,
      },
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Add a little bounce animation to the button
    gsap.to(this.button, {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });
  }

  toggleVisibility() {
    if (window.scrollY > 300) {
      this.showButton();
    } else {
      this.hideButton();
    }
  }

  showButton() {
    gsap.to(this.button, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  }

  hideButton() {
    gsap.to(this.button, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  }
}

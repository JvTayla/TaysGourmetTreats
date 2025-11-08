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
    this.button.setAttribute("aria-label", "Back to top");
    this.button.className = "back-to-top";

    // Create image element
    const img = document.createElement("img");
    img.src = "../assets/images/BackToTop.png";
    img.alt = "Back to top";
    img.className = "back-to-top-img";

    // Add fallback text for screen readers and if image fails
    const fallbackText = document.createElement("span");
    fallbackText.className = "back-to-top-fallback";
    fallbackText.textContent = "↑";
    fallbackText.style.display = "none"; // Hidden by default

    this.button.appendChild(img);
    this.button.appendChild(fallbackText);
    document.body.appendChild(this.button);

    // Handle image load error
    img.onerror = () => {
      console.warn("BackToTop image failed to load, using fallback");
      img.style.display = "none";
      fallbackText.style.display = "block";
      this.button.classList.add("with-bg"); // Add background for fallback
    };

    // Also handle successful image load
    img.onload = () => {
      console.log("BackToTop image loaded successfully");
      this.button.classList.add("has-image"); // Add class when image loads
    };

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

// scripts/backToTop.js
class BackToTop {
  constructor() {
    this.pageConfigs = {
      // Home page
      Home: {
        topElement: ".landing_page",
        scrollOffset: 0,
      },
      // About Us
      "About Us": {
        topElement: ".about-wrapper",
        scrollOffset: -20,
      },
      // Gallery
      Gallery: {
        topElement: "#gallery",
        scrollOffset: -10,
      },
      // Order
      Order: {
        topElement: ".gallery-cta",
        scrollOffset: -30,
      },
      // Events
      Events: {
        topElement: ".events-hero",
        scrollOffset: 0,
      },
      // Kiddies Corner main page
      "Kiddies Corner": {
        topElement: ".kiddies-hero",
        scrollOffset: -10,
      },
      // Contact Us
      "Contact Us": {
        topElement: ".faq-container",
        scrollOffset: -20,
      },
      // Kiddies Blog pages - they'll use the same as Kiddies Corner
      "Kiddies Blog 1": {
        topElement: ".blog-container",
        scrollOffset: -10,
      },
      "Kiddies Blog 2": {
        topElement: ".blog-container",
        scrollOffset: -10,
      },
      "Kiddies Blog 3": {
        topElement: ".blog-container",
        scrollOffset: -10,
      },
      "Kiddies Blog 4": {
        topElement: ".blog-container",
        scrollOffset: -10,
      },
      "Kiddies Blog 5": {
        topElement: ".blog-container",
        scrollOffset: -10,
      },
      "Kiddies Blog 6": {
        topElement: ".blog-container",
        scrollOffset: -10,
      },
    };

    this.createButton();
    this.setupEventListeners();
  }

  getCurrentPage() {
    // Method 1: Use the existing currentPage variable if available
    if (typeof currentPage !== "undefined") {
      console.log("Using currentPage variable:", currentPage);
      return currentPage;
    }

    // Method 2: Fallback to URL detection
    const path = window.location.pathname;
    console.log("Detected path:", path);

    if (path.includes("about") || path.includes("About-Us")) return "About Us";
    if (path.includes("gallery") || path.includes("Gallery")) return "Gallery";
    if (path.includes("order") || path.includes("Order")) return "Order";
    if (path.includes("events") || path.includes("Events")) return "Events";
    if (path.includes("kiddies") || path.includes("Kiddies")) {
      // Check if it's a blog page or main page
      if (path.includes("blog") || path.includes("Blog")) {
        // It's a blog page - use blog container
        return "Kiddies Blog 1"; // All blogs use same config
      }
      return "Kiddies Corner";
    }
    if (path.includes("contact") || path.includes("Contact-Us"))
      return "Contact Us";

    // Default to Home
    return "Home";
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

    // Add fallback text
    const fallbackText = document.createElement("span");
    fallbackText.className = "back-to-top-fallback";
    fallbackText.textContent = "↑";
    fallbackText.style.display = "none";

    this.button.appendChild(img);
    this.button.appendChild(fallbackText);
    document.body.appendChild(this.button);

    // Handle image load error
    img.onerror = () => {
      img.style.display = "none";
      fallbackText.style.display = "block";
      this.button.classList.add("with-bg");
    };

    img.onload = () => {
      this.button.classList.add("has-image");
    };

    // Initial hidden state
    gsap.set(this.button, { opacity: 0, scale: 0 });
  }

  setupEventListeners() {
    this.button.addEventListener("click", () => this.scrollToTop());
    window.addEventListener("scroll", () => this.toggleVisibility());

    this.button.addEventListener("focus", () => this.showButton());
    this.button.addEventListener("blur", () => {
      if (window.scrollY <= 300) this.hideButton();
    });
  }

  scrollToTop() {
    const pageKey = this.getCurrentPage();
    const config = this.pageConfigs[pageKey] || this.pageConfigs["Home"];
    const topElement =
      document.querySelector(config.topElement) ||
      document.querySelector("header") ||
      document.body;
    const offset = config.scrollOffset || 0;

    console.log(`Scrolling to top for: ${pageKey}`, { topElement, offset });

    // Smooth scroll with GSAP
    gsap.to(window, {
      scrollTo: {
        y: topElement,
        offsetY: offset,
      },
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Button bounce animation
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

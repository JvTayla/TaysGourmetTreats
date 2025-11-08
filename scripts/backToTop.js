// backToTop.js - Smooth scrolling back to top button
// This makes it easy for people to get back to the top of any page

class BackToTop {
  constructor() {
    // Each page has its own scroll position so we don't always go to the VERY top
    // Some pages have headers that stick out, so we need slight offsets
    this.pageConfigs = {
      // Home page - scroll to the landing section
      Home: {
        topElement: ".landing_page",
        scrollOffset: 0,
      },
      // About Us - scroll to the about wrapper with a tiny offset
      "About Us": {
        topElement: ".about-wrapper",
        scrollOffset: -20,
      },
      // Gallery - scroll to the gallery section
      Gallery: {
        topElement: "#gallery",
        scrollOffset: -10,
      },
      // Order - scroll to the order call-to-action section
      Order: {
        topElement: ".gallery-cta",
        scrollOffset: -30,
      },
      // Events - scroll to the events hero section
      Events: {
        topElement: ".events-hero",
        scrollOffset: 0,
      },
      // Kiddies Corner - scroll to the kiddies hero
      "Kiddies Corner": {
        topElement: ".kiddies-hero",
        scrollOffset: -10,
      },
      // Contact Us - scroll to the FAQ container
      "Contact Us": {
        topElement: ".faq-container",
        scrollOffset: -20,
      },
      // All the kiddies blog pages use the same blog container
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

    // Create the button and set up all the event listeners
    this.createButton();
    this.setupEventListeners();
  }

  // Figure out which page we're on so we know where to scroll to
  getCurrentPage() {
    // First try: use the existing currentPage variable if it's available
    if (typeof currentPage !== "undefined") {
      console.log("Using currentPage variable:", currentPage);
      return currentPage;
    }

    // Fallback: figure out the page from the URL
    const path = window.location.pathname;
    console.log("Detected path:", path);

    // Check the URL for clues about which page we're on
    if (path.includes("about") || path.includes("About-Us")) return "About Us";
    if (path.includes("gallery") || path.includes("Gallery")) return "Gallery";
    if (path.includes("order") || path.includes("Order")) return "Order";
    if (path.includes("events") || path.includes("Events")) return "Events";
    if (path.includes("kiddies") || path.includes("Kiddies")) {
      // Check if it's a blog page or the main kiddies page
      if (path.includes("blog") || path.includes("Blog")) {
        // It's a blog page - use blog container settings
        return "Kiddies Blog 1"; // All blogs use the same config
      }
      return "Kiddies Corner";
    }
    if (path.includes("contact") || path.includes("Contact-Us"))
      return "Contact Us";

    // If we can't figure it out, default to Home
    return "Home";
  }

  // Create the actual back-to-top button
  createButton() {
    this.button = document.createElement("button");
    this.button.setAttribute("aria-label", "Back to top");
    this.button.className = "back-to-top";

    // Create the image for the button
    const img = document.createElement("img");
    img.src = "../assets/images/BackToTop.png";
    img.alt = "Back to top";
    img.className = "back-to-top-img";

    // Add a fallback text in case the image doesn't load
    const fallbackText = document.createElement("span");
    fallbackText.className = "back-to-top-fallback";
    fallbackText.textContent = "↑";
    fallbackText.style.display = "none";

    this.button.appendChild(img);
    this.button.appendChild(fallbackText);
    document.body.appendChild(this.button);

    // Handle image load errors - show the fallback text instead
    img.onerror = () => {
      img.style.display = "none";
      fallbackText.style.display = "block";
      this.button.classList.add("with-bg");
    };

    // When image loads successfully, add a class for styling
    img.onload = () => {
      this.button.classList.add("has-image");
    };

    // Start with the button hidden
    gsap.set(this.button, { opacity: 0, scale: 0 });
  }

  // Set up all the button interactions
  setupEventListeners() {
    // Click to scroll to top
    this.button.addEventListener("click", () => this.scrollToTop());

    // Show/hide based on scroll position
    window.addEventListener("scroll", () => this.toggleVisibility());

    // Show when focused (for keyboard users)
    this.button.addEventListener("focus", () => this.showButton());

    // Hide when blurred, but only if we're near the top
    this.button.addEventListener("blur", () => {
      if (window.scrollY <= 300) this.hideButton();
    });
  }

  // The main scroll function - smooth scrolls to the right position
  scrollToTop() {
    const pageKey = this.getCurrentPage();
    const config = this.pageConfigs[pageKey] || this.pageConfigs["Home"];
    const topElement = document.querySelector(config.topElement);
    const offset = config.scrollOffset || 0;

    console.log(`Scrolling to top for: ${pageKey}`, { topElement, offset });

    if (topElement) {
      // Calculate exactly where we need to scroll to
      const rect = topElement.getBoundingClientRect();
      const targetPosition = window.pageYOffset + rect.top + offset;

      // Smooth scroll with GSAP - this feels really nice
      gsap.to(window, {
        duration: 0.8,
        scrollTo: targetPosition, // Just the numeric position
        ease: "power2.inOut",
      });
    } else {
      // Fallback: just go to the very top of the page
      gsap.to(window, {
        duration: 0.8,
        scrollTo: 0,
        ease: "power2.inOut",
      });
    }

    // Fun little bounce animation when clicked
    gsap.to(this.button, {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });
  }

  // Show or hide the button based on scroll position
  toggleVisibility() {
    if (window.scrollY > 300) {
      this.showButton();
    } else {
      this.hideButton();
    }
  }

  // Animate the button in
  showButton() {
    gsap.to(this.button, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  }

  // Animate the button out
  hideButton() {
    gsap.to(this.button, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  }
}

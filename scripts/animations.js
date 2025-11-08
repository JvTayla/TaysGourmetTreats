// scripts/animations.js
class TayAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Check for reduced motion preference
    this.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (this.prefersReducedMotion) {
      return; // Skip animations if user prefers reduced motion
    }

    this.setupGlobalAnimations();
    this.setupPageSpecificAnimations();
  }

  setupGlobalAnimations() {
    // Global animations for all pages
    this.animateNavigation();
    this.animateFooter();
  }

  setupPageSpecificAnimations() {
    // Use the existing currentPage variable that's already declared in your HTML
    switch (currentPage) {
      case "Home":
        this.animateHomePage();
        break;
      case "About Us":
        this.animateAboutPage();
        break;
      case "Gallery":
        this.animateGalleryPage();
        break;
      case "Order":
        this.animateOrderPage();
        break;
      case "Events":
        this.animateEventsPage();
        break;
      case "Kiddies Corner":
        this.animateKiddiesPage();
        break;
      case "Contact Us":
        this.animateContactPage();
        break;
    }
  }

  // Global Animations
  animateNavigation() {
    gsap.from(".nav-sticky", {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".nav-bar li", {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.3,
    });
  }

  animateFooter() {
    gsap.from("#site-footer", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#site-footer",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // Home Page Animations
  animateHomePage() {
    // Hero section timeline
    const heroTimeline = gsap.timeline();

    heroTimeline
      .from(".top_logo", {
        scale: 0,
        rotation: -180,
        duration: 1,
        ease: "back.out(1.7)",
      })
      .from(
        "h1",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .from(
        ".establish",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.2"
      )
      .from(
        ".intro_logo",
        {
          scale: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.2"
      );

    // Review cards animation
    gsap.from(".review_card", {
      x: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#review-container",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Recent orders slider animation
    gsap.from(".recent_orders_slider", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#recent-orders",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Events animation
    gsap.from(".events-grid .event-card", {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#current-events",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Kiddies corner cards animation
    gsap.from(".kiddies_cards figure", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#kiddies-corner",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // About Page Animations
  animateAboutPage() {
    // Title and background pattern
    gsap.from(".about-title", {
      y: -50,
      opacity: 0,
      duration: 0.8,
    });

    gsap.from(".about-bg-pattern", {
      scale: 0,
      rotation: 180,
      duration: 1.5,
      ease: "power2.out",
    });

    // Image and text animation
    gsap.from(".about-image", {
      x: -100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".about-container",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".about-text p", {
      x: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".about-text",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Team carousel animation with ScrollTrigger
    gsap.from(".team-member", {
      y: 100,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".team-wrapper",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Manifesto text animation
    gsap.from(".manifesto-text p, .manifesto-text li", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      scrollTrigger: {
        trigger: ".manifesto-wrapper",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // Gallery Page Animations
  animateGalleryPage() {
    // Recent orders slider
    gsap.from(".recent_orders_slider .card", {
      scale: 0.8,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#recent-orders",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      onComplete: () => {
        this.setupGalleryInteractions();
      },
    });

    // Gallery grid staggered entrance
    gsap.from(".gallery-grid .gallery-item", {
      y: 50,
      opacity: 0,
      scale: 0.8,
      stagger: {
        amount: 0.6,
        grid: "auto",
        from: "center",
      },
      duration: 0.8,
      scrollTrigger: {
        trigger: ".gallery-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Pinterest boards animation
    gsap.from(".pinterest-board-section", {
      y: 100,
      opacity: 0,
      stagger: 0.3,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".pinterest-boards",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }

  setupGalleryInteractions() {
    // Hover animations for gallery items
    const galleryItems = document.querySelectorAll(".gallery-item, .card");

    galleryItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }

  // Order Page Animations
  animateOrderPage() {
    // Progress circle animation
    gsap.from(".progress-circle", {
      scale: 0,
      rotation: -180,
      duration: 1,
      ease: "back.out(1.7)",
    });

    // Gallery CTA animation
    gsap.from(".gallery-cta", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".gallery-cta",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Package cards animation
    gsap.from(".package-card", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".pricing-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Form sections animation
    gsap.from(".form-section", {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      scrollTrigger: {
        trigger: ".order-form",
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });

    // Product tabs animation
    gsap.from(".product-tab", {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
    });

    this.setupFormAnimations();
  }

  setupFormAnimations() {
    // Input focus animations
    const inputs = document.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input.parentElement, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      input.addEventListener("blur", () => {
        gsap.to(input.parentElement, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Invalid field shake animation
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.addEventListener(
        "invalid",
        (e) => {
          e.preventDefault();
          this.shakeInvalidField(e.target);
        },
        true
      );
    });

    // Success message animation
    const successMessage = document.getElementById("success-message");
    if (successMessage) {
      gsap.from(successMessage, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }
  }

  shakeInvalidField(field) {
    gsap.to(field, {
      x: 10,
      duration: 0.1,
      repeat: 3,
      yoyo: true,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.to(field, { x: 0, duration: 0.1 });
      },
    });
  }

  // Events Page Animations
  animateEventsPage() {
    // Hero section
    gsap.from(".events-hero .hero-content", {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Event cards fade/zoom animation with ScrollTrigger
    gsap.from(".events-grid .event-card", {
      scale: 0.8,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".events-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Special offers animation
    gsap.from(".special-card", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".special-offers-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Custom events grid animation
    gsap.from(".custom-event-type", {
      x: -100,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".custom-events-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Quote form animation
    gsap.from(".quote-form", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".quote-form-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // Kiddies Corner Animations
  animateKiddiesPage() {
    // Hero section with floating sprinkles
    const heroTimeline = gsap.timeline();

    heroTimeline
      .from(".kiddies-hero .hero-content", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(
        ".floating-sprinkle",
        {
          scale: 0,
          rotation: 360,
          stagger: 0.3,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

    // Animate floating sprinkles continuously
    gsap.to(".floating-sprinkle", {
      y: -20,
      rotation: 360,
      duration: 3,
      repeat: -1,
      yoyo: true,
      stagger: 0.5,
      ease: "sine.inOut",
    });

    // Blog cards animation with ScrollTrigger
    gsap.from(".blog-card", {
      y: 100,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".blog-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Recipe finder animation
    gsap.from(".recipe-finder-section", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".recipe-finder-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    this.setupRecipeAnimations();
  }

  setupRecipeAnimations() {
    // Recipe card interactions
    const recipeCards = document.querySelectorAll(".recipe-card, .blog-card");

    recipeCards.forEach((card) => {
      // Magnetic button effect for blog buttons
      const button = card.querySelector(".blog-button");
      if (button) {
        this.setupMagneticButton(button);
      }

      // Hover animations
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }

  // Contact Page Animations
  animateContactPage() {
    // FAQ and Contact sections fade in
    const sectionsTimeline = gsap.timeline();

    sectionsTimeline
      .from(".faq-container", {
        y: 50,
        opacity: 0,
        duration: 0.8,
      })
      .from(
        ".contact-container",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.3"
      );

    // FAQ items animation with ScrollTrigger
    gsap.from(".faq-item", {
      x: -50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      scrollTrigger: {
        trigger: ".faq-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Contact form animation
    gsap.from(".contact-form-container form", {
      x: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    this.setupFAQAnimations();
  }

  setupFAQAnimations() {
    // FAQ accordion animations
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.display === "block";

        // Animate the question button
        gsap.to(question, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        });

        if (isOpen) {
          // Collapse animation
          gsap.to(answer, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
              answer.style.display = "none";
            },
          });
        } else {
          // Expand animation
          answer.style.display = "block";
          const height = answer.scrollHeight;

          gsap.fromTo(
            answer,
            { height: 0, opacity: 0 },
            { height: height, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        }
      });
    });
  }

  // Magnetic button effect utility
  setupMagneticButton(button) {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(button, {
        x: (x - rect.width / 2) * 0.2,
        y: (y - rect.height / 2) * 0.2,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    });
  }

  // Utility method for confirmation animations
  showConfirmation(message) {
    const confirmation = document.createElement("div");
    confirmation.className = "confirmation-message";
    confirmation.textContent = message;
    confirmation.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            text-align: center;
            font-family: inherit;
        `;

    document.body.appendChild(confirmation);

    gsap.fromTo(
      confirmation,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );

    setTimeout(() => {
      gsap.to(confirmation, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          document.body.removeChild(confirmation);
        },
      });
    }, 2000);
  }
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Wait a tiny bit to ensure currentPage variable is available
  setTimeout(() => {
    new TayAnimations();
  }, 10);
});

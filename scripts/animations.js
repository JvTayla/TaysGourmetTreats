// animations.js - All the fancy animations for the website
// This makes the website feel alive and engaging with smooth transitions

class TayAnimations {
  constructor() {
    this.init();
  }

  init() {
    // First, check if the user prefers reduced motion - some people get motion sickness!
    this.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // If they do, let's skip all the fancy animations - accessibility first!
    if (this.prefersReducedMotion) {
      return;
    }

    // Okay, let's get this party started with some animations!
    this.setupGlobalAnimations();
    this.setupPageSpecificAnimations();
  }

  setupGlobalAnimations() {
    // These animations run on every page - like the navigation and footer
    this.animateNavigation();
    this.animateFooter();
  }

  setupPageSpecificAnimations() {
    // Using the currentPage variable that's already in the HTML to figure out which page we're on
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

  // =============================================
  // GLOBAL ANIMATIONS - These run on every page
  // =============================================

  // Make the navigation slide in smoothly
  animateNavigation() {
    gsap.from(".nav-sticky", {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Stagger the navigation items for a nice cascade effect
    gsap.from(".nav-bar li", {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.3,
    });
  }

  // Animate the footer when it comes into view
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

  // =============================================
  // HOME PAGE ANIMATIONS - The main landing page
  // =============================================

  animateHomePage() {
    // Hero section timeline - multiple animations in sequence
    const heroTimeline = gsap.timeline();

    heroTimeline
      // Logo spins and scales in
      .from(".top_logo", {
        scale: 0,
        rotation: -180,
        duration: 1,
        ease: "back.out(1.7)",
      })
      // Title slides down
      .from(
        "h1",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3" // Start a bit before the previous animation finishes
      )
      // Establishment text slides in
      .from(
        ".establish",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.2"
      )
      // Intro logo bounces in
      .from(
        ".intro_logo",
        {
          scale: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.2"
      );

    // Review cards slide in from the right when scrolled to
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

    // Recent orders slider scales in
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

    // Event cards slide up in sequence
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

    // Kiddies corner cards slide up from below
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

  // =============================================
  // ABOUT PAGE ANIMATIONS - The story behind the treats
  // =============================================

  animateAboutPage() {
    // Title and background pattern animations
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

    // Image slides in from the left
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

    // Text paragraphs slide in from the right, one after another
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

    // Team members slide up when the team section comes into view
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

    // Manifesto text fades in line by line
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

  // =============================================
  // GALLERY PAGE ANIMATIONS - Showcasing the work
  // =============================================

  animateGalleryPage() {
    // Recent orders cards scale and fade in
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

    // Gallery grid items slide up in a grid pattern from the center out
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

    // Pinterest boards sections slide up
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

  // Add hover interactions to gallery items
  setupGalleryInteractions() {
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

  // =============================================
  // ORDER PAGE ANIMATIONS - The ordering experience
  // =============================================

  animateOrderPage() {
    // Progress circle spins and scales in
    gsap.from(".progress-circle", {
      scale: 0,
      rotation: -180,
      duration: 1,
      ease: "back.out(1.7)",
    });

    // Gallery call-to-action slides up
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

    // Package cards slide up one after another
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

    // Form sections slide up in sequence
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

    // Product tabs scale in
    gsap.from(".product-tab", {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
    });

    this.setupFormAnimations();
  }

  // Add animations to form interactions
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

  // Shake animation for invalid fields
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

  // =============================================
  // EVENTS PAGE ANIMATIONS - Special occasions
  // =============================================

  animateEventsPage() {
    // Hero content slides down
    gsap.from(".events-hero .hero-content", {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Event cards scale and fade in when scrolled to
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

    // Special offers cards slide up
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

    // Custom event types slide in from the left
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

    // Quote form slides up
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

  // =============================================
  // KIDDIES CORNER ANIMATIONS - Fun for the kids
  // =============================================

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
        "-=0.5" // Overlap with previous animation
      );

    // Continuous floating animation for the sprinkles
    gsap.to(".floating-sprinkle", {
      y: -20,
      rotation: 360,
      duration: 3,
      repeat: -1, // Loop forever
      yoyo: true,
      stagger: 0.5,
      ease: "sine.inOut",
    });

    // Blog cards slide up when scrolled to
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

    // Recipe finder section slides up
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

  // Add special animations to recipe cards
  setupRecipeAnimations() {
    const recipeCards = document.querySelectorAll(".recipe-card, .blog-card");

    recipeCards.forEach((card) => {
      // Magnetic button effect for blog buttons
      const button = card.querySelector(".blog-button");
      if (button) {
        this.setupMagneticButton(button);
      }

      // Hover animations - cards lift up on hover
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

  // =============================================
  // CONTACT PAGE ANIMATIONS - Getting in touch
  // =============================================

  animateContactPage() {
    // FAQ and Contact sections timeline
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
        "-=0.3" // Overlap with previous animation
      );

    // FAQ items slide in from the left
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

    // Contact form slides in from the right
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

  // Add animations to FAQ accordion
  setupFAQAnimations() {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.display === "block";

        // Animate the question button when clicked
        gsap.to(question, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        });

        if (isOpen) {
          // Collapse animation - shrink height and fade out
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
          // Expand animation - grow height and fade in
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

  // =============================================
  // UTILITY FUNCTIONS - Reusable animation helpers
  // =============================================

  // Magnetic button effect - buttons follow cursor movement
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

  // Show confirmation messages with animations
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

    // Animate in
    gsap.fromTo(
      confirmation,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );

    // Auto-remove after 2 seconds
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

// Initialize animations when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Wait a tiny bit to make sure the currentPage variable is available
  setTimeout(() => {
    new TayAnimations();
  }, 10);
});

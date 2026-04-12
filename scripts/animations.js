// animations.js - All the fancy animations for the website
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

class TayAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (this.prefersReducedMotion) return;

    this.setupGlobalAnimations();
    this.setupPageSpecificAnimations();
  }

  setupGlobalAnimations() {
    // Wait for nav to be injected by nav.js before animating it
    const waitForNav = setInterval(() => {
      const navItems = document.querySelectorAll(".nav-bar li");
      if (navItems.length > 0) {
        clearInterval(waitForNav);
        this.animateNavigation();
      }
    }, 50);

    this.animateFooter();
  }

  setupPageSpecificAnimations() {
    if (typeof currentPage === "undefined") return;
    switch (currentPage) {
      case "Home":       this.animateHomePage();     break;
      case "About Us":   this.animateAboutPage();    break;
      case "Gallery":    this.animateGalleryPage();  break;
      case "Events":     this.animateEventsPage();   break;
      case "Kiddies Corner": this.animateKiddiesPage(); break;
      case "Contact Us": this.animateContactPage();  break;
    }
  }

  animateNavigation() {
    gsap.from(".nav-sticky", {
      y: -100, opacity: 0, duration: 0.8, ease: "power3.out",
    });
    gsap.from(".nav-bar li", {
      y: -20, opacity: 0, stagger: 0.08, duration: 0.5, delay: 0.3,
    });
  }

  animateFooter() {
    ScrollTrigger.create({
      trigger: "#contact",
      start: "top 90%",
      onEnter: () => {
        gsap.from("#contact", { y: 50, opacity: 0, duration: 0.8 });
      },
      once: true,
    });
  }

  animateHomePage() {
    const heroTimeline = gsap.timeline();
    heroTimeline
      .from(".top_logo", { scale: 0, rotation: -180, duration: 1, ease: "back.out(1.7)" })
      .from("h1", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .from(".establish", { y: 30, opacity: 0, duration: 0.6 }, "-=0.2")
      .from(".intro_logo", { scale: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" }, "-=0.2");

    gsap.from(".review_card", {
      x: 100, opacity: 0, stagger: 0.2, duration: 0.8,
      scrollTrigger: { trigger: "#review-container", start: "top 80%", once: true },
    });

    gsap.from(".recent_orders_slider", {
      scale: 0.8, opacity: 0, duration: 1,
      scrollTrigger: { trigger: "#recent-orders", start: "top 80%", once: true },
    });

    gsap.from(".events-grid .event-card", {
      y: 50, opacity: 0, stagger: 0.15, duration: 0.8,
      scrollTrigger: { trigger: "#current-events", start: "top 80%", once: true },
    });

    gsap.from(".kiddies_cards figure", {
      y: 100, opacity: 0, stagger: 0.2, duration: 0.8,
      scrollTrigger: { trigger: "#kiddies-corner", start: "top 80%", once: true },
    });
  }

  animateAboutPage() {
    gsap.from(".about-title", { y: -50, opacity: 0, duration: 0.8 });

    gsap.from(".about-image", {
      x: -100, opacity: 0, duration: 1,
      scrollTrigger: { trigger: ".about-container", start: "top 80%", once: true },
    });

    gsap.from(".about-text p", {
      x: 100, opacity: 0, stagger: 0.2, duration: 0.8,
      scrollTrigger: { trigger: ".about-text", start: "top 80%", once: true },
    });

    gsap.from(".manifesto-content p", {
      y: 30, opacity: 0, stagger: 0.1, duration: 0.6,
      scrollTrigger: { trigger: ".manifesto-wrapper", start: "top 80%", once: true },
    });
  }

  animateGalleryPage() {
    const galleryGrid = document.querySelector(".gallery-grid");
    if (galleryGrid) {
      gsap.from(".gallery-grid .gallery-item", {
        y: 50, opacity: 0, scale: 0.8,
        stagger: { amount: 0.6, grid: "auto", from: "center" },
        duration: 0.8,
        scrollTrigger: { trigger: ".gallery-grid", start: "top 80%", once: true },
        onComplete: () => this.setupGalleryInteractions(),
      });
    }
    setTimeout(() => this.setupGalleryInteractions(), 1000);
  }

  shakeInvalidField(field) {
    gsap.to(field, {
      x: 10, duration: 0.1, repeat: 3, yoyo: true, ease: "power1.inOut",
      onComplete: () => gsap.to(field, { x: 0, duration: 0.1 }),
    });
  }

  animateEventsPage() {
    gsap.from(".events-hero .hero-content", {
      y: -50, opacity: 0, duration: 1, ease: "power3.out",
    });

    gsap.from(".events-grid .event-card", {
      scale: 0.8, opacity: 0, stagger: 0.15, duration: 0.8,
      scrollTrigger: { trigger: ".events-grid", start: "top 80%", once: true },
    });

    gsap.from(".special-card", {
      y: 100, opacity: 0, stagger: 0.2, duration: 0.8,
      scrollTrigger: { trigger: ".special-offers-section", start: "top 80%", once: true },
    });

    gsap.from(".custom-event-type", {
      x: -100, opacity: 0, stagger: 0.2, duration: 0.8,
      scrollTrigger: { trigger: ".custom-events-grid", start: "top 80%", once: true },
    });

    gsap.from(".quote-form", {
      y: 50, opacity: 0, duration: 0.8,
      scrollTrigger: { trigger: ".quote-form-section", start: "top 80%", once: true },
    });
  }

  animateKiddiesPage() {
    const heroTimeline = gsap.timeline();
    heroTimeline
      .from(".kiddies-hero .hero-content", { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
      .from(".floating-sprinkle", {
        scale: 0, rotation: 360, stagger: 0.3, duration: 1, ease: "back.out(1.7)",
      }, "-=0.5");

    // Single sprinkle loop — kiddiesCorner.js version removed to avoid conflict
    gsap.to(".floating-sprinkle", {
      y: -20, rotation: 360, duration: 3,
      repeat: -1, yoyo: true, stagger: 0.5, ease: "sine.inOut",
    });

    gsap.from(".blog-card", {
      y: 100, opacity: 0, stagger: 0.15, duration: 0.8,
      scrollTrigger: { trigger: ".blog-grid", start: "top 80%", once: true },
    });

    gsap.from(".recipe-finder-section", {
      y: 50, opacity: 0, duration: 0.8,
      scrollTrigger: { trigger: ".recipe-finder-section", start: "top 80%", once: true },
    });

    this.setupRecipeAnimations();
  }

  setupRecipeAnimations() {
    const recipeCards = document.querySelectorAll(".recipe-card, .blog-card");
    recipeCards.forEach((card) => {
      const button = card.querySelector(".blog-button");
      if (button) this.setupMagneticButton(button);

      card.addEventListener("mouseenter", () => gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" }));
      card.addEventListener("mouseleave", () => gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" }));
    });
  }

  animateContactPage() {
    gsap.from(".faq-container", { y: 50, opacity: 0, duration: 0.8 });
    gsap.from(".contact-container", { y: 50, opacity: 0, duration: 0.8, delay: 0.2 });

    gsap.from(".faq-item", {
      x: -50, opacity: 0, stagger: 0.1, duration: 0.6,
      scrollTrigger: { trigger: ".faq-section", start: "top 80%", once: true },
    });

    gsap.from(".contact-form-container form", {
      x: 50, opacity: 0, duration: 0.8,
      scrollTrigger: { trigger: ".contact-section", start: "top 80%", once: true },
    });

    this.setupFAQAnimations();
  }

  setupFAQAnimations() {
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.display === "block";

        gsap.to(question, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });

        if (isOpen) {
          gsap.to(answer, {
            height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut",
            onComplete: () => { answer.style.display = "none"; },
          });
        } else {
          answer.style.display = "block";
          gsap.fromTo(answer,
            { height: 0, opacity: 0 },
            { height: answer.scrollHeight, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        }
      });
    });
  }

  setupMagneticButton(button) {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      gsap.to(button, {
        x: (e.clientX - rect.left - rect.width / 2) * 0.2,
        y: (e.clientY - rect.top - rect.height / 2) * 0.2,
        duration: 0.3, ease: "power2.out",
      });
    });
    button.addEventListener("mouseleave", () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    });
  }

  setupGalleryInteractions() {}

  showConfirmation(message) {
    const el = document.createElement("div");
    el.className = "confirmation-message";
    el.textContent = message;
    el.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(255,255,255,0.95);padding:2rem;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,0.3);z-index:1000;text-align:center;font-family:inherit;`;
    document.body.appendChild(el);
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });
    setTimeout(() => {
      gsap.to(el, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => document.body.removeChild(el) });
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TayAnimations();
});

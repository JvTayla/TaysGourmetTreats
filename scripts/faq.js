// faq.js - FAQ Accordion Functionality
// This makes the FAQ section interactive with smooth expand/collapse animations

document.addEventListener("DOMContentLoaded", function () {
  initializeFAQAccordion();
});

function initializeFAQAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  if (faqQuestions.length === 0) {
    console.log("No FAQ questions found");
    return;
  }

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains("active");

      // Close all other FAQs - only one open at a time
      faqQuestions.forEach((q) => {
        if (q !== this) {
          q.classList.remove("active");
          const otherAnswer = q.nextElementSibling;
          if (otherAnswer) {
            otherAnswer.classList.remove("show");
          }
        }
      });

      // Toggle the current FAQ
      this.classList.toggle("active");

      if (answer) {
        answer.classList.toggle("show");

        // Add GSAP animation if available for smooth transitions
        if (typeof gsap !== "undefined") {
          if (answer.classList.contains("show")) {
            // Expand animation - grow from 0 height to auto
            gsap.fromTo(
              answer,
              { height: 0, opacity: 0 },
              { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
            );
          } else {
            // Collapse animation - shrink to 0 height
            gsap.to(answer, {
              height: 0,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            });
          }
        }
      }
    });

    // Add keyboard accessibility - space or enter to toggle
    question.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Add GSAP animations for the FAQ section entrance
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.fromTo(
      ".faq-item",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
}

// Optional: Function to open a specific FAQ by index
function openFAQ(index) {
  const faqQuestions = document.querySelectorAll(".faq-question");
  if (faqQuestions[index]) {
    faqQuestions[index].click();
  }
}

// Optional: Function to close all FAQs
function closeAllFAQs() {
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.classList.remove("active");
    const answer = question.nextElementSibling;
    if (answer) {
      answer.classList.remove("show");
    }
  });
}
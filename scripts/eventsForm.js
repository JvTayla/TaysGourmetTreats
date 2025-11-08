// eventsForm.js - Event Quote Form Handling
// This handles the custom event quote requests for large orders

document.addEventListener("DOMContentLoaded", function () {
  const quoteForm = document.getElementById("eventQuoteForm");

  if (quoteForm) {
    // Set minimum date to today - can't book events in the past!
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("eventDate").min = today;

    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get all the form values
      const guestCount = parseInt(document.getElementById("guestCount").value);
      const eventType = document.getElementById("eventType").value;
      const eventDate = document.getElementById("eventDate").value;
      const contactName = document.getElementById("contactName").value;
      const contactInfo = document.getElementById("contactInfo").value;

      // Validation - minimum 20 guests for custom events
      if (guestCount < 20) {
        showMessage(
          "Please note: We require a minimum of 20 guests for custom events.",
          "error"
        );
        return;
      }

      if (!eventType) {
        showMessage("Please select an event type.", "error");
        return;
      }

      if (!eventDate) {
        showMessage("Please select your event date.", "error");
        return;
      }

      if (!contactName || !contactInfo) {
        showMessage("Please provide your contact information.", "error");
        return;
      }

      // Validate contact info (basic check for email or phone)
      if (!isValidContactInfo(contactInfo)) {
        showMessage(
          "Please provide a valid email address or phone number.",
          "error"
        );
        return;
      }

      // If all validation passes, submit to Formspree
      submitQuoteRequest(this);
    });

    // Add real-time validation for guest count - highlight if below minimum
    const guestCountInput = document.getElementById("guestCount");
    guestCountInput.addEventListener("input", function () {
      const value = parseInt(this.value);
      if (value < 20 && value !== "") {
        this.style.borderColor = "#ff6b8b";
        this.style.boxShadow = "0 0 0 3px rgba(255, 107, 139, 0.1)";
      } else {
        this.style.borderColor = "#e0e0e0";
        this.style.boxShadow = "none";
      }
    });
  }

  // Add click handlers for seasonal event cards to scroll to form
  document.querySelectorAll(".event-cta, .seasonal-event-card .btn").forEach((button) => {
    button.addEventListener("click", function () {
      const eventCard = this.closest(".event-card, .seasonal-event-card");
      const eventName = eventCard ? eventCard.querySelector("h3").textContent : "this event";

      // Scroll to quote form so they can easily fill it out
      document.querySelector(".quote-form-section").scrollIntoView({
        behavior: "smooth",
      });

      // Pre-fill event type based on what they clicked
      const eventTypeSelect = document.getElementById("eventType");
      let interestMessage = "";

      // Figure out what type of event they're interested in
      if (eventName.toLowerCase().includes("corporate")) {
        eventTypeSelect.value = "corporate";
        interestMessage = `Interested in: ${eventName}`;
      } else if (eventName.toLowerCase().includes("wedding")) {
        eventTypeSelect.value = "wedding";
        interestMessage = `Interested in: ${eventName}`;
      } else if (eventName.toLowerCase().includes("school") || eventName.toLowerCase().includes("community")) {
        eventTypeSelect.value = "school";
        interestMessage = `Interested in: ${eventName}`;
      } else if (eventName.toLowerCase().includes("valentine")) {
        eventTypeSelect.value = "holiday";
        interestMessage = `Interested in: ${eventName} from Valentine's Day Specials`;
      } else if (eventName.toLowerCase().includes("christmas")) {
        eventTypeSelect.value = "holiday";
        interestMessage = `Interested in: ${eventName} from Christmas Specials`;
      } else if (eventName.toLowerCase().includes("mother") || eventName.toLowerCase().includes("father") || eventName.toLowerCase().includes("easter") || eventName.toLowerCase().includes("holiday")) {
        eventTypeSelect.value = "holiday";
        interestMessage = `Interested in: ${eventName}`;
      } else {
        eventTypeSelect.value = "other";
        interestMessage = `Interested in: ${eventName}`;
      }

      // Get the theme textarea and add the event interest message
      const themeTextarea = document.getElementById("theme");

      // Check if there's already content in the textarea
      if (themeTextarea.value.trim() === "") {
        themeTextarea.value = interestMessage;
      } else {
        // If there's existing content, append the interest message
        themeTextarea.value = themeTextarea.value + "\n\n" + interestMessage;
      }

      // Show helpful message so they know it worked
      setTimeout(() => {
        showMessage(
          `We've started your quote for ${eventName}! Please complete the form below.`,
          "success"
        );
      }, 500);
    });
  });

  // Special Offers Tab Functionality - Valentine's and Christmas tabs
  const tabButtons = document.querySelectorAll(".tab-button");
  const specialsGrids = document.querySelectorAll(".specials-grid");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Update active tab
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Show target grid, hide others
      specialsGrids.forEach((grid) => {
        grid.classList.remove("active");
        if (grid.id === `${targetTab}-specials`) {
          grid.classList.add("active");
        }
      });
    });
  });

  // Special CTA buttons in the offers sections
  document.querySelectorAll(".special-cta").forEach((button) => {
    button.addEventListener("click", function () {
      const specialName = this.getAttribute("data-special");

      // Scroll to quote form
      document.querySelector(".quote-form-section").scrollIntoView({
        behavior: "smooth",
      });

      // Pre-fill event type based on the special
      const eventTypeSelect = document.getElementById("eventType");

      // Determine which holiday category and set interest message
      let interestMessage = "";
      if (specialName.includes("Valentine")) {
        eventTypeSelect.value = "holiday";
        interestMessage = `Interested in: ${specialName} from Valentine's Day Specials`;
      } else if (specialName.includes("Christmas")) {
        eventTypeSelect.value = "holiday";
        interestMessage = `Interested in: ${specialName} from Christmas Specials`;
      }

      // Get the theme textarea and add the special interest message
      const themeTextarea = document.getElementById("theme");

      // Check if there's already content in the textarea
      if (themeTextarea.value.trim() === "") {
        themeTextarea.value = interestMessage;
      } else {
        // If there's existing content, append the interest message
        themeTextarea.value = themeTextarea.value + "\n\n" + interestMessage;
      }

      // Show helpful message
      setTimeout(() => {
        showMessage(
          `We've added "${specialName}" to your quote request! Please complete the form below.`,
          "success"
        );
      }, 500);
    });
  });
});

// Basic validation for contact info - email or phone
function isValidContactInfo(contactInfo) {
  // Basic validation for email or phone number
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;

  return emailRegex.test(contactInfo) || phoneRegex.test(contactInfo);
}

// Submit the quote request to Formspree
function submitQuoteRequest(form) {
  const formData = new FormData(form);
  const formDataObj = Object.fromEntries(formData.entries());

  // Show loading state on the submit button
  const submitBtn = form.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Processing...";
  submitBtn.disabled = true;

  // Submit to Formspree
  fetch("https://formspree.io/f/xldardbe", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObj),
  })
    .then((response) => {
      if (response.ok) {
        showMessage(
          "Thank you for your quote request! We'll get back to you within 24 hours.",
          "success"
        );
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    })
    .catch((error) => {
      console.error("Form submission error:", error);
      showMessage(
        "Sorry, there was an error submitting your request. Please try again or contact us directly.",
        "error"
      );
    })
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

// Show success or error messages
function showMessage(message, type) {
  // Remove any existing messages first
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message element
  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message form-message-${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    padding: 15px 20px;
    margin: 20px 0;
    border-radius: 10px;
    font-weight: bold;
    text-align: center;
    ${
      type === "success"
        ? "background: #d4edda; color: #155724; border: 1px solid #c3e6cb;"
        : ""
    }
    ${
      type === "error"
        ? "background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;"
        : ""
    }
  `;

  // Insert after the form or at the top of the form section
  const form = document.getElementById("eventQuoteForm");
  if (form) {
    form.parentNode.insertBefore(messageDiv, form);
  } else {
    document.querySelector(".quote-form-section .container").prepend(messageDiv);
  }

  // Auto-remove after 5 seconds so it doesn't clutter the page
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}
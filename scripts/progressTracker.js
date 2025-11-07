// Progress Tracker for Tay's Gourmet Treats Order Forms
class ProgressTracker {
  constructor() {
    this.currentForm = null;
    this.initializeTracker();
  }

  initializeTracker() {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupTracker());
    } else {
      this.setupTracker();
    }
  }

  setupTracker() {
    this.createProgressCircle();
    this.setupFormListeners();
    this.setupTabListeners();

    // Initial update
    this.updateProgress();
  }

  createProgressCircle() {
    // The HTML is already in the main file, just ensure it exists
    this.progressCircle = document.querySelector(".progress-circle-container");
    if (!this.progressCircle) {
      console.warn("Progress circle container not found");
    }
  }

  setupTabListeners() {
    const tabs = document.querySelectorAll(".product-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Small delay to allow form switch to complete
        setTimeout(() => this.updateProgress(), 100);
      });
    });
  }

  setupFormListeners() {
    // Get all forms
    const forms = document.querySelectorAll(".product-form");

    forms.forEach((form) => {
      // Listen to all input events
      form.addEventListener("input", () => this.updateProgress());

      // Listen to all change events (for selects, checkboxes, etc.)
      form.addEventListener("change", () => this.updateProgress());

      // Listen to click events for custom buttons (size options, etc.)
      form.addEventListener("click", (e) => {
        if (
          e.target.closest(
            ".size-option, .shape-option, .layer-btn, .delivery-option, .quantity-option, .cookie-size-option"
          )
        ) {
          setTimeout(() => this.updateProgress(), 50);
        }
      });
    });
  }

  getCurrentForm() {
    const activeForm = document.querySelector(".product-form.active");
    return activeForm || document.getElementById("cakes-form");
  }

  updateProgress() {
    const form = this.getCurrentForm();
    if (!form) return;

    const requiredFields = this.getRequiredFields(form);
    const completedFields = this.getCompletedFields(requiredFields);
    const progress = this.calculateProgress(completedFields, requiredFields);

    this.updateProgressDisplay(progress);
  }

  getRequiredFields(form) {
    // Get all required fields in the current form
    const fields = form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );

    // Also include custom required elements (size options, etc.)
    const customRequired = this.getCustomRequiredFields(form);

    return [...fields, ...customRequired];
  }

  getCustomRequiredFields(form) {
    const customFields = [];

    // Cake size selection
    const selectedSize = form.querySelector(".size-option.selected");
    if (selectedSize) customFields.push(selectedSize);

    // Cake shape selection
    const selectedShape = form.querySelector(".shape-option.selected");
    if (selectedShape) customFields.push(selectedShape);

    // Delivery option selection
    const selectedDelivery = form.querySelector(".delivery-option.selected");
    if (selectedDelivery) customFields.push(selectedDelivery);

    // For cupcakes: quantity selection
    const selectedQuantity = form.querySelector(".quantity-option.selected");
    if (selectedQuantity) customFields.push(selectedQuantity);

    // For cookies: size selection
    const selectedCookieSize = form.querySelector(
      ".cookie-size-option.selected"
    );
    if (selectedCookieSize) customFields.push(selectedCookieSize);

    return customFields;
  }

  getCompletedFields(requiredFields) {
    return requiredFields.filter((field) => {
      if (field.classList && field.classList.contains("selected")) {
        return true; // Custom selected elements are considered completed
      }

      const tagName = field.tagName.toLowerCase();
      const type = field.type ? field.type.toLowerCase() : "";

      switch (tagName) {
        case "input":
          if (type === "checkbox" || type === "radio") {
            return field.checked;
          }
          return field.value.trim() !== "";

        case "select":
          return field.value !== "";

        case "textarea":
          return field.value.trim() !== "";

        default:
          return field.value && field.value.trim() !== "";
      }
    });
  }

  calculateProgress(completed, total) {
    if (total.length === 0) return 0;
    return (completed.length / total.length) * 100;
  }

  updateProgressDisplay(progress) {
    const percentElement = document.querySelector(".progress-percent");
    const fillElement = document.querySelector(".circle-fill");

    if (percentElement && fillElement) {
      const roundedProgress = Math.round(progress);
      percentElement.textContent = `${roundedProgress}%`;

      // Update the conic gradient for the circle fill
      fillElement.style.background = `conic-gradient(#4CAF50 ${progress}%, #ffffffff ${progress}%)`;

      // Optional: Change color based on progress
      this.updateProgressColor(progress, fillElement);
    }
  }

  updateProgressColor(progress, fillElement) {
    // Change color based on completion level
    if (progress >= 90) {
      fillElement.style.background = `conic-gradient(#ffa8ce ${progress}%, #ffffffff ${progress}%)`; // Dark green
    } else if (progress >= 50) {
      fillElement.style.background = `conic-gradient(#ff5da4 ${progress}%, #ffffffff ${progress}%)`; // Green
    } else if (progress >= 25) {
      fillElement.style.background = `conic-gradient(#d83d7f ${progress}%, #ffffffff ${progress}%)`; // Orange
    } else {
      fillElement.style.background = `conic-gradient(#d83d7f ${progress}%, #ffffffff ${progress}%)`; // Red
    }
  }
}

// Initialize the progress tracker when the script loads
const progressTracker = new ProgressTracker();

// Also make it available globally in case you need to manually update it
window.updateFormProgress = () => progressTracker.updateProgress();

// progressTracker.js - Shows form completion progress
// This helps people see how much of the form they've filled out

class ProgressTracker {
  constructor() {
    this.currentForm = null;
    this.initializeTracker();
  }

  initializeTracker() {
    // Wait for the page to fully load before setting things up
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

    // Do an initial progress check
    this.updateProgress();
  }

  createProgressCircle() {
    // The HTML for the progress circle is already in the main file
    // We just need to make sure we can find it
    this.progressCircle = document.querySelector(".progress-circle-container");
    if (!this.progressCircle) {
      console.warn("Progress circle container not found");
    }
  }

  setupTabListeners() {
    // When people switch between cake/cupcake/cookie tabs, update progress
    const tabs = document.querySelectorAll(".product-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Small delay to let the form switch complete
        setTimeout(() => this.updateProgress(), 100);
      });
    });
  }

  setupFormListeners() {
    // Get all the product forms (cakes, cupcakes, cookies)
    const forms = document.querySelectorAll(".product-form");

    forms.forEach((form) => {
      // Listen to any input in the forms
      form.addEventListener("input", () => this.updateProgress());

      // Listen to changes (for selects, checkboxes, etc.)
      form.addEventListener("change", () => this.updateProgress());

      // Listen to clicks on custom buttons (size options, etc.)
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

  // Figure out which form is currently active
  getCurrentForm() {
    const activeForm = document.querySelector(".product-form.active");
    return activeForm || document.getElementById("cakes-form");
  }

  // The main function that calculates and updates progress
  updateProgress() {
    const form = this.getCurrentForm();
    if (!form) return;

    const requiredFields = this.getRequiredFields(form);
    const completedFields = this.getCompletedFields(requiredFields);
    const progress = this.calculateProgress(completedFields, requiredFields);

    this.updateProgressDisplay(progress);
  }

  // Find all the fields that need to be filled out
  getRequiredFields(form) {
    // Get all the regular required fields
    const fields = form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );

    // Also include custom required elements (size options, etc.)
    const customRequired = this.getCustomRequiredFields(form);

    return [...fields, ...customRequired];
  }

  // Find custom elements that act like required fields
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

    // Cupcake quantity selection
    const selectedQuantity = form.querySelector(".quantity-option.selected");
    if (selectedQuantity) customFields.push(selectedQuantity);

    // Cookie size selection
    const selectedCookieSize = form.querySelector(
      ".cookie-size-option.selected"
    );
    if (selectedCookieSize) customFields.push(selectedCookieSize);

    return customFields;
  }

  // Figure out which required fields have been completed
  getCompletedFields(requiredFields) {
    return requiredFields.filter((field) => {
      // Custom selected elements are considered completed
      if (field.classList && field.classList.contains("selected")) {
        return true;
      }

      const tagName = field.tagName.toLowerCase();
      const type = field.type ? field.type.toLowerCase() : "";

      // Different field types need different completion checks
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

  // Calculate the percentage of completion
  calculateProgress(completed, total) {
    if (total.length === 0) return 0;
    return (completed.length / total.length) * 100;
  }

  // Update the visual progress display
  updateProgressDisplay(progress) {
    const percentElement = document.querySelector(".progress-percent");
    const fillElement = document.querySelector(".circle-fill");

    if (percentElement && fillElement) {
      const roundedProgress = Math.round(progress);
      percentElement.textContent = `${roundedProgress}%`;

      // Update the circle fill with a conic gradient
      fillElement.style.background = `conic-gradient(#4CAF50 ${progress}%, #ffffffff ${progress}%)`;

      // Change color based on how complete they are
      this.updateProgressColor(progress, fillElement);
    }
  }

  // Make the progress circle change colors as it fills up
  updateProgressColor(progress, fillElement) {
    // Different colors for different completion levels
    if (progress >= 90) {
      fillElement.style.background = `conic-gradient(#ffa8ce ${progress}%, #ffffffff ${progress}%)`; // Dark pink
    } else if (progress >= 50) {
      fillElement.style.background = `conic-gradient(#ff5da4 ${progress}%, #ffffffff ${progress}%)`; // Medium pink
    } else if (progress >= 25) {
      fillElement.style.background = `conic-gradient(#d83d7f ${progress}%, #ffffffff ${progress}%)`; // Light pink
    } else {
      fillElement.style.background = `conic-gradient(#d83d7f ${progress}%, #ffffffff ${progress}%)`; // Base pink
    }
  }
}

// Create the progress tracker when the page loads
const progressTracker = new ProgressTracker();

// Make it available globally so other scripts can trigger updates
window.updateFormProgress = () => progressTracker.updateProgress();

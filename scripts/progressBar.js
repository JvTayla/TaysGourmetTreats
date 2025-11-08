// progressBar.js - Controls when the progress circle appears
// This makes sure the progress circle only shows when people are actually filling out forms

function initProgressCircleVisibility() {
  const progressCircle = document.querySelector(".progress-circle-container");
  const allProductForms = document.querySelectorAll(".product-form");

  // Start with the circle hidden - no need to show it until they start interacting
  if (progressCircle) {
    progressCircle.style.display = "none";
    progressCircle.style.opacity = "0";
    progressCircle.style.transform = "scale(0.9)";
    progressCircle.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  }

  // Helper function to show progress circle with smooth animation
  function showProgressCircle() {
    if (progressCircle) {
      progressCircle.style.display = "block";
      setTimeout(() => {
        progressCircle.style.opacity = "1";
        progressCircle.style.transform = "scale(1)";
      }, 100);
    }
  }

  // Listen for interaction ONLY inside the order/contact forms
  // This prevents the circle from showing up when people are just browsing
  allProductForms.forEach((form) => {
    form.addEventListener("focusin", showProgressCircle);
    form.addEventListener("click", showProgressCircle);
  });
}

// Call the function after DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProgressCircleVisibility);
} else {
  initProgressCircleVisibility();
}


function initProgressCircleVisibility() {
  const progressCircle = document.querySelector('.progress-circle-container');
  const allProductForms = document.querySelectorAll('.product-form');

  // Start with the circle hidden
  if (progressCircle) {
    progressCircle.style.display = 'none';
    progressCircle.style.opacity = '0';
    progressCircle.style.transform = 'scale(0.9)';
    progressCircle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  }

  // Helper function to show progress circle
  function showProgressCircle() {
    if (progressCircle) {
      progressCircle.style.display = 'block';
      setTimeout(() => {
        progressCircle.style.opacity = '1';
        progressCircle.style.transform = 'scale(1)';
      }, 100);
    }
  }

  // Listen for interaction *only* inside each order/contact form
  allProductForms.forEach((form) => {
    form.addEventListener('focusin', showProgressCircle);
    form.addEventListener('click', showProgressCircle);
  });
}

// Call the function after DOM loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProgressCircleVisibility);
} else {
  initProgressCircleVisibility();
}

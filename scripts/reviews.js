document.addEventListener("DOMContentLoaded", () => {
  const reviews = document.querySelectorAll("#review-container .review_card");
  let currentIndex = 0;

  // Show the first review initially
  reviews.forEach((r, i) => r.classList.toggle("active", i === currentIndex));

  // Function to show review by index
  function showReview(index) {
    if (index < 0) index = reviews.length - 1;
    if (index >= reviews.length) index = 0;
    reviews.forEach((r, i) => r.classList.toggle("active", i === index));
    currentIndex = index;
  }

  // Example navigation buttons (you should add to your page)
  document.getElementById("nextReview").addEventListener("click", () => {
    showReview(currentIndex + 1);
  });

  document.getElementById("prevReview").addEventListener("click", () => {
    showReview(currentIndex - 1);
  });
});

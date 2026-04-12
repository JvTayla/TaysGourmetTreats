// reviews.js - Customer Reviews Carousel for Gallery Page

document.addEventListener("DOMContentLoaded", () => {
  const reviews = [
    {
      name: "Sarah Baard",
      image: "../assets/images/reference_people/Reference1.jpg",
      review: "The cakes are always beautiful and taste amazing! My children love their treats.",
      stars: 5,
    },
    {
      name: "James Dlamini",
      image: "../assets/images/reference_people/Reference2.jpg",
      review: "I always come back for more. Tay's is my #1 go-to for catering events. Highly recommend!",
      stars: 5,
    },
    {
      name: "Mia Botha",
      image: "../assets/images/reference_people/Reference3.jpg",
      review: "Beautiful presentation and perfect taste every time. Literally perfect for the feed.",
      stars: 5,
    },
  ];

  const container = document.getElementById("reviews-carousel");
  if (!container) return;

  let current = 0;

  function renderStars(count) {
    return Array.from({ length: 5 }, (_, i) =>
      `<span class="star ${i < count ? "filled" : ""}">\u2605</span>`
    ).join("");
  }

  function render() {
    const r = reviews[current];
    container.innerHTML = `
      <div class="review-slide">
        <div class="review-avatar-wrap">
          <img class="review-avatar" src="${r.image}" alt="${r.name}" onerror="this.style.display='none'" />
        </div>
        <div class="review-stars">${renderStars(r.stars)}</div>
        <p class="review-text">"${r.review}"</p>
        <p class="review-name">— ${r.name}</p>
      </div>
    `;
  }

  function prev() {
    current = (current - 1 + reviews.length) % reviews.length;
    render();
    animateSlide("left");
  }

  function next() {
    current = (current + 1) % reviews.length;
    render();
    animateSlide("right");
  }

  function animateSlide(dir) {
    if (typeof gsap === "undefined") return;
    const slide = container.querySelector(".review-slide");
    gsap.fromTo(slide,
      { x: dir === "right" ? 40 : -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }

  document.getElementById("review-prev")?.addEventListener("click", prev);
  document.getElementById("review-next")?.addEventListener("click", next);

  // Dot navigation
  const dotsContainer = document.getElementById("review-dots");
  if (dotsContainer) {
    reviews.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "review-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Review ${i + 1}`);
      dot.addEventListener("click", () => {
        const dir = i > current ? "right" : "left";
        current = i;
        render();
        animateSlide(dir);
        dotsContainer.querySelectorAll(".review-dot").forEach((d, j) =>
          d.classList.toggle("active", j === i)
        );
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Auto-advance every 5 seconds
  setInterval(() => {
    current = (current + 1) % reviews.length;
    render();
    animateSlide("right");
    if (dotsContainer) {
      dotsContainer.querySelectorAll(".review-dot").forEach((d, j) =>
        d.classList.toggle("active", j === current)
      );
    }
  }, 5000);

  render();
});

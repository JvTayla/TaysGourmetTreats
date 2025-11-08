document.addEventListener("DOMContentLoaded", () => {
  const recentOrders = [
    {
      src: "../assets/images/orders/recent-order1.jpg",
      alt: "Birthday Classical Chocolate Cake with Purple Butterflies 7 Inch Cake",
    },
    {
      src: "../assets/images/orders/recent-order2.jpg",
      alt: "22nd Classical Chocolate Bento Cake with Champagne and Gold accents 4 Inch Cake",
    },
    {
      src: "../assets/images/orders/recent-order3.jpg",
      alt: "Baby Shower Chocolate cake with Barbie font and pink and black",
    },
  ];

  let currentIndex = 0;

  // Select the three images in the carousel
  const leftImage = document.querySelector(".left_card img");
  const mainImage = document.querySelector(".main_card img");
  const rightImage = document.querySelector(".right_card img");

  const prevButton = document.querySelector(".prev_rec");
  const nextButton = document.querySelector(".next_rec");

  function updateCarousel() {
    const leftIndex =
      (currentIndex - 1 + recentOrders.length) % recentOrders.length;
    const rightIndex = (currentIndex + 1) % recentOrders.length;

    leftImage.src = recentOrders[leftIndex].src;
    leftImage.alt = recentOrders[leftIndex].alt;

    mainImage.src = recentOrders[currentIndex].src;
    mainImage.alt = recentOrders[currentIndex].alt;

    rightImage.src = recentOrders[rightIndex].src;
    rightImage.alt = recentOrders[rightIndex].alt;
  }

  // Initialize
  updateCarousel();

  // Button events
  prevButton.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + recentOrders.length) % recentOrders.length;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % recentOrders.length;
    updateCarousel();
  });

  // Click on side images to navigate
  leftImage.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + recentOrders.length) % recentOrders.length;
    updateCarousel();
  });

  rightImage.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % recentOrders.length;
    updateCarousel();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      currentIndex =
        (currentIndex - 1 + recentOrders.length) % recentOrders.length;
      updateCarousel();
    }
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % recentOrders.length;
      updateCarousel();
    }
  });
});

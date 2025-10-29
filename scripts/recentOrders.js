document.addEventListener("DOMContentLoaded", () => {
  const recentOrders = [
    {
      src: "assets/images/orders/recent-order1.jpg",
      alt: "Birthday Classical Chocolate Cake with Purple Butterflies 7 Inch Cake",
    },
    {
      src: "assets/images/orders/recent-order2.jpg",
      alt: "22nd Classical Chocolate Bento Cake with Champagne and Gold accents 4 Inch Cake",
    },
  ];

  let currentIndex = 0; // Start with first order

  // Select DOM elements
  const orderImage = document.querySelector(".recent_orders");
  const prevButton = document.querySelector(".prev_rec");
  const nextButton = document.querySelector(".next_rec");

  // Function to update the image
  function updateOrder() {
    orderImage.src = recentOrders[currentIndex].src;
    orderImage.alt = recentOrders[currentIndex].alt;
  }

  // Event listeners for buttons
  prevButton.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + recentOrders.length) % recentOrders.length;
    updateOrder();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % recentOrders.length;
    updateOrder();
  });
});

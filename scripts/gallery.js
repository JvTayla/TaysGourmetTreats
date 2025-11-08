// gallery.js - Pinterest-style gallery
// This creates a beautiful gallery that shows off all the amazing treats

class PinterestGallery {
  constructor() {
    this.boards = {
      traditional: "taysgourmettreats/traditional-cakes",
      custom: "taysgourmettreats/custom-cakes",
      bento: "taysgourmettreats/bento-cakes",
    };

    this.allPins = [];
    this.filteredPins = [];

    this.init();
  }

  async init() {
    await this.loadPinterestData();
    this.displayPins(this.allPins);
    this.setupGSAPAnimations();
  }

  async loadPinterestData() {
    this.showLoading(true);

    try {
      await this.loadFromPinterestAPI();
    } catch (error) {
      console.log("Pinterest API failed, using sample data:", error);
      this.loadSampleData();
    } finally {
      this.showLoading(false);
    }
  }

  async loadFromPinterestAPI() {
    throw new Error("Pinterest API requires OAuth setup");
  }

  loadSampleData() {
    this.allPins = [
      {
        id: 1,
        title: "Classic Chocolate Cake",
        description:
          "Rich traditional chocolate cake with buttercream frosting - perfect for birthdays and special occasions",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        category: "traditional",
        boardType: "traditional",
        boardName: "Traditional Cakes",
        price: 450,
        tags: ["chocolate", "traditional", "birthday", "celebration"],
      },
      {
        id: 2,
        title: "Red Velvet Luxury",
        description:
          "Classic red velvet cake with cream cheese frosting and decorative elements",
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f",
        category: "traditional",
        boardType: "traditional",
        boardName: "Traditional Cakes",
        price: 520,
        tags: ["red velvet", "cream cheese", "luxury", "classic"],
      },
      {
        id: 3,
        title: "Custom Wedding Masterpiece",
        description:
          "Elegant three-tier wedding cake with fresh floral accents and gold detailing",
        image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
        category: "custom",
        boardType: "custom",
        boardName: "Custom Cakes",
        price: 1200,
        tags: ["wedding", "custom", "floral", "elegant", "tiered"],
      },
      {
        id: 4,
        title: "Birthday Celebration Cake",
        description:
          "Custom birthday cake with personalized decorations and colorful design",
        image: "https://images.unsplash.com/photo-1559620192-032c4bc4674e",
        category: "custom",
        boardType: "custom",
        boardName: "Custom Cakes",
        price: 650,
        tags: ["birthday", "custom", "colorful", "celebration", "personalized"],
      },
      {
        id: 5,
        title: "Mini Bento Cake",
        description:
          "Adorable individual-sized decorated cake perfect for personal treats",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
        category: "bento",
        boardType: "bento",
        boardName: "Bento Cakes",
        price: 250,
        tags: ["mini", "bento", "individual", "cute", "personal"],
      },
      {
        id: 6,
        title: "Character Bento Cake",
        description:
          "Fun character-themed bento cake that brings smiles to all ages",
        image: "https://images.unsplash.com/photo-1710912247355-4675bde57920",
        category: "bento",
        boardType: "bento",
        boardName: "Bento Cakes",
        price: 300,
        tags: ["character", "bento", "fun", "themed", "colorful"],
      },
    ];

    this.filteredPins = [...this.allPins];
  }

  displayPins(pins) {
    const grid = document.getElementById("galleryGrid");

    if (!grid) {
      console.error("Gallery grid element not found");
      return;
    }

    if (pins.length === 0) {
      grid.innerHTML = "<p>No cakes to display</p>";
      return;
    }

    grid.innerHTML = pins.map((pin) => this.createPinCard(pin)).join("");
    this.animatePinCards();
  }

  createPinCard(pin) {
    return `
      <div class="pin-card" data-board="${pin.boardType}">
        <img src="${pin.image}" alt="${pin.title}" class="pin-image">
        <div class="pin-info">
          <div class="pin-title">${pin.title}</div>
          <div class="pin-description">${pin.description}</div>
          <div class="pin-meta">
            <span class="pin-board">${pin.boardName}</span>
            <span class="pin-price">R ${pin.price}</span>
          </div>
          <div class="pin-tags">${pin.tags
            .map((tag) => `<span class="tag">${tag}</span>`)
            .join("")}</div>
        </div>
      </div>
    `;
  }

  setupGSAPAnimations() {
    // Initial page load animation for gallery title
    gsap.from("#Inspiration-board h2", {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: "power3.out",
    });

    // ScrollTrigger for Pinterest boards sections
    gsap.from(".pinterest-board-section", {
      scrollTrigger: {
        trigger: ".pinterest-boards",
        start: "top 70%",
        toggleActions: "play none none none",
      },
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power2.out",
    });
  }

  animatePinCards() {
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        ".pin-card",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }

  showLoading(show) {
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
      loadingElement.style.display = show ? "block" : "none";
    }
  }
}

// Initialize gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PinterestGallery();
});

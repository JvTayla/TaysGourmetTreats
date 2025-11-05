class PinterestGallery {
  constructor() {
    // Using Pinterest API v5 with your actual boards
    this.boards = {
      traditional: "taysgourmettreats/traditional-cakes",
      custom: "taysgourmettreats/custom-cakes",
      bento: "taysgourmettreats/bento-cakes",
    };

    // For demo purposes - in production, you'd use OAuth
    this.accessToken = "YOUR_PINTEREST_ACCESS_TOKEN";

    this.allPins = [];
    this.filteredPins = [];
    this.currentBoard = "all";
    this.currentSearch = "";

    this.init();
  }

  async init() {
    // Try to load from Pinterest API, fallback to sample data
    await this.loadPinterestData();
    this.setupEventListeners();
    this.displayPins(this.allPins);
    this.setupGSAPAnimations();
  }

  async loadPinterestData() {
    this.showLoading(true);

    try {
      // Attempt to load from Pinterest API
      await this.loadFromPinterestAPI();
    } catch (error) {
      console.log("Pinterest API failed, using sample data:", error);
      // Fallback to sample data with South African pricing
      this.loadSampleData();
    } finally {
      this.showLoading(false);
    }
  }

  async loadFromPinterestAPI() {
    // Note: This requires proper OAuth setup
    // For now, we'll use sample data but you can implement this later
    throw new Error("Pinterest API requires OAuth setup");

    // Example of how it would work:
    /*
        for (const [boardType, boardName] of Object.entries(this.boards)) {
            const pins = await this.fetchBoardPins(boardName);
            this.allPins.push(...pins.map(pin => ({
                ...pin,
                boardType: boardType,
                boardName: this.getBoardDisplayName(boardType),
                price: this.generatePrice(boardType) // Generate ZAR prices
            })));
        }
        */
  }

  loadSampleData() {
    // Sample data with South African Rand prices
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
        price: 450, // ZAR
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
        image:
          "https://images.unsplash.com/photo-1710912247355-4675bde57920?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&",
        category: "bento",
        boardType: "bento",
        boardName: "Custom Cakes",
        price: 300,
        tags: ["character", "bento", "fun", "themed", "colorful"],
      },
    ];

    this.filteredPins = [...this.allPins];
  }

  getBoardDisplayName(boardType) {
    const names = {
      traditional: "Traditional Cakes",
      custom: "Custom Cakes",
      bento: "Bento Cakes",
    };
    return names[boardType] || boardType;
  }

  setupEventListeners() {
    // Search functionality
    document
      .getElementById("searchBtn")
      .addEventListener("click", () => this.handleSearch());
    document.getElementById("searchInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleSearch();
    });
    document
      .getElementById("clearSearch")
      .addEventListener("click", () => this.clearSearch());

    // Board filter buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.filterByBoard(e.target.dataset.board)
      );
    });
  }

  handleSearch() {
    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase()
      .trim();
    this.currentSearch = searchTerm;
    this.applyFilters();
  }

  clearSearch() {
    document.getElementById("searchInput").value = "";
    this.currentSearch = "";
    this.applyFilters();
  }

  filterByBoard(board) {
    this.currentBoard = board;

    // Update active button
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.board === board);
    });

    this.applyFilters();
  }

  applyFilters() {
    this.filteredPins = this.allPins.filter((pin) => {
      const matchesBoard =
        this.currentBoard === "all" || pin.boardType === this.currentBoard;
      const matchesSearch =
        !this.currentSearch ||
        pin.title.toLowerCase().includes(this.currentSearch) ||
        pin.description.toLowerCase().includes(this.currentSearch) ||
        pin.tags.some((tag) => tag.toLowerCase().includes(this.currentSearch));

      return matchesBoard && matchesSearch;
    });

    this.displayPins(this.filteredPins);
  }

  displayPins(pins) {
    const grid = document.getElementById("galleryGrid");
    const noResults = document.getElementById("noResults");

    if (pins.length === 0) {
      grid.innerHTML = "";
      noResults.style.display = "block";
      return;
    }

    noResults.style.display = "none";

    grid.innerHTML = pins.map((pin) => this.createPinCard(pin)).join("");

    // Animate new pins
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
    // Initial page load animation
    gsap.from(".gallery-section h2", {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: "power3.out",
    });

    // ScrollTrigger for search section
    gsap.from(".search-container", {
      scrollTrigger: {
        trigger: ".search-container",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      duration: 1,
      y: 30,
      opacity: 0,
      ease: "power2.out",
    });

    // Motion path for filter buttons
    gsap.from(".filter-btn", {
      duration: 1,
      x: -100,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(1.7)",
    });

    // ScrollTrigger for Pinterest boards
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

  showLoading(show) {
    document.getElementById("loading").style.display = show ? "block" : "none";
  }
}

// Initialize gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PinterestGallery();
});

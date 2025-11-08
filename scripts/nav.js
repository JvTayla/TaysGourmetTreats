// nav.js - Universal Navigation for all pages
class Navigation {
  constructor() {
    this.navData = [
      { name: "Home", path: "/TaysGourmetTreats/index.html" },
      { name: "About Us", path: "/TaysGourmetTreats/About-Us/index.html" },
      { name: "Gallery", path: "/TaysGourmetTreats/Gallery/index.html" },
      { name: "Order", path: "/TaysGourmetTreats/Order/index.html" },
      { name: "Events", path: "/TaysGourmetTreats/Events/index.html" },
      {
        name: "Kiddies Corner",
        path: "/TaysGourmetTreats/Kiddies-Corner/index.html",
      },
      { name: "Contact Us", path: "/TaysGourmetTreats/Contact-Us/index.html" },
    ];
    this.init();
  }

  init() {
    console.log("Navigation initialized");
    this.generateAllNavLinks();
    this.setupMobileMenu();
  }

  getCurrentPage() {
    // Use global currentPage variable if defined
    if (typeof currentPage !== "undefined") {
      return currentPage;
    }

    // Fallback: detect from URL path
    const path = window.location.pathname;
    if (path.includes("About-Us")) return "About Us";
    if (path.includes("Gallery")) return "Gallery";
    if (path.includes("Order")) return "Order";
    if (path.includes("Events")) return "Events";
    if (path.includes("Kiddies-Corner")) return "Kiddies Corner";
    if (path.includes("Contact-Us")) return "Contact Us";
    return "Home";
  }

  generateAllNavLinks() {
    const currentPage = this.getCurrentPage();

    // Generate desktop navigation
    const mainNav = document.getElementById("main-nav");
    if (mainNav) {
      const desktopLinks = this.navData
        .map(
          (page) => `
                <li>
                    <a href="${page.path}" class="${
            page.name === currentPage ? "active" : ""
          }">
                        ${page.name}
                    </a>
                </li>
            `
        )
        .join("");
      mainNav.innerHTML = desktopLinks;
    }

    // Generate mobile navigation
    const mobileNav = document.querySelector(".mobile-nav-links");
    if (mobileNav) {
      const mobileLinks = this.navData
        .map(
          (page) => `
                <li>
                    <a href="${page.path}" class="${
            page.name === currentPage ? "active" : ""
          }">
                        ${page.name}
                    </a>
                </li>
            `
        )
        .join("");
      mobileNav.innerHTML = mobileLinks;
    }
  }

  setupMobileMenu() {
    const burger = document.getElementById("burger");
    const mobileNav = document.querySelector(".mobile-nav-overlay");
    const overlay = document.querySelector(".menu-overlay");
    const body = document.body;

    if (!burger || !mobileNav || !overlay) {
      console.warn("Mobile menu elements not found - might be on landing page");
      return;
    }

    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleMobileMenu(burger, mobileNav, overlay, body);
    });

    overlay.addEventListener("click", () => {
      this.closeMobileMenu(burger, mobileNav, overlay, body);
    });

    // Close menu when clicking on mobile nav links
    document.addEventListener("click", (e) => {
      if (e.target.closest(".mobile-nav-links a")) {
        this.closeMobileMenu(burger, mobileNav, overlay, body);
      }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("active")) {
        this.closeMobileMenu(burger, mobileNav, overlay, body);
      }
    });

    // Close menu when window is resized to desktop size
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        this.closeMobileMenu(burger, mobileNav, overlay, body);
      }
    });
  }

  toggleMobileMenu(burger, mobileNav, overlay, body) {
    const isOpening = !burger.classList.contains("active");

    burger.classList.toggle("active");
    mobileNav.classList.toggle("active");
    overlay.classList.toggle("active");

    if (isOpening) {
      body.classList.add("menu-open");
      // Prevent background scrolling
      document.documentElement.style.overflow = "hidden";
    } else {
      body.classList.remove("menu-open");
      // Restore scrolling
      document.documentElement.style.overflow = "";
    }
  }

  closeMobileMenu(burger, mobileNav, overlay, body) {
    burger.classList.remove("active");
    mobileNav.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("menu-open");
    document.documentElement.style.overflow = ""; // Restore scrolling
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new Navigation();
});

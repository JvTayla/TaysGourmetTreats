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
    this.insertFooter();
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

  insertFooter() {
    const footerHTML = `
      <footer id="contact">
        <div class="footer-columns">
          <!-- Left Column - Brand and social media -->
          <div class="footer-left">
            <section class="footer-brand">
              <h2 class="footer-title">Tay's Gourmet Treats</h2>
            </section>

            <section class="footer-social">
              <a href="https://www.instagram.com/tays_gourmet_treats" target="_blank" aria-label="Instagram"><i class="fi fi-brands-instagram"></i></a>
              <a href="https://www.tiktok.com/@tays_gourmet_treats" target="_blank" aria-label="TikTok"><i class="fi fi-brands-tik-tok"></i></a>
              <a href="https://www.facebook.com/people/Tays-Treats/61555988728903/?_rdr" target="_blank" aria-label="Facebook"><i class="fi fi-brands-facebook"></i></a>
              <a href="https://x.com/TreatsTay863015" target="_blank" aria-label="X"><i class="fi fi-brands-twitter"></i></a>
              <a href="https://www.linkedin.com/company/tay-s-gourmet-treats/" target="_blank" aria-label="LinkedIn"><i class="fi fi-brands-linkedin"></i></a>
            </section>

            <section class="footer-disclaimer">
              <h6>| ©2024 Tays Gourmet Treats | All rights reserved | </h6>
              <h6>| POPI | BEE Certification |</h6>
            </section>
          </div>

          <!-- Right Column - Location map -->
          <div class="footer-right">
            <section class="footer-map">
              <h6> Our Location:</h6>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7164.097573791654!2d28.103029046487393!3d-26.129952226144606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950d63396e8f4f%3A0x9e6c4b82750cfe7f!2sLyndhurst%2C%20Johannesburg%2C%202192!5e0!3m2!1sen!2sza!4v1760409528904!5m2!1sen!2sza"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </section>
          </div>
        </div>
      </footer>
      <div class="footer-bottom"></div>
    `;

    // Insert footer at the end of the body
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new Navigation();
});

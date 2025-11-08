// dynamic-components.js - Dynamic Navigation Generator for your structure
class DynamicComponents {
  constructor() {
    this.navData = [
      { name: "Home", path: "index.html" },
      { name: "About Us", path: "About-Us/index.html" },
      { name: "Gallery", path: "Gallery/index.html" },
      { name: "Order", path: "Order/index.html" },
      { name: "Events", path: "Events/index.html" },
      { name: "Kiddies Corner", path: "Kiddies-Corner/index.html" },
      { name: "Contact Us", path: "Contact-Us/index.html" },
    ];
    this.basePath = "/TaysGourmetTreats/";
    this.init();
  }

  init() {
    this.generateNavigationLinks();
    this.injectFooter();
    this.setupMobileMenu();
  }

  getCurrentPage() {
    // Use your existing currentPage variable
    if (typeof currentPage !== "undefined") {
      return currentPage;
    }

    // Fallback: detect from URL
    const path = window.location.pathname;
    if (path.includes("About-Us")) return "About Us";
    if (path.includes("Gallery")) return "Gallery";
    if (path.includes("Order")) return "Order";
    if (path.includes("Events")) return "Events";
    if (path.includes("Kiddies-Corner")) return "Kiddies Corner";
    if (path.includes("Contact-Us")) return "Contact Us";
    return "Home";
  }

  // Generate navigation links and insert into #main-nav
  generateNavigationLinks() {
    const currentPage = this.getCurrentPage();
    const mainNav = document.getElementById("main-nav");

    if (!mainNav) {
      console.warn("Main nav element (#main-nav) not found");
      return;
    }

    // Generate the navigation links
    const navLinks = this.navData
      .map(
        (page) => `
            <li>
                <a href="${this.basePath}${page.path}" 
                   class="${page.name === currentPage ? "active" : ""}">
                    ${page.name}
                </a>
            </li>
        `
      )
      .join("");

    // Insert into the main-nav
    mainNav.innerHTML = navLinks;
  }

  // Generate footer (same as before)
  generateFooter() {
    return `
            <footer id="contact">
                <div class="footer-columns">
                    <div class="footer-left">
                        <section class="footer-brand">
                            <h2 class="footer-title">Tay's Gourmet Treats</h2>
                        </section>
                        <section class="footer-social">
                            <a href="https://www.instagram.com/tays_gourmet_treats" target="_blank" aria-label="Instagram">
                                <i class="fi fi-brands-instagram"></i>
                            </a>
                            <a href="https://www.tiktok.com/@tays_gourmet_treats" target="_blank" aria-label="TikTok">
                                <i class="fi fi-brands-tik-tok"></i>
                            </a>
                            <a href="https://www.facebook.com/people/Tays-Treats/61555988728903/?_rdr" target="_blank" aria-label="Facebook">
                                <i class="fi fi-brands-facebook"></i>
                            </a>
                            <a href="https://x.com/TreatsTay863015" target="_blank" aria-label="X">
                                <i class="fi fi-brands-twitter"></i>
                            </a>
                            <a href="https://www.linkedin.com/company/tay-s-gourmet-treats/" target="_blank" aria-label="LinkedIn">
                                <i class="fi fi-brands-linkedin"></i>
                            </a>
                        </section>
                        <section class="footer-disclaimer">
                            <h6>| ©2024 Tays Gourmet Treats | All rights reserved | </h6>
                            <h6>| POPI | BEE Certification |</h6>
                        </section>
                    </div>
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
        `;
  }

  injectFooter() {
    const footerPlaceholder = document.getElementById("site-footer");
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = this.generateFooter();
    } else {
      // Create footer if placeholder doesn't exist
      document.body.insertAdjacentHTML("beforeend", this.generateFooter());
    }
  }

  setupMobileMenu() {
    setTimeout(() => {
      const burger = document.getElementById("burger");
      const mobileNav = document.querySelector(".mobile-nav-overlay");
      const overlay = document.querySelector(".menu-overlay");
      const body = document.body;

      if (burger && mobileNav && overlay) {
        burger.addEventListener("click", function (e) {
          e.stopPropagation();
          const isOpening = !this.classList.contains("active");

          this.classList.toggle("active");
          mobileNav.classList.toggle("active");
          overlay.classList.toggle("active");

          if (isOpening) {
            body.classList.add("menu-open");
          } else {
            body.classList.remove("menu-open");
          }
        });

        overlay.addEventListener("click", () => this.closeMobileMenu());

        document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
          link.addEventListener("click", () => this.closeMobileMenu());
        });

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && mobileNav.classList.contains("active")) {
            this.closeMobileMenu();
          }
        });
      }
    }, 100);
  }

  closeMobileMenu() {
    const burger = document.getElementById("burger");
    const mobileNav = document.querySelector(".mobile-nav-overlay");
    const overlay = document.querySelector(".menu-overlay");
    const body = document.body;

    burger?.classList.remove("active");
    mobileNav?.classList.remove("active");
    overlay?.classList.remove("active");
    body.classList.remove("menu-open");
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new DynamicComponents();
});

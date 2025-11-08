// nav.js - Enhanced with progressive enhancement
const basePath = "/TaysGourmetTreats/";

// Navigation enhancement when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  enhanceNavigation();
  setupFooter();
  setupMobileMenu();
});

function enhanceNavigation() {
  const navContainer = document.querySelector(".nav-bar ul");
  const mobileNavContainer = document.querySelector(".mobile-nav-links");

  if (!navContainer) return; // Navigation already exists in HTML

  // Update active states based on current page
  const currentPageName = getCurrentPage();

  // Update desktop nav active states
  updateActiveStates(navContainer, currentPageName);

  // Update mobile nav active states
  if (mobileNavContainer) {
    updateActiveStates(mobileNavContainer, currentPageName);
  }

  // Update hrefs to include basePath if needed
  updateNavLinks(navContainer);
  if (mobileNavContainer) {
    updateNavLinks(mobileNavContainer);
  }
}

function getCurrentPage() {
  if (typeof currentPage !== "undefined") return currentPage;

  const path = window.location.pathname;
  if (path.includes("About-Us")) return "About Us";
  if (path.includes("Gallery")) return "Gallery";
  if (path.includes("Order")) return "Order";
  if (path.includes("Events")) return "Events";
  if (path.includes("Kiddies-Corner")) return "Kiddies Corner";
  if (path.includes("Contact-Us")) return "Contact Us";
  return "Home";
}

function updateActiveStates(container, currentPageName) {
  const links = container.querySelectorAll("a");
  links.forEach((link) => {
    const linkText = link.textContent.trim();
    if (linkText === currentPageName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function updateNavLinks(container) {
  const links = container.querySelectorAll("a");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    // Only update if it's a relative path that needs basePath
    if (href && !href.startsWith("http") && !href.startsWith(basePath)) {
      link.setAttribute("href", basePath + href);
    }
  });
}

function setupFooter() {
  const footerContainer = document.getElementById("site-footer");
  if (!footerContainer) return;

  const footerHTML = `
    <footer id="contact">
      <div class="footer-columns">
        <!-- Your existing footer content -->
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

  footerContainer.innerHTML = footerHTML;
}

function setupMobileMenu() {
  console.log("setupMobileMenu called"); // Debug log

  const burger = document.getElementById("burger");
  const mobileNav = document.querySelector(".mobile-nav-overlay");
  const overlay = document.querySelector(".menu-overlay");
  const body = document.body;

  console.log("Elements found:", { burger, mobileNav, overlay }); // Debug log

  if (burger && mobileNav && overlay) {
    console.log("Setting up mobile menu events"); // Debug log

    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("Burger clicked"); // Debug log

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

    overlay.addEventListener("click", function () {
      closeMobileMenu();
    });

    // Close menu when clicking links
    document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("active")) {
        closeMobileMenu();
      }
    });
  } else {
    console.error("Mobile menu elements not found!");
  }

  function closeMobileMenu() {
    burger.classList.remove("active");
    mobileNav.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("menu-open");
  }
}

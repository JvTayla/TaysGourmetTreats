// nav.js - Navigation and footer setup
// This handles the main navigation and footer across all pages

// Base path for GitHub Pages deployment
const basePath = "/TaysGourmetTreats/";

// Navigation links - all the main pages
const navLinks = [
  { name: "Home", href: "index.html" },
  { name: "About Us", href: "About-Us/index.html" },
  { name: "Gallery", href: "Gallery/index.html" },
  { name: "Order", href: "Order/index.html" },
  { name: "Events", href: "Events/index.html" },
  { name: "Kiddies Corner", href: "Kiddies-Corner/index.html" },
  { name: "Contact Us", href: "Contact-Us/index.html" },
];

// Footer HTML with social links and location
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
  <div class="footer-bottom">
`;

// Set up navigation and footer when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("main-nav");

  // Get current path after base path
  const currentPath = window.location.pathname.replace(basePath, "");

  // Generate nav HTML with proper active class for current page
  navContainer.innerHTML = `
    <ul>
      ${navLinks
        .map(
          (link) => `
          <li>
            <a href="${basePath}${link.href}" class="${
            typeof currentPage !== "undefined" && link.name === currentPage
              ? "active"
              : ""
          }">
              ${link.name}
            </a>
          </li>`
        )
        .join("")}
    </ul>
  `;

  // Insert footer (unchanged)
  document.getElementById("site-footer").innerHTML = footerHTML;
});

const navLinks = [
  { name: "Home", href: "./index.html" },
  { name: "About Us", href: "./About-Us/index.html" },
  { name: "Gallery", href: "./Cake-Gallery/index.html" },
  { name: "Order", href: "./Order/index.html" },
  { name: "Events", href: "./Events/index.html" },
  { name: "Kiddies Corner", href: "./Kiddies-Corner/index.html" },
  { name: "FAQ", href: "./FAQ/index.html" },
  { name: "Contact Us", href: "./Contact-Us/index.html" },
];

const navHTML = `
  <nav aria-label="Main Navigation">
    <ul>
      ${navLinks
        .map((link) => `<li><a href="${link.href}">${link.name}</a></li>`)
        .join("")}
    </ul>
  </nav>
`;

const footerHTML = `
  <footer id="contact">
    <section class="footer-brand">
      <img class="footer-logo" src="assets/logo.png" alt="Tay's Gourmet Treats Footer Logo">
      <h2>Tay's Gourmet Treats</h2>
    </section>

    <section class="footer-social">
      <!-- Social Icons -->
      <a href="https://www.instagram.com/tays_gourmet_treats" target="_blank" aria-label="Instagram"><i class="fi fi-brands-instagram"></i></a>
      <a href="https://linkedin.com/" target="_blank" aria-label="LinkedIn"><i class="fi fi-brands-linkedin"></i></a>
      <a href="https://www.google.com/maps" target="_blank" aria-label="Google Maps"><i class="fi fi-brands-google"></i></a>
    </section>

    

    <section class="footer-links">
      <nav aria-label="Footer Navigation">
        <ul>
          <li><a href="#order">Order</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li><a href="#tc">T&C's & Privacy Policy</a></li>
        </ul>
      </nav>
    </section>

<section class="footer-map">
      <!-- Embedded Google Map -->
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7164.097573791654!2d28.103029046487393!3d-26.129952226144606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950d63396e8f4f%3A0x9e6c4b82750cfe7f!2sLyndhurst%2C%20Johannesburg%2C%202192!5e0!3m2!1sen!2sza!4v1760409528904!5m2!1sen!2sza"
        width="600"
        height="450"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </section>

    <section class="footer-disclaimer">
      <h6">Copyright 2025 | All Rights Reserved | POPI | BEE Certification</h6>
    </section>
  </footer>
`;

// Insert nav for header and footer when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("main-nav").innerHTML = navHTML;
  document.getElementById("site-footer").innerHTML = footerHTML;
});

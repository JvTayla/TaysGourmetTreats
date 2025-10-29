// Base path for GitHub Pages
const basePath = "/TaysGourmetTreats/";

// Navigation links
const navLinks = [
  { name: "Home", href: "index.html" },
  { name: "About Us", href: "About-Us/index.html" },
  { name: "Gallery", href: "Gallery/index.html" },
  { name: "Order", href: "Order/index.html" },
  { name: "Events", href: "Events/index.html" },
  { name: "Kiddies Corner", href: "Kiddies-Corner/index.html" },
  { name: "Contact Us", href: "Contact-Us/index.html" },
];

window.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("main-nav");

  // Get current path after base path
  const currentPath = window.location.pathname.replace(basePath, "");

  // Generate nav HTML with proper active class
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

  // Footer insertion (unchanged)
  document.getElementById("site-footer").innerHTML = footerHTML;
});

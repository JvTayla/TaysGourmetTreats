// order.js - COMPREHENSIVE MULTI-PRODUCT ORDERING SYSTEM
// This is the complete ordering system for cakes, cupcakes, and cookies
// Everything is in one file to keep it simple and maintainable

document.addEventListener("DOMContentLoaded", function () {
  // Fire up all the ordering systems when the page loads
  initProductTabs();
  initOrderForm();
  initCakeForm();
  initCupcakeForm();
  initCookieForm();
  initAdditionalProducts();
  initFileUploadGuidance();

  console.log(" Tay's Gourmet Treats Order System loaded successfully!");
});

// =============================================
// PRODUCT TABS NAVIGATION - Switch between cakes, cupcakes, cookies
// =============================================

function initProductTabs() {
  const tabs = document.querySelectorAll(".product-tab");
  const forms = document.querySelectorAll(".product-form");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const productType = this.getAttribute("data-product");

      // Update the active tab visually
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Show the right form and hide the others
      forms.forEach((form) => {
        form.classList.remove("active");
        if (form.id === `${productType}-form`) {
          form.classList.add("active");
        }
      });

      // Update the page title to match what they're ordering
      updatePageTitle(productType);

      // Smooth scroll to the form so they don't get lost
      document.querySelector(".container").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // Start with cakes as the default - everyone loves cake!
  document
    .querySelector('.product-tab[data-product="cakes"]')
    ?.classList.add("active");
  document.querySelector("#cakes-form")?.classList.add("active");
}

function updatePageTitle(productType) {
  const titles = {
    cakes: "Custom Cake Order",
    cupcakes: "Custom Cupcake Order",
    cookies: "Custom Cookie Order",
  };

  const header = document.querySelector(".form-header h2");
  if (header && titles[productType]) {
    header.textContent = titles[productType];
  }
}

// =============================================
// CAKE FORM FUNCTIONALITY - The main attraction!
// =============================================
// =============================================
// VALIDATION FUNCTIONS - Moved to top so they're available everywhere
// =============================================

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  clearFieldError(field);

  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "This field is required";
  }

  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address";
    }
  }

  if (field.name === "phone" && value) {
    const phoneRegex = /^[\+]?27[-\s]?[0-9]{9}$|^0[0-9]{9}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ""))) {
      isValid = false;
      errorMessage = "Please enter a valid South African phone number";
    }
  }

  if (!isValid) {
    showFieldError(field, errorMessage);
  } else {
    field.parentElement.classList.add("success");
  }

  return isValid;
}

function validateFiles(fileInput) {
  const files = fileInput.files;
  const maxFiles = 5;
  const maxSize = 5 * 1024 * 1024; // 5MB

  clearFieldError(fileInput);

  if (files.length > maxFiles) {
    showFieldError(fileInput, `You can upload maximum ${maxFiles} files`);
    fileInput.value = "";
    return false;
  }

  for (let file of files) {
    if (file.size > maxSize) {
      showFieldError(
        fileInput,
        `File "${file.name}" is too large. Maximum size is 5MB.`
      );
      fileInput.value = "";
      return false;
    }

    if (!file.type.startsWith("image/")) {
      showFieldError(
        fileInput,
        `File "${file.name}" is not an image. Please upload image files only.`
      );
      fileInput.value = "";
      return false;
    }
  }

  return true;
}

function showFieldError(field, message) {
  field.parentElement.classList.add("error");

  const errorElement = document.createElement("span");
  errorElement.className = "error-message";
  errorElement.textContent = message;

  field.parentElement.appendChild(errorElement);
}

function clearFieldError(field) {
  field.parentElement.classList.remove("error", "success");

  const errorElement = field.parentElement.querySelector(".error-message");
  if (errorElement) {
    errorElement.remove();
  }
}

// =============================================
// MAIN INITIALIZATION - Rest of the code follows...
// =============================================

function initCakeForm() {
  // Fire up all the cake-specific systems
  initPackageSelection();
  initSmartFormValidation();
  initSizeShapeSelection();
  initCalendarAvailability();
  initDeliveryOptions();
  initOrderSummary();
  initCakeFormValidation();
  initCakeFormUpdates();

  // Send cake orders to the right form endpoint
  const cakeForm = document.getElementById("cakes-form");
  if (cakeForm) {
    cakeForm.action = "https://formspree.io/f/myzbrvrg";
  }
}

function initCakeFormUpdates() {
  const form = document.getElementById("cakes-form");
  if (!form) return;

  // Watch all the interactive elements for changes that affect pricing
  const updateElements = form.querySelectorAll(
    'select, input[type="checkbox"], .size-option, .shape-option, .layer-btn, .delivery-option'
  );

  updateElements.forEach((element) => {
    if (element.type === "checkbox") {
      element.addEventListener("change", function () {
        setTimeout(window.updateCostSummary, 100);
      });
    } else if (element.tagName === "SELECT") {
      element.addEventListener("change", function () {
        setTimeout(() => {
          window.updateCostSummary();
          validateBentoSelections();
        }, 100);
      });
    }
  });

  // Also watch for clicks on option buttons
  const optionButtons = form.querySelectorAll(
    ".size-option, .shape-option, .layer-btn, .delivery-option"
  );
  optionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      setTimeout(window.updateCostSummary, 100);
    });
  });
}

function initCakeFormValidation() {
  const cakeForm = document.getElementById("cakes-form");
  if (!cakeForm) return;

  cakeForm.addEventListener("submit", function (e) {
    if (!validateCakeForm()) {
      e.preventDefault();
    }
  });
}

function validateCakeForm() {
  let isValid = true;
  const requiredFields = document.querySelectorAll("#cakes-form [required]");

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      showFieldError(field, "This field is required");
      isValid = false;
    } else {
      clearFieldError(field);
    }
  });

  return isValid;
}

// =============================================
// CUPCAKE FORM FUNCTIONALITY - Little cakes, big flavor!
// =============================================

function initCupcakeForm() {
  const cupcakeForm = document.getElementById("cupcakes-form");
  if (!cupcakeForm) return;

  // Send cupcake orders to the right place
  cupcakeForm.action = "https://formspree.io/f/mzzknwnb";

  // Fire up all the cupcake systems
  initCupcakeQuantity();
  initCupcakeCustomization();
  initCupcakeFormValidation();
  initCupcakePricing();

  // Start with 12 cupcakes as a sensible default
  document
    .querySelector('.quantity-option[data-quantity="12"]')
    ?.classList.add("selected");
  const quantityInput = document.getElementById("cupcake-quantity");
  if (quantityInput) quantityInput.value = "12";

  // Calculate the initial price
  updateCupcakePricing();
}

function initCupcakeQuantity() {
  const quantityOptions = document.querySelectorAll(".quantity-option");
  quantityOptions.forEach((option) => {
    option.addEventListener("click", function () {
      quantityOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");

      // Update the hidden quantity field
      const quantityInput = document.getElementById("cupcake-quantity");
      if (quantityInput) {
        quantityInput.value = this.getAttribute("data-quantity");
      }
    });
  });
}

function initCupcakeCustomization() {
  // Watch for changes to cupcake customization options
  const customizationSelects = document.querySelectorAll(
    "#cupcakes-form select"
  );
  customizationSelects.forEach((select) => {
    select.addEventListener("change", function () {
      setTimeout(updateCupcakePricing, 100);
    });
  });
}

function initCupcakePricing() {
  // Watch everything that affects cupcake pricing
  const quantityOptions = document.querySelectorAll(".quantity-option");
  const extrasCheckboxes = document.querySelectorAll(
    'input[name="cupcake-extras"]'
  );
  const colorSelect = document.getElementById("cupcake-colors");
  const frostingSelect = document.getElementById("cupcake-frosting");

  // Quantity changes affect price
  quantityOptions.forEach((option) => {
    option.addEventListener("click", function () {
      setTimeout(updateCupcakePricing, 100);
    });
  });

  // Extra toppings cost extra
  extrasCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      setTimeout(updateCupcakePricing, 100);
    });
  });

  // Complex color designs cost more
  if (colorSelect) {
    colorSelect.addEventListener("change", function () {
      setTimeout(updateCupcakePricing, 100);
    });
  }

  // Premium frostings cost more
  if (frostingSelect) {
    frostingSelect.addEventListener("change", function () {
      setTimeout(updateCupcakePricing, 100);
    });
  }
}

function updateCupcakePricing() {
  const selectedQuantity = document
    .querySelector(".quantity-option.selected")
    ?.getAttribute("data-quantity");

  // Base prices for different quantities
  const basePrices = {
    6: 180,
    12: 300,
    18: 420,
    24: 520,
    30: 600,
  };

  let totalCost = 0;
  let additionalCost = 0;

  // Start with the base price
  if (selectedQuantity && basePrices[selectedQuantity]) {
    totalCost = basePrices[selectedQuantity];
  }

  // Add costs for any extras they selected
  const extraCheckboxes = document.querySelectorAll(
    'input[name="cupcake-extras"]:checked'
  );
  extraCheckboxes.forEach((checkbox) => {
    const costText = checkbox.getAttribute("data-cost");
    if (costText && costText.includes("+R")) {
      const cost = parseInt(costText.replace("+R", ""));
      additionalCost += cost;
    }
  });

  // Complex designs cost extra
  const colorSelect = document.getElementById("cupcake-colors");
  const frostingSelect = document.getElementById("cupcake-frosting");

  // Extra colors surcharge
  if (colorSelect && colorSelect.value === "4") {
    additionalCost += 30;
  }

  // Premium frosting surcharge
  if (
    frostingSelect &&
    (frostingSelect.value === "fondant" || frostingSelect.value === "ganache")
  ) {
    additionalCost += 25;
  }

  totalCost += additionalCost;

  // Update the price display
  const basePriceElement = document.getElementById("cupcake-base-price");
  const additionalCostElement = document.getElementById(
    "cupcake-additional-cost"
  );
  const estimatedTotalElement = document.getElementById(
    "cupcake-estimated-total"
  );
  const extrasCostElement = document.querySelector(
    "#cupcakes-form .extras-cost"
  );

  if (basePriceElement)
    basePriceElement.textContent = `R${totalCost - additionalCost}`;
  if (additionalCostElement)
    additionalCostElement.textContent = `+R${additionalCost}`;
  if (estimatedTotalElement)
    estimatedTotalElement.innerHTML = `<strong>R${totalCost}</strong>`;

  // Only show the extras cost if there actually are any
  if (extrasCostElement) {
    extrasCostElement.classList.toggle("hidden", additionalCost === 0);
  }
}

function initCupcakeFormValidation() {
  const cupcakeForm = document.getElementById("cupcakes-form");
  if (!cupcakeForm) return;

  cupcakeForm.addEventListener("submit", function (e) {
    const quantity = document.getElementById("cupcake-quantity")?.value;
    if (!quantity) {
      e.preventDefault();
      showSelectionConfirmation("Please select a cupcake quantity.");
      return;
    }
  });
}

// =============================================
// COOKIE FORM FUNCTIONALITY - Sweet little works of art!
// =============================================

function initCookieForm() {
  const cookieForm = document.getElementById("cookies-form");
  if (!cookieForm) return;

  // Send cookie orders to the right place
  cookieForm.action = "https://formspree.io/f/mqagrjvv";

  // Fire up all the cookie systems
  initCookieOptions();
  initCookieFormValidation();
  initCookiePricing();

  // Start with classic cookies as default
  document
    .querySelector('.cookie-size-option[data-size="classic"]')
    ?.classList.add("selected");
  const sizeInput = document.getElementById("cookie-size");
  if (sizeInput) sizeInput.value = "classic";

  // Calculate the initial price
  updateCookiePricing();
}

function initCookieOptions() {
  // Cookie size selection
  const sizeOptions = document.querySelectorAll(".cookie-size-option");
  sizeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      sizeOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");

      // Update the hidden size field
      const sizeInput = document.getElementById("cookie-size");
      if (sizeInput) {
        sizeInput.value = this.getAttribute("data-size");
      }
    });
  });

  // Minimum quantity enforcement - 12 cookies minimum!
  const quantityInput = document.getElementById("cookie-quantity");
  if (quantityInput) {
    quantityInput.addEventListener("blur", function () {
      const minQuantity = 12;
      if (this.value && parseInt(this.value) < minQuantity) {
        showSelectionConfirmation(
          `Minimum order for cookies is ${minQuantity}. Please increase your quantity.`
        );
        this.value = minQuantity;
      }
    });

    // Set default to minimum quantity
    quantityInput.value = "12";
  }
}

function initCookiePricing() {
  // Watch everything that affects cookie pricing
  const sizeOptions = document.querySelectorAll(".cookie-size-option");
  const quantityInput = document.getElementById("cookie-quantity");
  const extrasCheckboxes = document.querySelectorAll(
    'input[name="cookie-extras"]'
  );
  const colorSelect = document.getElementById("cookie-colors");
  const shapeSelect = document.getElementById("cookie-shapes");

  // Size changes affect price
  sizeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      setTimeout(updateCookiePricing, 100);
    });
  });

  // More cookies = more money
  if (quantityInput) {
    quantityInput.addEventListener("input", function () {
      setTimeout(updateCookiePricing, 100);
    });
  }

  // Extra decorations cost extra
  extrasCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      setTimeout(updateCookiePricing, 100);
    });
  });

  // Complex colors cost more
  if (colorSelect) {
    colorSelect.addEventListener("change", function () {
      setTimeout(updateCookiePricing, 100);
    });
  }

  // Custom shapes cost more
  if (shapeSelect) {
    shapeSelect.addEventListener("change", function () {
      setTimeout(updateCookiePricing, 100);
    });
  }
}

function updateCookiePricing() {
  const selectedSize = document
    .querySelector(".cookie-size-option.selected")
    ?.getAttribute("data-size");
  const quantityInput = document.getElementById("cookie-quantity");
  const quantity = quantityInput ? parseInt(quantityInput.value) || 12 : 12;

  // Base prices per cookie type
  const basePrices = {
    classic: 25,
    gourmet: 35,
    character: 45,
  };

  let totalCost = 0;
  let additionalCost = 0;

  // Calculate base price
  if (selectedSize && basePrices[selectedSize]) {
    totalCost = basePrices[selectedSize] * quantity;
  }

  // Enforce minimum order charge
  const minimumOrder = 12;
  const minimumPrice = basePrices[selectedSize] * minimumOrder;
  if (totalCost < minimumPrice) {
    totalCost = minimumPrice;
  }

  // Add costs for any extras
  const extraCheckboxes = document.querySelectorAll(
    'input[name="cookie-extras"]:checked'
  );
  extraCheckboxes.forEach((checkbox) => {
    const costText = checkbox.getAttribute("data-cost");
    if (costText && costText.includes("+R")) {
      const cost = parseInt(costText.replace("+R", ""));
      additionalCost += cost;
    }
  });

  // Complexity surcharges
  const colorSelect = document.getElementById("cookie-colors");
  const shapeSelect = document.getElementById("cookie-shapes");

  if (colorSelect) {
    switch (colorSelect.value) {
      case "3-4":
        additionalCost += 20;
        break;
      case "5-6":
        additionalCost += 40;
        break;
      case "7-plus":
        additionalCost += 60;
        break;
    }
  }

  if (shapeSelect && shapeSelect.value === "custom") {
    additionalCost += 50; // Custom shapes surcharge
  }

  totalCost += additionalCost;

  // Update the price display
  const basePriceElement = document.getElementById("cookie-base-price");
  const additionalCostElement = document.getElementById(
    "cookie-additional-cost"
  );
  const estimatedTotalElement = document.getElementById(
    "cookie-estimated-total"
  );
  const extrasCostElement = document.querySelector(
    "#cookies-form .extras-cost"
  );

  if (basePriceElement)
    basePriceElement.textContent = `R${totalCost - additionalCost}`;
  if (additionalCostElement)
    additionalCostElement.textContent = `+R${additionalCost}`;
  if (estimatedTotalElement)
    estimatedTotalElement.innerHTML = `<strong>R${totalCost}</strong>`;

  // Only show extras cost if there are any
  if (extrasCostElement) {
    extrasCostElement.classList.toggle("hidden", additionalCost === 0);
  }
}

function initCookieFormValidation() {
  const cookieForm = document.getElementById("cookies-form");
  if (!cookieForm) return;

  cookieForm.addEventListener("submit", function (e) {
    const quantity = document.getElementById("cookie-quantity")?.value;
    const size = document.getElementById("cookie-size")?.value;

    if (!quantity || parseInt(quantity) < 12) {
      e.preventDefault();
      showSelectionConfirmation(
        "Minimum order for cookies is 12. Please increase your quantity."
      );
      return;
    }

    if (!size) {
      e.preventDefault();
      showSelectionConfirmation("Please select a cookie type.");
      return;
    }
  });
}

// =============================================
// ADDITIONAL PRODUCTS - Add cupcakes or cookies to cake orders
// =============================================

function initAdditionalProducts() {
  const additionalOptions = document.querySelectorAll(".additional-option");
  additionalOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const product = this.getAttribute("data-product");
      const checkbox = this.querySelector('input[type="checkbox"]');

      // If already selected, do nothing (we don't want them unselecting)
      if (this.classList.contains("selected")) {
        return;
      }

      // Toggle the selection
      this.classList.toggle("selected");
      checkbox.checked = !checkbox.checked;

      if (checkbox.checked) {
        // Add the product form section to the cake order
        addProductFormToCakeOrder(product);
        showSelectionConfirmation(`Added ${product} to your order!`);

        // Remove the option button after selection
        removeAdditionalOptionButton(product);
      } else {
        // Remove the product form section
        removeProductFormFromCakeOrder(product);
        showSelectionConfirmation(`Removed ${product} from your order.`);
      }

      // Update the pricing
      setTimeout(window.updateCostSummary, 100);
    });
  });
}

function removeAdditionalOptionButton(productType) {
  const additionalOption = document.querySelector(
    `.additional-option[data-product="${productType}"]`
  );
  if (additionalOption) {
    // Instead of removing, we disable it and change how it looks
    additionalOption.style.opacity = "0.6";
    additionalOption.style.pointerEvents = "none";
    additionalOption.innerHTML = `
      <div class="additional-product-added">
        <span>✅ ${
          productType.charAt(0).toUpperCase() + productType.slice(1)
        } Added</span>
        <small>Customize in form below</small>
      </div>
    `;
  }
}

function restoreAdditionalOptionButton(productType) {
  const additionalProductsSection = document.querySelector(
    ".additional-products"
  );
  if (!additionalProductsSection) return;

  // Recreate the button if it was removed
  let buttonHTML = "";

  if (productType === "cupcakes") {
    buttonHTML = `
      <div class="additional-option" data-product="cupcakes">
        <input type="checkbox" name="additional-cupcakes" value="cupcakes" style="display: none;">
        <div class="additional-product-icon">🧁</div>
        <div class="additional-product-info">
          <div class="additional-product-name">Add Cupcakes</div>
          <div class="additional-product-description">Perfect complement to your cake</div>
        </div>
        <div class="additional-product-action">
          <button type="button" class="btn-add">Add</button>
        </div>
      </div>
    `;
  } else if (productType === "cookies") {
    buttonHTML = `
      <div class="additional-option" data-product="cookies">
        <input type="checkbox" name="additional-cookies" value="cookies" style="display: none;">
        <div class="additional-product-icon">🍪</div>
        <div class="additional-product-info">
          <div class="additional-product-name">Add Cookies</div>
          <div class="additional-product-description">Beautiful decorated cookies</div>
        </div>
        <div class="additional-product-action">
          <button type="button" class="btn-add">Add</button>
        </div>
      </div>
    `;
  }

  // Add the button back to the page
  additionalProductsSection.insertAdjacentHTML("beforeend", buttonHTML);

  // Re-initialize the click handler for the new button
  const newOption = additionalProductsSection.querySelector(
    `.additional-option[data-product="${productType}"]:last-child`
  );
  if (newOption) {
    newOption.addEventListener("click", function () {
      const product = this.getAttribute("data-product");
      const checkbox = this.querySelector('input[type="checkbox"]');

      // If already selected, do nothing
      if (this.classList.contains("selected")) {
        return;
      }

      this.classList.toggle("selected");
      checkbox.checked = !checkbox.checked;

      if (checkbox.checked) {
        addProductFormToCakeOrder(product);
        showSelectionConfirmation(`Added ${product} to your order!`);
        removeAdditionalOptionButton(product);
      }

      setTimeout(window.updateCostSummary, 100);
    });
  }
}

function removeProductFormFromCakeOrder(productType) {
  const existingSection = document.querySelector(
    `.additional-product-section[data-product="${productType}"]`
  );
  if (existingSection) {
    existingSection.remove();
  }
}

function addProductFormToCakeOrder(productType) {
  const cakeForm = document.getElementById("cakes-form");
  if (!cakeForm) return;

  // Remove any existing section first
  removeProductFormFromCakeOrder(productType);

  let productHTML = "";

  if (productType === "cupcakes") {
    productHTML = `
      <section class="form-section additional-product-section" data-product="cupcakes">
        <div class="additional-product-header">
          <h3>🧁 Additional Cupcakes</h3>
          <p>You've added cupcakes to your cake order. Customize them below:</p>
        </div>
        
        <!-- Cupcake Quantity -->
        <div class="form-group">
          <label>Select Cupcake Quantity *</label>
          <div class="quantity-options">
            <div class="quantity-option additional-quantity" data-quantity="6" data-product="cupcakes">
              <div>6 Cupcakes</div>
              <div class="quantity-price">+R120</div>
              <small>Perfect complement</small>
            </div>
            <div class="quantity-option additional-quantity" data-quantity="12" data-product="cupcakes">
              <div>12 Cupcakes</div>
              <div class="quantity-price">+R240</div>
              <small>Most popular</small>
            </div>
            <div class="quantity-option additional-quantity" data-quantity="18" data-product="cupcakes">
              <div>18 Cupcakes</div>
              <div class="quantity-price">+R360</div>
              <small>Great value</small>
            </div>
            <div class="quantity-option additional-quantity" data-quantity="24" data-product="cupcakes">
              <div>24 Cupcakes</div>
              <div class="quantity-price">+R480</div>
              <small>Party size</small>
            </div>
          </div>
        </div>
        
        <!-- Cupcake Customization -->
        <div class="form-group">
          <label for="additional-cupcake-flavor">Cupcake Flavor</label>
          <select id="additional-cupcake-flavor" name="additional-cupcake-flavor">
            <option value="matching">Match Cake Flavor</option>
            <option value="vanilla">Vanilla</option>
            <option value="chocolate">Chocolate</option>
            <option value="red-velvet">Red Velvet</option>
            <option value="funfetti">Funfetti</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="additional-cupcake-colors">Icing Colors</label>
          <select id="additional-cupcake-colors" name="additional-cupcake-colors">
            <option value="matching">Match Cake Colors</option>
            <option value="1">1 Color</option>
            <option value="2">2 Colors</option>
            <option value="3">3 Colors</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="additional-cupcake-design">Cupcake Design Notes</label>
          <textarea
            id="additional-cupcake-design"
            name="additional-cupcake-design"
            placeholder="Any specific design notes for the cupcakes? Leave blank to match the cake design."
            rows="2"
          ></textarea>
        </div>
        
        <div class="additional-product-actions">
          <button type="button" class="btn btn-outline remove-additional-product" data-product="cupcakes">
            Remove Cupcakes
          </button>
        </div>
      </section>
    `;
  } else if (productType === "cookies") {
    productHTML = `
      <section class="form-section additional-product-section" data-product="cookies">
        <div class="additional-product-header">
          <h3>🍪 Additional Cookies</h3>
          <p>You've added cookies to your cake order. Customize them below:</p>
        </div>
        
        <!-- Cookie Quantity -->
        <div class="form-group">
          <label>Select Cookie Quantity *</label>
          <div class="quantity-options">
            <div class="quantity-option additional-quantity" data-quantity="12" data-product="cookies">
              <div>12 Cookies</div>
              <div class="quantity-price">+R300</div>
              <small>Minimum order</small>
            </div>
            <div class="quantity-option additional-quantity" data-quantity="18" data-product="cookies">
              <div>18 Cookies</div>
              <div class="quantity-price">+R450</div>
              <small>Great for parties</small>
            </div>
            <div class="quantity-option additional-quantity" data-quantity="24" data-product="cookies">
              <div>24 Cookies</div>
              <div class="quantity-price">+R600</div>
              <small>Popular choice</small>
            </div>
          </div>
        </div>
        
        <!-- Cookie Type -->
        <div class="form-group">
          <label for="additional-cookie-type">Cookie Type</label>
          <select id="additional-cookie-type" name="additional-cookie-type">
            <option value="classic">Classic Sugar Cookies</option>
            <option value="themed">Themed Design</option>
            <option value="character">Character Cookies</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="additional-cookie-colors">Number of Colors</label>
          <select id="additional-cookie-colors" name="additional-cookie-colors">
            <option value="1-2">1-2 Colors</option>
            <option value="3-4">3-4 Colors</option>
            <option value="5-6">5-6 Colors</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="additional-cookie-design">Cookie Design Notes</label>
          <textarea
            id="additional-cookie-design"
            name="additional-cookie-design"
            placeholder="Describe the cookie designs, themes, or any specific elements..."
            rows="2"
          ></textarea>
        </div>
        
        <div class="additional-product-actions">
          <button type="button" class="btn btn-outline remove-additional-product" data-product="cookies">
            Remove Cookies
          </button>
        </div>
      </section>
    `;
  }

  // Insert the new section before the Additional Products section
  const additionalProductsSection = cakeForm.querySelector(
    ".additional-products"
  );
  if (additionalProductsSection && productHTML) {
    additionalProductsSection.insertAdjacentHTML("beforebegin", productHTML);
  }

  // Initialize the new section
  initAdditionalProductSection(productType);
}

function initAdditionalProductSection(productType) {
  // Set up quantity selection for the additional products
  const quantityOptions = document.querySelectorAll(
    `.additional-quantity[data-product="${productType}"]`
  );
  quantityOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove selected class from all options for this product
      quantityOptions.forEach((opt) => opt.classList.remove("selected"));
      // Add selected class to clicked option
      this.classList.add("selected");
      // Update pricing
      setTimeout(window.updateCostSummary, 100);
    });

    // Set first option as selected by default
    if (
      quantityOptions.length > 0 &&
      !document.querySelector(
        `.additional-quantity[data-product="${productType}"].selected`
      )
    ) {
      quantityOptions[0].classList.add("selected");
    }
  });

  // Set up remove buttons
  const removeButtons = document.querySelectorAll(
    `.remove-additional-product[data-product="${productType}"]`
  );
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const product = this.getAttribute("data-product");
      removeProductFormFromCakeOrder(product);
      setTimeout(window.updateCostSummary, 100);
      showSelectionConfirmation(`Removed ${product} from your order.`);
    });
  });

  // Watch for changes in the new form elements
  const selects = document.querySelectorAll(
    `.additional-product-section[data-product="${productType}"] select`
  );
  const textareas = document.querySelectorAll(
    `.additional-product-section[data-product="${productType}"] textarea`
  );

  selects.forEach((select) => {
    select.addEventListener("change", function () {
      setTimeout(window.updateCostSummary, 100);
    });
  });

  textareas.forEach((textarea) => {
    textarea.addEventListener("input", function () {
      // We could add character counting here later
    });
  });
}

// =============================================
// COST CALCULATION SYSTEM - The money math!
// =============================================

window.updateCostSummary = function () {
  let totalCost = 0;
  let breakdown = [];

  // Start with package cost
  const selectedPackage = window.selectedPackage;
  if (selectedPackage && window.packagePrices[selectedPackage]) {
    totalCost += window.packagePrices[selectedPackage];
    breakdown.push({
      label:
        selectedPackage === "bento-2-cupcakes"
          ? "Bento + 2 Cupcakes"
          : selectedPackage === "bento-5-cupcakes"
          ? "Bento + 5 Cupcakes"
          : "Custom Cake",
      cost: window.packagePrices[selectedPackage],
    });
  } else {
    totalCost += window.packagePrices["custom-cake"];
    breakdown.push({
      label: "Custom Cake Base",
      cost: window.packagePrices["custom-cake"],
    });
  }

  // Add size cost
  const selectedSize = document
    .querySelector(".size-option.selected")
    ?.getAttribute("data-size");
  if (selectedSize && window.sizePrices[selectedSize]) {
    totalCost += window.sizePrices[selectedSize];
    breakdown.push({
      label: `${selectedSize.replace("-", " ").toUpperCase()} Size`,
      cost: window.sizePrices[selectedSize],
    });
  }

  // Add shape cost
  const selectedShape = document
    .querySelector(".shape-option.selected")
    ?.getAttribute("data-shape");
  if (selectedShape && window.shapePrices[selectedShape]) {
    totalCost += window.shapePrices[selectedShape];
    breakdown.push({
      label: `${
        selectedShape.charAt(0).toUpperCase() + selectedShape.slice(1)
      } Shape`,
      cost: window.shapePrices[selectedShape],
    });
  }

  // Add layer cost
  const selectedLayers = document
    .querySelector(".layer-btn.active")
    ?.getAttribute("data-layers");
  if (selectedLayers && window.layerPrices[selectedLayers]) {
    totalCost += window.layerPrices[selectedLayers];
    if (window.layerPrices[selectedLayers] !== 0) {
      breakdown.push({
        label: `${selectedLayers} Layers`,
        cost: window.layerPrices[selectedLayers],
      });
    }
  }

  // Add flavor cost
  const flavorSelect = document.getElementById("flavor-preference");
  if (
    flavorSelect &&
    flavorSelect.value &&
    window.upgradeCosts.flavors[flavorSelect.value]
  ) {
    const flavorCost = window.upgradeCosts.flavors[flavorSelect.value];
    totalCost += flavorCost;
    if (flavorCost > 0) {
      breakdown.push({ label: "Flavor Upgrade", cost: flavorCost });
    }
  }

  // Add color cost
  const colorSelect = document.getElementById("icing-colors");
  if (
    colorSelect &&
    colorSelect.value &&
    window.upgradeCosts.colors[colorSelect.value]
  ) {
    const colorCost = window.upgradeCosts.colors[colorSelect.value];
    totalCost += colorCost;
    if (colorCost > 0) {
      breakdown.push({ label: "Extra Colors", cost: colorCost });
    }
  }

  // Add frosting cost
  const frostingSelect = document.getElementById("frosting-preference");
  if (
    frostingSelect &&
    frostingSelect.value &&
    window.upgradeCosts.frosting[frostingSelect.value]
  ) {
    const frostingCost = window.upgradeCosts.frosting[frostingSelect.value];
    totalCost += frostingCost;
    if (frostingCost > 0) {
      breakdown.push({ label: "Frosting Upgrade", cost: frostingCost });
    }
  }

  // Add filling cost
  const fillingSelect = document.getElementById("filling-preference");
  if (
    fillingSelect &&
    fillingSelect.value &&
    window.upgradeCosts.fillings[fillingSelect.value]
  ) {
    const fillingCost = window.upgradeCosts.fillings[fillingSelect.value];
    totalCost += fillingCost;
    if (fillingCost > 0) {
      breakdown.push({ label: "Filling", cost: fillingCost });
    }
  }

  // Add extras costs (sprinkles, decorations, etc.)
  const extraCheckboxes = document.querySelectorAll(
    'input[name="extras"]:checked'
  );
  extraCheckboxes.forEach((checkbox) => {
    const costText = checkbox.getAttribute("data-cost");
    if (costText && costText.includes("+R")) {
      const cost = parseInt(costText.replace("+R", ""));
      totalCost += cost;
      breakdown.push({
        label: checkbox.value
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        cost: cost,
      });
    }
  });

  // ADDITIONAL PRODUCTS COSTS
  // Additional Cupcakes
  const additionalCupcakesSection = document.querySelector(
    '.additional-product-section[data-product="cupcakes"]'
  );
  if (additionalCupcakesSection) {
    const selectedCupcakeQuantity = additionalCupcakesSection
      .querySelector(".additional-quantity.selected")
      ?.getAttribute("data-quantity");
    const cupcakePrices = {
      6: 120,
      12: 240,
      18: 360,
      24: 480,
    };

    if (selectedCupcakeQuantity && cupcakePrices[selectedCupcakeQuantity]) {
      const cupcakeCost = cupcakePrices[selectedCupcakeQuantity];
      totalCost += cupcakeCost;
      breakdown.push({
        label: `${selectedCupcakeQuantity} Additional Cupcakes`,
        cost: cupcakeCost,
      });
    }
  }

  // Additional Cookies
  const additionalCookiesSection = document.querySelector(
    '.additional-product-section[data-product="cookies"]'
  );
  if (additionalCookiesSection) {
    const selectedCookieQuantity = additionalCookiesSection
      .querySelector(".additional-quantity.selected")
      ?.getAttribute("data-quantity");
    const cookiePrices = {
      12: 300,
      18: 450,
      24: 600,
    };

    if (selectedCookieQuantity && cookiePrices[selectedCookieQuantity]) {
      const cookieCost = cookiePrices[selectedCookieQuantity];
      totalCost += cookieCost;
      breakdown.push({
        label: `${selectedCookieQuantity} Additional Cookies`,
        cost: cookieCost,
      });
    }
  }

  // Add delivery cost
  const selectedDelivery = document
    .querySelector(".delivery-option.selected")
    ?.getAttribute("data-delivery");
  if (selectedDelivery && window.deliveryCosts[selectedDelivery]) {
    const deliveryCost = window.deliveryCosts[selectedDelivery];
    totalCost += deliveryCost;
    if (deliveryCost > 0) {
      breakdown.push({ label: "Delivery", cost: deliveryCost });
    }
  }

  // Update all the displays
  updateCostDisplay(totalCost, breakdown);
  updateOrderSummary(totalCost, breakdown);
};

function updateCostDisplay(totalCost, breakdown) {
  const basePriceElement = document.getElementById("base-price");
  const additionalCostElement = document.getElementById("additional-cost");
  const estimatedTotalElement = document.getElementById("estimated-total");
  const extrasCostElement = document.querySelector(".extras-cost");

  const selectedPackage = window.selectedPackage;
  const baseCost =
    selectedPackage && window.packagePrices[selectedPackage]
      ? window.packagePrices[selectedPackage]
      : window.packagePrices["custom-cake"];
  const additionalCost = totalCost - baseCost;

  if (basePriceElement) basePriceElement.textContent = `R${baseCost}`;
  if (additionalCostElement)
    additionalCostElement.textContent = `+R${additionalCost}`;
  if (estimatedTotalElement)
    estimatedTotalElement.innerHTML = `<strong>R${totalCost}</strong>`;

  if (extrasCostElement) {
    extrasCostElement.classList.toggle("hidden", additionalCost === 0);
  }
}

// =============================================
// CAKE-SPECIFIC FUNCTIONALITY - The detailed cake stuff
// =============================================

// Package Selection Functionality
function initPackageSelection() {
  const packageButtons = document.querySelectorAll(".select-package");

  packageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const packageType = this.getAttribute("data-package");

      // Auto-fill form based on package selection
      const orderTypeSelect = document.getElementById("order-type");
      const servingSizeInput = document.getElementById("serving-size");

      switch (packageType) {
        case "bento-2-cupcakes":
          if (orderTypeSelect) orderTypeSelect.value = "bento-cake";
          if (servingSizeInput)
            servingSizeInput.value = "1 bento cake + 2 cupcakes (feeds 2-4)";
          document
            .querySelector('.size-option[data-size="4-inch"]')
            ?.classList.add("selected");
          break;
        case "bento-5-cupcakes":
          if (orderTypeSelect) orderTypeSelect.value = "bento-cake";
          if (servingSizeInput)
            servingSizeInput.value = "1 bento cake + 5 cupcakes (feeds 4-6)";
          document
            .querySelector('.size-option[data-size="4-inch"]')
            ?.classList.add("selected");
          break;
        case "custom-cake":
          if (orderTypeSelect) orderTypeSelect.value = "custom-cake";
          if (servingSizeInput)
            servingSizeInput.value = "Custom size - please specify in notes";
          break;
      }

      // Store the selected package for cost calculation
      window.selectedPackage = packageType;

      // Trigger cost calculation
      if (window.updateCostSummary) {
        setTimeout(window.updateCostSummary, 100);
      }

      // Show confirmation
      showSelectionConfirmation(`Package selected! Form updated.`);
    });
  });
}

// Enhanced Smart Form Validation with Size/Shape Pricing
function initSmartFormValidation() {
  // Base prices for packages
  const packagePrices = {
    "bento-2-cupcakes": 300,
    "bento-5-cupcakes": 350,
    "custom-cake": 250,
  };

  // Size pricing - bigger cakes cost more!
  const sizePrices = {
    "4-inch": 0,
    "7-inch": 200,
    "9-inch": 400,
    "12-inch": 700,
  };

  // Shape pricing - fancy shapes cost extra
  const shapePrices = {
    circle: 0,
    square: 50,
    heart: 80,
    number: 100,
    sheet: 150,
    custom: 200,
  };

  // Layer pricing - more layers = more cake!
  const layerPrices = {
    2: -50,
    3: 0,
    4: 80,
    5: 160,
    6: 240,
  };

  // Additional costs for upgrades
  const upgradeCosts = {
    flavors: {
      vanilla: 0,
      chocolate: 0,
      marble: 0,
      "red-velvet": 30,
      funfetti: 30,
      cappuccino: 30,
      carrot: 40,
      "cookies-cream": 40,
      other: 0,
    },
    colors: {
      1: 0,
      2: 0,
      3: 20,
      4: 30,
      "5-plus": 50,
    },
    frosting: {
      buttercream: 0,
      "cream-cheese": 40,
      ganache: 50,
      "whipped-cream": 30,
      fondant: 100,
    },
    fillings: {
      none: 0,
      "chocolate-ganache": 40,
      caramel: 35,
      "raspberry-jam": 25,
      "strawberry-jam": 25,
      "lemon-curd": 30,
      "cream-cheese": 35,
      "biscuit-crunch": 20,
      "other-filling": 0,
    },
  };

  // Delivery costs
  const deliveryCosts = {
    collection: 0,
    "delivery-standard": 80,
    "delivery-express": 120,
  };

  // Event listeners for real-time updates
  const orderTypeSelect = document.getElementById("order-type");
  const flavorSelect = document.getElementById("flavor-preference");
  const colorSelect = document.getElementById("icing-colors");
  const frostingSelect = document.getElementById("frosting-preference");

  if (orderTypeSelect) {
    orderTypeSelect.addEventListener("change", function () {
      setTimeout(() => {
        validateBentoSelections();
        window.updateCostSummary();
      }, 100);
    });
  }

  if (flavorSelect) {
    flavorSelect.addEventListener("change", function () {
      setTimeout(() => {
        validateBentoSelections();
        window.updateCostSummary();
      }, 100);
    });
  }

  if (colorSelect) {
    colorSelect.addEventListener("change", function () {
      setTimeout(() => {
        validateBentoSelections();
        window.updateCostSummary();
      }, 100);
    });
  }

  if (frostingSelect) {
    frostingSelect.addEventListener("change", function () {
      setTimeout(() => {
        validateBentoSelections();
        window.updateCostSummary();
      }, 100);
    });
  }

  // Listen for extras changes
  const extraCheckboxes = document.querySelectorAll('input[name="extras"]');
  extraCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      setTimeout(window.updateCostSummary, 100);
    });
  });

  // Listen for filling changes
  const fillingSelect = document.getElementById("filling-preference");
  if (fillingSelect) {
    fillingSelect.addEventListener("change", function () {
      setTimeout(window.updateCostSummary, 100);
    });
  }

  // Store prices globally for updateCostSummary to use
  window.packagePrices = packagePrices;
  window.sizePrices = sizePrices;
  window.shapePrices = shapePrices;
  window.layerPrices = layerPrices;
  window.upgradeCosts = upgradeCosts;
  window.deliveryCosts = deliveryCosts;

  // Initialize everything
  validateBentoSelections();
  setTimeout(window.updateCostSummary, 200);
}

// Bento Package Validation
function validateBentoSelections() {
  const orderTypeSelect = document.getElementById("order-type");
  const flavorSelect = document.getElementById("flavor-preference");
  const colorSelect = document.getElementById("icing-colors");
  const frostingSelect = document.getElementById("frosting-preference");

  const flavorWarning = document.getElementById("flavor-warning");
  const colorWarning = document.getElementById("color-warning");
  const frostingWarning = document.getElementById("frosting-warning");

  // Check if current order is a Bento package
  const isBento = orderTypeSelect && orderTypeSelect.value === "bento-cake";

  // Flavor validation for bento cakes
  if (isBento && flavorSelect && flavorSelect.value) {
    const selectedOption = flavorSelect.options[flavorSelect.selectedIndex];
    const isBasic = selectedOption.getAttribute("data-basic") === "true";
    if (flavorWarning) flavorWarning.classList.toggle("hidden", isBasic);
  } else {
    if (flavorWarning) flavorWarning.classList.add("hidden");
  }

  // Color validation for bento cakes
  if (isBento && colorSelect && colorSelect.value) {
    const selectedOption = colorSelect.options[colorSelect.selectedIndex];
    const isBasic = selectedOption.getAttribute("data-basic") === "true";
    if (colorWarning) colorWarning.classList.toggle("hidden", isBasic);
  } else {
    if (colorWarning) colorWarning.classList.add("hidden");
  }

  // Frosting validation for bento cakes
  if (isBento && frostingSelect && frostingSelect.value) {
    const selectedOption = frostingSelect.options[frostingSelect.selectedIndex];
    const isBasic = selectedOption.getAttribute("data-basic") === "true";
    if (frostingWarning) frostingWarning.classList.toggle("hidden", isBasic);
  } else {
    if (frostingWarning) frostingWarning.classList.add("hidden");
  }
}

// Size and Shape Selection
function initSizeShapeSelection() {
  // Size selection
  const sizeOptions = document.querySelectorAll(".size-option");
  sizeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      sizeOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      setTimeout(window.updateCostSummary, 100);
    });
  });

  // Shape selection
  const shapeOptions = document.querySelectorAll(".shape-option");
  shapeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      shapeOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      setTimeout(window.updateCostSummary, 100);
    });
  });

  // Layer selection
  const layerButtons = document.querySelectorAll(".layer-btn");
  layerButtons.forEach((button) => {
    button.addEventListener("click", function () {
      layerButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      setTimeout(window.updateCostSummary, 100);
    });
  });

  // Default selections - 4-inch circle cake with 3 layers
  document
    .querySelector('.size-option[data-size="4-inch"]')
    ?.classList.add("selected");
  document
    .querySelector('.shape-option[data-shape="circle"]')
    ?.classList.add("selected");
  document
    .querySelector('.layer-btn[data-layers="3"]')
    ?.classList.add("active");
}

// Calendar Availability System
function initCalendarAvailability() {
  const calendarContainer = document.getElementById("availability-calendar");
  if (!calendarContainer) return;

  const today = new Date();
  const availabilityData = generateAvailabilityData();

  let calendarHTML = "";

  // Show availability for the next 14 days
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dateString = date.toISOString().split("T")[0];
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNumber = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });

    const availability = availabilityData[dateString] || {
      bento: 0,
      custom: 0,
      status: "unavailable",
    };

    calendarHTML += `
      <div class="date-option ${availability.status}" data-date="${dateString}">
        <div class="date-day">${dayNumber}</div>
        <div>${dayName}, ${month}</div>
        <div class="date-availability">
          ${
            availability.status === "available"
              ? "✅ Available"
              : availability.status === "limited"
              ? "⚠️ Limited"
              : "❌ Full"
          }
        </div>
        ${
          availability.status !== "unavailable"
            ? `
          <small>Bento: ${availability.bento}/3</small><br>
          <small>Custom: ${availability.custom}/2</small>
        `
            : ""
        }
      </div>
    `;
  }

  calendarContainer.innerHTML = calendarHTML;

  // Date selection
  const dateOptions = document.querySelectorAll(
    ".date-option:not(.unavailable)"
  );
  dateOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const previouslySelected = document.querySelector(
        ".date-option.selected"
      );
      if (previouslySelected) {
        previouslySelected.classList.remove("selected");
      }
      this.classList.add("selected");

      const eventDateInput = document.getElementById("event-date");
      if (eventDateInput) {
        eventDateInput.value = this.getAttribute("data-date");
      }
    });
  });
}

function generateAvailabilityData() {
  const data = {};
  const today = new Date();

  // This generates sample availability data
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateString = date.toISOString().split("T")[0];

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    // Simple logic: more availability further in the future
    if (i < 14) {
      if (i < 7) {
        data[dateString] = {
          bento: Math.max(0, 1 - Math.floor(i / 2)),
          custom: Math.max(0, 1 - Math.floor(i / 3)),
          status: i < 3 ? "limited" : "unavailable",
        };
      } else {
        data[dateString] = {
          bento: isWeekend ? 2 : 3,
          custom: isWeekend ? 1 : 2,
          status: "available",
        };
      }
    }
  }

  return data;
}

// Delivery Options
function initDeliveryOptions() {
  const deliveryOptions = document.querySelectorAll(".delivery-option");
  deliveryOptions.forEach((option) => {
    option.addEventListener("click", function () {
      deliveryOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      setTimeout(window.updateCostSummary, 100);
    });
  });

  // Default to collection (it's free!)
  document
    .querySelector('.delivery-option[data-delivery="collection"]')
    ?.classList.add("selected");
}

// Order Summary
function initOrderSummary() {
  // This will be updated by updateCostSummary
}

function updateOrderSummary(totalCost, breakdown) {
  const summaryContainer = document.getElementById("order-summary-details");
  if (!summaryContainer) return;

  let summaryHTML = "";

  breakdown.forEach((item) => {
    summaryHTML += `
      <div class="summary-item">
        <span class="summary-label">${item.label}</span>
        <span class="summary-value">R${item.cost}</span>
      </div>
    `;
  });

  summaryHTML += `
    <div class="summary-item summary-total">
      <span class="summary-label">TOTAL ESTIMATE</span>
      <span class="summary-value">R${totalCost}</span>
    </div>
  `;

  summaryContainer.innerHTML = summaryHTML;
}

// =============================================
// BASIC FORM VALIDATION - Shared across all forms
// =============================================

function initOrderForm() {
  const forms = document.querySelectorAll(".product-form");

  forms.forEach((form) => {
    // Basic validation for required fields
    const inputs = form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        clearFieldError(this);
      });
    });

    // Phone formatting
    const phoneInputs = form.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach((phoneInput) => {
      phoneInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");

        // Handle South African number format
        if (value.startsWith("27")) {
          value = "+" + value;
        }

        // Add spaces for readability
        if (value.length > 2) {
          value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
        }

        e.target.value = value;
      });
    });

    // Date validation - can't order for past dates!
    const dateInputs = form.querySelectorAll('input[type="date"]');
    dateInputs.forEach((dateInput) => {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;

      dateInput.addEventListener("change", function () {
        const selectedDate = new Date(this.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
          showFieldError(this, "Please select a future date");
        } else {
          clearFieldError(this);
        }
      });
    });

    // File upload validation
    const fileInputs = form.querySelectorAll('input[type="file"]');
    fileInputs.forEach((fileInput) => {
      fileInput.addEventListener("change", function () {
        validateFiles(this);
      });
    });
  });
}

// =============================================
// FILE UPLOAD GUIDANCE - Help with large files
// =============================================

function initFileUploadGuidance() {
  // Add click tracking for Google Forms links
  const googleFormsLinks = document.querySelectorAll(".google-forms-link");
  googleFormsLinks.forEach((link) => {
    link.addEventListener("click", function () {
      showSelectionConfirmation(
        "Opening Google Forms for large file uploads..."
      );
    });
  });
}
// =============================================
// NOTIFICATION SYSTEM
// =============================================

function showSelectionConfirmation(message) {
  const confirmation = document.createElement("div");
  confirmation.textContent = message;
  confirmation.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--pink-bright);
    color: white;
    padding: 12px 20px;
    border-radius: 25px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    max-width: 300px;
    word-wrap: break-word;
  `;
  document.body.appendChild(confirmation);

  setTimeout(() => {
    confirmation.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      confirmation.remove();
    }, 300);
  }, 3000);
}

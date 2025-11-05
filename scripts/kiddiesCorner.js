// Kiddies Corner JavaScript
gsap.registerPlugin(ScrollTrigger);

// Spoonacular API Configuration
const SPOONACULAR_API_KEY = "eb28a73d78744f4ab57ee67205cfc369";
const SPOONACULAR_BASE_URL = "https://api.spoonacular.com/recipes";

// GSAP Animations
function initAnimations() {
  // Hero animation
  gsap.from(".hero-title", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "back.out(1.7)",
  });

  gsap.from(".hero-text p", {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.3,
    delay: 0.5,
  });

  // Blog cards animation
  gsap.from(".blog-card", {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".blog-grid-section",
      start: "top 80%",
    },
  });

  // Search section animation
  gsap.from(".recipe-finder-section", {
    duration: 1,
    y: 30,
    opacity: 0,
    scrollTrigger: {
      trigger: ".recipe-finder-section",
      start: "top 80%",
    },
  });

  // Saved recipes section animation
  gsap.from(".saved-recipes-section", {
    duration: 1,
    y: 30,
    opacity: 0,
    scrollTrigger: {
      trigger: ".saved-recipes-section",
      start: "top 80%",
    },
  });

  // Floating sprinkles
  gsap.to(".floating-sprinkle", {
    y: -20,
    rotation: 360,
    duration: 2,
    repeat: -1,
    yoyo: true,
    stagger: 0.5,
    ease: "sine.inOut",
  });
}

// Blog opening function - UPDATED WITH CORRECT LINKS
function openBlog(blogNumber) {
  const blogUrls = {
    1: "../Kiddies-Corner/Kiddies-Blog-1.html",
    2: "../Kiddies-Corner/Kiddies-Blog-2.html",
    3: "../Kiddies-Corner/Kiddies-Blog-3.html",
    4: "../Kiddies-Corner/Kiddies-Blog-4.html",
    5: "../Kiddies-Corner/Kiddies-Blog-5.html",
    6: "../Kiddies-Corner/Kiddies-Blog-6.html",
  };

  if (blogUrls[blogNumber]) {
    window.location.href = blogUrls[blogNumber];
  } else {
    alert(`Blog ${blogNumber} coming soon!`);
  }
}

// Search suggestion handler
function searchSuggestion(term) {
  document.getElementById("recipeSearch").value = term;
  searchRecipes();
}

// Enhanced Spoonacular API function with kid-friendly filters
async function searchRecipes() {
  const searchTerm = document.getElementById("recipeSearch").value;
  const resultsDiv = document.getElementById("recipeResults");

  if (!searchTerm) {
    resultsDiv.innerHTML =
      '<p class="no-results">Please enter a search term!</p>';
    return;
  }

  resultsDiv.innerHTML =
    '<p class="loading">Searching for kid-friendly recipes...</p>';

  try {
    // Search with kid-friendly parameters
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${encodeURIComponent(
        searchTerm
      )}&number=8&addRecipeInformation=true&maxReadyTime=60&sort=popularity`
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Filter for simpler recipes (shorter ready times)
      const kidFriendlyRecipes = data.results.filter(
        (recipe) => recipe.readyInMinutes <= 90 // Shorter recipes
      );

      if (kidFriendlyRecipes.length > 0) {
        displayRecipes(kidFriendlyRecipes);
      } else {
        resultsDiv.innerHTML =
          '<p class="no-results">No kid-friendly recipes found. Try simpler terms like "cookies" or "muffins".</p>';
      }
    } else {
      resultsDiv.innerHTML =
        '<p class="no-results">No recipes found. Try different keywords.</p>';
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    resultsDiv.innerHTML = `
            <div class="error">
                <p>Could not fetch recipes at this time</p>
                <p><small>Error: ${error.message}</small></p>
            </div>
        `;
  }
}

// Display recipes in the results section
function displayRecipes(recipes) {
  const resultsDiv = document.getElementById("recipeResults");

  const recipesHTML = recipes
    .map(
      (recipe) => `
        <div class="recipe-card">
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${
        recipe.title
      }" onerror="this.src='../assets/images/recipe-placeholder.jpg'">
            </div>
            <div class="recipe-info">
                <h3>${recipe.title}</h3>
                <div class="recipe-meta">
                    <span class="ready-time">Ready in: ${
                      recipe.readyInMinutes
                    } mins</span>
                    <span class="servings">Serves: ${recipe.servings}</span>
                </div>
                <p class="recipe-summary">${stripHTML(recipe.summary).substring(
                  0,
                  150
                )}...</p>
                <div class="recipe-actions">
                    <a href="${
                      recipe.sourceUrl
                    }" target="_blank" class="view-recipe-btn">View Full Recipe</a>
                    <button onclick="saveRecipe(${
                      recipe.id
                    }, '${recipe.title.replace(
        /'/g,
        "\\'"
      )}')" class="save-recipe-btn">Save Recipe</button>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  resultsDiv.innerHTML = `
        <div class="recipes-grid">
            ${recipesHTML}
        </div>
    `;
}

// Helper function to remove HTML tags from summary
function stripHTML(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

// Save recipe to favorites (local storage)
function saveRecipe(recipeId, recipeTitle) {
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

  // Check if recipe already saved
  const existingRecipe = savedRecipes.find((recipe) => recipe.id === recipeId);

  if (!existingRecipe) {
    savedRecipes.push({
      id: recipeId,
      title: recipeTitle,
      savedAt: new Date().toISOString(),
    });
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    alert(`"${recipeTitle}" saved to your favorites!`);
    loadSavedRecipes(); // Refresh saved recipes display
  } else {
    alert("Recipe already saved!");
  }
}

// Load and display saved recipes
function loadSavedRecipes() {
  const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  const savedRecipesList = document.getElementById("savedRecipesList");

  if (savedRecipes.length === 0) {
    savedRecipesList.innerHTML =
      '<p class="no-saved">No saved recipes yet. Search above and save your favorites!</p>';
    return;
  }

  const savedHTML = savedRecipes
    .map(
      (recipe) => `
        <div class="recipe-card">
            <div class="recipe-info">
                <h3>${recipe.title}</h3>
                <p class="recipe-meta">Saved on: ${new Date(
                  recipe.savedAt
                ).toLocaleDateString()}</p>
                <div class="recipe-actions">
                    <button onclick="removeSavedRecipe(${
                      recipe.id
                    })" class="save-recipe-btn" style="background: #f44336;">Remove</button>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  savedRecipesList.innerHTML = `
        <div class="recipes-grid">
            ${savedHTML}
        </div>
    `;
}

// Remove recipe from saved list
function removeSavedRecipe(recipeId) {
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  savedRecipes = savedRecipes.filter((recipe) => recipe.id !== recipeId);
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  loadSavedRecipes(); // Refresh display
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  initAnimations();
  loadSavedRecipes();

  // Add enter key support for search
  document
    .getElementById("recipeSearch")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        searchRecipes();
      }
    });
});

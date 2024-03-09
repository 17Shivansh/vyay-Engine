// hamburger-menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-nav");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("-translate-x-full");
});

document.addEventListener("DOMContentLoaded", function() {
    const cardContainer = document.getElementById("card-Container");
    const recipeTableContainer = document.getElementById("recipeTableContainer");
    const searchBtn = document.getElementById("search-btn");

    searchBtn.addEventListener("click", function() {
        const searchInputTxt = document.getElementById("search-input").value.trim();
        fetchRecipes(searchInputTxt);
    });

    function fetchRecipes(searchInputTxt) {
        const url = `https://apis-new.foodoscope.com/recipe-search/regions?searchText=${searchInputTxt}&pageSize=10`;
        const options = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer D0atXz7kqK9N3O5LlQYLTZBm1BGcPNWRT0oZhx-TDkOQHNnQ',
            },
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    generateRecipeCards(data.payload.data);
                } else {
                    console.error("Failed to fetch recipe data");
                }
            })
            .catch(error => {
                console.error("Error fetching recipe data:", error);
            });
    }

    function generateRecipeCards(recipes) {
        cardContainer.innerHTML = "";
        recipes.forEach(recipe => {
            const card = document.createElement("div");
            card.classList.add("recipe-card", "border", "border-gray-300", "rounded-lg", "p-4", "mx-2", "my-2");
            card.innerHTML = `
                <div class="meal-item rounded-lg overflow-hidden shadow-lg cursor-pointer my-4 p-2 flex flex-col items-center justify-center gap-x-10" style="width: 200px; height: 250px;">
                    <div class="meal-img w-full h-3/4">
                        <img src="${recipe.img_url}" alt="food" class="w-full h-full rounded-lg object-cover">
                    </div>
                    <div class="meal-name font-semibold text-center">
                        <h3 class="py-2">${recipe.Recipe_title}</h3>
                        <a href ="${recipe.url}" target="_blank" class="recipe-btn bg-[#ffc035] text-white rounded-lg px-4 py-1 mt-2 font-bold view-recipe-btn">View Recipe</a>                    </div>
                </div>
            `;
            cardContainer.appendChild(card);
        });
        attachViewRecipeListeners(); // Attach event listeners to the "View Recipe" buttons
    }

    function attachViewRecipeListeners() {
        const viewRecipeBtns = document.querySelectorAll(".view-recipe-btn");
        viewRecipeBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                const recipeId = btn.dataset.recipeId;
                fetchRecipeDetails(recipeId);
            });
        });
    }
});

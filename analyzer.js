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

    recipeAnalyzerBtn.addEventListener("click", function() {
        fetchRecipeAnalyzerData();
    });

    function fetchRecipes(searchInputTxt) {
        const url = `https://apis-new.foodoscope.com/recipe-search/recipe?searchText=${searchInputTxt}&page=0&pageSize=10`;
        const options = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer O_quZH8YU-oFK-DhrqqEP1JiXXCS7rZpiTHTFCRqeGm_C9dD',
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
            console.log(recipe.url);
            card.classList.add("recipe-card", "border", "border-gray-300", "rounded-lg", "p-4", "mx-2", "my-2");
            card.innerHTML = `
                <div class="meal-item rounded-lg overflow-hidden shadow-lg cursor-pointer my-4 p-2 flex flex-col items-center justify-center gap-x-10" style="width: 200px; height: 250px;">
                    <div class="meal-img w-full h-3/4">
                        <img src="${recipe.img_url}" alt="food" class="w-full h-full rounded-lg object-cover">
                    </div>
                    <div class="meal-name font-semibold text-center">
                        <h3 class="py-2">${recipe.Recipe_title}</h3>
                        <a href ="${recipe.url}" target="_blank" class="recipe-btn bg-[#ffc035] overflow-hidden flex-wrap text-white rounded-lg px-4 py-1 mt-2 font-bold view-recipe-btn">View Recipe</a>
                        </div>
                        </div>
                        `;
            cardContainer.appendChild(card);
        });
        attachViewRecipeListeners(); // Attach event listeners to the "View Recipe" buttons
    }

    function attachViewRecipeListeners() {
        const viewRecipeBtns = document.querySelectorAll(".recipe-btn");
        viewRecipeBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                const recipeId = btn.dataset.recipeId;
                fetchRecipeDetails(recipeId);
            });
        });
    }

    function fetchRecipeDetails(recipeId) {
        const url = `https://apis-new.foodoscope.com/recipe/${recipeId}`;
        const options = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer O_quZH8YU-oFK-DhrqqEP1JiXXCS7rZpiTHTFCRqeGm_C9dD',
            },
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const recipeData = data.payload; // Assuming data contains the recipe details directly
                    displayRecipeTable(recipeData);
                } else {
                    console.error("Failed to fetch recipe details");
                }
            })
            .catch(error => {
                console.error("Error fetching recipe details:", error);
            });
    }
    
    function displayRecipeTable(recipeData) {
        recipeTableContainer.innerHTML = `
            <table class="table-auto border-collapse w-full">
                <thead>
                    <tr>
                        <th class="border px-4 py-2">Recipe</th>
                        <th class="border px-4 py-2">Carbohydrate</th>
                        <th class="border px-4 py-2">Protein</th>
                        <th class="border px-4 py-2">Fat</th>
                        <th class="border px-4 py-2">Energy</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border px-4 py-2">${recipeData.Recipe_title}</td>
                        <td class="border px-4 py-2">${recipeData.Carbohydrate}</td>
                        <td class="border px-4 py-2">${recipeData.Protein}</td>
                        <td class="border px-4 py-2">${recipeData.fat}</td>
                        <td class="border px-4 py-2">${recipeData.Energy}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
    
      
});
    
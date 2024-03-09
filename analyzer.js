// hamburger-menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-nav");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("-translate-x-full");
});

document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("card-Container");
    const recipeTableContainer = document.getElementById("recipeTableContainer");
    const searchBtn = document.getElementById("search-btn");

    searchBtn.addEventListener("click", function () {
        const searchInputTxt = document.getElementById("search-input").value.trim();
        fetchRecipes(searchInputTxt);
    });
let recipeName;
    function fetchRecipes(searchInputTxt) {
        recipeName = searchInputTxt;
        const url = `https://apis-new.foodoscope.com/recipe-search/recipe?searchText=${searchInputTxt}&page=0&pageSize=3`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer O_quZH8YU-oFK-DhrqqEP1JiXXCS7rZpiTHTFCRqeGm_C9dD',
            },
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
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
                        <button class="recipe-btn bg-[#ffc035] overflow-hidden flex-wrap text-white rounded-lg px-4 py-1 mt-2 font-bold view-recipe-btn" data-recipe-id="${recipe.id}">View Recipe</button>
                    </div>
                </div>
            `;
            cardContainer.appendChild(card);
        });
        attachViewRecipeListeners(); // Attach event listeners to the "View Recipe" buttons
    }

    function attachViewRecipeListeners() {
        const viewRecipeBtns = document.querySelectorAll(".view-recipe-btn");
        viewRecipeBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                const recipeId = btn.dataset.recipeId;
                fetchRecipeDetails(recipeId);
            });
        });
    }

    function fetchRecipeDetails(recipeName) {
        const url = `https://apis-new.foodoscope.com/recipe-search/recipe?searchText=${recipeName}&page=0&pageSize=3`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer O_quZH8YU-oFK-DhrqqEP1JiXXCS7rZpiTHTFCRqeGm_C9dD',
            },
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
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
        const carbohydrate = recipeData["Carbohydrate, by difference (g)"];
        const energy = recipeData["Energy (kcal)"];
        const protein = recipeData["Protein (g)"];
        const fat = recipeData["Total lipid (fat) (g)"];
        
        console.log("Carbohydrate:", carbohydrate);
        console.log("Energy:", energy);
        console.log("Protein:", protein);
        console.log("Fat:", fat);
        
        recipeTableContainer.innerHTML = `
            <table class="table-auto border-collapse w-full">
                <thead>
                    <tr>
                        <th class="border px-4 py-2">Nutrient</th>
                        <th class="border px-4 py-2">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border px-4 py-2">Carbohydrate (g)</td>
                        <td class="border px-4 py-2"> ${carbohydrate}</td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">Protein (g)</td>
                        <td class="border px-4 py-2">${energy}</td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">Fat (g)</td>
                        <td class="border px-4 py-2">${fat}</td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">Energy (kcal)</td>
                        <td class="border px-4 py-2">${protein}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
});

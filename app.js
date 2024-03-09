// hamburger-menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-nav");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("-translate-x-full");
});

// hamburger-menu ends here

// Fetch data from the API and create cards

// Search-bar start here
document.addEventListener("DOMContentLoaded", function() {
  const cardContainer = document.getElementById("card-Container");
  const recipeTableContainer = document.getElementById("recipeTableContainer");
  const searchBtn = document.getElementById("search-btn");

  searchBtn.addEventListener("click", function() {
      const searchInputTxt = document.getElementById("search-input").value.trim();
      fetchRecipes(searchInputTxt);
  });

  function fetchRecipes(searchInputTxt) {
      const url = `https://apis-new.foodoscope.com/recipe-search/recipe?searchText=${searchInputTxt}&page=0&pageSize=10`;
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
                      <button class="recipe-btn bg-pink-600 text-white rounded-lg px-4 py-1 mt-2 font-bold view-recipe-btn" data-recipe-id="${recipe.id}">View Recipe</button>
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
          btn.addEventListener("click", function() {
              const recipeId = btn.dataset.recipeId;
              fetchRecipeDetails(recipeId);
          });
      });
  }
});


// Search-bar ends here

// Fetch data from the API and create cards for recipe of the day
function getMealData() {
  let searchInputTxt = document.getElementById("search-input").value.trim();

  const url = `https://apis-new.foodoscope.com/recipe/recipeOftheDay`;
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer D0atXz7kqK9N3O5LlQYLTZBm1BGcPNWRT0oZhx-TDkOQHNnQ',
    },
  };
  fetch(url, options)
  .then(response => {
    console.log("API Response:", response); 
    return response.json();
  })
      .then((data) => {
        console.log(data);

          const meal = data.payload.Recipe_title;
          const cardContainer = document.getElementById("card-Container");
 
          cardContainer.innerHTML = `
          
          <a href="another-page.html" class="block w-full h-[400px] my-2 flex flex-col md:flex-row justify-between items-center">
          <div class="lg:w-[70%] w-full h-[200px] lg:h-[400px] bg-cover bg-center rounded-lg"  style="background-image: url(${data.payload.img_url})"></div>
    <div class="flex flex-col items-center mx-auto w-[30%] h-[400px] justify-center">
    <h1 class="text-4xl font-bold mb-2 text-center">${data.payload.Recipe_title}</h1>
      <p class="text-base mb-2 font-semibold text-center text-nowrap">Prep Time: ${data.payload.prep_time}</p>
      <p class="text-base mb-2 text-center font-semibold text-nowrap">Cook Time: ${data.payload.cook_time}</p>
    </div>
 
</a>

          `;
      })
      .catch((error) => console.log(error));
}

// Call the function initially to load a random meal
getMealData();



// for latest recipe start here 
document.addEventListener("DOMContentLoaded", function() {
  const recipeCardsContainer = document.getElementById("recipeCardsContainer");

  fetchRecipes();

  function fetchRecipes() {
    const url = "https://apis-new.foodoscope.com/recipe-search/recipe?searchText=&page=0&pageSize=3"; // Limiting to 3 recipes
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
    recipeCardsContainer.innerHTML = "";
    recipes.forEach(recipe => {
      const card = document.createElement("div");
      card.classList.add("card", "hover:shadow-lg");
      card.innerHTML = `
      <a href="#">
        <img src="${recipe.img_url}" alt="${recipe.Recipe_title}" class="w-full h-32 sm:h-48 object-cover" />
        <div class="m-4">
          <span class="font-bold">${recipe.Recipe_title}</span>
          <span class="block text-gray-500 text-sm">${recipe.Sub_region}</span>
        </div>
        <div class="badge">
          <svg class="w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>${recipe.cook_time} mins</span>
        </div> </a>
            `;
      recipeCardsContainer.appendChild(card);
    });
  }
});


// for Recommedation recipe start here 
document.addEventListener("DOMContentLoaded", function() {
  const recipeCardsContainer = document.getElementById("recipe-Cards-Container");

  fetchRecipes();

  function fetchRecipes() {
    const url = "https://apis-new.foodoscope.com/recipe-search/recipe?searchText=&page=4&pageSize=3"; 
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
    recipeCardsContainer.innerHTML = "";
    recipes.forEach(recipe => {
      const card = document.createElement("div");
      card.classList.add("card", "hover:shadow-lg");
      card.innerHTML = `
      <a href="#">
        <img src="${recipe.img_url}" alt="${recipe.Recipe_title}" class="w-full h-32 sm:h-48 object-cover" />
        <div class="m-4">
          <span class="font-bold">${recipe.Recipe_title}</span>
          <span class="block text-gray-500 text-sm">${recipe.Sub_region}</span>
        </div>
        <div class="badge">
          <svg class="w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>${recipe.cook_time} mins</span>
        </div> </a>
            `;
      recipeCardsContainer.appendChild(card);
    });
  }
});




// for ends recipe start here 

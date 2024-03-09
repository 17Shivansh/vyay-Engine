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
  // console.log(searchInputTxt);
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
    console.log("API Response:", response); // Log the entire response
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
function getMealListLatestRecipe() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  console.log(searchInputTxt);
  const url = `https://apis-new.foodoscope.com/recipe-search/recipe?page=0&pageSize=15`;
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer D0atXz7kqK9N3O5LlQYLTZBm1BGcPNWRT0oZhx-TDkOQHNnQ',
    },
  };
  fetch(url, options)
  .then(response => {
    console.log("API Response 2:", response); // Log the entire response
    return response.json();
  })
  .then((data) => {
      let html = "";
      // console.log("data" + data);
      console.log("data2" + data);
      console.log(data.payload.data[0].Recipe_title);
      console.log(data.payload.data[0].img_url);
      
      if (data && data.success === "true") {
        meal.innerHTML =
          `<h2 class="title text-center font-bold">Your Search Results :</h2>`;
        data.payload.data.forEach((recipe) => {
          html += `
            <div class="swiper-slide overflow-hidden w-[400px] sm:w-[300px] h-[400px]">
              <div class="meal-item rounded-lg card w-full overflow-hidden shadow-lg cursor-pointer my-4 p-2 flex flex-col items-center justify-center h-75" data-id="${recipe.Recipe_id}">
                <div class="meal-img">
                  <img src="${recipe.img_url}" alt="food" class="w-full h-32 sm:h-48 rounded-lg object-cover">
                </div>
                <div class="meal-name font-semibold">
                  <h3 class="py-2 text-center text-wrap">${recipe.Recipe_title}</h3>
                  <a href="${recipe.url}" class="recipe-btn bg-pink-600 text-white rounded-lg px-4 py-1 mt-5 font-bold mx-auto">View Recipe</a>
                </div>
              </div>
            </div>`;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add("notFound");
      }
    

      document.getElementById("firstPage").innerHTML = (data.payload.data[1].Recipe_title);

      mealList.innerHTML = html;

      // Initialize Swiper after adding cards
      new Swiper('.swiper-container', {
        // Optional Swiper options
        slidesPerView: 'auto', // Display as many slides as possible within the container
        spaceBetween: 16, // Adjust this value for spacing between slides
      });
    });
}


// for ends recipe start here 

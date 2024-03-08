// hamburger-menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-nav");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("-translate-x-full");
});

// hamburger-menu ends here

// Fetch data from the API and create cards

// Search-bar start here
function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      const cardContainer = document.getElementById("cardContainer");
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
              <div class="meal-item rounded-lg overflow-hidden shadow-lg cursor-pointer my-4 p-2 flex flex-col items-center justify-center gap-x-10" style="width: 100px; height: 100px;">
                <div class="meal-img">
                  <img src="${meal.strMealThumb}" alt="food" class="w-full h-full rounded-lg object-cover">
                </div>
                <div class="meal-name font-semibold">
                  <h3 class="py-2 text-center text-wrap">${meal.strMeal}</h3>
                  <a href="#" class="recipe-btn bg-pink-600 text-white rounded-lg px-4 py-1 mt-5 font-bold mx-auto">View Recipe</a>
                </div>
              </div>
            `;
        });
        cardContainer.innerHTML = html;

        // Auto slider
        let currentIndex = 0;
        setInterval(() => {
          currentIndex++;
          if (currentIndex >= cardContainer.children.length) {
            currentIndex = 0;
          }
          cardContainer.style.transform = `translateX(-${currentIndex * 75}px)`;
        }, 3000); // Change slide every 3 seconds (3000 milliseconds)
      } else {
        cardContainer.innerHTML = "Sorry, we didn't find any meal!";
      }
    });
}

// Add event listener to search button
document.getElementById("search-btn").addEventListener("click", getMealList);

// Search-bar ends here

// Fetch data from the API and create cards for recipe of the day
function getMealData() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((data) => {
          const meal = data.meals[0];
          const cardContainer = document.getElementById("card-Container");
          const prepTime = meal.strMeasure1 + " " + meal.strIngredient1;
          const cookTime = meal.strMeasure2 + " " + meal.strIngredient2;
          cardContainer.innerHTML = `
              <a href="another-page.html" class="block w-full h-[400px] my-2 flex flex-col md:flex-row justify-between items-center">
                  <div class="lg:w-[70%] w-full h-[200px] lg:h-[400px] bg-cover bg-center rounded-lg" style="background-image: url(${meal.strMealThumb})"></div>
                  <div class="flex flex-col items-center mx-auto w-[30%] h-[400px]">
                      <h1 class="text-4xl font-bold mb-2 text-center">${meal.strMeal}</h1>
                      <p class="text-base mb-2 font-semibold text-center">Prep Time: ${prepTime}</p>
                      <p class="text-base mb-2 text-center font-semibold">Cook Time: ${cookTime}</p>
                  </div>
              </a>
          `;
      })
      .catch((error) => console.log(error));
}

// Call the function initially to load a random meal
getMealData();


// for latest recipe start here 



// for ends recipe start here 

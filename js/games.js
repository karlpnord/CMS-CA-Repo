import { cartAmount } from "./components/cartAmount.js";

const loadingAnimation = document.querySelector(".loading");
const errorContainer = document.querySelector(".error");
const gamesContainer = document.querySelector(".games");

const url = "https://api.noroff.dev/api/v1/gamehub";

async function apiCall() {
   try {
      const response = await fetch(url);
      const games = await response.json();
      errorContainer.style.display = "none";
      createHtml(games);
      searchForGames(games);
   } catch(error) {
      errorContainer.style.display = "block";
      errorContainer.innerHTML = "An error has occurred, please reload the page";
   } finally {
      loadingAnimation.style.display = "none";
   }
   
}

apiCall();

function createHtml(games) {
   gamesContainer.innerHTML = "";
   gamesContainer.style.display = "grid";
   for(let i = 0; i < games.length; i++) {
      gamesContainer.innerHTML += `
         <div class="games-item">
            <img src="${games[i].image}" alt="${games[i].description}" class="gameimage">
            <div class="vertical-line"></div>
            <section class="gameinfo">
               <h2>${games[i].title}</h2>
               <h3>${games[i].genre}</h3>
               <h4>${games[i].price}€</h4>
               <a href="gameproduct.html?id=${games[i].id}" class="cta cta-black">View</a>
            </section>
         </div>`;
   }
}

function searchForGames(games) {
   const search = document.querySelector("#search");
   search.onkeyup = function() {
      const searchValue = event.target.value.trim().toLowerCase();
      const filterTeams = games.filter(function(game) {
         if(game.title.toLowerCase().includes(searchValue)) {
            return true;
         }
      });
      createHtml(filterTeams);
   };
}

cartAmount();
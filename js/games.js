import { cartAmount } from "./components/cartAmount.js";

const loadingAnimation = document.querySelector(".loading");
const errorContainer = document.querySelector(".error");
const gamesContainer = document.querySelector(".games");

export const apiUrl = "https://www.cms-ca-kpn.no/wp-json/wc/store/products";

async function apiCall() {
   try {
      const response = await fetch(apiUrl);
      const games = await response.json();
      console.log(games);
      errorContainer.style.display = "none";
      createHtml(games);
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
            <img src="${games[i].images[0].src}" alt="${games[i].description}" class="gameimage">
            <div class="vertical-line"></div>
            <section class="gameinfo">
               <h2>${games[i].name}</h2>
               <h3>${games[i].categories[0].name}</h3>
               <h4>${games[i].prices.price}${games[i].prices.currency_symbol}</h4>
               <a href="/gameproduct.html?id=${games[i].id}" class="cta cta-black">View</a>
            </section>
         </div>`;
   }
}

cartAmount();
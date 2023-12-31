import { cartLoad } from "./components/cartLoad.js";
import { saveCart } from "./components/cartSave.js";
import { cartAmount } from "./components/cartAmount.js";
import { apiUrl } from "./games.js";

const url = new URL(location.href);

const id = url.searchParams.get("id");

if(id === null) {
   location.href = "/";
}


const container = document.querySelector(".grid-container");
const loadingContainer = document.querySelector(".loading");
const errorContainer = document.querySelector(".error");
const usability = document.querySelector(".usability");
const mainContainer = document.querySelector("main");

const overlay = document.querySelector(".added-to-cart-overlay");

cartAmount();

async function fetchGameProduct() {
   try {
      const response = await fetch(`${apiUrl}/${id}`);
      const game = await response.json();
      usability.style.display = "none";
      createHtml(game);
      console.log(game);
   } catch(error) {
      errorContainer.style.display = "block";
      errorContainer.innerHTML = "An error has occurred, please reload the page";
   }
}

function createHtml(game) {
   container.style.display = "grid";
   document.title = `GameHub - ${game.name}`;
   container.innerHTML = `
      <div class="image-item">
         <img src="${game.images[0].src}" alt="${game.description}">
      </div>
      <section class="product-item">
         <a href="games-page.html" aria-label="close link" class="close-button"><i class="fa-solid fa-xmark"></i></a>
         <h1>${game.name}</h1>
         <p>${game.description}</p>
         <h2>${game.prices.price}${game.prices.currency_symbol}</h2>
         <button class="cta cta-black add-to-cart">Add to Cart</button>
      </section>`;

   const cartButton = container.querySelector(".add-to-cart");
   cartButton.addEventListener("click", addToCart);
   cartButton.addEventListener("click", buttonStyle);

   function buttonStyle() {
      overlay.style.display = "flex";
      container.classList.add("opacity-class");
      mainContainer.style.backgroundColor = "rgba(0,0,0,0.5)";
   }

   function addToCart() {
      let cart = cartLoad("cart") || [];
      cart.push(id);
      saveCart("cart", cart);
      cartAmount();
   }

   overlay.innerHTML = `
      <h2>Added to Cart!</h2>
      <div class="overlay__item">
         <img src="${game.images[0].src}" alt="${game.description}">
         <h3>${game.name}</h3>
         <h4>${game.prices.price}${game.prices.currency_symbol}</h4>
      </div>
      <div class="overlay__buttons">
         <button class="continue-shopping">Continue Shopping</button>
         <button class="go-to-cart">Go to Cart</button>
      </div>
      <button class="close-button close-overlay"><i class="fa-solid fa-xmark"></i></button>`;

   const closeOverlay = overlay.querySelector(".close-overlay");   
   closeOverlay.addEventListener("click", closeCartOverlay);

   function closeCartOverlay() {
      overlay.style.display = "none";
      container.classList.remove("opacity-class");
      mainContainer.style.backgroundColor = "#fff";
   }

   const cntShoppingBtn = overlay.querySelector(".continue-shopping");
   const toToCartBtn = overlay.querySelector(".go-to-cart");

   cntShoppingBtn.onclick = function() {
      window.location.href = "games-page.html";
   }
   
   toToCartBtn.onclick = function() {
      window.location.href = "cart-summary.html";
   }
}

fetchGameProduct();
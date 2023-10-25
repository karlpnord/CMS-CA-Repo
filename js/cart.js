import { cartLoad } from "./components/cartLoad.js";
import { cartAmount } from "./components/cartAmount.js";

export let shoppingCart = cartLoad("cart");

const url = "https://api.noroff.dev/api/v1/gamehub/";

const productContainer = document.querySelector(".products");
const totalPrice = document.querySelector(".total-price");
const loadingContainer = document.querySelector(".loading");
const errorContainer = document.querySelector(".error");

let price = 0;

async function fetchGameProduct() {
   try {
      const response = await fetch(url);
      const game = await response.json();

      if(!shoppingCart){
         productContainer.innerHTML = "";
         totalPrice.innerHTML = "Cart is empty!";
      } else {
         displayCartGames(game);
      }

      
   } catch(error) {
      productContainer.style.display = "none";
      errorContainer.style.display = "block";
      errorContainer.innerHTML = "Cant show games, please reload the page!";
   } finally {
      loadingContainer.style.display = "none";
   }
}

function displayCartGames(game) {
   productContainer.innerHTML = "";
   price = 0;

   if(price === 0)  {
      totalPrice.innerHTML = "Cart is empty!";
   }

   // Loop for 1st array
   for(let i = 0; i < game.length; i++) {
      
      // Loop for 2nd array
      for(let j = 0; j < shoppingCart.length; j++) {
         
         if(game[i].id === shoppingCart[j]) {
            price += game[i].price;
            totalPrice.innerHTML = "Total: " + price + "€";

            const gameProduct = document.createElement("div");
            const gameImage = document.createElement("img");
            const gameProductDetail = document.createElement("div");
            const gameProductTitle = document.createElement("h2");
            const gameProductPrice = document.createElement("h3");

            productContainer.appendChild(gameProduct);
            gameProduct.appendChild(gameImage);
            gameProduct.appendChild(gameProductDetail);
            gameProductDetail.appendChild(gameProductTitle);
            gameProductDetail.appendChild(gameProductPrice);

            gameProduct.classList.add("product-item");

            gameImage.src = game[i].image;
            gameProductTitle.textContent = game[i].title;
            gameProductPrice.textContent = game[i].price + "€";
         }
      }
   }
}

fetchGameProduct();

cartAmount();

const clearCartButton = document.querySelector(".clear-cart");

clearCartButton.addEventListener("click", clearCart);

function clearCart() {
   localStorage.clear();
   productContainer.innerHTML = "";
   totalPrice.innerHTML = "Cart is empty!";
   cartAmount();
   shoppingCart = "";
   checkIfCartEmpty();
}

const nextPageButton = document.querySelector("#locate-next-page");

nextPageButton.onclick = function() {
   window.location.href = "checkout.html";
}

function checkIfCartEmpty() {
   if(!shoppingCart) {
      nextPageButton.disabled = true;
   } else {
      nextPageButton.disabled = false;
   }
}

checkIfCartEmpty();
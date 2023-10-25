import { cartAmount } from "./components/cartAmount.js";
import { validateEmail } from "./components/validateEmail.js";

const url = "https://api.noroff.dev/api/v1/gamehub";
const gameContainer = document.querySelector(".homepage-games__container");
const errorContainer = document.querySelector(".error");
const loadingAnimation = document.querySelector(".loading");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const submitForm = document.querySelector(".homepage-contact__register");
const submitButton = document.querySelector(".cta-register");

async function apiCall() {
   try {
      const response = await fetch(url);
      const games = await response.json();
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
   gameContainer.innerHTML = "";
   for (let i = 0; i < games.length; i++) {
      gameContainer.innerHTML += `
      <div class="homepage-games__item">
         <img src="${games[i].image}">
         <div class="vertical-line"></div>
         <div class="games__item__article">
            <h3>${games[i].title}</h3>
            <h4>${games[i].genre}</h4>
            <h5>${games[i].price}€</h5>
            <a href="gameproduct.html?id=${games[i].id}" class="cta-black cta">View</a>
         </div>
      </div>`;
      if (i === 3) {
         break;
      }
   }
}

cartAmount();

submitForm.addEventListener("submit", validateForm);

function validateForm() {
   event.preventDefault();
   if(validateEmail(email.value) === true) {
      emailError.style.display = "none";
      submitButton.style.background = "green";
      submitButton.innerText = "Registered";
   } else {
      emailError.style.display = "block";
   }
}
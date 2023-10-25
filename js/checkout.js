import { cartAmount } from "./components/cartAmount.js";
import { validateNumber } from "./components/validateNumber.js";
import { validateSelect } from "./components/validateSelect.js";
import { validateLength } from "./components/validateLength.js";
import { validateEmail } from "./components/validateEmail.js";

cartAmount();

const button = document.querySelector(".checkout");

button.addEventListener("click", clearCart);
button.addEventListener("click", nextPage);

function clearCart() {
   localStorage.clear();
   cartAmount();
}

const cvc = document.querySelector("#cvc");
const cardNmbr = document.querySelector("#card-number");
const selectMonth = document.querySelector("#expiry-month");
const selectYear = document.querySelector("#expiry-year");
const fullName = document.querySelector("#name");
const email = document.querySelector("#email");

cvc.addEventListener("keyup", validateForm);
cardNmbr.addEventListener("keyup", validateForm);
selectMonth.addEventListener("mouseup", validateForm);
selectYear.addEventListener("mouseup", validateForm);
fullName.addEventListener("keyup", validateForm);
email.addEventListener("keyup", validateForm);

function validateForm() {
   if(validateNumber(cvc.value, 3) && validateNumber(cardNmbr.value, 16) && validateSelect(selectYear) && validateSelect(selectMonth) && validateLength(fullName.value, 3) && validateEmail(email.value)) {
      button.disabled = false;
      button.classList.remove("cta-disabled");
      button.classList.add("cta-enabled");
   } else {
      button.disabled = true;
      button.classList.remove("cta-enabled");
      button.classList.add("cta-disabled");
   }
}

function nextPage() {
   event.preventDefault();
   window.location.href = "checkout-success.html";
}
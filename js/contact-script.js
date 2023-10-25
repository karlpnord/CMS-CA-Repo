import { cartAmount } from "./components/cartAmount.js";
import { validateEmail } from "./components/validateEmail.js";
import { validateLength } from "./components/validateLength.js";

const button = document.querySelector("button");
const fullName = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const test = document.querySelector(".test");
const form1 = document.querySelector(".form-pdetails")
const form2 = document.querySelector(".form-mdetails");

function validateForm() {
   if(validateLength(fullName.value, 3) && validateEmail(email.value) && validateLength(message.value, 10)) {
      button.disabled = false;
      button.classList.remove("cta-disabled");
      button.classList.add("cta-enabled");
   } else {
      button.disabled = true;
      button.classList.remove("cta-enabled");
      button.classList.add("cta-disabled");
   }
}

fullName.addEventListener("keyup", validateForm);
email.addEventListener("keyup", validateForm);
message.addEventListener("keyup", validateForm);

cartAmount();

button.onclick = function() {
   window.location.href = "contact-success.html";
}
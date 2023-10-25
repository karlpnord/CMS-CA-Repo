export function cartAmount() {
   const amountContainer = document.querySelector(".shopping-cart-amount");
   const encodedValue = localStorage.getItem("cart");

   if(!encodedValue) {
      amountContainer.innerHTML = 0;
   } else {
      let lsArray = JSON.parse(encodedValue);
      amountContainer.innerHTML = lsArray.length;
   }
}
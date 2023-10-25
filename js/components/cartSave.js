export function saveCart(key, value) {
   const encodedValue = JSON.stringify(value);
   localStorage.setItem(key, encodedValue);
}
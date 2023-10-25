export function cartLoad(key) {
   const encodedValue = localStorage.getItem(key);
   return JSON.parse(encodedValue);
}
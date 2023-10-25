export function validateLength(value, len) {
   if(value.trim().length > len) {
      return true;
   } else {
      return false;
   }
}
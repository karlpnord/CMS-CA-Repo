export function validateNumber(number, len) {
   if(number.trim().length === len) {
      const regEx = /^\d+$/;
      const patternMatches = regEx.test(number);
      return patternMatches;
   } else {
      return false;
   }
}
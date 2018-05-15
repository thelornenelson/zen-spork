import {convertFractionToString} from "./convertFractionToString"

export function adjustIngredientQuantity(quantity, multiplier) {

  let math = require('mathjs');

  if (quantity.length === 0) {
    return "";
  }
  let output = "";
  let fract = math.fraction(quantity);

  if (fract === NaN) {
    return quantity;
  }
  fract = math.multiply(fract, multiplier);
  output = convertFractionToString(fract);

  return output;
}
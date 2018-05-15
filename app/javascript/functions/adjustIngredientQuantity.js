import {convertFractionToString} from "./convertFractionToString"

export function adjustIngredientQuantity(quantity, multiplier) {

  let math = require('mathjs');

  if (quantity.length === 0) {
    return "";
  }

  //Here we test that there are no letters in the quantity, and also that there isn't more than 1 backslash.
  //If there are it just returns the original quantity string.
  let numBackSlahes = 0
  for (let i = 0; i < quantity.length; i++) {
    if (quantity[i] !== "0" && quantity[i] !== "1" && quantity[i] !== "2" && quantity[i] !== "3" && quantity[i] !== "4" && quantity[i] !== "5" && quantity[i] !== "6" && quantity[i] !== "7" && quantity[i] !== "8" && quantity[i] !== "9" && quantity[i] !== "/") {
      return quantity;
    }
    if (quantity[i] === "/"){
      numBackSlahes++;
      if (numBackSlahes > 1) return quantity;
    }
  }

  let output = "";

    let fract = math.fraction(quantity);
    fract = math.multiply(fract, multiplier);
    output = convertFractionToString(fract);

  return output;
}
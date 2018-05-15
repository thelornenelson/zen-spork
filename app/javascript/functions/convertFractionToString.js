export function convertFractionToString(fraction) {
  let output = "";
  if (fraction.d === 1) {
    output = output + fraction.n;
  } else if (fraction.n > fraction.d) {

    let mixedNum = Math.floor(fraction.n / fraction.d);
    let remainder = fraction.n % fraction.d;
    output = output + mixedNum + " " + remainder + "/" + fraction.d;
  } else {
    output = output + fraction.n + "/" + fraction.d;
  }
  return output;
}
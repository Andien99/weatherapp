function convertToCel(tempmin, tempmax = null) {
  if (tempmax !== null) {
    let newTempMin = Math.round((tempmin - 32) / (9 / 5));
    let newTempMax = Math.round((tempmax - 32) / (9 / 5));
    return newTempMax + "°" + " / " + newTempMin + "°";
  } else {
    let newTemp = Math.round((tempmin - 32) / (9 / 5));
    return newTemp + "°";
  }
}

function convertToFah(tempmin, tempmax = null) {
  if (tempmax !== null) {
    let newTempMin = Math.round(tempmin);
    let newTempMax = Math.round(tempmax);
    return newTempMax + "°" + " / " + newTempMin + "°";
  } else {
    let newTemp = Math.round(tempmin);
    return newTemp + "°";
  }
}

export { convertToCel, convertToFah };

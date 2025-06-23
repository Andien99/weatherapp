async function fetchIcon(icon) {
  //fetches the appropriate SVG from bmcdn.nl/assets
  try {
    let response = await fetch(
      `https://bmcdn.nl/assets/weather-icons/v2.0/fill/${icon}.svg`,
      { mode: "cors" }
    );
    return response;
  } catch (err) {
    throw Error(err);
  }
}

export { fetchIcon };

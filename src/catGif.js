const activitysugg = document.getElementById("activitysugg");
const img = document.createElement("img");
function getCatGif() {
  fetch(
    "https://api.giphy.com/v1/gifs/translate?api_key=j4iNciWXMcCp2lsGqMVUbLe2eIHFkMcx&s=cats",
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      img.src = response.data.images.original.url;
      activitysugg.appendChild(img);
    });
}

export { getCatGif };

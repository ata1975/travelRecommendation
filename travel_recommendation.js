let data;
fetch("travel_recommendation_api.json")
  .then((response) => response.json())
  .then((info) => {
    data = info;
    console.log(data);
  })
  .catch((error) => console.error("Error fetching data:", error));

let keyword = document.getElementById("keyword");
let searchButton = document.getElementById("search");
let clearButton = document.getElementById("clear");
let results = document.getElementById("results");

clearButton.addEventListener("click", function () {
  keyword.value = "";
  results.innerHTML = "";
});

searchButton.addEventListener("click", function () {
  const input = keyword.value.toLowerCase();
  if (!data) {
    console.error("Data not available yet!");
    return;
  }

  let arr = [];
  switch (input) {
    case "beach":
    case "beaches":
      data.beaches.forEach((beach) => {
        arr.push(beach);
      });
      break;

    case "temple":
    case "temples":
      data.temples.forEach((temple) => {
        arr.push(temple);
      });
      break;

    case "country":
    case "countries":
      data.countries.forEach((country) => {
        country.cities.forEach((city) => {
          arr.push(city);
        });
      });
      break;
  }

  console.log(arr);
  displayResults(arr);
});

function displayResults(items) {
  if (items.length === 0) {
    results.innerHTML = `<span class="empty-results">No results found!</span>`;
    return;
  }

  results.innerHTML = "";
  items.forEach((x) => {
    const item = document.createElement("div");
    item.classList.add("result-item");
    item.innerHTML = `<img src="${x.imageUrl}" alt="${x.name}"><h3>${x.name}</h3><p>${x.description}</p><a href="${x.imageUrl}"><button>Visit</button></a>`;
    results.appendChild(item);
  });
}

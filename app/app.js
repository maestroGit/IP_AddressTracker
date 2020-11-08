const ipEl = document.getElementById("ip");
const cityEl = document.getElementById("city");
const timezoneEl = document.getElementById("timezone");
const formEl = document.getElementById("form");

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  
});


// get ip address on submit
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  let ipForm = event.target[0].value;
  console.log(typeof(ipForm));
  event.target[0].value = "";
  getIP(ipForm);
});

// const ipnum = "147.8.9.8";
// const url =
// "https://geo.ipify.org/api/v1?apiKey=at_RArXicrLdb4uiGyiuhW5WHUxPsoyt&ipAddress=8.8.8.8";
// const url2 = "https://geo.ipify.org/api/v1?";
// const utl3 = "";
// const apiKey = "at_RArXicrLdb4uiGyiuhW5WHUxPsoyt";
// const urlapiKey = `${url2}apiKey=${apiKey}&ipAddress=${ipnum}`;
// console.log(urlapiKey);
// console.log(url);

// // Petición API
async function getIP(ip) {
  const ipnum = await ip;
  console.log("valor : "+ipnum);

const url2 = "https://geo.ipify.org/api/v1?";
const utl3 = "";
const apiKey = "at_RArXicrLdb4uiGyiuhW5WHUxPsoyt";
const urlapiKey = `${url2}apiKey=${apiKey}&ipAddress=${ipnum}`;
console.log(urlapiKey);


  const res = await fetch(urlapiKey);
  //console.log(res);
  //const data = res.json();
  //console.log(data);
  showResults(res);
}

// Show results from api
async function showResults(data) {
  const { ip, location } = await data.json();
  // const ip = data.ip;
  console.log(ip, location.city, location.timezone, location.lat, location.lng);
  ipEl.innerHTML = ip;
  cityEl.innerHTML = location.city;
  timezoneEl.innerHTML = location.timezone;
  const lat = location.lat;
  const lng = location.lng;
  cretateMap(location);
}
// errors
getIP().catch((err) => {
  console.log("In catch !!!");
  console.log(err);
});

// Create map
// initialize map objecte
var map = L.map("mapid").setView([51.505, -0.09], 13);

async function cretateMap(location) {
  // set map's view to geographical coordinates and zoom level
  map.setView([location.lat, location.lng], 13);
  // add tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 15,
  }).addTo(map);

      // create marker icon
    //   var markerIcon = L.icon ({
    //     iconUrl: "images/icon-location.svg",
    //     iconSize: [46, 56], // size of the icon
    //     iconAnchor: [23, 55] // point of the icon which corresponds to marker's location
    // });

  // add location marker to map
  L.marker([location.lat, location.lng])
    .addTo(map)
    .bindPopup(location.region)
    .openPopup();
}

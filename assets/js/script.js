var apiKey = "8de20741c731f03421655e07f94c2186";
var urlLink = "api.openweathermap.org/data/2.5/weather?q=";

var searchBtn = document.querySelector(".search-btn");
var history = document.querySelector(".history");
var msgError = document.querySelector("#msg");
//https:api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=8de20741c731f03421655e07f94c2186
 var btnH = document.createElement("button");

var latitude = document.querySelector("#lat");
var longitude = document.querySelector("#lon");
// search for city when searchBtn is clicked
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var city = document.querySelector("#city-name").value;
  var history = document.querySelector(".history");
  if (city === "") {
    displayMessage("error", "cannot be left blank");
  } else {
    displayMessage("success", "");
    var btnHistory = document.createElement("button");
    btnHistory.classList.add("past-search");
    var text = document.createTextNode(city);
    btnHistory.appendChild(text);
    history.appendChild(btnHistory);
  }
});
// lets the user know the name can't be blank
function displayMessage(type, message) {
  msgError.innerHTML = message;
}

// fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=8de20741c731f03421655e07f94c2186")
// .then(res => res.json())
// // .then(data => console.log(data))
// .then(data => console.log(data.lat))

searchBtn.addEventListener("click", function () {
  var cityName = document.querySelector("#city-name").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&exclude=hourly,daily&appid=8de20741c731f03421655e07f94c2186&units=imperial&appid=8de20741c731f03421655e07f94c2186`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var weatherCondition = document.querySelector("#current-condition");
      var latitude = document.querySelector("#lat");
      var Name = document.querySelector("#name");
      var Temp = document.querySelector("#temp");
      var wind = document.querySelector("#wind");
      var Humidity = document.querySelector("#humidity");
      var icon = response.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // Name.setAttribute("src",iconUrl);
     // var tempt = document.createElement("p");
      var lat = document.createElement("p");
      //tempt.innerHTML = "tempt: " + response.main.temp;
      lat.innerHTML = response.coord.lat;
      Name.innerHTML = response.name + " " + iconUrl;

      
      Temp.innerHTML = "temp: " + response.main.temp;

      wind.innerHTML = "wind: " + response.wind.speed;

      Humidity.innerHTML ="humidity: " + response.main.humidity +" %";
      // weatherCondition.appendChild(tempt);
      
      latitude.appendChild(lat);
      // response.weather[0].id;

      // if (response.ok) {
      //   response.json().then(function (data) {
      //     var lon = data.lon;
      //     var lat = data.lat;

      //     console.log(lat);
      //     console.log(lon);
      //     // var latitude = document.querySelector("#lat");
      //     // var longitude = document.querySelector("#lon");
      //     latitude.innerHTML = lat;
      //     longitude.innerHTML = lon;
      //     console.log(longitude);
      //     console.log(latitude);
      //     console.log(latitude.innerHTML);
      //   });
      // }
      console.log(response);
      console.log(response.weather[0].id)
      console.log(response.coord.lat)
    });
});





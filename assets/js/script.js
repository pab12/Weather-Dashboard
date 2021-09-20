var apiKey = "8de20741c731f03421655e07f94c2186";
var urlLink = "api.openweathermap.org/data/2.5/weather?q=";
var cityName = document.querySelector("#city-name").value;
var searchBtn = document.querySelector(".search-btn");
var history = document.querySelector(".history");
var msgError = document.querySelector("#msg");
var dateEl = document.querySelector("#date");
//https:api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=8de20741c731f03421655e07f94c2186
var btnH = document.createElement("button");

var latitude = document.querySelector("#lat");
var longitude = document.querySelector("#lon");

var uvValue = document.querySelector("#UV-index");


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
      var longitude = document.querySelector("#lon");
      var Name = document.querySelector("#name");
      var forecastIcon = document.querySelector("#forecast-icon");
      var Temp = document.querySelector("#temp");
      var wind = document.querySelector("#wind");
      var Humidity = document.querySelector("#humidity");
      var icon = response.weather[0].icon;

      weatherCondition.removeAttribute("class", "hide");
      var iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      console.log(iconUrl);
      // Name.setAttribute("src",iconUrl);
      // var tempt = document.createElement("p");
      //var para = document.createElement("p");
      //tempt.innerHTML = "tempt: " + response.main.temp;
      // gets the latitude coordinate and empty out the div
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      //para.innerHTML="";
      latitude.innerHTML = lat;
      // para.innerHTML = lat;
      console.log(lat);
      longitude.innerHTML = lon;
      // latitude.innerHTML="";
      // latitude.appendChild(para);

      // var lon = response.coord.lon;
      // para.innerHTML = "";
      // para.innerHTML = lon;
      // longitude.innerHTML = "";
      // longitude.appendChild(para);

      //Name.innerHTML = response.name + " " + iconUrl;
      forecastIcon.innerHTML="";
      Name.innerHTML = response.name;
      
      var img = document.createElement("img");
      
      img.setAttribute("src", iconUrl);
      forecastIcon.appendChild(img);

      Temp.innerHTML = response.main.temp;

      wind.innerHTML = response.wind.speed;

      Humidity.innerHTML = response.main.humidity;
      // response.weather[0].id;
      console.log(response);
      console.log(response.weather[0].id);
      console.log(response.coord.lat);
      uvIndex();
      forecast();
    });
});

// UV index
function uvIndex() {
  var locationLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat.textContent}&lon=${lon.textContent}&appid=${apiKey}`;
  console.log(locationLink);
  fetch(locationLink)
  .then(function(data){
    return data.json();
  })
  .then(function(data){
    var UV = data.current.uvi;
    console.log(UV);
   uvValue.innerHTML =`${UV}`;
    //favorable conditions of UV index
   if(UV <= 2.99) {
     uvValue.classList.add("favorable");
     uvValue.classList.remove("moderate");
     uvValue.classList.remove("severe");
     //moderate conditions of UV index
   } else if (UV >= 3 && UV <= 5){
    uvValue.classList.remove("favorable");
    uvValue.classList.remove("severe");
    uvValue.classList.add("moderate");
    //severe conditions of UV index
  } else {
    uvValue.classList.remove("favorable");
    uvValue.classList.remove("moderate");
    uvValue.classList.add("severe");
  }
  })
};

function forecast () {
  var cityName = document.querySelector("#name").innerHTML;
  var forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8de20741c731f03421655e07f94c2186`

fetch(forecastLink)
.then(function(response){
  return response.json();
})
.then(function(response){

  var day = response.list[2].dt_txt;
  var date = new Date(response.list[10].dt_txt).toLocaleDateString();
  dateEl.innerHTML =" " + date;
console.log(day);
console.log(date);
  console.log(response);
})
};

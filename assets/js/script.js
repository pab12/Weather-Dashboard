var apiKey = "8de20741c731f03421655e07f94c2186";
// var urlLink = "api.openweathermap.org/data/2.5/weather?q=" + + apiKey;
var cityName = document.querySelector("#city-name").textContent;
var searchBtn = document.querySelector(".search-btn");
var history = document.querySelector(".history");
var msgError = document.querySelector("#msg");

var btnH = document.createElement("button");

console.log(cityName);

// search for city when searchBtn is clicked
searchBtn.addEventListener("click", function(event) {
     event.preventDefault();
    var city = document.querySelector("#city-name").value;
    var history = document.querySelector(".history");
    if(city ===""){
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
};
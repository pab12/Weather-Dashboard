var apiKey = "8de20741c731f03421655e07f94c2186";
var urlLink = "api.openweathermap.org/data/2.5/weather?q=";
var cityName = document.querySelector("#city-name").value;
var searchBtn = document.querySelector(".search-btn");
var history = document.querySelector(".history");
var msgError = document.querySelector("#msg");
var dateEl = document.querySelector("#date");
var btnH = document.createElement("button");

var latitude = document.querySelector("#lat");
var longitude = document.querySelector("#lon");

var uvValue = document.querySelector("#UV-index");

var cityDetailsMap = new Map();
var cityUvMap = new Map();
var cityForecastMap = new Map();
// search for city when searchBtn is clicked
searchBtn.addEventListener("click", function (event) {
	event.preventDefault();

	var textValue = $(this).siblings("input").val();

	localStorage.setItem("cityName", textValue);
	console.log(textValue);

	var city = document.querySelector("#city-name").value;

	if (city === "") {
		displayMessage("error", "cannot be left blank");
	} else {
		displayMessage("success", "");
	}
});

function getHistoryEvent(evt) {
	getHistory(evt.currentTarget.innerHTML);

}
function getHistory(selectCity) {
	// First fetch info
	let cityDetails = cityDetailsMap.get(selectCity);
	console.log(cityDetails);
	var Name = document.querySelector("#name");
	var forecastIcon = document.querySelector("#forecast-icon");
	var Temp = document.querySelector("#temp");
	var wind = document.querySelector("#wind");
	var Humidity = document.querySelector("#humidity");


	Temp.innerHTML = cityDetails.Temp;
	wind.innerHTML = cityDetails.wind;
	Humidity.innerHTML = cityDetails.humidity;
	Name.innerHTML = selectCity;
	forecastIcon.innerHTML = cityDetails.img;
	// Second fetch
	console.log(cityUvMap);
	let UV = cityUvMap.get(selectCity);

	uvValue.innerHTML = UV;
	setUvStyle(UV);

	// third fetch
	//console.log(cityForecastMap);
	let forecastDetails = cityForecastMap.get(selectCity);
	//console.log(forecastDetails);
	var dayOne = document.querySelector("#date-one");
	var iconOne = document.querySelector("#img-one");
	var tempOne = document.querySelector("#temp-1");
	var windOne = document.querySelector("#wind-1");
	var humidityOne = document.querySelector("#humidity-1");

	windOne.innerHTML = forecastDetails.windOne;
	tempOne.innerHTML = forecastDetails.tempOne;
	dayOne.innerHTML = forecastDetails.dateOne;
	iconOne.innerHTML = forecastDetails.iconOne;
	humidityOne.innerHTML = forecastDetails.humidityOne;

	var dayTwo = document.querySelector("#date-two")
	var iconTwo = document.querySelector("#img-two");
	var tempTwo = document.querySelector("#temp-2");
	var windTwo = document.querySelector("#wind-2");
	var humidityTwo = document.querySelector("#humidity-2");

	windTwo.innerHTML = forecastDetails.windTwo;
	tempTwo.innerHTML = forecastDetails.tempTwo;
	dayTwo.innerHTML = forecastDetails.dateTwo;
	iconTwo.innerHTML = forecastDetails.iconTwo;
	humidityTwo.innerHTML = forecastDetails.humidityTwo;

	var windThree = document.querySelector("#wind-3");
	var tempThree = document.querySelector("#temp-3");
	var dayThree = document.querySelector("#date-three");
	var iconThree = document.querySelector("#img-three");
	var humidityThree = document.querySelector("#humidity-3");

	windThree.innerHTML = forecastDetails.windThree;
	tempThree.innerHTML = forecastDetails.tempThree;
	dayThree.innerHTML = forecastDetails.dateThree;
	iconThree.innerHTML = forecastDetails.iconThree;
	humidityThree.innerHTML = forecastDetails.humidityThree;

	var dayFour = document.querySelector("#date-four")
	var iconFour = document.querySelector("#img-four");
	var tempFour = document.querySelector("#temp-4");
	var windFour = document.querySelector("#wind-4");
	var humidityFour = document.querySelector("#humidity-4");

	windFour.innerHTML = forecastDetails.windFour;
	tempFour.innerHTML = forecastDetails.tempFour;
	dayFour.innerHTML = forecastDetails.dateFour;
	iconFour.innerHTML = forecastDetails.iconFour;
	humidityFour.innerHTML = forecastDetails.humidityFour;

	var dayFive = document.querySelector("#date-five");
	var iconFive = document.querySelector("#img-five");
	var tempFive = document.querySelector("#temp-5");
	var windFive = document.querySelector("#wind-5");
	var humidityFive = document.querySelector("#humidity-5");

	windFive.innerHTML = forecastDetails.windFive;
	tempFive.innerHTML = forecastDetails.tempFive;
	dayFive.innerHTML = forecastDetails.dateFive;
	iconFive.innerHTML = forecastDetails.iconFive;
	humidityFive.innerHTML = forecastDetails.humidityFive;
}
// lets the user know the name can't be blank
function displayMessage(type, message) {
	msgError.innerHTML = message;
}


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
			var iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
			console.log(iconUrl);

			var lat = response.coord.lat;
			var lon = response.coord.lon;

			latitude.innerHTML = lat;

			console.log(lat);
			longitude.innerHTML = lon;

			forecastIcon.innerHTML = "";
			Name.innerHTML = response.name;

			var img = document.createElement("img");

			img.setAttribute("src", iconUrl);
			forecastIcon.appendChild(img);

			Temp.innerHTML = response.main.temp;

			wind.innerHTML = response.wind.speed;

			Humidity.innerHTML = response.main.humidity;

			var generalDetails = {};
			generalDetails.Temp = response.main.temp;
			generalDetails.wind = response.wind.speed;
			generalDetails.img = forecastIcon.innerHTML;
			generalDetails.humidity = response.main.humidity;
			// repeat for other attributes
			

			if (cityDetailsMap.has(response.name) === false) {
				cityDetailsMap.set(response.name, generalDetails);
			console.log(cityDetailsMap);
				var history = document.querySelector(".history");
				var btnHistory = document.createElement("button");
				btnHistory.classList.add("past-search");
				var text = document.createTextNode(response.name);
				btnHistory.appendChild(text);
				btnHistory.addEventListener("click", getHistoryEvent);
				history.appendChild(btnHistory);
				uvIndex(response.name);
				forecast();
			}
			 else{
				getHistory(response.name);
			}

		});
});

// UV index
function uvIndex(cityName) {
	var locationLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat.textContent}&lon=${lon.textContent}&appid=${apiKey}`;
	console.log(locationLink);
	fetch(locationLink)
		.then(function (data) {
			return data.json();
		})
		.then(function (data) {
			var UV = data.current.uvi;
			console.log(UV);
			cityUvMap.set(cityName, UV);
			uvValue.innerHTML = UV;
			//favorable conditions of UV index
			setUvStyle(UV);
		})
};

function setUvStyle(UV) {
	if (UV <= 2.99) {
		uvValue.classList.add("favorable");
		uvValue.classList.remove("moderate");
		uvValue.classList.remove("severe");
		//moderate conditions of UV index
	} else if (UV >= 3 && UV <= 5) {
		uvValue.classList.remove("favorable");
		uvValue.classList.remove("severe");
		uvValue.classList.add("moderate");
		//severe conditions of UV index
	} else {
		uvValue.classList.remove("favorable");
		uvValue.classList.remove("moderate");
		uvValue.classList.add("severe");
	}
}

function forecast() {
	var cityName = document.querySelector("#name").innerHTML;
	var dayOne = document.querySelector("#date-one");
	var forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=8de20741c731f03421655e07f94c2186`

	fetch(forecastLink)
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {

			var urlLink = `http://openweathermap.org/img/wn/${iconEl}@2x.png`;
			// date for current day
			var forecast = document.querySelector("#future-condition");
			var fiveDayHeader = document.querySelector("#forecast-header");
			fiveDayHeader.classList.remove("hide");
			forecast.classList.remove("hide");
			forecast.classList.add("wrap");
			var day = response.list[0].dt * 1000;
			var date = new Date(day).toLocaleDateString();
			dateEl.innerHTML = " " + date;
			console.log(day);
			console.log(date);
			console.log(response);

			// dates for the 5 day forecast 
			// The date for the first day
			var dateOne = new Date(response.list[8].dt * 1000).toLocaleDateString();
			dayOne.innerHTML = dateOne;
			// setting the img icon
			var iconOne = document.querySelector("#img-one");
			var iconEl = response.list[8].weather[0].icon;
			var urlLink = `http://openweathermap.org/img/wn/${iconEl}@2x.png`;
			var imgEl = document.createElement("img");
			imgEl.setAttribute("src", urlLink);
			iconOne.innerHTML = "";
			iconOne.appendChild(imgEl);

			// getting the values for the specific day

			// get the temp
			var tempOne = document.querySelector("#temp-1");
			var temp1 = response.list[8].main.temp;
			tempOne.innerHTML = temp1;

			// get the wind speed
			var windOne = document.querySelector("#wind-1");
			var wind1 = response.list[8].wind.speed;
			windOne.innerHTML = wind1;

			// get the humidity
			var humidityOne = document.querySelector("#humidity-1");
			var humidity1 = response.list[8].main.humidity;
			humidityOne.innerHTML = humidity1;


			// day 2
			var dayTwo = document.querySelector("#date-two")
			var dateTwo = new Date(response.list[16].dt * 1000).toLocaleDateString();
			dayTwo.innerHTML = dateTwo;

			var iconTwo = document.querySelector("#img-two");
			var icon2El = response.list[16].weather[0].icon;
			var urlLink2 = `http://openweathermap.org/img/wn/${icon2El}@2x.png`;
			var img2El = document.createElement("img");
			img2El.setAttribute("src", urlLink2);
			iconTwo.innerHTML = "";
			iconTwo.appendChild(img2El);
			// temp 2
			var tempTwo = document.querySelector("#temp-2");
			var temp2 = response.list[16].main.temp;
			tempTwo.innerHTML = temp2;
			// wind 2
			var windTwo = document.querySelector("#wind-2");
			var wind2 = response.list[16].wind.speed;
			windTwo.innerHTML = wind2;
			// humidity 2
			var humidityTwo = document.querySelector("#humidity-2");
			var humidity2 = response.list[16].main.humidity;
			humidityTwo.innerHTML = humidity2;

			// day 3

			var dayThree = document.querySelector("#date-three")
			var dateThree = new Date(response.list[24].dt * 1000).toLocaleDateString();
			dayThree.innerHTML = dateThree;

			var iconThree = document.querySelector("#img-three");
			var icon3El = response.list[24].weather[0].icon;
			var urlLink3 = `http://openweathermap.org/img/wn/${icon3El}@2x.png`;
			var img3El = document.createElement("img");
			img3El.setAttribute("src", urlLink3);
			iconThree.innerHTML = "";
			iconThree.appendChild(img3El);
			// temp 3

			var tempThree = document.querySelector("#temp-3");
			var temp3 = response.list[24].main.temp;
			tempThree.innerHTML = temp3;
			// wind 3
			var windThree = document.querySelector("#wind-3");
			var wind3 = response.list[24].wind.speed;
			windThree.innerHTML = wind3;
			// humidity 3
			var humidityThree = document.querySelector("#humidity-3");
			var humidity3 = response.list[24].main.humidity;
			humidityThree.innerHTML = humidity3;

			// day 4
			var dayFour = document.querySelector("#date-four");
			var iconFour = document.querySelector("#img-four");
			var tempFour = document.querySelector("#temp-4");
			var windFour = document.querySelector("#wind-4");
			var humidityFour = document.querySelector("#humidity-4");
			var dateFour = new Date(response.list[32].dt * 1000).toLocaleDateString();
			dayFour.innerHTML = dateFour;

			var iconFour = document.querySelector("#img-four");
			var icon4El = response.list[32].weather[0].icon;
			var urlLink4 = `http://openweathermap.org/img/wn/${icon4El}@2x.png`;
			var img4El = document.createElement("img");
			img4El.setAttribute("src", urlLink4);
			iconFour.innerHTML = "";
			iconFour.appendChild(img4El);
			// temp 4
			var tempFour = document.querySelector("#temp-4");
			var temp4 = response.list[32].main.temp;
			tempFour.innerHTML = temp4;
			// wind 4
			var windFour = document.querySelector("#wind-4");
			var wind4 = response.list[32].wind.speed;
			windFour.innerHTML = wind4;
			// humidity 4
			var humidityFour = document.querySelector("#humidity-4");
			var humidity4 = response.list[32].main.humidity;
			humidityFour.innerHTML = humidity4;

			// day 5
			var dayFive = document.querySelector("#date-five");
			var dateFive = new Date(response.list[39].dt_txt).toLocaleDateString();
			dayFive.innerHTML = dateFive;

			var iconFive = document.querySelector("#img-five");
			var icon5El = response.list[39].weather[0].icon;
			var urlLink5 = `http://openweathermap.org/img/wn/${icon5El}@2x.png`;
			var img5El = document.createElement("img");
			img5El.setAttribute("src", urlLink5);
			iconFive.innerHTML = "";
			iconFive.appendChild(img5El);
			// temp 5
			var tempFive = document.querySelector("#temp-5");
			var temp5 = response.list[39].main.temp;
			tempFive.innerHTML = temp5;
			// wind 5
			var windFive = document.querySelector("#wind-5");
			var wind5 = response.list[39].wind.speed;
			windFive.innerHTML = wind5;
			// humidity 5
			var humidityFive = document.querySelector("#humidity-5");
			var humidity5 = response.list[39].main.humidity;
			humidityFive.innerHTML = humidity5;

			// build map
			var forecastDetails = {};
			forecastDetails.dateOne = dateOne;
			forecastDetails.dateTwo = dateTwo;
			forecastDetails.dateThree = dateThree;
			forecastDetails.dateFour = dateFour;
			forecastDetails.dateFive = dateFive;

			forecastDetails.tempOne = temp1;
			forecastDetails.tempTwo = temp2;
			forecastDetails.tempThree = temp3;
			forecastDetails.tempFour = temp4;
			forecastDetails.tempFive = temp5;

			forecastDetails.humidityOne = humidity1;
			forecastDetails.humidityTwo = humidity2;
			forecastDetails.humidityThree = humidity3;
			forecastDetails.humidityFour = humidity4;
			forecastDetails.humidityFive = humidity5;

			forecastDetails.windOne = wind1;
			forecastDetails.windTwo = wind2;
			forecastDetails.windThree = wind3;
			forecastDetails.windFour = wind4;
			forecastDetails.windFive = wind5;

			forecastDetails.iconOne = iconOne.innerHTML;
			forecastDetails.iconTwo = iconTwo.innerHTML;
			forecastDetails.iconThree = iconThree.innerHTML;
			forecastDetails.iconFour = iconFour.innerHTML;
			forecastDetails.iconFive = iconFive.innerHTML;
			cityForecastMap.set(cityName, forecastDetails);
		})
};

function saveCity() {
	var cityValue = $
}
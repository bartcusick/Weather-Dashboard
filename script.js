var city = "";
var cityText = $("#cityText");
var searchBtn = $("#searchBtn");
// var clearButton = $('#clear-history');
var chosenCity = $("#chosenCity");
var temp1 = $("#temp");
var humid1 = $("#humid");
var windS1 = $("#windS");
var uvIndex1 = $("#uvIndex");

var APIKey = "71ca48a145c1e2fcc01d2affe81d6050";
// Function for the search button. Then calls todaysWeather function loading Api info
function getWeather(event) {
  event.preventDefault();
  if (cityText.val().trim() !== "") {
    city = cityText.val().trim();
    todaysWeather(city);
  }
}
// Load Api info and weather icon images into the main weather text box and saving City name into local storage.
function todaysWeather(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // get the icon info from the API based upon the current weather
    var weatherIcon = response.weather[0].icon;
    //and then create a variable to load the url for the correct weather icon image
    var iconurl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    var date = new Date(response.dt * 1000).toLocaleDateString();
    $(chosenCity).html(
      response.name + "(" + date + ")" + "<img src=" + iconurl + ">"
    );

    var temp = (response.main.temp - 273.15) * 1.8 + 32;
    $(temp1).html(temp.toFixed(0) + "&#8457");
    $(humid1).html(response.main.humidity + "%");
    var ws = response.wind.speed;
    var wind = (ws * 2.237).toFixed(0);
    $(windS1).html(wind + "MPH");
    uVIndex(response.coord.lon, response.coord.lat);
    
    if (response.cod == 200) {
      cityS = JSON.parse(localStorage.getItem("cityname"));
      if (cityS == null) {
        cityS = [];
        cityS.push(city.toUpperCase());
        localStorage.setItem("cityname", JSON.stringify(cityS));
        addToList(city);
      } else {
        if (find(city) > 0) {
          cityS.push(city.toUpperCase());
          localStorage.setItem("cityname", JSON.stringify(cityS));
          addToList(city);
        }
      }
    }
  });
}
// Function that loads the Uv index
function uVIndex(ln, lt) {
  var uvqURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lt + "&lon=" + ln;
  $.ajax({
    url: uvqURL,
    method: "GET",
  }).then(function (response) {
    $(uvIndex).html(response.value);
  });
}

$("#searchBtn").on("click", getWeather);

// Function That loads the five day forcast into the smaller text boxes.
function fDF(cityId){
var queryforcastURL= "https://api.openweathermap.org/data/2.5/forcast?id=" + cityId + "&appid=" + APIKey;
$.ajax({
    url: queryforcastURL,
    method: "GET",
  }).then(function (response){
    for (i=0; i < 5; i++){
        var date = new Date(
            response.list[(i=1) * 8 - 1].dt * 1000
        )
        .toLocaleDateString();
        var iconCode = response.list[(i=1) * 8 - 1].dt * 1000
        var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
        var temp2 = response.list[(i=1) * 8 - 1].main.temp;
        var temp3 = ((temp2 - 273.5) * 1.8 + 32).toFixed(0);
        var humid2 = response.list[(i=1) * 8 - 1].main.humidity;
        //load the five day forcast info into the text box
        $("#fDF" + i).html(date);
        $("#fDFImg" + i).html("<img src=" + iconurl + ">");
        $("#fDFTemp" + i).html(temp3 + "&#8457");
        $("#fDFHumid" + i).html(humid2 + "%");
    }
 });
}

// Function that loads the last city stored into local storage.

// Function that adds the searched city name to the button list of searched cities.

// Function that makes the buttons on the list of searched cities display the correct city selected.

var city = '';
var cityText = $('#cityText');
var searchBtn = $('#searchBtn');
// var clearButton = $('#clear-history');
var chosenCity = $('#chosenCity');
var temp1 = $('#temp');
var humid1 = $('#humid');
var windS1 = $('#windS');
var uvIndex1 = $('#uvIndex');
var Cities = [];

function find(location) {
  for (var i = 0; i < cityS.length; i++) {
    if (location.toUpperCase() === cityS[i]) {
      return -1;
    }
  }
  return 1;
}

var APIKey = '71ca48a145c1e2fcc01d2affe81d6050';

function getWeather(event) {
  event.preventDefault();
  if (cityText.val().trim() !== '') {
    city = cityText.val().trim();
    todaysWeather(city);
    console.log(city);
  }
}
function todaysWeather(city) {
  var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + APIKey;

  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function (response) {
    var weatherIcon = response.weather[0].icon;
    var iconurl = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
    var date = new Date(response.dt * 1000).toLocaleDateString();
    console.log(date);
    console.log(weathericon);
    
    $(chosenCity).html(
      response.name + '(' + date + ')' + '<img src=' + iconurl + '>'
    );

    var temp = (response.main.temp - 273.15) * 1.8 + 32;
    $(temp1).html(temp.toFixed(0) + '&#8457');
    $(humid1).html(response.main.humidity + '%');
    var ws = response.wind.speed;
    var wind = (ws * 2.237).toFixed(0);
    $(windS1).html(wind + 'MPH');
    uVIndex(response.coord.lon, response.coord.lat);
    if (response.cod == 200) {
      cityS = JSON.parse(localStorage.getItem('cityname'));
      if (cityS == null) {
        cityS = [];
        cityS.push(city.toUpperCase());
        localStorage.setItem('cityname', JSON.stringify(cityS));
        addToList(city);
      } else {
        if (find(city) > 0) {
          cityS.push(city.toUpperCase());
          localStorage.setItem('cityname', JSON.stringify(cityS));
          addToList(city);
        }
      }
    }
  });
}
function uVIndex(ln, lt) {
  var uvqURL =
    'https://api.openweathermap.org/data/2.5/uvi?appid=' +
    APIKey +
    '&lat=' +
    lt +
    '&lon=' +
    ln;
  $.ajax({
    url: uvqURL,
    method: 'GET',
  }).then(function (response) {
    $(uvIndex).html(response.value);
  });
}

$('#searchBtn').on('click', getWeather);


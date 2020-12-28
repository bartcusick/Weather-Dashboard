// Var List
var searchBtn = $('#searchBtn');

var APIKey = "bc059032e6c0f802b49ebf491a27041a";

// Get Weather api info
function getWeather(lat, lon) {
	var queryURL =
		"https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=" + // { part } +
		"&appid=" +
		APIKey;
	$.ajax({
		url: queryURL,
		method: "GET",
	}).then(function (response) {
		console.log("queryURL:", queryURL);
		var iconID = response.current.weather[0].id;
		var iconCode = response.current.weather[0].icon;
		var iconURL= 'http://openweathermap.org/img/w/' + iconCode + '.png';
		var weatherAltTag = response.current.weather[0].main;

		console.log('iconURL:', iconURL)

		
		$("#weather").html('<span class=weatherBtn1text>' + weatherAltTag + ' </span>' + '<span class=weatherBtnIcon><img id = weatherIcon" src=' + iconURL + ' alt="' + weatherAltTag + '" height=20px width=20px></span>' );

		$("#uvi").html("UVI: " + response.current.uvi);
		$("#temp").html(response.current.temp + "°");
		$("#humidity").html("Humidity: " + response.current.humidity + "%");
	});
}

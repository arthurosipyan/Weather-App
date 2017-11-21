$(document).ready(function() {
  var api = "https://fcc-weather-api.glitch.me/api/current?lat=";
  var lon, lat;
  var currentTemp, fahrenheit, celcius;
  var tempUnit;
  var icon, condition;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = "&lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  }

  function convertToCelcius(f) {
    var farh = (Math.round(parseInt(((5 / 9) * (f - 32)))));
    return (farh);
  }

  function convertToFahrenheit(c) {
    var cel = (Math.round(parseInt(((9 / 5) * c)) + 32));
    return (cel);
  }

  function getWeather(lat, lon) {
    var urlString = api + lat + lon;
    $.ajax({
      url: urlString,
      success: function(response) {
        fahrenheit = convertToFahrenheit(parseInt(response.main.temp));
        celcius = convertToCelcius(fahrenheit);
        icon = response.weather[0].icon;
        tempUnit = "F";
        currentTemp = fahrenheit + String.fromCharCode(176) + tempUnit;
        condition = (response.weather[0].description.toUpperCase());
        $("#location").text("Weather @ " + response.name + ", " + response.sys.country);
        $("#temp").html(condition + " " + currentTemp);
        $("img").attr({
          src: icon,
        });
      }
    });
  }

  $("#btn").on("click", function() {
    if (tempUnit === "F") {
      tempUnit = "C";
      $("#temp").html(condition + " " + celcius + String.fromCharCode(176) + tempUnit);
    } else {
      tempUnit = "F";
      $("#temp").html(condition + " " + fahrenheit + String.fromCharCode(176) + tempUnit);
    }
  });
});

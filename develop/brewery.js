var autoKey = "b1b92e789ec6ed213bedfaec1a833a6c";

var weatherKey = "3fef80c9e928a329e2b89a8041b3fe71";

// localStorage
var city = JSON.parse(localStorage.getItem("city")) || [];

queryTerm = "" || city[0];
brewery(queryTerm);

function loadCities() {
  $("#lastCities").empty();
  for (var i = 0; i < city.length; i++) {
    var cityNewDiv = $("<button class= 'load'>");
    cityNewDiv.text(city[i]);
    $("#lastCities").append(cityNewDiv);
  }
}
loadCities();

$(document).on("click", ".load", function() {
  console.log("you click me");
  var cityInput = $(this).text();
  console.log($(this));
  console.log(cityInput);

  brewery(cityInput);
});

function brewery() {
  var queryURL = "https://beermapping.com/webservice/loccity/";

  console.log(queryURL);
}
console.log(brewery());

function getSearch() {
  // e.preventDefault();
  var cityS = $("#input");

  var weatherURL = "https://api.openweathermap.org/data/2.5/weather?";
  var weatherIconBase = `http://openweathermap.org/img/wn/`;

  $.ajax({
    url: `${weatherURL}q=${cityS.val()}&appid=${weatherKey}`,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#weather-display").empty();
    // creating the weather card
    var weatherCard = $(`<div class="card">
<div class="card-body">
<h5 class="card-title">Weather</h5>
<p class="card-text">Weather information</p>
</div>
</div>`);
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    var feelsTemp = (response.main.feels_like - 273.15) * 1.8 + 32;
    var infoBlock = `
      <span><h3>${response.name}</h3></span>
      <img src="${weatherIconBase}${response.weather[0].icon}@2x.png"
    </div>
    <div id='display-details'><h4>
    Temperature: ${tempF.toFixed(2)}<br>
    Feels like: ${feelsTemp.toFixed(2)}<br>
    Humidity: ${response.main.humidity}%<br>
    Wind Speed: ${response.wind.speed}mph <br></h4></div>
    
  `;
    //puts the weather block on the page
    weatherCard.append("#weather-display");
    $("#weather-display").prepend(infoBlock);
  });
}

$("#btn").on("click", function(e) {
  e.preventDefault();
  console.log("you click me");
  var cityDiv = $("<div>");
  var cityInput = $("#input")
    .val()
    .trim();

  cityDiv.text(cityInput);
  city.unshift(cityInput);
  localStorage.setItem("city", JSON.stringify(city));

  loadCities();
  brewery(cityInput);
  getSearch();
  $("#input").val("");
});

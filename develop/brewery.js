//global variables
var autoKey = "b1b92e789ec6ed213bedfaec1a833a6c";
var weatherKey = "3fef80c9e928a329e2b89a8041b3fe71";
var numbResults = [];

// base url for the brewery
var queryURLBase = "https://beermapping.com/webservice/loccity/" + autoKey;
console.log(queryURLBase);

//weather URL
var queryWeather =
  "https://api.openweathermap.org/data/2.5/weather?" +
  city +
  "&appid=" +
  weatherKey;

//local storage variables
var city = JSON.parse(localStorage.getItem("city")) || [];
var cityS = $("#input") || city[0];

//functions
//puts local storage buttons onto page
function loadCities() {
  $("#lastCities").empty();
  for (var i = 0; i < city.length; i++) {
    var cityNewDiv = $("<button class= 'btn btn-dark load'>");
    cityNewDiv.text(city[i]);
    $("#lastCities").append(cityNewDiv);
  }
}
loadCities();

$(document).on("click", ".load", function () {
  console.log("you click me");
  var cityInput = $(this).text();
  getSearch(cityInput);
});

// base url for the brewery
var queryURLBase = "https://beermapping.com/webservice/loccity/" + autoKey;

var queryWeather =
  "https://api.openweathermap.org/data/2.5/weather?" +
  city +
  "&appid=" +
  weatherKey;

function getSearch(cityName) {
  var weatherURL = "https://api.openweathermap.org/data/2.5/weather?";
  var weatherIconBase = `http://openweathermap.org/img/wn/`;

  $.ajax({
    url: `${weatherURL}q=${cityName}&appid=${weatherKey}`,
    method: "GET"
  }).then(function (response) {
    $("#weather-display").empty();

    // creating the weather card
    var weatherCard = $(`
       <div class="card card-body border">
       <h5 class="card-title">Weather</h5>
       <p class="card-text">Weather information</p>
       </div>`);
    //variables set temperature to F
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    var feelsTemp = (response.main.feels_like - 273.15) * 1.8 + 32;
    //dynamically creating card for weather
    var infoBlock = `
      <span><h3>${response.name}</h3></span>
      <img src="${weatherIconBase}${response.weather[0].icon}@2x.png"
    </div>
    <div id='display-details'><h4>
    Temperature: ${tempF.toFixed(2)}<br>
    Feels like: ${feelsTemp.toFixed(2)}<br>
    Humidity: ${response.main.humidity}%<br>
    Wind Speed: ${response.wind.speed}mph <br></h4></div>`;

    //puts the weather block on the page
    weatherCard.append("#weather-display");
    $("#weather-display").prepend(infoBlock);
  });

  // ajax call for brewery
  $.ajax({
    url: `${queryURLBase}/${cityName}&s=json`,
    method: "GET"
  }).then(function (response) {
    var newResults = $("#numRecords").val() || numbResults;
    console.log(newResults);

    //creates for loop for brewery results and appends each onto the page in collapse card format
    $("#brewery-display").empty();
    numbResults = response[i];
    for (var i = 0; i < newResults; i++) {
      var newCard = $(` <div class="card">
      <div class="card-body" >
        <a class="btn btn-dark" data-toggle="collapse" href="#brewery-collapse" role="button" aria-expanded="false" aria-controls="brewery-collapse"><h5 class="card-title">${response[i].name}</h5></a>
          <div class="collapse" id="brewery-collapse">
            <div id = "response-list">
       <p class="card-text">
       <p> ${response[i].status} </p>
       <p> ${response[i].street} </p>
       <p> ${response[i].city} , ${response[i].state}</p>
       <p> ${response[i].zip} </p>
       <p> ${response[i].phone} </p>
       <a href="https://${response[i].url}" target= "blank">${response[i].url}</a>
       </p>
   </div>
</div>`);
      //appends brewery info on page
      $("#brewery-display").append(newCard);
    }
  });
}

$("#btn").on("click", function (e) {
  e.preventDefault();

  var cityInput = cityS.val().trim();

  if (cityInput) {
    var cityDiv = $("<div>");
    cityDiv.text(cityInput);
    if (city.indexOf(cityInput) === -1) {
      city.unshift(cityInput);
      localStorage.setItem("city", JSON.stringify(city));
    }
    getSearch(cityInput);
    loadCities();
    cityS.val("");
  }
});
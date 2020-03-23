var autoKey = "b1b92e789ec6ed213bedfaec1a833a6c";

var weatherKey = "3fef80c9e928a329e2b89a8041b3fe71";
var numbResults = 0;
var newResults = $("#numRecords").val();
console.log(newResults);
// localStorage
var city = JSON.parse(localStorage.getItem("city")) || [];
var cityS = $("#input") || city[0];

function loadCities() {
  $("#lastCities").empty();
  for (var i = 0; i < city.length; i++) {
    var cityNewDiv = $("<button class= 'load'>");
    cityNewDiv.text(city[i]);
    $("#lastCities").append(cityNewDiv);
  }
}
loadCities();

// making the btn that crates the localstorage work. or at least trying
// when you click the btn it console log the name of the btn not the info
$(document).on("click", ".load", function(e) {
  console.log("you click me");
  var cityInput = $(this).text();
  console.log($(this));
  console.log(cityInput);
  // getSearch(cityInput);
});

// base url for the brewery
var queryURLBase = "https://beermapping.com/webservice/loccity/" + autoKey;
console.log(queryURLBase);

var queryWeather =
  "https://api.openweathermap.org/data/2.5/weather?" +
  city +
  "&appid=" +
  weatherKey;

function getSearch() {
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
    Wind Speed: ${response.wind.speed}mph <br></h4></div>`;

    //puts the weather block on the page
    weatherCard.append("#weather-display");
    $("#weather-display").prepend(infoBlock);
  });

  // ajax call for brewery
  $.ajax({
    url: `${queryURLBase}/${cityS.val()}&s=json`,
    method: "GET"
  }).then(function(response) {
    console.log(response[length]);
    $("#brewery-display").empty();

    for (var i = 0; i < newResults; i++) {
      for (var i = 0; i < response.length; i++) {
        var newCard = $(` <div class="card">
<div class="card-body" >
       <h5 class="card-title">${response[0].name}</h5>
       <p class="card-text">
       <p> ${response[i].status} </p>
       <p> ${response[i].street} </p>
       <p> ${response[i].city} </p>
       <p> ${response[i].state} </p>
       <p> ${response[i].zip} </p>
       <p> ${response[i].phone} </p>
       <p> ${response[i].url} </p>
       
       </p>
   </div>
</div>`);
        $("#brewery-display").append(newCard);
      }
    }
  });
}

$("#btn").on("click", function(e) {
  e.preventDefault();
  console.log("you click me");
  var cityDiv = $("<div>");
  var cityInput = cityS.val().trim();

  cityDiv.text(cityInput);
  city.unshift(cityInput);
  localStorage.setItem("city", JSON.stringify(city));

  loadCities(getSearch(cityInput));

  cityS.val("");

  var newURL = queryURLBase + "&s=json" + cityS;
  console.log(newURL);
  var newResults = $("#numRecords").val();
  console.log(newResults);

  // getSearch(numbResults, newURL);
});

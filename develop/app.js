var autoKey = "2526bdb078c64052edacba2a56ac385d";
var queryURLBase =
  "https://sandbox-api.brewerydb.com/v2/locations/?key=" + autoKey;
console.log(queryURLBase);

//global variables
//create search button with user input
$("#searchBtn").on("click", function(e) {
  e.preventDefault();

  console.log("you click me");
});

$("#clearAll").on("click", function(e) {
  e.preventDefault();

  console.log("you click me");
});
//take input and stringify
//create section to write information pulled from keys

//functions

var queryTerm = " ";
var weatherKey = "3fef80c9e928a329e2b89a8041b3fe71";
var weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  queryTerm +
  "&appid=" +
  weatherKey;

console.log(weatherURL);

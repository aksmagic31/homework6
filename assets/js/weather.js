
// api key
const apiKey =  "fefbb26b20c8d2762255de0b2fb600e9"

// these are global variables
// latitutde 
let lat;

// longitude 
let lon;

// display results
let temp = 0
let humidity;
let wind;
let uv;
let condition = "";

// some DOM element
var searchKey = document.getElementById('searchInput')
var citySearched = document.getElementById('citySearched');



// api call variables
const geoCall = "https://api.openweathermap.org/geo/1.0/direct"
const weatherCall = "https://api.openweathermap.org/data/2.5/onecall"

// populate DOM element

// function to get the lat and long
function getLocation(city) {
    fetch(geoCall + `?q=${encodeURI(city)}&appid=${apiKey}`) 
    .then (function (response) {
    return response.json();
    })
    .then (function (data) {
        console.log(data);
        
        lat =  data[0].lat
            console.log(lat)
        lon = data[0].lon
            console.log(lon)
        
        // Call Function with Lat and Lon
        getWeather(lat, lon)

        // Display City on Page
        citySearched.textContent = city;
    })
}

function getWeather(lat,lon) {
    fetch(apiCall + `?lat=` + lats + `&lon=` + lons + `&appid=${apiKey}`) 
        .then (function (response) {
        return response.json();
            })
.       then (function (data) {
        console.log(data);
    
    temp = data.current.temp;

    humidity = data.current.humidity;

    wind = data.current.wind_speed;

    uv = data.current.
    
    
    }

    // assign values to weather varibles

    


}
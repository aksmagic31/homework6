
// api key
const apiKey =  "fefbb26b20c8d2762255de0b2fb600e9"

// these are global variables
// latitutde 
let lat;

// longitude 
let lon;

let today = new Date ();
//getHours() -- current hour between 0-23
let hour = today.getHours();
//getMinutes() -- current minutes between 0-59
let minute = today.getMinutes()
let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// display results
let temp;
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

getLocation("irvine");

// good 
function getWeather(lats, lons) {
	fetch(weatherCall + `?lat=` + lats + `&lon=` + lons + `&appid=${apiKey}`)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
        console.log(data);
    
    // assign values to weather varibles
    temp = data.current.temp;
     console.log(temp);
    
     // convert temp from K to F
    var Ftemp = (temp - 273.15) * 1.8 + 32;
    console.log(Ftemp);

     humidity = data.current.humidity;
    console.log(humidity);

    wind = data.current.wind_speed;
    console.log(wind);

    uv = data.current.uvi;
    console.log(uv);
    
    var weatherScore = data.current.weather[0].icon;
	var iconScore = `http://openweathermap.org/img/wn/${weatherScore}@2x.png`;
    })
}

getWeather(34,-118);
  

    



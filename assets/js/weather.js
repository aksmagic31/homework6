
// api key
const apiKey = "fefbb26b20c8d2762255de0b2fb600e9"

// these are global variables
// latitutde 
let lat;

// longitude 
let lon;

let today = new Date();

// display results
let temp;
let humidity;
let wind;
let uv;
let condition = "";


// main DOM element
let citySearched = document.getElementById('citySearched');
let displayDate = document.getElementById('today');
let displayIcon = document.getElementById('weatherIcon');
let displayTemp = document.getElementById('temp');
let displayHumid = document.getElementById('humid');
let displayWind = document.getElementById('windSpeed');
let displayUv = document.getElementById('uvIndex');
let searchKey = document.getElementById('searchInput');

// future 5 days DOM element
// let fiveDisplayIcon = document.getElementById('fiveweatherIcon');
// let fiveDisplayTemp = document.getElementById('fivetemp');
// let fiveDisplayHumid = document.getElementById('fivehumid');
// let fiveDisplayWind = document.getElementById('fivewindSpeed');
// let fiveDisplayUv = document.getElementById('fiveuvIndex');

// api call variables
const geoCall = "https://api.openweathermap.org/geo/1.0/direct"
const weatherCall = "https://api.openweathermap.org/data/2.5/onecall"

// populate DOM element
getToday = today;
// function to get the lat and long
function getLocation(city) {
    fetch(geoCall + `?q=${encodeURI(city)}&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            lat = data[0].lat
            console.log(lat)
            lon = data[0].lon
            console.log(lon)

            // Call Function with Lat and Lon
            getWeather(lat, lon)

            // Display City on the page
            citySearched.textContent = city;
        })
}

getLocation("irvine");

// function to get Weather using the lat and lon found in previous function
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
            
            // displayDate.textContent = `${today}`;
            // convert temp from K to F
            var Ftemp = (temp - 273.15) * 1.8 + 32;
            // console.log(Ftemp);

            displayTemp.textContent = `${Ftemp} °`;
            humidity = data.current.humidity;
            // console.log(humidity);

            displayHumid.textContent = `Hum | ${humidity} %`;

            wind = data.current.wind_speed;
            // console.log(wind);
            displayWind.textContent = `Wind | ${wind}`

            uv = data.current.uvi;
            // console.log(uv);
            displayUv.textContent = `UV | ${uv} %`;

            // display icon

            var weatherScore = data.current.weather[0].icon;
            displayIcon.src = `http://openweathermap.org/img/wn/${weatherScore}@4x.png`

            let output = '';
// loop through the data to get the weather data for the 5 day period
            for (var i = 1; i < 6; i++) {

                var fiveDateUTCScore = data.daily[i].dt;
                
				// convert UNIX, UTC to a Date
				var fiveDateUTCScoreMili = fiveDateUTCScore * 1000;
				
				var dateObject3 = new Date(fiveDateUTCScoreMili);
				var fiveDays = dateObject3.toLocaleDateString();
                var fiveIcon = data.daily[i].weather[0].icon;
                // var fiveIcon = `http://openweathermap.org/img/wn/${fiveWeather}@2x.png`;


                var fiveTemp = data.daily[i].temp.day;


                var fiveFtemp = (fiveTemp - 273.15) * 1.8 + 32;

                var fiveHumid = data.daily[i].humidity;


                var fiveWind = data.daily[i].wind_speed;

                var fiveUV = data.daily[i].uvi;

     // output the cards for the 5 Day Forecasts


                output += /*html*/ `
                <div class="eachCard">
                    <div class="flex">
                        <img class="dailyWeatherIcon"  src= "http://openweathermap.org/img/wn/${fiveIcon}@4x.png"alt= "Weather Icon">
                        <div class="dailyDt">${fiveDays}</div>
                        <div class="dailyTemp">${fiveFtemp}°</div>
                        <div class="dailyHumid">${fiveHumid}</div>
                        <div class="dailyWind">${fiveWind}</div>
                        <div class="dailyUV">${fiveUV}</div>
                    </div>
                </div>
            `;
            }
            $('#dailyForecast').html(output);
        })
    }
        
                // displayForcast(fiveDays, fiveIcon, fiveFtemp, fiveHumid,fiveWind, fiveUV);
                

// for some reason cannot do function here...

// function displayForcast(fiveDays,fiveIcon,fiveFtemp,fiveHumid,fiveWind,fiveUV) {
// 	// Create Each Day's Weather Info
//     console.log(fiveFtemp);

//     let output = '';

//         output += /*html*/ `
//         <div class="eachCard">
//             <div class="flex">
//                 <img class="dailyWeatherIcon"  src= "http://openweathermap.org/img/wn/${fiveIcon}@4x.png"alt= "Weather Icon">
//                 <div class="dailyDt">${fiveDays}</div>
//                 <div class="dailyTemp">${fiveFtemp}°</div>
//                 <div class="dailyHumid">${fiveHumid}</div>
//                 <div class="dailyWind">${fiveWind}</div>
//                 <div class="dailyUV">${fiveUV}</div>
//             </div>
//         </div>
//     `;
    
//     $('#dailyForecast').html(output);
// }




getWeather(34, -118);
// add eventlistener function
searchKey.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        citySearching = document.getElementById('searchInput').value.trim();
        getLocation(citySearching);

    }
});



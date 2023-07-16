let cityInput = document.querySelector('#city-input');
let cityName = document.querySelector('.city-name');
let weatherImg = document.querySelector("#weather-img");
let temp = document.querySelector('.temp');
let feelsLike = document.querySelector('#feels-like');
let weatherMode = document.querySelector('.weather-mode');
let precipitation = document.querySelector('#precipitation');
let humidity = document.querySelector('#humidity');
let wind = document.querySelector('#wind');
let submitBtn = document.querySelector('#submitBtn');
let timeDiv = document.querySelector('#time');
let timeStamp 
let d = new Date();
let hour = d.getHours();
// let getHour = 1000 * 60 * 60;
// let hour = time / getHour
// console.log('time: ', hour);



navigator.geolocation.getCurrentPosition((location)=> {
    console.log('location: ', location);
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    // timeStamp = location.timestamp;
    // console.log('timeStamp: ', new Date(timeStamp));

    getweather(lat, lon)

})

let getweather = (lat, lon)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8f319653e299b23b8910d5b21681dfab&units=metric`)
    .then(res=> res.json())
    .then(data => showData(data))
    .catch(err=> console.log(err))
}

cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitBtn.click();
    }
  });

let getWeatherbyUser = ()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=8f319653e299b23b8910d5b21681dfab&units=metric`)
    .then(res=> res.json())
    .then(data => showData(data))
    .catch(err=> console.log(err))
}

let showData = (data)=>{
    console.log (data)
    cityName.innerHTML = data.name + ", " + data.sys.country;
    temp.innerHTML = Math.round(data.main.temp) + "℃"
    feelsLike.innerHTML = Math.round(data.main.feels_like) + "℃"
    weatherMode.innerHTML = data.weather[0].main
    humidity.innerHTML = data.main.humidity + "%"
    wind.innerHTML = data.wind.speed + " km/h"
    timeDiv.innerHTML  = d;

    let mode = data.weather[0].main;

    
    if(mode = "clear"){
        console.log(hour)
        if(hour>18 || hour<6 ){
            weatherImg.src = "./images/clear-night.svg"
        }else{
            weatherImg.src = "./images/clear-day.svg"
        }
    }
}

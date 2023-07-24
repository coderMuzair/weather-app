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





// navigator.geolocation.getCurrentPosition((location)=> {
//     console.log('location: ', location);
//     let lat = location.coords.latitude;
//     let lon = location.coords.longitude;
//     // timeStamp = location.timestamp;
//     // console.log('timeStamp: ', new Date(timeStamp));

//     getweather(lat, lon)

// })

let getweather = ()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=4a3d866759f5c6c9a0a99313c6f40ef9&units=metric`)
    .then(res=> res.json())
    .then(data => showData(data))
    .catch(err=> console.log(err))
    console.log("get weather")
}
getweather()

cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitBtn.click();
    }
  });

let getWeatherbyUser = ()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=4a3d866759f5c6c9a0a99313c6f40ef9&units=metric`)
    .then(res=> res.json())
    .then(data => showData(data))
    .catch(err=(err)=> {
        Swal.fire({
            icon: 'error',
            title: 'City Not Found!',
          })
          console.log(err)
    })
}

let showData = (data)=>{
 
    weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    cityName.innerHTML = data.name + ", " + data.sys.country;
    temp.innerHTML = Math.round(data.main.temp) + "℃"
    feelsLike.innerHTML = Math.round(data.main.feels_like) + "℃"
    weatherMode.innerHTML = data.weather[0].main
    humidity.innerHTML = data.main.humidity + "%"
    wind.innerHTML = Math.round((data.wind.speed)*3.6) + " km/h"
  
}

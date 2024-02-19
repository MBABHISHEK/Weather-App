let cityInput = document.querySelector('.container .input-box input');
let searchBtn = document.querySelector('.container .input-box button');
let weather_img = document.querySelector('.container .weather-img img');
let temp = document.querySelector('.container .temp');
let weatherDescrip = document.querySelector('.container .weather_descrip');
let humidity = document.querySelector('.container .other .humidity-value');
let windspeed = document.querySelector('.container .wind-speed .windspeed-value');

searchBtn.addEventListener('click', () => {
    if (cityInput.value != '') {
        getWeatherInfo();
    }
});

let getWeatherInfo = () => {
    let city = cityInput.value;
    let apiKey = 'a8c1d2697dd49736798e025886e20064';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            weather_img.src = `https://api.openweathermap.org/img/w/${data.weather[0].icon}.png`;
            temp.innerHTML = `${data.main.temp}&#176;`;
            weatherDescrip.innerHTML = data.weather[0].description;
            windspeed.innerHTML = `${data.wind.speed} Km/H`;
            humidity.innerHTML = `${data.main.humidity}%`;

            // Adding voice output
            speakWeatherInfo(data);
        });
}

let speakWeatherInfo = (data) => {
    let message = `The weather in ${data.name} is ${data.weather[0].description}. 
    The temperature is ${data.main.temp} degrees Celsius. 
    The humidity is ${data.main.humidity} percent. 
    The wind speed is ${data.wind.speed} kilometers per hour.`;

    let speech = new SpeechSynthesisUtterance(message);
    speech.lang = 'en-US';
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    speechSynthesis.speak(speech);
}

getWeatherInfo();

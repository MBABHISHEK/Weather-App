let languageSelect = document.getElementById("language-select");
let cityInput = document.querySelector(".container .input-box input");
let searchBtn = document.querySelector(".container .input-box button");
let weather_img = document.querySelector(".container .weather-img img");
let temp = document.querySelector(".container .temp");
let weatherDescrip = document.querySelector(".container .weather_descrip");
let humidity = document.querySelector(".container .other .humidity-value");
let windspeed = document.querySelector(
  ".container .wind-speed .windspeed-value"
);
searchBtn.addEventListener("click", () => {
  if (cityInput.value != "") {
    getWeatherInfo();
  }
});

let getWeatherInfo = () => {
  let city = cityInput.value;
  let apiKey = "a8c1d2697dd49736798e025886e20064";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      weather_img.src = `https://api.openweathermap.org/img/w/${data.weather[0].icon}.png`;
      temp.innerHTML = `${data.main.temp}&#176;`;
      weatherDescrip.innerHTML = data.weather[0].description;
      windspeed.innerHTML = `${data.wind.speed} Km/H`;
      humidity.innerHTML = `${data.main.humidity}%`;

      // Adding voice output
      speakWeatherInfo(data);
    });
};

let speakWeatherInfo = (data) => {
  let languageCode = languageSelect.value;
  let message = `The weather in ${data.name} is ${data.weather[0].description}. 
    The temperature is ${data.main.temp} degrees Celsius. 
    The humidity is ${data.main.humidity} percent. 
    The wind speed is ${data.wind.speed} kilometers per hour.`;

  if (languageCode === "kn") {
    // Translate to Kannada
    message = `ಪಟ್ಟಣ ${data.name} ಯಲ್ಲಿ ${data.weather[0].description} ಆಗಿದೆ.
      ತಾಪಮಾನ ${data.main.temp} ಡಿಗ್ರಿ ಸೆಲ್ಸಿಯಸ್ ಆಗಿದೆ.
      ಆರೆವಾರ ${data.main.humidity} ಶಾತಾವಾರದಷ್ಟು ಇದೆ.
      ಗಾಳಿ ವೇಗ ${data.wind.speed} ಕಿಲೋಮೀಟರ್ಗಳಲ್ಲಿ ಇದೆ.`;
  } else if (languageCode === "hi") {
    // Translate to Hindi
    message = `शहर ${data.name} में मौसम ${data.weather[0].description} है।
      तापमान ${data.main.humidity} डिग्री सेल्सियस है।
      आर्द्रता ${data.main.humidity} प्रतिशत है।
      हवा की गति ${data.wind.speed} किलोमीटर प्रति घंटा है।`;
  }

  let speech = new SpeechSynthesisUtterance(message);
  speech.lang = languageCode;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  speechSynthesis.speak(speech);
};

getWeatherInfo();

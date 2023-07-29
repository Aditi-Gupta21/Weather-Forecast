const cityInputEl = document.getElementById('city-input');
const formEl = document.querySelector("form")
const weatherDataEl = document.getElementById('weather-data');
const icon= document.getElementById('icon');
const temp = document.getElementsByClassName("temperature");
const des = document.getElementsByClassName('description');
const detail = document.getElementsByClassName('details');
const feel_like = document.getElementsByClassName('feel');
const humidityEl = document.getElementsByClassName('Humidity');
const windSpeedEl = document.getElementsByClassName('wSpeed');

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    let cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=1ab8131c86d04e93a6240840232605&q=${cityValue}&days=2&aqi=no&alerts=no`)
        if(!response.ok){   
            throw new Error("Network error")
        }
        const data = await response.json();
        console.log(data);
        weatherDataEl.style.display="block";
        let temperature = data.forecast.forecastday[0].day.avgtemp_c;
        let weatherIcon = data.forecast.forecastday[1].day.condition.icon;
        let decsription = data.forecast.forecastday[1].day.condition.text;
        let details =[
            `Feels like: ${data.current.feelslike_c}`,
            `Humidity: ${data.forecast.forecastday[1].day.avghumidity}%`,
            `Wind Speed: ${data.current.wind_kph} k/h`,
        ]

        temp[0].innerText=`${temperature}`;
        icon.getElementsByTagName("img")[0].src = `${weatherIcon}`;

        des[0].innerHTML = `${decsription}`;
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=> `<div>${detail}</div>`).join("");
    } catch (error) {
        weatherDataEl.style.display="block";
        weatherDataEl.querySelector(".description").innerHTML = "Error Happened";
    }
}

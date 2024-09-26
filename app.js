async function getWeather() {
    const apiKey = "b667fb4eff4bfca78de9bb7fa3c33c54"; // OpenWeatherMap API key
    const city = document.getElementById('city-name').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=he`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            const weatherInfo = `
                <p>עיר: ${data.name}</p>
                <p>מזג אוויר: ${data.weather[0].description}</p>
                <p>טמפרטורה: ${data.main.temp}°C</p>
                <p>לחות: ${data.main.humidity}%</p>
                <p>מהירות רוח: ${data.wind.speed} מ' לשניה</p>
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
        } else {
            document.getElementById('weather-info').innerHTML = `<p>שגיאה: ${data.message}</p>`;
        }
    } catch (error) {
        document.getElementById('weather-info').innerHTML = `<p>שגיאה בהבאת הנתונים</p>`;
    }
}

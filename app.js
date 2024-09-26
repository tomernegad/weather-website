async function getWeather() {
    const apiKey = "b667fb4eff4bfca78de9bb7fa3c33c54"; // OpenWeatherMap API key
    const city = document.getElementById('city-name').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=he`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const animationDiv = document.getElementById('weather-animation');

        if (data.cod === 200) {
            const weatherCondition = data.weather[0].main.toLowerCase(); // המצב של מזג האוויר
            let weatherIcon = '';

            // התאמת אייקון למזג האוויר
            switch (weatherCondition) {
                case "rain":
                case "drizzle":
                    clearRain();
                    createRainDrops(10); // יוצר טיפות גשם
                    weatherIcon = '🌧️'; // אייקון גשם
                    break;
                case "clear":
                    clearRain();
                    weatherIcon = '☀️'; // אייקון שמש
                    break;
                case "clouds":
                    clearRain();
                    weatherIcon = '☁️'; // אייקון עננים
                    break;
                case "snow":
                    clearRain();
                    weatherIcon = '❄️'; // אייקון שלג
                    break;
                case "thunderstorm":
                    clearRain();
                    weatherIcon = '⚡'; // אייקון סופת רעמים
                    break;
                case "mist":
                case "smoke":
                case "haze":
                case "fog":
                    clearRain();
                    weatherIcon = '🌫️'; // אייקון ערפל
                    break;
                default:
                    clearRain();
                    weatherIcon = '❓'; // אייקון ברירת מחדל
                    break;
            }

            animationDiv.innerHTML = `<div style="font-size: 60px;">${weatherIcon}</div>`;

            const weatherInfo = `
                <p>עיר: ${data.name}</p>
                <p>מזג אוויר: ${data.weather[0].description}</p>
                <p>טמפרטורה: ${data.main.temp}°C</p>
                <p>לחות: ${data.main.humidity}%</p>
                <p>מהירות רוח: ${data.wind.speed} מ' לשניה</p>
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
        } else {
            clearRain(); // מנקה אם יש שגיאה
            document.getElementById('weather-info').innerHTML = `<p>שגיאה: ${data.message}</p>`;
        }
    } catch (error) {
        document.getElementById('weather-info').innerHTML = `<p>שגיאה בהבאת הנתונים</p>`;
    }
}

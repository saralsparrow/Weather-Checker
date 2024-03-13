function searchWeather() { // This function is triggered when the user clicks the search button on the webpage. It's responsible for fetching weather data from the OpenWeatherMap API based on the city entered by the user in the input field.//
    const apiKey = 'e73af3a737b13f4789ed312da53a9cac';
    const city = document.getElementById('searchInput').value; // The city variable retrieves the value entered by the user in the input field with the id 'searchInput'.//

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`) // This code uses the fetch() function to make an HTTP request to the OpenWeatherMap API with the city name and API key. It specifies the units as metric for temperature in Celsius. The response is then converted to JSON format using the response.json() method. The .then() method is used to handle the successful response, where the weather data is available. The .catch() method is used to handle errors if fetching fails.//
        .then(response => response.json())
        .then(data => {
            const currentWeatherInfo = document.getElementById('currentWeatherInfo');
            currentWeatherInfo.innerHTML = `
                <h2>${data.name}</h2>
                <p>Current Weather: ${data.weather[0].description}</p>
            `;
            // Inside the .then() method, this code retrieves the HTML element with the id 'weatherInfo' where the weather information will be displayed. It then updates the inner HTML of this element with the weather data retrieved from the API. The weather information includes the city name, country code, temperature, and weather description.//
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const currentWeatherInfo = document.getElementById('currentWeatherInfo');
            currentWeatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
            // Inside the .catch() method, this code handles errors that may occur during the fetch operation. It logs the error to the console and updates the weather information element with an error message if fetching weather data fails.//
        });


    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`) // This code uses the fetch() function to make an HTTP request to the OpenWeatherMap API with the city name and API key. It specifies the units as metric for temperature in Celsius. The response is then converted to JSON format using the response.json() method. The .then() method is used to handle the successful response, where the weather data is available. The .catch() method is used to handle errors if fetching fails.//
        .then(response => response.json())
        .then(data => {
            const futureWeatherInfo = document.getElementById('futureWeatherInfo');

            futureWeatherInfo.innerHTML = `
                <h2>${data.city.name}</h2>
                <p>Forecasted Weather: ${data.list[0].weather[0].description}</p>
            `;
            console.log(data.list[0])
            // Inside the .then() method, this code retrieves the HTML element with the id 'weatherInfo' where the weather information will be displayed. It then updates the inner HTML of this element with the weather data retrieved from the API. The weather information includes the city name, country code, temperature, and weather description.//
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const futureWeatherInfo = document.getElementById('futureWeatherInfo');
            futureWeatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
            // Inside the .catch() method, this code handles errors that may occur during the fetch operation. It logs the error to the console and updates the weather information element with an error message if fetching weather data fails.//
        });

}

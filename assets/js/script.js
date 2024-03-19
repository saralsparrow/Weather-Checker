function searchWeather() { // This function is triggered when the user clicks the search button on the webpage. It's responsible for fetching weather data from the OpenWeatherMap API based on the city entered by the user in the input field.//
    const apiKey = 'e73af3a737b13f4789ed312da53a9cac';
    const city = document.getElementById('searchInput').value; // The city variable retrieves the value entered by the user in the input field with the id 'searchInput'.//
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${month}/${day}/${year}`;

    const currentDateInfo = document.getElementById('currentDate');
    currentDateInfo.innerHTML = `
        <h3>${currentDate}<h3>
        `;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`) // This code uses the fetch() function to make an HTTP request to the OpenWeatherMap API with the city name and API key. It specifies the units as metric for temperature in Celsius. The response is then converted to JSON format using the response.json() method. The .then() method is used to handle the successful response, where the weather data is available. The .catch() method is used to handle errors if fetching fails.//
        .then(response => response.json())
        .then(data => {
            const currentWeatherInfo = document.getElementById('currentWeatherInfo');
            const currentIconCode = data.weather[0].icon;
            const cityNameInfo = document.getElementById('cityName');
            cityNameInfo.innerHTML = `
                <h2>${data.name}</h2>
            `;

            currentWeatherInfo.innerHTML = `
                <h3>Current Weather</h3>
                <img src="https://openweathermap.org/img/wn/${currentIconCode}@2x.png">
                <p>Temperature: ${data.main.temp} °F</p>
                <p>Humidity: ${data.main.humidity} %</p>
                <p>Wind Speed: ${data.wind.speed} mph</p>

            `;
            addToSearchHistory(city)
            // Inside the .then() method, this code retrieves the HTML element with the id 'weatherInfo' where the weather information will be displayed. It then updates the inner HTML of this element with the weather data retrieved from the API. The weather information includes the city name, country code, temperature, and weather description.//

            // setSearchInput(city)

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
            const futureIconCode = data.list[0].weather[0].icon

            futureWeatherInfo.innerHTML = `
                <h3>Forecasted Weather</h3>
                <img src="https://openweathermap.org/img/wn/${futureIconCode}@2x.png">
                <p>Temperature: ${data.list[0].main.temp} °F</p>
                <p>Humidity: ${data.list[0].main.humidity} %</p>
                <p>Wind Speed: ${data.list[0].wind.speed} mph</p>
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

    function addToSearchHistory(city) {
        // Retrieve existing search history from localStorage
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
        // Add new city to search history
        searchHistory.push(city);
    
        // Store updated search history back to localStorage
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    
        // Update the display of search history (optional)
        // displaySearchHistoryDropdown();
    
    }

    function displaySearchHistoryDropdown() {
        const searchInput = document.getElementById('searchInput');
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
        const dropdownContent = document.getElementById('searchHistoryDropdown');
        dropdownContent.innerHTML = '';
    
        searchHistory.forEach(city => {
            const option = document.createElement('div');
            option.textContent = city;
            option.classList.add('dropdown-item');
            option.addEventListener('click', () => {
                searchInput.value = city;
                dropdownContent.innerHTML = '';
            });
            dropdownContent.appendChild(option);
        });
    
        if (searchHistory.length === 0) {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'block';
        }
    }

    function hideSearchHistoryDropdown() {
        const dropdownContent = document.getElementById('searchHistoryDropdown');
        dropdownContent.style.display = 'none';
    }
    
    // function setSearchInput(city) {
    //     document.getElementById('searchInput').value = city;
    //     hideSearchHistoryDropdown();
    // }
    
    document.getElementById('searchInput').addEventListener('input', displaySearchHistoryDropdown);
    document.getElementById('searchInput').addEventListener('mouseover', displaySearchHistoryDropdown);
    document.getElementById('searchInput').addEventListener('mouseout', hideSearchHistoryDropdown);
    document.getElementById('searchHistoryDropdown').addEventListener('mouseover', displaySearchHistoryDropdown);
    document.getElementById('searchHistoryDropdown').addEventListener('mouseout', hideSearchHistoryDropdown);

    }
function getWeather(){
    // API key provided by OpenWeatherMap, required for authentication when accessing their api
    // Without it, my requests to API will fail
    const apiKey ='6cd7a274f9451cc47452fbce22af452c'; 
    const city = document.getElementById('city').value; /*retrieves the value entered by the user in an HTML input element with the id="city"*/

    if(!city){ // if input is empty or undefined, alert pop up prompting user to enter a city
        alert('Please enter a city');
        return;
    }

    // contains string literals ${input}, JS feature that allows you to embed variables directly inside a string
    // retrieves current weather information for the city provided by the user
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    // retrieves the weather forecast for the city
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // fetch() is a built in Javascript function for making HTTP requests
    // sends a request to the currentWeatherUrl API endpoint for current weather data
    // asynchronous, meaning that it doesn't block the execution of other code while waiting for a response
    fetch(currentWeatherUrl)
        // promise, represents the eventual result of an asynchronous operation, allows you to chain multiple operations together
        .then(response => response.json()) // fetch request completes it and it returns a promise that resolves to the response object
        
        // extracts the JSON data from the response and returns another Promise containing the parsed JSON object
        .then(data => {
            displayWeather(data);
        })
        // catch handling - handles errors that might occur during the fetch request or the response processing
        
        .catch(error => {
            console.error('Error fetching current weather data:', error);
                alert('Error fetching current weather data. Please try again.');
        });

        // second fetch request, requests hourly forecast data from forecastUrl
        fetch(forecastUrl)              // request made to forecastUrl API endpoint for hourly weather forecast data
            .then(response => response.json()) // converts response into parsed JSON object
            .then(data => {                     // parsed JSON data is passed into displayHourlyForecast(data.list) function
                displayHourlyForecast(data.list);
            })
            .catch(error => {
                console.error('Error fetching hourly forecast data:', error);
                alert('Error fetching hourly forecast data. Please try again.');
            })
}
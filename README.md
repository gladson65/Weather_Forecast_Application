# Weather Forecast App

Hello, this is a simple weather forecast app called 'Weather Track' in HTML, CSS, Tailwind CSS and JavaScript.

## Features in this app

1. In this app you can get live weather reports of the current day.
2. It shows Five Days Weather Forecasting.
3. Search for weather by using the current location.
4. Search weather by City Name.
5. It shows weather temperature, wind speed, humidity, visibility, weather description, date, weather icon and s
6. It handels errors like _Empty Input_, _Invalid Input_, _No Fetch Data_.
7. Five recent search dropdown lists. default city value is 'Kolkata'. 
8. Search data stores into local storage.

# Responsiveness

    - iPhone SE
    - iPad mini
    - Desktop

# How to open this application

    - It has three main files:
    1. index.html (to show data on the webpage). 
    2. main.js (to create functions for the page).
    3. style.css (to style the page).

    - First of all the internet connection.
    - Then simply open the index.html file on your web browser.

# tools and libraries/frameworks
   
    1. Font Awesome icon library (CDN link)
    2. Tailwind CSS framework (CDN link)
    3. Google Font

# Data Source

    - Source is **Open Weather API**
    - It updates data every three hours.
    - It updates next-day data at 6 AM. So in the current weather section, you might see 4 day forecast between 1 AM to 6 AM. Meanwhile, if you check the weather report by clicking "my current location" you can see 5 boxes, the first box is the present day only. Because this API gives only a four-day forecast between 1 AM to 6 AM. After 6 AM as the day updates, it shows the next five-day forecast.   

# How this app fetches data from API:
    
    1. Takes a city name.
    2. Gets the Longitude and Latitude of the city.
    3. Gets weather report based on the longitude and latitude of the city.
    4. Stores everyday objects in an array. Every object is unique. Because it is filtering by dates.

# GitHub link

    - [GitHub](https://github.com/gladson65/Weather_Forecast_Application "GitHub")


# Project Image
![Screenshot (159)](https://github.com/gladson65/Weather_Forecast_Application/assets/58826910/2160e9ef-70e8-4cc8-b390-f274aaadded1)



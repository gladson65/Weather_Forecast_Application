# Weather Forecast App

Hello, this is a simple weather forecast app in HTML, CSS, Tailwind CSS and JavaScript.

## Features in this app

1. In this app you can get live weather report of the current day.
2. It shows Five Days Weather Forcasting.
3. Search weather by using current location.
4. Search weather by City Name.
5. It shows weather temperature, wind speed, humidity, visibility, weather description, date, weather icon and many more information.
6. It handels errors like _Empty Input_, _Invalid Input_, _No Fetch Data_.
7. Five recent search dropdown list. default city value is 'Kolkata'. 
8. searched data stores into localstorage.

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

# Data Source

    - Source is **Open Weather Api**
    - It updates data every three hours.
    - It updates next day data at 6 AM in the morning. So in the current weather section you might be see 4 day forecast in between 1 AM to 6 AM. Meanwhile if you check weather report by clicking "my current location" you can see 5 boxes, first box is the present day only. Because this API gives only four days forecast in between 1 AM to 6 AM. After 6 AM as the day updates it shows the next five day forecast.   

# How this app fetch data from API:
    
    1. Takes a city name.
    2. Gets Longitude and Latitude of the city.
    3. Gets weather report on the basis of longitude and latitude of the city.
    4. Stores every day object in an array. Every object is unique. Because it is filtering by dates.

# GitHub link

    - [GitHub](https://github.com/gladson65/Weather_Forecast_Application "GitHub")


# Project Image



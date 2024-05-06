window.onload = function() {

    // select search button
    const searchButton = document.getElementById("search-btn");

    searchButton.addEventListener("click", function(e) {
        e.preventDefault();


        // take input value
        let inputValue = document.querySelector(".inputValue").value;
        let value = inputValue.trim();

        // flag for live report
        var flag = false;

        if (value.length > 0) {
            // get Coordinates
            async function fetchData() {
                let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=bfc3d2331cbfea5b3fffe45863963901`);
                let data = await response.json();
                // destructuring for CityName, longitude, latitude
                let {name, lat, lon} = data[0];

                if (name) {
                    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=bfc3d2331cbfea5b3fffe45863963901`)
                        .then(response => response.json())
                        .then(data => {
                          
                            // filter the forcasts
                            const forcastDays = [];
                            const fiveForcasts = data.list.filter((forecast) => {
                                const forecastDate = new Date(forecast.dt_txt).getDate();
                                if(!forcastDays.includes(forecastDate)) {
                                    return forcastDays.push(forecastDate);
                                }
                            })
                            
                            const todayForcast = [];
                            const today = data.list.filter((todayReport) => {
                                const weatherDate = new Date(todayReport.dt_txt).getDate();
                                const todayDate = new Date().getDate();
                                // const liveTime = new Date().getHours();
                                if (weatherDate == todayDate) {
                                    return todayForcast.push(todayReport);
                                }
                            })
                            
                            const currentArr = [];
                            const currentTime = todayForcast.filter((current) => {
                                const weatherTime = new Date(current.dt_txt).getHours();
                                const liveTime = new Date().getHours();
                                if (weatherTime < liveTime) {
                                    return currentArr.push(current)
                                }
                            })
                            const liveWeather = [currentArr[currentArr.length - 1]];
                            
                            // show live data
                            // weather icon
                            const img = document.getElementById("w-icon");
                            img.src = `https://openweathermap.org/img/wn/${liveWeather[0].weather[0].icon}@2x.png`;

                            // description
                            const describP = document.getElementById("description");
                            const description = liveWeather[0].weather[0].description;
                            describP.innerHTML = `${description}`;

                            // visibility
                            const visibleP = document.createElement("p");
                            const visibility = Math.trunc(liveWeather[0].visibility / 1000);
                            visibleP.innerHTML = `visibility: ${visibility}/Km`;
                            describP.appendChild(visibleP);
                           
                           
                            // temperature
                            const temp = document.getElementById("temp");
                            temperature = liveWeather[0].main.temp;
                            temp.innerHTML = `${Math.trunc(temperature)}deg`

                            // wind Speed
                            const windP = document.getElementById("wind");
                            const wind = liveWeather[0].wind.speed;
                            windP.innerHTML = `${Math.round(wind)}`;

                            // humidity
                            const humidP = document.getElementById("humidity");
                            const humidity = liveWeather[0].main.humidity;
                            humidP.innerHTML = `${Math.round(humidity)}`;

                            

                            console.log(forcastDays)
                            console.log(liveWeather)


                        }).catch(() => {
                            console.log("Error occurred")
                        })  
                }
                
            }

            fetchData();
            
        }    
        else {
            console.log("Please provide a city name")
        }

        

        
    })



}

// const time = data.list[0].dt_txt;
// const timeArr = new Date(time).getHours();
// const liveTime = new Date().getHours();
// console.log(timeArr < liveTime);

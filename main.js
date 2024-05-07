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
            async function fetchData(callback) {
                let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=bfc3d2331cbfea5b3fffe45863963901`);
                let data = await response.json();
                // destructuring for CityName, longitude, latitude
                let {name, lat, lon} = data[0];

                if (name) {
                    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=bfc3d2331cbfea5b3fffe45863963901`)
                        .then(response => response.json())
                        .then(data => {
                          
                            // filter the forcasts for five days
                            const forcastDays = [];
                            const fiveForcasts = data.list.filter((forecast) => {
                                const forecastDate = new Date(forecast.dt_txt).getDate();
                                if(!forcastDays.includes(forecastDate)) {
                                    return forcastDays.push(forecastDate);
                                }
                            })

                            console.log(forcastDays);
                            
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

                            // Day or Night
                            // time
                            const partDayP = document.getElementById("partDay");
                            let hours = new Date().getHours();
                            partDayP.innerHTML = `${hours}`;

                            if (hours > 12 && hours <= 18) {
                                partDayP.innerHTML = 'Afternoon';
                            }
                            else if (hours > 18 && hours <= 20) {
                                partDayP.innerHTML = 'Evening';
                                
                            }
                            else if (hours > 20 && hours <= 5) {
                                partDayP.innerHTML = 'Night';
                                
                            }
                            else if (hours > 6 && hours <= 12) {
                                partDayP.innerHTML = 'Morning';
                                
                            }

                            // day
                            const day = new Date().getDay();
                            const dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                            const toDay = dayArr[day];
                            
                            const dayP = document.getElementById("toDay");
                            dayP.innerHTML = `${toDay}`
                            

                            // description
                            const describP = document.getElementById("description");
                            const description = liveWeather[0].weather[0].description;
                            describP.innerHTML = `${description}`;

                            // visibility
                            const visibleP = document.createElement("p");
                            const visibility = Math.trunc(liveWeather[0].visibility / 1000);
                            visibleP.innerHTML = `visibility: ${visibility} Km`;   
                            describP.appendChild(visibleP);
                           
                           
                            // temperature
                            const temp = document.getElementById("temp");
                            temperature = liveWeather[0].main.temp;
                            temp.innerHTML = `  ${Math.trunc(temperature)}&deg`

                            // wind Speed
                            const windP = document.getElementById("wind");
                            const wind = liveWeather[0].wind.speed;
                            windP.innerHTML = `  ${Math.round(wind)} m/s`;

                            // humidity
                            const humidP = document.getElementById("humidity");
                            const humidity = liveWeather[0].main.humidity;
                            humidP.innerHTML = `  ${Math.round(humidity)} %`;

                            
                            // five day forecasts array passing to the callback function
                            fiveForcasts.shift();
                            const newFiveForcasts = [fiveForcasts];
                            
                            
                            callback(newFiveForcasts);
                            
                            
                            console.log(liveWeather)


                        }).catch((error) => {
                            console.log("Error Occurred", error)
                        })  
                }
                
            }

            // loading animation
            const forecastDiv = document.getElementById("five-forecast");
            const lDiv = document.createElement("span");
            lDiv.style.display = "block";
            lDiv.classList.add("load")
            forecastDiv.appendChild(lDiv);

            function fiveForcasts(newFiveForcasts) {

                const arr = [newFiveForcasts[0]];
                lDiv.style.display = "none";
                
                arr[0].forEach(x => {
                    
                    const forecastDiv = document.getElementById("five-forecast");
                   
                    // date
                    const dateP = document.createElement("p");
                    const getDate = x.dt_txt;
                    const g = getDate.split(" ")
                    dateP.innerHTML = `${g[0]}`;
                    dateP.style.textAlign = "center";
                   
                    // weather icon
                    const icon = document.createElement("img");
                    icon.src = `https://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`;
                    icon.style.textAlign = "center";

                    // weather description
                    const wdP = document.createElement("p");
                    wdP.innerHTML = `${x.weather[0].description}`;
                    wdP.style.textAlign = "center";

                    const forcastDivs = document.createElement("div");
                    // temperature
                    const tempP = document.createElement("p");
                    tempP.innerHTML = `${x.main.temp}`;
                    tempP.style.textAlign = "center";

                    // wind
                    const windP = document.createElement("p");
                    windP.innerHTML = `${x.wind.speed}`;
                    windP.style.textAlign = "center";

                    //humidity
                    const humidP = document.createElement("p");
                    humidP.innerHTML = `${Math.round(x.main.humidity)}`;
                    humidP.style.textAlign = "center";
                    
                    forcastDivs.appendChild(dateP);
                    forcastDivs.appendChild(icon);
                    forcastDivs.appendChild(wdP);
                    forcastDivs.appendChild(tempP);
                    forcastDivs.appendChild(windP);
                    forcastDivs.appendChild(humidP);

                    
                    forecastDiv.appendChild(forcastDivs);
                    
                })

                
                
            }

            fetchData(fiveForcasts);
            
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

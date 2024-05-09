
window.onload = function() {
    
    // select search button
    const searchButton = document.getElementById("search-btn");
    
    // select RefreshButton
    const refreshButton = document.getElementById("Refresh-btn");
    
    // dropdown div
    const dropdown = document.getElementById("dropdown");
    
    
    
    for (var i = 1; i <= 5; i++) {
        let get = (!localStorage.getItem(`${i}`)) ? "cKolkatac" : localStorage.getItem(`${i}`);
        let dropdownP = document.createElement("p");
        
        dropdownP.innerHTML = `${get.slice(1, -1)}`;
        // dropdownP.setAttribute("onclick",`display${i}`);
        dropdownP.classList.add(`dropCity`)
        dropdown.appendChild(dropdownP);
    }

    
    
    const dropCity = document.querySelectorAll(".dropCity");
    dropCity.forEach((x) => {
        x.addEventListener("click", () => {
            let city = `${x.innerText}`;
            let inputValue = document.querySelector(".inputValue");
            inputValue.setAttribute("value", `${city}`);
            let randomNum = Math.round(Math.random()*5);
            localStorage.setItem(`${randomNum}`, `"${city.toLowerCase()}"`);
        })
    })
      
    
    
    
    // select input
    let inputValue = document.querySelector(".inputValue")
    inputValue.addEventListener("focus", () => {
        const dropdown = document.getElementById("dropdown");
        dropdown.style.display = "block";
        
    })
    // input on blur
    inputValue.addEventListener("blur", () => {
        setTimeout(() => {
            dropdown.style.display = "none";
        }, 500);
    })
    
    
    
    // search button click event
    searchButton.addEventListener("click", function(e) {
        e.preventDefault();

        // hide dropdown div
        dropdown.style.display = "none";

        // hide search button
        searchButton.style.display = "none";
        // display Refresh button
        refreshButton.style.display = "block";

        // take input value
        
        let inputValue = document.querySelector(".inputValue").value;
        let value = inputValue.trim();

        
        // disabled input field
        document.querySelector(".inputValue").disabled = true;
        
        
        

        if (value.length > 0) {
            // get Coordinates
            async function fetchData(callback) {
                let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=bfc3d2331cbfea5b3fffe45863963901`);
                let data = await response.json();

                // if data value is undefined due to wrong naming of the city
                if (data[0] == undefined || data[0] == null) {
                    const forecastDiv = document.getElementById("five-forecast");
                    forecastDiv.innerHTML = "<p style='text-align:center; font-size: 1.8rem; font-weight:bold; color:yellow; margin: 0 auto;'>Please provide correct name of the city</p>"

                    return;                
                }

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
                            let partDayP = document.getElementById("partDay");
                            let hours = new Date().getHours();
                            partDayP.innerHTML = `${hours}`;

                            if (hours > 12 && hours < 18) {
                                partDayP.innerHTML = 'Afternoon';
                            }
                            else if (hours >= 18 && hours < 20) {
                                partDayP.innerHTML = 'Evening';
                                
                            }
                            else if (hours >= 20 && hours < 5) {
                                partDayP.innerHTML = 'Night';
                                
                            }
                            else if (hours >= 5 && hours <= 12) {
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
                            temp.style.fontSize = "30px";

                            // wind Speed
                            const windP = document.getElementById("wind");
                            const wind = liveWeather[0].wind.speed;
                            windP.innerHTML = `  ${Math.round(wind)} m/s`;
                            windP.style.fontSize = "30px";

                            // humidity
                            const humidP = document.getElementById("humidity");
                            const humidity = liveWeather[0].main.humidity;
                            humidP.innerHTML = `  ${Math.round(humidity)} %`;
                            humidP.style.fontSize = "30px";

                            
                            // five day forecasts array passing to the callback function
                            fiveForcasts.shift();
                            const newFiveForcasts = [fiveForcasts];
                            
                            //passing data to fiveForcasts function
                            callback(newFiveForcasts);

                            // store into local storage
                            let randomNumber = Math.round(Math.random() * 5);
                            localStorage.setItem(`${randomNumber}`, JSON.stringify(value))
                            
                           
                            
                            console.log(liveWeather)


                        }).catch((error) => {
                            const forecastDiv = document.getElementById("five-forecast");
                            forecastDiv.innerHTML = "<h1 style='text-align: center;'>SORRY, NO DATA FOUND!!! Try leter...</h1>";
                            forecastDiv.style.color = "red";
                            forecastDiv.style.textAlign = "center";
                        })  
                }
                
            }
            

            

            // loading animation
            const forecastDiv = document.getElementById("five-forecast");
            const lDiv = document.createElement("span");
            lDiv.style.display = "block";
            lDiv.classList.add("load")
            forecastDiv.appendChild(lDiv);


            

            // display five day forecast
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
                    icon.style.margin = "0 auto";

                    // weather description
                    const wdP = document.createElement("p");
                    wdP.innerHTML = `${x.weather[0].description}`;
                    wdP.style.textAlign = "center";

                    const forcastDivs = document.createElement("div");
                    // temperature
                    const tempP = document.createElement("p");
                    tempP.innerHTML = `<i class="fa-solid fa-temperature-high" style="color: yellow; font-size:15px"></i> ${Math.trunc(x.main.temp)}`;
                    tempP.style.textAlign = "center";

                    // wind
                    const windP = document.createElement("p");
                    windP.innerHTML = `<i class="fa-solid fa-wind" style="color: black; font-size:15px"></i> ${Math.round(x.wind.speed)}`;
                    windP.style.textAlign = "center";

                    //humidity
                    const humidP = document.createElement("p");
                    humidP.innerHTML = `<i class="fa-solid fa-droplet" style="color: black; font-size:15px"></i> ${Math.round(x.main.humidity)}`;
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
            console.log("Please provide a city name");
        }

        

        
    })


    // Refresh click event
    refreshButton.addEventListener("click", function(e) {
        e.preventDefault();

        // display search button
        searchButton.style.display = "block";
        // hide refresh button
        refreshButton.style.display = "none";

        window.location.reload()
    })


    // get user current location
    let currentLat;
    let currentLon;
    let currentButton = document.getElementById("current-location");
    currentButton.addEventListener("click", function (e) {
        e.preventDefault();

        // change text of the current location button
        let currentButton = document.getElementById("current-location");
        currentButton.innerHTML = "Refresh";

        // Refresh
        if (currentButton.innerHTML == "Refresh") {
            let currentButton = document.getElementById("current-location");
            currentButton.classList.add("current-refresh");

            const currentRefresh = document.querySelector(".current-refresh");
            currentRefresh.addEventListener("click", () =>{
                location.reload();
            })
        }

        // getting latitude and longitude
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                let currentLat = position.coords.latitude;
                let currentLon = position.coords.longitude;
                
                // fetching data by longitude and latitude
                function fetchData(callback) {

                    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${currentLat}&lon=${currentLon}&units=metric&appid=bfc3d2331cbfea5b3fffe45863963901`)
                        .then(response => response.json())
                        .then(data => {

                            

                            // filter the forcasts for five days
                            const forcastDays = [];
                            const fiveForcasts = data.list.filter((forecast) => {
                                const forecastDate = new Date(forecast.dt_txt).getDate();
                                if (!forcastDays.includes(forecastDate)) {
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
                            let partDayP = document.getElementById("partDay");
                            let hours = new Date().getHours();
                            partDayP.innerHTML = `${hours}`;

                            if (hours > 12 && hours < 18) {
                                partDayP.innerHTML = 'Afternoon';
                            }
                            else if (hours >= 18 && hours < 20) {
                                partDayP.innerHTML = 'Evening';

                            }
                            else if (hours >= 20 && hours < 5) {
                                partDayP.innerHTML = 'Night';

                            }
                            else if (hours >= 5 && hours <= 12) {
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
                            temp.style.fontSize = "30px";

                            // wind Speed
                            const windP = document.getElementById("wind");
                            const wind = liveWeather[0].wind.speed;
                            windP.innerHTML = `  ${Math.round(wind)} m/s`;
                            windP.style.fontSize = "30px";

                            // humidity
                            const humidP = document.getElementById("humidity");
                            const humidity = liveWeather[0].main.humidity;
                            humidP.innerHTML = `  ${Math.round(humidity)} %`;
                            humidP.style.fontSize = "30px";


                            // five day forecasts array passing to the callback function
                            fiveForcasts.shift();
                            const newFiveForcasts = [fiveForcasts];

                            //passing data to fiveForcasts function
                            callback(newFiveForcasts);




                            console.log(liveWeather)


                    }).catch((error) => {
                        const forecastDiv = document.getElementById("five-forecast");
                        forecastDiv.innerHTML = "<h1 style='text-align: center;'>SORRY, NO DATA FOUND!!! Try leter...</h1>";
                        forecastDiv.style.color = "red";
                        forecastDiv.style.textAlign = "center";
                        console.log(error)
                    })
                    

                }




                // loading animation
                const forecastDiv = document.getElementById("five-forecast");
                const lDiv = document.createElement("span");
                lDiv.style.display = "block";
                lDiv.classList.add("load")
                forecastDiv.appendChild(lDiv);




                // display five day forecast
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
                        icon.style.margin = "0 auto";

                        // weather description
                        const wdP = document.createElement("p");
                        wdP.innerHTML = `${x.weather[0].description}`;
                        wdP.style.textAlign = "center";

                        const forcastDivs = document.createElement("div");
                        // temperature
                        const tempP = document.createElement("p");
                        tempP.innerHTML = `<i class="fa-solid fa-temperature-high" style="color: yellow; font-size:15px"></i> ${Math.trunc(x.main.temp)}`;
                        tempP.style.textAlign = "center";

                        // wind
                        const windP = document.createElement("p");
                        windP.innerHTML = `<i class="fa-solid fa-wind" style="color: black; font-size:15px"></i> ${Math.round(x.wind.speed)}`;
                        windP.style.textAlign = "center";

                        //humidity
                        const humidP = document.createElement("p");
                        humidP.innerHTML = `<i class="fa-solid fa-droplet" style="color: black; font-size:15px"></i> ${Math.round(x.main.humidity)}`;
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
                
            },
                (error) => {
                    console.log("error", error)
                }
            );


        }
        else {
            console.log("Geolocation is not supported bt this browser")
        }


    })
}



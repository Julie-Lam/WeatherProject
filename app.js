window.addEventListener('load', () => {
    let long; 
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let weatherIcon = document.querySelector('#icon')
    let degreeSection = document.querySelector('.degree-section')
    let temperatureSpan = document.querySelector('.degree-section span')
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude; 
            lat = position.coords.latitude; 
            
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4510203d06832fd135687136cc4dc9da`
            
        fetch(api)
            .then(response => {
                return response.json(); 
        })
            .then (data => {
            console.log(data)
            const {temp} = data.main; 
            const weather = data.weather[0].main
            // Set DOM Elements from the API 
            temperatureDegree.textContent = temp
            temperatureDescription.textContent = weather
            locationTimezone.textContent = data.name
            
            const icon = data.weather[0].icon; 
            const iconURL = `http://openweathermap.org/img/w/${icon}.png`
            weatherIcon.setAttribute('src', iconURL)
            
            // FORMULA FOR CELSIUS 
            let celsius = temp - 273.15 ; 
        
        degreeSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'Kelvin') {
                temperatureSpan.textContent = 'C'; 
                temperatureDegree.textContent = Math.floor(celsius) 
            } else {
                temperatureSpan.textContent = 'Kelvin'
                temperatureDegree.textContent = temp 
            }
            })
            
        })
        }); 
        
        
    }      
    
})

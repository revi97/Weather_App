window.addEventListener('load',() =>{
    let long;
    let lat;
    let temperatureDesc = document.querySelector(".temp-desc");
    let temperatureDegree = document.querySelector(".temp-degree");
    let locationTimezone = document.querySelector(".location-timezone");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/736ad49462b5fb5634c0fc7cee6d9c12/${lat},${long}`;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const  {temperature,summary,icon}    = data.currently;
            
                temperatureDegree.textContent = temperature;
                temperatureDesc.textContent = summary;
                locationTimezone.textContent = data.timezone;

                setIcons(icon, document.querySelector(".icon"));

            });
        });      
    }

    function setIcons(icon, iconID)
    {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }
});
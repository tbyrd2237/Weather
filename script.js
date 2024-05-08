let cities = [
    {
      "name": "New York City, NY",
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    {
      "name": "Los Angeles, CA",
      "latitude": 34.0522,
      "longitude": -118.2437
    },
    {
      "name": "Chicago, IL",
      "latitude": 41.8781,
      "longitude": -87.6298
    },
    {
      "name": "Houston, TX",
      "latitude": 29.7604,
      "longitude": -95.3698
    },
    {
      "name": "Phoenix, AZ",
      "latitude": 33.4484,
      "longitude": -112.0740
    }
  ];


window.onload = function() {
    let dropdown = document.getElementById("city");

    for (let i = 0; i < cities.length; i++) {
        let opt = document.createElement("option");

        opt.value = cities[i].name;
        opt.text = cities[i].name;

        dropdown.appendChild(opt);
    }
    var selectedCity = dropdown.value;
    console.log(selectedCity);

    dropdown.addEventListener('change', function() {
        let selectedCity = dropdown.value;

        for (let i = 0; i < cities.length; i++) {
            if (selectedCity === cities[i].name) {
                let latitude = cities[i].latitude;
                let longitude = cities[i].longitude;

                fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
                .then(response => response.json())
                .then(data => {
                    let forecast = data.properties.forecast;

                    fetch(forecast)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.properties.periods);
                        let table = document.getElementById("forecast");
                        for (let i = 0; i < data.properties.periods.length; i++) {
                            let day = data.properties.periods[i].name;
                            let temperature = data.properties.periods[i].temperature;
                            let wind = data.properties.periods[i].windSpeed;
                            let forecast = data.properties.periods[i].shortForecast;
                            let row = table.insertRow(-1);
                            let cell1 = row.insertCell(0);
                            let cell2 = row.insertCell(1);
                            let cell3 = row.insertCell(2);
                            let cell4 = row.insertCell(3);
                            cell1.innerHTML = day;
                            cell2.innerHTML = temperature;
                            cell3.innerHTML = wind;
                            cell4.innerHTML = forecast;
                        }
                });

                })   
            }
        }
});
}

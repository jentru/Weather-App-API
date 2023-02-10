
document.querySelector('.getWeatherBtn').addEventListener('click', getFetch);

function getFetch(){
  let location = document.querySelector('input').value;
  const APIKey = '3b731b91dd0f788536dca94728ee7baf'
  const geo = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${APIKey}`;

  document.querySelector('h2').innerHTML = location;

  fetch(geo)
      .then(res => res.json()) 
      .then(data => {
        let latitude, longitude;
        for (let i=0; i<data.length;i++){
          if (data[i].state == (location.split(", ")[1])){
            latitude = data[i].lat;
            longitude = data[i].lon;
          }
        }
       const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=imperial`;
        fetch(weather)
            .then(res => res.json())
            .then(data => {
              console.log(data);
              let unix_date = data.dt;
              var date = new Date(unix_date *1000);

              var hours = date.getHours();
              var minutes = date.getMinutes();
            
              let weatherDescription = (data.weather[0].description);
              document.querySelector('.weatherDescription').innerHTML = `${weatherDescription}`

              let tempCurrent = Math.round(data.main.temp);
              let tempMax = Math.round(data.main.temp_max);
              let tempMin = Math.round(data.main.temp_min);

              document.querySelector('.currentTemp').innerHTML = `${tempCurrent} \u00B0F`;
              document.querySelector('.maxTemp').innerHTML = `${tempMax} \u00B0F`;
              document.querySelector('.minTemp').innerHTML = `${tempMin} \u00B0F`;

              let weatherIcon = data.weather[0].icon;

              document.querySelector('img').src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
      
            })
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

}





let weather = {
  apiKey: "f4336ee05deced78e0c9e2cc5c8677aa",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

    // console.log(name, icon, description, temp, humidity, speed);
    document.querySelector("#search-inp").value="";

    document.querySelector(".city").innerText = name;
    document.querySelector(".country").innerText = country;
    document.querySelector(".comma").innerText=",";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText ="Humidity:"+" "+humidity + " %";
    document.querySelector(".desc").innerText = description;
    document.querySelector(".wind").innerText ="Wind Speed:"+" "+speed + " km/h";
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + description + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector("#search-inp").value);
  },
};

document.querySelector("#search-btn").addEventListener("click", () => {
  weather.search();
});

document.querySelector("#search-inp").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("New York");

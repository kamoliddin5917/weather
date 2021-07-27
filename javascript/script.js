window.addEventListener("DOMContentLoaded", () => {
  const city = document.querySelector(".box__state");
  const date = document.querySelector(".box__time");
  const temperature = document.querySelector(".box__temperature");
  const fog = document.querySelector(".box__fog");
  const temperatureBetween = document.querySelector(".box__between");
  const input = document.querySelector(".card__search");
  const dataHourse = document.querySelector(".data__hourse");

  const api = {
    baseurl: "https://api.openweathermap.org/data/2.5/",
    key: "aeb9a648de45dc65828b34450d2ec0df",
  };

  const setQuery = (event) => {
    if (event.keyCode == 13) {
      let inputValue = input.value.trim();
      getResults(inputValue);
    }
  };
  input.addEventListener("keypress", setQuery);

  const getResults = (query) => {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((weather) => weather.json())
      .then((displayResults) => {
        if (displayResults.cod == 200) {
          renderFn(displayResults);
          console.log(displayResults);
          input.classList.remove("card__search-invalid");
        } else {
          input.classList.add("card__search-invalid");
        }
      })
      .catch((error) => console.log(error));
  };
  getResults(input.value);

  const renderFn = (displayResults) => {
    let now = new Date();
    city.textContent = displayResults.name + "," + displayResults.sys.country;
    date.textContent = datBulder(now);
    temperature.textContent = Math.round(displayResults.main.temp) + "°C";
    fog.textContent = displayResults.weather[0].main;
    temperatureBetween.innerHTML = `${Math.round(
      displayResults.main.temp_min
    )}°C/${Math.round(displayResults.main.temp_max)}°C`;
  };

  const datBulder = (now) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let day = days[now.getDay()];
    let date = now.getDate();
    let month = months[now.getMonth()];
    let year = now.getFullYear();

    return day + " " + date + " " + month + " " + year;
  };

  const time = setInterval(function () {
    let dataTime = new Date();
    let day = dataTime.getUTCDate();
    let month = dataTime.getUTCMonth() + 1;
    let year = dataTime.getFullYear();
    let hourse = dataTime.getHours();
    let minute = dataTime.getMinutes();
    let second = dataTime.getSeconds();

    dataHourse.textContent =
      day +
      "." +
      month +
      "." +
      year +
      " " +
      hourse +
      ":" +
      minute +
      ":" +
      second;
  }, 1000);
});

import React, { useState } from "react";
import "./App.css";
import axios from "axios";

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function App() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState(null);
  const [lastUpdate, setLastUpdate] = useState("");
  const [icon, setIcon] = useState(null);
  const [description, setDescription] = useState(null);

  function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }
  function updateCity(event) {
    setName(event.target.value);
    // if (event.keyCode === 13) {
    //   event.preventDefault();
    //   console.log(event.key);
    //   // handleClick();
    // }
  }

  function handleResponse(response) {
    setTemperature(response.data.main.temp);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setName("");
    setCity(response.data.name);
    setLastUpdate(formatDate(response.data.dt));
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    setDescription(response.data.weather[0].description);
  }
  const apiKey = "8623270db9f1ee7a49b633c76cafc981";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;

  function handleClick(event) {
    event.preventDefault();
    axios.get(apiUrl).then(handleResponse);
  }

  return (
    <div className="App">
      <div className="weather-app-wrapper">
        <div className="weather-app">
          <form id="search-form" className="mb-3" onSubmit={handleClick}>
            <div className="row">
              <div className="col-9">
                <input
                  type="search"
                  placeholder="Enter a city..."
                  className="form-control"
                  id="city-input"
                  onChange={updateCity}
                  value={name}
                />
              </div>
              <div className="col-3">
                <button className="btn btn-primary" onClick={handleClick}>
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className="overview">
            <h1 id="city">{city}</h1>
            <h2>Current date: {new Date(Date.now()).toLocaleDateString()} </h2>
            <ul>
              <li>
                Last update: <span id="date">{lastUpdate}</span>
              </li>
              <li id="description">Description: {description}</li>
            </ul>
            <div className="row">
              <div className="col-6">
                <div className="d-flex weather-temperature align-items-center">
                  <img src={icon} alt={description} />
                  <div>
                    <span className="units">
                      <button id="celsius-link" className="active">
                        {Math.round(temperature)}°C
                      </button>{" "}
                      |
                      <button id="fahrenheit-link">
                        {Math.round(temperature * 1.8 + 32)}°F
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <ul>
                  <li>
                    Humidity: <span id="humidity">{Math.round(humidity)}</span>%
                  </li>
                  <li>
                    Wind: <span id="wind">{Math.round(wind)}</span> km/h
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="weather-forecast" id="forecast"></div>
        </div>
        <small>
          <a
            href="https://github.com/YuliyaKas/weather-app"
            target="_blank"
            rel="noreferrer noopener"
          >
            Open-source on GitHub
          </a>
          <span> and </span>
          <a
            href="https://gilded-torte-7130f0.netlify.app"
            target="_blank"
            rel="noreferrer noopener"
          >
            hosted on Netlify
          </a>
          <span> by Yuliya Kasperovych</span>
        </small>
      </div>
    </div>
  );
}

export default App;

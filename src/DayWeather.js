import React from "react";

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

export default function DayWeather({ forecastDay }) {
  return (
    <div class="col">
      <div class="weather-forecast-date">{formatDate(forecastDay.dt)}</div>

      <img
        src={`http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`}
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">
          {" "}
          {Math.round(forecastDay.temp.max)}°{" "}
        </span>
        <span class="weather-forecast-temperature-min">
          {" "}
          {Math.round(forecastDay.temp.min)}°{" "}
        </span>
      </div>
    </div>
  );
}

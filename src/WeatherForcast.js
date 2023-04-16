import React from "react";
import DayWeather from "./DayWeather";

export default function WeatherForecast({ list }) {
  return (
    <div className="WeatherForecast">
      <div className="row d-flex">
        {list &&
          list.map((el, idx) => {
            if (idx === 0) return;
            return <DayWeather key={idx} forecastDay={el} />;
          })}
      </div>
    </div>
  );
}

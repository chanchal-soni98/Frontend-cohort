import React, { useEffect } from "react";

const WeatherInfo = ({ data }) => {
  useEffect(() => {
    console.log("info", data);
  });
  return (
    <div className="bg-white rounded shadow p-4">
      <h2>Hello, {data.name}</h2>
      <p>
        <strong>Temperature:</strong> {data.main.temp} °C
      </p>
      <p>
        <strong>Weather Condition:</strong> {data.weather[0].main}
      </p>
      <p>
        <strong>Humidity:</strong> {data.main.humidity} %
      </p>
      <p>
        <strong>Wind Speed:</strong> {data.wind.speed} m/s
      </p>
      
    </div>
  );
};

export default WeatherInfo;

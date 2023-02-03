import React, { useState } from "react";
import Search from "./Search";
import { Container } from "./styles/Container.styled";
import { API } from "../api/API";

const SearchContainer = () => {
  const [weatherData, setWeatherData] = useState({
    city: null,
    temp: null,
    conditions: null,
    fiveDayForecast: [],
  });

  const fetchCurrentData = async (e, city) => {
    await e.preventDefault();
    await fetch(
      `${API.weather_url}q=${city}&appid=${API.key}&units=imperial&cnt=10`
    )
      // await fetch(`${API.url}zip=${zip},us&appid=${API.key}&units=imperial`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData({
          city: data.name,
          temp: Math.round(data.main.temp),
          conditions: data.weather[0].main,
        });
      });
  };

  const fetchFiveDayForecast = async (e, city) => {
    await e.preventDefault();
    await fetch(
      `${API.forecast_url}q=${city}&appid=${API.key}&units=imperial&cnt=10`
    )
      .then((response) => response.json())
      .then((data) => {
        const dailyData = data.list.filter((reading) =>
          reading.dt_txt.includes("18:00:00")
        );
        setWeatherData({
          // temp: Math.round(data.main.temp),
          // temp: Math.round(data.list.main.temp),
          // conditions: data.weather[0].main,
          fiveDayForecast: dailyData,
        });
      });
  };

  return (
    <Container>
      <h2 className="container-header">Current Weather</h2>
      <Search
        weatherData={weatherData}
        fetchCurrentData={fetchCurrentData}
        fetchFiveDayForecast={fetchFiveDayForecast}
      />
      <h2 className="container-header">Five Day Forecast</h2>
    </Container>
  );
};

export default SearchContainer;

import React, { useState } from "react";
import { API } from "../api/API";

const Search = ({ weatherData, fetchCurrentData, fetchFiveDayForecast }) => {
  const [location, setLocation] = useState("");
  const [cityName, setCityName] = useState("");

  return (
    <>
      <form onSubmit={(e) => fetchCurrentData(e, location)}>
        <input
          type="text"
          // value={searchData}
          value={location}
          // onChange={(e) => setSearchData(e.target.value)}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Search</button>
        {weatherData.city === null && weatherData.temp === null ? (
          <h1>No Weather to Display</h1>
        ) : (
          <>
            <p>{weatherData.city}</p>
            <p>{weatherData.temp}°F</p>
            <p>{weatherData.conditions}</p>
          </>
        )}
      </form>
      <form onSubmit={(e) => fetchFiveDayForecast(e, cityName)}>
        <p>Search for city by Name</p>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;

import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity, activeButton }) => {
  return (
    <div className="weather-button-container">
      <Button
        variant="primary"
        onClick={() => setCity("current")}
        className={`button-style ${activeButton === "current" ? "active" : ""}`}
      >
        Current Location
      </Button>

      {cities.map((item, index) => (
        <Button
          key={index}
          variant="primary"
          onClick={() => setCity(item)}
          className={`button-style ${activeButton === item ? "active" : ""}`}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;

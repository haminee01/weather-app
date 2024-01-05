import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity }) => {
  console.log("cities?", cities);
  return (
    <div>
      <Button className="button-style" variant="primary">
        Current Location
      </Button>

      {cities.map((item, index) => (
        <Button
          className="button-style"
          variant="primary"
          key={index}
          onClick={() => setCity(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;

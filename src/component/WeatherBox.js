import React from 'react'

const WeatherBox = ({weather}) => {
  console.log("weather?",weather)
  return (
    <div className="weather-box">
      <div className="text-style1">{weather?.name}</div>
      <h2 className="text-style1">{weather?.main.temp}c / {(weather?.main.temp*1.8+32).toFixed(2)}F </h2>
      <h4 className="text-style2">{weather?.weather[0].description}</h4>
      <div className="text-style1">humidity : {weather?.main.humidity}</div>
      <div className="text-style1">temp-max : {weather?.main.temp_max} / temp-min : {weather?.main.temp_min}</div>
    </div>
  )
}

export default WeatherBox


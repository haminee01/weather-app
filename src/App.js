import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("current");
  const [error, setError] = useState(null);

  const cities = ["Paris", "New York", "Tokyo", "Seoul"];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat, lon);
      },
      (error) => {
        console.error(error);
        setError("위치 정보를 가져올 수 없습니다. 위치 권한을 확인해주세요.");
        setLoading(false);
      }
    );
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=26c588e09ce3a62465f683a4d7a87acf&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError("현재 위치의 날씨 정보를 가져오는 데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async (cityName) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=26c588e09ce3a62465f683a4d7a87acf&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError("도시의 날씨 정보를 가져오는 데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (newCity) => {
    if (newCity === "current") {
      setCity("");
      setActiveButton("current");
    } else {
      setCity(newCity);
      setActiveButton(newCity);
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity(city);
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#bde4ffff" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container">
          {error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <WeatherBox weather={weather} />
          )}
          <WeatherButton
            cities={cities}
            setCity={handleCityChange}
            activeButton={activeButton}
          />
        </div>
      )}
    </div>
  );
}

export default App;

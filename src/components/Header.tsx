import { useEffect, useState } from "react";
import WeatherStore from "../store/WeatherStore.ts";

const Header = () => {
  const [city, setCity] = useState("Київ");

  useEffect(() => {
    WeatherStore.getWeather(city);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    WeatherStore.getWeather(city);
  };

  const handleCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          WeatherStore.getWeather({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error with geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <header className="flex justify-center m-3">
      <nav className="flex items-center justify-between max-w-screen-xl w-[1000px] gap-3">
        <button className="flex items-center justify-center bg-[#1d1c1f] text-white p-3 rounded-full cursor-pointer border-transparent outline-transparent ">
          <span className="material-symbols-outlined"> menu </span>
        </button>
        <form className="relative text-[#dddae5]" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="text-[#dddae5] bg-[#1d1c1f] pl-3 rounded-[24px] h-[48px] w-full max-w-[500px] outline-transparent border-transparent"
          />
        </form>
        <div className="flex gap-3">
          <button
            className="flex items-center justify-center bg-[#b5a1e5] gap-3 p-3 h-[48px] rounded-full cursor-pointer border-transparent outline-transparent"
            onClick={handleCurrentLocation}
          >
            <span className="material-symbols-outlined"> my_location </span>
            <p className="md:block hidden">Current Location</p>
          </button>
        </div>
      </nav>
    </header>
  );
};

export { Header };

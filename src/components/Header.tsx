import { useState } from "react";
import WeatherStore from "../store/WeatherStore.ts";

const Header = () => {
  const [city, setCity] = useState("Київ");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    WeatherStore.getCityCoordinates(city);
  };

  return (
    <header className="sticky top-0 z-10 bg-[#131214] max-w-[1024px]">
      <nav className="flex items-center justify-between m-3 gap-3">
        <button className="flex items-center justify-center bg-[#1d1c1f] text-white p-3 rounded-full cursor-pointer border-transparent outline-transparent ">
          <span className="material-symbols-outlined"> menu </span>
        </button>
        <form className="relative text-[#dddae5]" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search city..."
            name="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="text-[#dddae5] bg-[#1d1c1f] pl-3 rounded-[24px] h-[48px] w-full outline-transparent border-transparent"
          />
          <button className="absolute right-0 top-0 flex items-center justify-center bg-[#1d1c1f] text-white p-3 rounded-full cursor-pointer border-transparent outline-transparent ">
            <span className="material-symbols-outlined"> search </span>
          </button>
        </form>
        <div className="flex gap-3">
          <button
            className="flex items-center justify-center bg-[#b5a1e5] gap-3 p-3 h-[48px] rounded-full cursor-pointer border-transparent outline-transparent"
            onClick={WeatherStore.getCurrentLocation}
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

//API_KEY to env
//add start screen
//add error screen
//move data to current weather store

//add HourlyForecast
// updateHourlyForecast(data: any) {
//     this.hourlyForecast = data.hourly.map((hour: any) => ({
//       temperature: Math.round(hour.temp),
//       icon: `https://openweathermap.org/img/wn/${hour.weather[0].

// this.hourlyForecast = [
//   { temperature: Math.round(data.daily[0].temp.morn), icon: data.daily[0].weather[0].icon, time: "Morning" },
//   { temperature: Math.round(data.daily[0].temp.day), icon: data.daily[0].weather[0].icon, time: "Day" },
//   { temperature: Math.round(data.daily[0].temp.eve), icon: data.daily[0].weather[0].icon, time: "Evening" },
//   { temperature: Math.round(data.daily[0].temp.night), icon: data.daily[0].weather[0].icon, time: "Night" },
// ];

//переробити scroll в hourlyforecast
//переробити стори
// зробити іконки
//flex-shrink у AQI

// import "./App.css";
// import { useState } from "react";
// import { Header } from "./components/Header";
// import { SideMenu } from "./components/SideMenu";
// import { CurrentWeather } from "./components/CurrentWeather";
// import { SunAndMoon } from "./components/SunAndMoon";
// import { AQI } from "./components/AQI";
// import { WeeklyForecast } from "./components/WeeklyForecast";
// import { Error } from "./components/Error";

// const App = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const closeMenu = () => setIsMenuOpen(false);

//   return (
//     <div
//       className="wrapper"
//       onClick={(e) => {
//         const target = e.target as HTMLElement;
//         if (isMenuOpen && target && !target.closest(".side-menu")) {
//           closeMenu();
//         }
//       }}
//     >
//       <Header toggleMenu={toggleMenu} />
//       {isMenuOpen && <SideMenu />}
//       <main>
//         <div className="flex flex-col lg:flex-row gap-3">
//           <CurrentWeather />
//           <div className="flex flex-col gap-3 flex-1">
//             <SunAndMoon />
//             <AQI />
//           </div>
//         </div>
//         <WeeklyForecast />
//       </main>
//     </div>
//   );
// };

// export default App;

// const [isMenuOpen, setIsMenuOpen] = useState(false); // Стан для контролю видимості меню

// const toggleMenu = () => {
//   setIsMenuOpen((prevState) => !prevState); // Переключаємо видимість меню
// };

// this.hourlyForecast = [
//   { temperature: Math.round(data.hourly[0].temp.morn), icon: data.daily[0].weather[0].icon, time: "Morning" },
//   { temperature: Math.round(data.daily[0].temp.day), icon: data.daily[0].weather[0].icon, time: "Day" },
//   { temperature: Math.round(data.daily[0].temp.eve), icon: data.daily[0].weather[0].icon, time: "Evening" },
//   { temperature: Math.round(data.daily[0].temp.night), icon: data.daily[0].weather[0].icon, time: "Night" },
// ];

// // Конфігурація MobX
// configure({
//   enforceActions: "never", // Вимикає strict mode
// });

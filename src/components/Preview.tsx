type WeatherProps = {
  city?: string;
  temp?: string;
  icon?: string;
  aqi?: string;
  lang?: "uk" | "en";
  theme?: "light" | "dark";
};

export const WeatherPreview = ({ city = "Тернопіль", temp = "+22", icon = "02d", aqi = "1", lang = "uk", theme = "dark" }: WeatherProps) => {
  const isDark = theme === "dark";

  // Логіка адаптивності логотипа
  const cityLength = city.length;
  const showFullLogo = cityLength <= 8;
  const showIconOnly = cityLength > 8 && cityLength <= 20;

  // Тексти залежно від мови
  const labels = {
    uk: { aqi: "Якість повітря", max: "Макс.", date: "09:00, 12 травня" },
    en: { aqi: "Air Quality", max: "Max", date: "May 12" },
  };

  const t = labels[lang];

  return (
    <div
      className={`flex flex-col leading-none w-[1200px] h-[630px] mb-32 p-12 ${isDark ? "bg-[#121212] text-white" : "bg-[#F8F9FA] text-[#1A1A1A]"}`}
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <Header city={city} showFullLogo={showFullLogo} showIconOnly={showIconOnly} isDark={isDark} />

      <div className="flex w-full gap-6 flex-1">
        <MainWeather temp={temp} icon={icon} isDark={isDark} />

        {/* Right Stack */}
        <div className="flex flex-col flex-1 gap-6">
          {/* Date Card */}

          <DateCard date={t.date} isDark={isDark} />

          {/* Mini Widgets Row */}
          <div className="flex gap-6 flex-1">
            {/* AQI Widget */}
            {/* <div
              className={`flex flex-1 flex-col items-center justify-center rounded-[48px] border ${isDark ? "bg-[#1E1E1E] border-white/5" : "bg-white border-black/5 shadow-sm"}`}
              >
              <span className="text-2xl font-bold text-green-400 mb-2 uppercase tracking-widest">{t.aqi}</span>
              <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              <span className="text-6xl font-bold">{aqi}</span>
              </div>
              </div> */}

            {/* Max Temp Widget */}
            <TempRangeCard label="max" temp="+24°" isDark={isDark} />
            <TempRangeCard label="min" temp="+10°" isDark={isDark} />
            <AQICard aqi={aqi} color="red" isDark={isDark} />
            {/* <div
              className={`flex flex-1 flex-col items-center justify-center rounded-[48px] border ${isDark ? "bg-[#1E1E1E] border-white/5" : "bg-white border-black/5 shadow-sm"}`}
            >
              <span className={`text-2xl font-bold mb-2 uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t.max}</span>
              <span className="text-5xl font-bold">+24°</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

type MainWeatherProps = {
  temp: string;
  icon: string;
  isDark: boolean;
};

const MainWeather = ({ temp, icon, isDark }: MainWeatherProps) => {
  return (
    <div
      className={`flex p-12 flex-col items-center justify-center rounded-[48px] border ${isDark ? "bg-[#1E1E1E] border-white/5" : "bg-white border-black/5 shadow-sm"}`}
    >
      <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt="weather" className="w-32 h-32 object-cover" />
      <div className="text-[90px] font-black mt--4 tracking-tighter">{temp}°C</div>
    </div>
  );
};

type HeaderProps = {
  city: string;
  showFullLogo: boolean;
  showIconOnly: boolean;
  isDark: boolean;
};

const Header = ({ city, showFullLogo, showIconOnly, isDark }: HeaderProps) => {
  return (
    <div
      className={`flex flex-[1.2] flex-col items-center justify-center rounded-[48px] p-6 mb-6 border ${isDark ? "bg-[#1E1E1E] border-white/5" : "bg-white border-black/5 shadow-sm"}`}
    >
      <h1 className="text-[84px] font-bold tracking-tight leading-none max-w-[75%] truncate">{city}</h1>
      <Logotype showFullLogo={showFullLogo} showIconOnly={showIconOnly} />
    </div>
  );
};

const Logotype = ({ showFullLogo, showIconOnly }: { showFullLogo: boolean; showIconOnly: boolean }) => {
  return (
    <div className="flex items-center">
      {showFullLogo && (
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl">☁️</span>
          </div>
          <span className="text-4xl font-bold tracking-[100] uppercase">Weatherly</span>
        </div>
      )}
      {showIconOnly && (
        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-4xl">☁️</span>
        </div>
      )}
    </div>
  );
};

interface BentoCardProps {
  children: React.ReactNode;
  isDark: boolean;
  className?: string;
}

const BentoCard = ({ children, isDark, className = "" }: BentoCardProps) => (
  <div
    className={`flex items-center justify-center rounded-[48px] p-6 border
    ${isDark ? "bg-[#1E1E1E] border-white/5" : "bg-white border-black/5 shadow-sm"}
    ${className}`}
  >
    {children}
  </div>
);

const DateCard = ({ date, isDark }: { date: string; isDark: boolean }) => (
  <BentoCard isDark={isDark} className="h-1/3">
    <span className={`text-4xl font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>{date}</span>
  </BentoCard>
);

const AQICard = ({ aqi, color, isDark }: { aqi: string; color: string; isDark: boolean }) => (
  <BentoCard isDark={isDark} className="flex-1 flex-col">
    <div className="flex flex-col items-center justify-center border-6 rounded-full h-32 w-32 flex-shrink-0" style={{ borderColor: color }}>
      <svg width={48} height={48} viewBox="0 0 24 24" fill={color}>
        <path d="M11.45 21C10.5333 21 9.75417 20.6912 9.1125 20.0735C8.47083 19.4559 8.15 18.7059 8.15 17.8235H10.35C10.35 18.1235 10.4554 18.375 10.6663 18.5779C10.8771 18.7809 11.1383 18.8824 11.45 18.8824C11.7617 18.8824 12.0229 18.7809 12.2338 18.5779C12.4446 18.375 12.55 18.1235 12.55 17.8235C12.55 17.5236 12.4446 17.272 12.2338 17.0692C12.0229 16.8662 11.7617 16.7647 11.45 16.7647H1V14.6471H11.45C12.3667 14.6471 13.1458 14.9559 13.7875 15.5735C14.4292 16.1912 14.75 16.9412 14.75 17.8235C14.75 18.7059 14.4292 19.4559 13.7875 20.0735C13.1458 20.6912 12.3667 21 11.45 21ZM1 10.4118V8.29411H15.85C16.3267 8.29411 16.7208 8.14412 17.0325 7.84411C17.3442 7.54412 17.5 7.1647 17.5 6.70588C17.5 6.24706 17.3442 5.86764 17.0325 5.56765C16.7208 5.26765 16.3267 5.11765 15.85 5.11765C15.3733 5.11765 14.9792 5.26765 14.6675 5.56765C14.3558 5.86764 14.2 6.24706 14.2 6.70588H12C12 5.6647 12.3713 4.78676 13.1138 4.07206C13.8563 3.35735 14.7683 3 15.85 3C16.9317 3 17.8437 3.35735 18.5862 4.07206C19.3287 4.78676 19.7 5.6647 19.7 6.70588C19.7 7.74706 19.3287 8.625 18.5862 9.33971C17.8437 10.0544 16.9317 10.4118 15.85 10.4118H1ZM19.15 18.8824V16.7647C19.6267 16.7647 20.0208 16.6147 20.3325 16.3147C20.6442 16.0147 20.8 15.6353 20.8 15.1765C20.8 14.7176 20.6442 14.3382 20.3325 14.0382C20.0208 13.7383 19.6267 13.5882 19.15 13.5882H1V11.4706H19.15C20.2317 11.4706 21.1438 11.8279 21.8863 12.5426C22.6288 13.2574 23 14.1352 23 15.1765C23 16.2177 22.6288 17.0956 21.8863 17.8103C21.1438 18.525 20.2317 18.8824 19.15 18.8824Z" />
      </svg>
      <div className="text-2xl uppercase font-bold">
        AQI <span style={{ color: color }}>{aqi}</span>
      </div>
    </div>
  </BentoCard>
);

const TempRangeCard = ({ label, temp, isDark }: { label: string; temp: string; isDark: boolean }) => {
  return (
    <BentoCard isDark={isDark} className="flex-1 flex-col">
      <span className={`text-2xl font-bold mb-2 uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"}`}>{label}</span>
      <span className="text-5xl font-bold">{temp}</span>
    </BentoCard>
  );
};

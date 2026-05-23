type WeatherProps = {
  city?: string;
  temp?: string;
  icon?: string;
  aqi?: string;
  lang?: "uk" | "en";
  theme?: "light" | "dark";
};

export const WeatherPreview = ({ city = "Хмельницький", temp = "+28", icon = "10d", aqi = "1", lang = "uk", theme = "dark" }: WeatherProps) => {
  const isDark = theme === "dark";

  const cityLength = city.length;
  const showFullLogo = cityLength <= 8;
  const showIconOnly = cityLength > 8 && cityLength <= 20;

  const labels = {
    uk: { aqi: "Якість повітря", date: "12 September", time: "11:17", weekday: "Wednesday" },
    en: { aqi: "Air Quality", date: "May 12", time: "9:00 AM", weekday: "Monday" },
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

        <div className="flex flex-col flex-1 gap-6">
          <div className="flex gap-6">
            <TimeCard isDark={isDark} time={t.time} />
            <DateCard date={t.date} isDark={isDark} time={t.time} />
          </div>

          <div className="flex flex-1 gap-6">
            <TempRangeCard icon="up" temp="+24°" isDark={isDark} />
            <TempRangeCard icon="down" temp="+10°" isDark={isDark} />
            <AQICard aqi={aqi} color="#a2d043" isDark={isDark} />
          </div>
        </div>
      </div>
    </div>
  );
};

// https://weatherly-forecast.vercel.app/weather?city=Kyiv&temp=22&units=C&icon=01d&tempMax=22&tempMin=8&aqi=1&date=918e8398e98e8e98e02&lang=uk&theme=dark

type MainWeatherProps = {
  temp: string;
  icon: string;
  isDark: boolean;
};

const MainWeather = ({ temp, icon, isDark }: MainWeatherProps) => {
  return (
    <div
      className={`flex p-12 flex-col items-center justify-center gap-3 rounded-[48px] border ${isDark ? "bg-[#1E1E1E] border-white/5" : "bg-white border-black/5 shadow-sm"}`}
    >
      <img src={`./weather-icons/${isDark === true ? "dark" : "light"}/${icon}.svg`} alt="weather" className="w-32 h-32 object-cover" />
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
    <div className={`flex items-center justify-between gap-6 mb-6`}>
      <div
        className={`flex flex-1 items-center justify-center rounded-[48px] p-6 border
        ${isDark ? "bg-[#1E1E1E] border-white/5" : "bg-white border-black/5 shadow-sm"}`}
      >
        <h1 className="text-[72px] font-bold  leading-tight tracking-tight truncate">{city}</h1>
      </div>

      <Logotype showFullLogo={showFullLogo} showIconOnly={showIconOnly} isDark={isDark} />
    </div>
  );
};

const Logotype = ({ showFullLogo, showIconOnly, isDark }: { showFullLogo: boolean; showIconOnly: boolean; isDark: boolean }) => {
  return (
    <>
      {showFullLogo && (
        <BentoCard isDark={isDark}>
          <div className="flex items-center gap-6 px-6">
            <Logo />
            <span className="text-[54px] font-bold tracking-[100]">Weatherly</span>
          </div>
        </BentoCard>
      )}
      {showIconOnly && (
        <BentoCard isDark={isDark}>
          <Logo />
        </BentoCard>
      )}
    </>
  );
};

type BentoCardProps = {
  children: React.ReactNode;
  isDark: boolean;
  className?: string;
};

const BentoCard = ({ children, isDark, className = "" }: BentoCardProps) => (
  <div
    className={`flex items-center justify-center rounded-[48px] p-6 border
    ${isDark ? "bg-[#1E1E1E] border-white/5" : "bg-white border-black/5 shadow-sm"}
    ${className}`}
  >
    {children}
  </div>
);

const TimeCard = ({ isDark, time }: { isDark: boolean; time: string }) => {
  return (
    <BentoCard isDark={isDark} className="flex-2">
      <div className="flex items-center gap-3">
        <span className={`text-[40px] font-medium leading-none ${isDark ? "text-gray-400" : "text-gray-500"}`}>{time}</span>
      </div>
    </BentoCard>
  );
};

const DateCard = ({ date, isDark }: { date: string; isDark: boolean; time: string }) => (
  <BentoCard isDark={isDark} className="flex-2">
    <span className={`text-[40px] font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>{date}</span>
  </BentoCard>
);

const AQICard = ({ aqi, color, isDark }: { aqi: string; color: string; isDark: boolean }) => (
  <BentoCard isDark={isDark} className="flex-1 flex-col">
    <div className="flex flex-col items-center justify-center border-8 rounded-full h-52 w-52 flex-shrink-0" style={{ borderColor: color }}>
      <svg width={72} height={72} viewBox="0 0 24 24" fill={color}>
        <path d="M11.45 21C10.5333 21 9.75417 20.6912 9.1125 20.0735C8.47083 19.4559 8.15 18.7059 8.15 17.8235H10.35C10.35 18.1235 10.4554 18.375 10.6663 18.5779C10.8771 18.7809 11.1383 18.8824 11.45 18.8824C11.7617 18.8824 12.0229 18.7809 12.2338 18.5779C12.4446 18.375 12.55 18.1235 12.55 17.8235C12.55 17.5236 12.4446 17.272 12.2338 17.0692C12.0229 16.8662 11.7617 16.7647 11.45 16.7647H1V14.6471H11.45C12.3667 14.6471 13.1458 14.9559 13.7875 15.5735C14.4292 16.1912 14.75 16.9412 14.75 17.8235C14.75 18.7059 14.4292 19.4559 13.7875 20.0735C13.1458 20.6912 12.3667 21 11.45 21ZM1 10.4118V8.29411H15.85C16.3267 8.29411 16.7208 8.14412 17.0325 7.84411C17.3442 7.54412 17.5 7.1647 17.5 6.70588C17.5 6.24706 17.3442 5.86764 17.0325 5.56765C16.7208 5.26765 16.3267 5.11765 15.85 5.11765C15.3733 5.11765 14.9792 5.26765 14.6675 5.56765C14.3558 5.86764 14.2 6.24706 14.2 6.70588H12C12 5.6647 12.3713 4.78676 13.1138 4.07206C13.8563 3.35735 14.7683 3 15.85 3C16.9317 3 17.8437 3.35735 18.5862 4.07206C19.3287 4.78676 19.7 5.6647 19.7 6.70588C19.7 7.74706 19.3287 8.625 18.5862 9.33971C17.8437 10.0544 16.9317 10.4118 15.85 10.4118H1ZM19.15 18.8824V16.7647C19.6267 16.7647 20.0208 16.6147 20.3325 16.3147C20.6442 16.0147 20.8 15.6353 20.8 15.1765C20.8 14.7176 20.6442 14.3382 20.3325 14.0382C20.0208 13.7383 19.6267 13.5882 19.15 13.5882H1V11.4706H19.15C20.2317 11.4706 21.1438 11.8279 21.8863 12.5426C22.6288 13.2574 23 14.1352 23 15.1765C23 16.2177 22.6288 17.0956 21.8863 17.8103C21.1438 18.525 20.2317 18.8824 19.15 18.8824Z" />
      </svg>
      <div className="text-4xl uppercase font-bold">
        AQI <span style={{ color: color }}>{aqi}</span>
      </div>
    </div>
  </BentoCard>
);

const TempRangeCard = ({ icon, temp, isDark }: { icon: string; temp: string; isDark: boolean }) => {
  return (
    <BentoCard isDark={isDark} className="flex-1 flex-col gap-3">
      {icon === "up" ?
        <ThermometerHot />
      : <ThermometerCold />}
      <span className="text-6xl font-bold">{temp}</span>
    </BentoCard>
  );
};

const Logo = () => {
  return (
    <svg width="90" height="90" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#a)">
        <path
          d="M29.238 14.4a3.944 3.944 0 0 0-6.069-4.638A5.775 5.775 0 0 0 17.756 6a5.767 5.767 0 0 0-5.768 5.769q-.001.243.024.487A3.984 3.984 0 0 0 8.3 16.231c0 2.113 1.787 3.994 3.987 3.994h16.807a2.92 2.92 0 0 0 2.919-2.919 2.925 2.925 0 0 0-2.775-2.906"
          fill="url(#b)"
        />
        <path
          d="M25.369 19.381c.244-.575.375-1.2.375-1.862a4.77 4.77 0 0 0-7.725-3.75 6.99 6.99 0 0 0-6.557-4.557A6.987 6.987 0 0 0 4.5 16.794C1.988 16.969 0 19.05 0 21.606s2.163 4.831 4.831 4.831h20.35a3.53 3.53 0 0 0 3.531-3.53 3.52 3.52 0 0 0-3.343-3.526"
          fill="url(#c)"
        />
      </g>
      <defs>
        <linearGradient id="b" x1="20.149" y1="20.227" x2="20.149" y2="6" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0074DB" />
          <stop offset="1" stop-color="#61B8FF" />
        </linearGradient>
        <linearGradient id="c" x1="14.364" y1="26.438" x2="14.364" y2="9.209" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0082FB" />
          <stop offset="1" stop-color="#61D0FF" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

const ThermometerHot = () => {
  return (
    <svg height="108" viewBox="0 0 242 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M120.986 0C158.938 0 189.975 29.764 189.975 66.162V292.652C189.975 297.5 191.454 301.412 196.686 305.465C224.235 326.781 242 359.379 242 395.976C242 460.068 187.818 512 120.986 512C54.1821 512 0 460.068 0 395.977C0 359.324 17.5581 326.47 45.4031 305.41C52.9705 299.655 51.9944 297.415 51.9944 292.653V66.162C51.9944 29.764 83.0605 0 120.986 0Z"
        fill="#E7EAEF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M94.7657 253.052C89.3559 253.052 86.4299 256.142 86.4299 261.046V309.916C86.1931 315.189 83.9762 319.412 79.6018 322.445L71.6507 327.746C48.299 343.307 34.4062 368.649 34.4062 395.976C34.4062 441.841 73.1575 479.004 120.985 479.004C168.81 479.004 207.563 441.841 207.563 395.976C207.563 368.649 193.669 343.307 170.348 327.746L162.514 322.53C157.903 319.497 155.48 315.358 155.568 309.972V261.045C155.568 255.603 152.583 253.051 147.233 253.051H94.7657V253.052Z"
        fill="#FC6067"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M128.254 183.123V116.326L149.086 137.208C151.754 139.882 156.119 139.882 158.787 137.208C161.455 134.533 161.455 130.157 158.787 127.483L131.096 99.7248L121.394 90L111.693 99.7248L84.0012 127.483C81.3332 130.157 81.3332 134.533 84.0012 137.208C86.6691 139.882 91.0348 139.882 93.7027 137.208L114.534 116.326L114.534 183.123C114.534 186.906 117.621 190 121.394 190C125.167 190 128.254 186.905 128.254 183.123Z"
        fill="#FC6067"
      />
    </svg>
  );
};

const ThermometerCold = () => {
  return (
    <svg height="108" viewBox="0 0 242 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M120.986 0C158.938 0 189.975 29.764 189.975 66.162V292.652C189.975 297.5 191.454 301.412 196.686 305.465C224.235 326.781 242 359.379 242 395.976C242 460.068 187.818 512 120.986 512C54.1821 512 0 460.068 0 395.977C0 359.324 17.5581 326.47 45.4031 305.41C52.9705 299.655 51.9944 297.415 51.9944 292.653V66.162C51.9944 29.764 83.0605 0 120.986 0Z"
        fill="#E7EAEF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M94.7657 253.052C89.3559 253.052 86.4299 256.142 86.4299 261.046V309.916C86.1931 315.189 83.9762 319.412 79.6018 322.445L71.6507 327.746C48.299 343.307 34.4062 368.649 34.4062 395.976C34.4062 441.841 73.1575 479.004 120.985 479.004C168.81 479.004 207.563 441.841 207.563 395.976C207.563 368.649 193.669 343.307 170.348 327.746L162.514 322.53C157.903 319.497 155.48 315.358 155.568 309.972V261.045C155.568 255.603 152.583 253.051 147.233 253.051H94.7657V253.052Z"
        fill="#68B1FC"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M114.534 96.8766V163.674L93.7025 142.792C91.0346 140.118 86.6689 140.118 84.001 142.792C81.333 145.467 81.333 149.843 84.001 152.517L111.692 180.275L121.394 190L131.095 180.275L158.787 152.517C161.455 149.843 161.455 145.467 158.787 142.792C156.119 140.118 151.753 140.118 149.085 142.792L128.254 163.674V96.8766C128.254 93.0945 125.167 90 121.394 90C117.621 90.0002 114.534 93.0947 114.534 96.8766Z"
        fill="#68B1FC"
      />
    </svg>
  );
};

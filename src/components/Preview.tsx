type WeatherProps = {
  city?: string;
  temp?: string;
  icon?: string;
  aqi?: string;
  lang?: "uk" | "en";
  theme?: "light" | "dark";
};

export const WeatherPreview = ({ city = "Хмельницький", temp = "+28", icon = "02d", aqi = "1", lang = "uk", theme = "dark" }: WeatherProps) => {
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
          <div className="flex gap-6  h-32">
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
        <AnalogClockIcon time={time} />
        <span className={`text-4xl font-medium leading-none ${isDark ? "text-gray-400" : "text-gray-500"}`}>{time}</span>
      </div>
    </BentoCard>
  );
};

const DateCard = ({ date, isDark }: { date: string; isDark: boolean; time: string }) => (
  <BentoCard isDark={isDark} className="flex flex-2">
    <span className={`text-4xl font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>{date}</span>
  </BentoCard>
);

const AQICard = ({ aqi, color, isDark }: { aqi: string; color: string; isDark: boolean }) => (
  <BentoCard isDark={isDark} className="flex-1 flex-col w-1/3">
    <div className="flex flex-col items-center justify-center border-6 rounded-full min-h-36 w-36 flex-shrink-0" style={{ borderColor: color }}>
      <svg width={64} height={64} viewBox="0 0 24 24" fill={color}>
        <path d="M11.45 21C10.5333 21 9.75417 20.6912 9.1125 20.0735C8.47083 19.4559 8.15 18.7059 8.15 17.8235H10.35C10.35 18.1235 10.4554 18.375 10.6663 18.5779C10.8771 18.7809 11.1383 18.8824 11.45 18.8824C11.7617 18.8824 12.0229 18.7809 12.2338 18.5779C12.4446 18.375 12.55 18.1235 12.55 17.8235C12.55 17.5236 12.4446 17.272 12.2338 17.0692C12.0229 16.8662 11.7617 16.7647 11.45 16.7647H1V14.6471H11.45C12.3667 14.6471 13.1458 14.9559 13.7875 15.5735C14.4292 16.1912 14.75 16.9412 14.75 17.8235C14.75 18.7059 14.4292 19.4559 13.7875 20.0735C13.1458 20.6912 12.3667 21 11.45 21ZM1 10.4118V8.29411H15.85C16.3267 8.29411 16.7208 8.14412 17.0325 7.84411C17.3442 7.54412 17.5 7.1647 17.5 6.70588C17.5 6.24706 17.3442 5.86764 17.0325 5.56765C16.7208 5.26765 16.3267 5.11765 15.85 5.11765C15.3733 5.11765 14.9792 5.26765 14.6675 5.56765C14.3558 5.86764 14.2 6.24706 14.2 6.70588H12C12 5.6647 12.3713 4.78676 13.1138 4.07206C13.8563 3.35735 14.7683 3 15.85 3C16.9317 3 17.8437 3.35735 18.5862 4.07206C19.3287 4.78676 19.7 5.6647 19.7 6.70588C19.7 7.74706 19.3287 8.625 18.5862 9.33971C17.8437 10.0544 16.9317 10.4118 15.85 10.4118H1ZM19.15 18.8824V16.7647C19.6267 16.7647 20.0208 16.6147 20.3325 16.3147C20.6442 16.0147 20.8 15.6353 20.8 15.1765C20.8 14.7176 20.6442 14.3382 20.3325 14.0382C20.0208 13.7383 19.6267 13.5882 19.15 13.5882H1V11.4706H19.15C20.2317 11.4706 21.1438 11.8279 21.8863 12.5426C22.6288 13.2574 23 14.1352 23 15.1765C23 16.2177 22.6288 17.0956 21.8863 17.8103C21.1438 18.525 20.2317 18.8824 19.15 18.8824Z" />
      </svg>
      <div className="text-2xl uppercase font-bold">
        AQI <span style={{ color: color }}>{aqi}</span>
      </div>
    </div>
  </BentoCard>
);

const TempRangeCard = ({ icon, temp, isDark }: { icon: string; temp: string; isDark: boolean }) => {
  return (
    <BentoCard isDark={isDark} className="flex-1 flex-col gap-3 w-1/3">
      {/* <span className={`text-2xl font-bold mb-2 tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"}`}>{label}</span> */}
      {/* {icon === "up" ?
        <ArrowUp color={isDark ? "#4ADE80" : "#16A34A"} />
      : <ArrowDown color={isDark ? "#F87171" : "#DC2626"} />} */}
      {icon === "up" ?
        <ThermometerHot />
      : <ThermometerCold />}
      <span className="text-5xl font-bold">{temp}</span>
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
    <svg height="64" viewBox="0 0 720 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M562.638 398.307V177.877L631.382 246.785C640.186 255.61 654.593 255.61 663.397 246.785C672.201 237.96 672.201 223.518 663.397 214.693L572.015 123.092L540 91L507.985 123.092L416.603 214.693C407.799 223.518 407.799 237.96 416.603 246.785C425.407 255.61 439.814 255.61 448.618 246.785L517.362 177.877V398.307C517.362 410.788 527.549 421 540 421C552.452 420.999 562.638 410.788 562.638 398.307Z"
        fill="#FC6067"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M170.986 0C208.938 0 239.975 29.764 239.975 66.162V292.652C239.975 297.5 241.454 301.412 246.686 305.465C274.235 326.781 292 359.379 292 395.976C292 460.068 237.818 512 170.986 512C104.182 512 50 460.068 50 395.977C50 359.324 67.5581 326.47 95.4031 305.41C102.97 299.655 101.994 297.415 101.994 292.653V66.162C101.994 29.764 133.061 0 170.986 0Z"
        fill="#E7EAEF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M144.766 253.052C139.356 253.052 136.43 256.142 136.43 261.046V309.916C136.193 315.189 133.976 319.412 129.602 322.445L121.651 327.746C98.299 343.307 84.4062 368.649 84.4062 395.976C84.4062 441.841 123.158 479.004 170.985 479.004C218.81 479.004 257.563 441.841 257.563 395.976C257.563 368.649 243.669 343.307 220.348 327.746L212.514 322.53C207.903 319.497 205.48 315.358 205.568 309.972V261.045C205.568 255.603 202.583 253.051 197.233 253.051H144.766V253.052Z"
        fill="#FC6067"
      />
      <path
        d="M174.97 71.1429C174.97 73.5677 174.009 75.8932 172.299 77.6078C170.588 79.3225 168.268 80.2857 165.849 80.2857H102L102 69C102 67 102 64.2969 102.152 62H165.849C168.268 62 170.588 62.9633 172.299 64.6779C174.009 66.3925 174.97 68.718 174.97 71.1429ZM156.728 126C156.728 128.425 155.767 130.75 154.056 132.465C152.345 134.18 150.025 135.143 147.606 135.143H102V116.857H147.606C150.025 116.857 152.345 117.82 154.056 119.535C155.767 121.25 156.728 123.575 156.728 126ZM174.97 180.857C174.97 183.282 174.009 185.608 172.299 187.322C170.588 189.037 168.268 190 165.849 190H102V171.714H165.849C168.268 171.714 170.588 172.678 172.299 174.392C174.009 176.107 174.97 178.432 174.97 180.857Z"
        fill="#FC6067"
      />
    </svg>
  );
};

const ThermometerCold = () => {
  return (
    <svg height="64" viewBox="0 0 720 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M517.362 113.693V334.123L448.618 265.215C439.814 256.39 425.407 256.39 416.603 265.215C407.799 274.04 407.799 288.482 416.603 297.307L507.985 388.908L540 421L572.015 388.908L663.397 297.307C672.201 288.482 672.201 274.04 663.397 265.215C654.593 256.39 640.186 256.39 631.382 265.215L562.638 334.123V113.693C562.638 101.212 552.451 91 540 91C527.548 91.0007 517.362 101.212 517.362 113.693Z"
        fill="#68B1FC"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M170.986 0C208.938 0 239.975 29.764 239.975 66.162V292.652C239.975 297.5 241.454 301.412 246.686 305.465C274.235 326.781 292 359.379 292 395.976C292 460.068 237.818 512 170.986 512C104.182 512 50 460.068 50 395.977C50 359.324 67.5581 326.47 95.4031 305.41C102.97 299.655 101.994 297.415 101.994 292.653V66.162C101.994 29.764 133.061 0 170.986 0Z"
        fill="#E7EAEF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M144.766 253.052C139.356 253.052 136.43 256.142 136.43 261.046V309.916C136.193 315.189 133.976 319.412 129.602 322.445L121.651 327.746C98.299 343.307 84.4062 368.649 84.4062 395.976C84.4062 441.841 123.158 479.004 170.985 479.004C218.81 479.004 257.563 441.841 257.563 395.976C257.563 368.649 243.669 343.307 220.348 327.746L212.514 322.53C207.903 319.497 205.48 315.358 205.568 309.972V261.045C205.568 255.603 202.583 253.051 197.233 253.051H144.766V253.052Z"
        fill="#68B1FC"
      />
      <path
        d="M174.97 71.1429C174.97 73.5677 174.009 75.8932 172.299 77.6078C170.588 79.3225 168.268 80.2857 165.849 80.2857H102L102 69C102 67 102 64.2969 102.152 62H165.849C168.268 62 170.588 62.9633 172.299 64.6779C174.009 66.3925 174.97 68.718 174.97 71.1429ZM156.728 126C156.728 128.425 155.767 130.75 154.056 132.465C152.345 134.18 150.025 135.143 147.606 135.143H102V116.857H147.606C150.025 116.857 152.345 117.82 154.056 119.535C155.767 121.25 156.728 123.575 156.728 126ZM174.97 180.857C174.97 183.282 174.009 185.608 172.299 187.322C170.588 189.037 168.268 190 165.849 190H102V171.714H165.849C168.268 171.714 170.588 172.678 172.299 174.392C174.009 176.107 174.97 178.432 174.97 180.857Z"
        fill="#68B1FC"
      />
    </svg>
  );
};

const AnalogClockIcon = ({ time }: { time: string }) => {
  const [hrs, mins] = time.split(":").map(Number);

  return (
    <svg width="56" height="56" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
      {/* Годинна стрілка */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="25"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        style={{ transform: `rotate(${hrs * 30 + mins * 0.5}deg)`, transformOrigin: "50% 50%" }}
      />
      {/* Хвилинна стрілка */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="15"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        style={{ transform: `rotate(${mins * 6}deg)`, transformOrigin: "50% 50%" }}
      />
    </svg>
  );
};

import { getCity } from "./request.ts";

// Викликаємо функцію для міста Тернопіль
getCity("Ternopil");

const Header = () => {
  return (
    <header className="flex justify-center">
      <nav className="flex items-center justify-between max-w-screen-xl w-full m-3 gap-3">
        {/* <a href="">
          <img src="images/logo.png" alt="logo" className="w-[200px]" />
        </a> */}
        <button className="flex items-center justify-center bg-[#1d1c1f] text-white p-3 rounded-full cursor-pointer border-transparent outline-transparent ">
          <span className="material-symbols-outlined"> menu </span>
        </button>
        <form className="relative text-[#dddae5]">
          {/* <span className="material-symbols-outlined absolute p-3 left-1 top-1/2 transform -translate-y-1/2 pointer-events-none">
            search
          </span> */}
          <input
            type="text"
            placeholder="Search city..."
            value="Ternopil"
            className="text-[#dddae5] bg-[#1d1c1f] pl-3 rounded-[24px] h-[48px] w-full max-w-[500px] outline-transparent border-transparent"
          />
          {/* <button className="material-symbols-outlined absolute right-1 top-1/2  transform -translate-y-1/2 text-[#dddae5] p-3 rounded-full cursor-pointer border-transparent outline-transparent">
            close
          </button> */}
        </form>
        <div className="flex gap-3">
          <button className="flex items-center justify-center bg-[#b5a1e5] gap-3 p-3 h-[48px] rounded-full cursor-pointer border-transparent outline-transparent">
            <span className="material-symbols-outlined"> my_location </span>
            <p className="md:block hidden">Current Location</p>
          </button>
        </div>
      </nav>
    </header>
  );
};

export { Header };

function Header() {
  return (
    <>
      <header className="flex justify-center bg-[#111]">
        <nav className="flex items-center justify-between max-w-screen-xl w-full h-[90px] px-3">
          <a href="">
            <img src="images/logo.png" alt="logo" className="w-[200px]" />
          </a>
          <form className="relative text-[#dddae5] hidden md:block">
            <span className="material-symbols-outlined absolute p-3 left-1 top-1/2 transform -translate-y-1/2 pointer-events-none">
              search
            </span>
            <input
              type="text"
              id="search-field"
              placeholder="Search city..."
              value="Ternopil"
              className="text-[#dddae5] bg-[#1d1c1f] py-2 pl-12 pr-16 rounded-[24px] h-[48px] w-full max-w-[500px] outline-transparent border-transparent"
            />
            <button
              id="clear-search-field"
              className="material-symbols-outlined absolute right-1 top-1/2  transform -translate-y-1/2 text-[#dddae5] rounded-full p-3 cursor-pointer border-transparent outline-transparent"
            >
              close
            </button>
          </form>
          <div className="flex gap-4">
            <button
              id="search-button"
              className="md:hidden flex items-center justify-center bg-[#222] text-white h-[48px] w-[48px] rounded-full cursor-pointer border-transparent outline-transparent "
            >
              <span className="material-symbols-outlined"> search </span>
            </button>
            <button
              id="current-location"
              className="flex items-center justify-center bg-[#b5a1e5] rounded-[24px] gap-3 p-3 h-[48px] max-w-[200px] cursor-pointer border-transparent outline-transparent"
            >
              <span className="material-symbols-outlined"> my_location </span>
              <p className="md:block hidden">Current Location</p>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

export { Header };

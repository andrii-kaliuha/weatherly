const SideMenu = () => {
  return (
    <div className="side-menu fixed top-0 left-0 bg-[#1d1c1f] text-[#dddae5] p-6 h-[100vh] z-20 border-r-2 border-cyan-700">
      <h1 className="text-lg font-bold mb-4">Side Menu</h1>
      <ul className="space-y-3">
        <li>Зміна мови</li>
        <li>Зміна теми</li>
        <li>Одиниці вимірювання</li>
      </ul>
    </div>
  );
};

export { SideMenu };

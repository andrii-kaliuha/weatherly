const information = [
  { icon: "icon-target", title: "Географічні координати", information: "50° 25′ 48″ пн.ш. 30° 31′ 12″ с.д." },
  { icon: "icon-compas", title: "Десяткові координати", information: "50,43 30,52" },
  { icon: "icon-water-rising", title: "Висота над рівнем моря", information: "151 м" },
  { icon: "icon-people", title: "Населення", information: "3 703 100 чоловік" },
  { icon: "icon-stars", title: "Сутінки Громадські", information: "06:09 / 19:32" },
  { icon: "", title: "Сутінки Астрономічні", information: "04:50 / 20:51" },
  { icon: "", title: "Сутінки Навігаційні", information: "05:30 / 20:11" },
];

const GeographyInfo = () => {
  return (
    <section className="geography-information-section bg-[#1d1c1f] text-[#dddae5] p-6 rounded-3xl w-max">
      <ul className="flex flex-col gap-3">
        {information.map((item, index) => (
          <li key={index} className="flex items-center gap-6">
            {item.icon && <span className={`text-2xl ${item.icon}`}></span>}
            <div>
              <p className="font-bold text-sm">{item.title}</p>
              <span className="text-base">{item.information}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export { GeographyInfo };

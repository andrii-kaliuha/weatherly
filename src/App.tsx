import "./App.css";
import { Header } from "./components/Layout/Header.tsx";
import { Main } from "./components/Layout/Main.tsx";
import { Footer } from "./components/Layout/Footer.tsx";

const App = () => {
  return (
    <div className="max-w-[1024px] w-full">
      <Header />
      <Main />
      {/* <Footer /> */}
    </div>
  );
};

export default App;

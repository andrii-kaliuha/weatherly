import "./App.css";
import { Header } from "./components/Header.tsx";
import { Main } from "./components/Main/Main.tsx";

const App = () => {
  return (
    <div className="max-w-[1024px] w-full">
      <Header />
      <Main />
    </div>
  );
};

export default App;

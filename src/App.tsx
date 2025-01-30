import "./App.css";
import { observer } from "mobx-react-lite";
import { Header } from "./components/Header";
import { Main } from "./components/Main.tsx";

const App = observer(() => {
  return (
    <div className="max-w-[1024px] w-full">
      <Header />
      <Main />
    </div>
  );
});

export default App;

import NavBar from "./NavBar";
import "./App.css";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <NavBar />
      </RecoilRoot>
    </div>
  );
}

export default App;

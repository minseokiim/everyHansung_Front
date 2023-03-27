import axios from "axios";
import LoginPage from "../loginPage/LoginPage";
import "../loginPage/LoginPage.css";

const MainPage = () => {
  return (
    <div className="m-4 p-3 login-back">
      <div>
        <h2> MainPage</h2>
        <br />
      </div>
      <div className="login-back">
        <LoginPage />
      </div>
    </div>
  );
};

export default MainPage;

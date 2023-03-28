import NavBar from "./NavBar";
import "./App.css";
import FreeWritePage from "./page/freeBoardPage/FreeWritePage";
import FreeListPage from "./page/freeBoardPage/FreeListPage";
import FreeEditPage from "./page/freeBoardPage/FreeEditPage";
import FreeShowPage from "./page/freeBoardPage/FreeShowPage";

import LectureWritePage from "./page/lectureBoardPage/LectureWritePage";
import LectureListPage from "./page/lectureBoardPage/LectureListPage";
import LectureShowPage from "./page/lectureBoardPage/LectureShowPage";

import SecretWritePage from "./page/secretBoardPage/SecretWritePage";
import SecretListPage from "./page/secretBoardPage/SecretListPage";
import SecretEditPage from "./page/secretBoardPage/SecretEditPage";
import SecretShowPage from "./page/secretBoardPage/SecretShowPage";
import ChatBotPage from "./page/chatbotPage/ChatBotPage";

import LoginPage from "./page/loginPage/LoginPage";
import SignUpPage from "./page/signupPage/SignUpPage";
import MyPage from "./page/myPage/MyPage";
import MessagePage from "./page/messagePage/MessagePage";
import RegisterPage from "./page/signupPage/SignUpPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./page/mainPage/MainPage";

const App = () => {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     {/* //보여주고 싶은 페이지 */}
    //     <Route element={<NavBar />}>
    //       <Route path="/" element={MainPage} />
    //     </Route>

    //     {/* //숨기고 싶은 페이지 */}
    //     {/* <Route path="/" element={MainPage} /> */}
    //   </Routes>
    // </BrowserRouter>
    <NavBar />
  );
};

export default App;

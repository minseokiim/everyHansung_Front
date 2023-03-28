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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./page/mainPage/MainPage";
import Card from "./Card";
import NavBar from "./NavBar";

const RouterPage = () => {
  return (
    <div>
      <Router>
        <Card className="back">
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <NavBar>
              <Route path="/freeboard/post" element={<FreeWritePage />}></Route>
              <Route path="/freeboard/list" element={<FreeListPage />}></Route>
              <Route
                path="/freeboard/edit/:id"
                element={<FreeEditPage />}
              ></Route>
              <Route path="/freeboard/:id" element={<FreeShowPage />}></Route>

              <Route
                path="/secretboard/post"
                element={<SecretWritePage />}
              ></Route>
              <Route
                path="/secretboard/list"
                element={<SecretListPage />}
              ></Route>
              <Route
                path="/secretboard/edit/:id"
                element={<SecretEditPage />}
              ></Route>
              <Route
                path="/secretboard/:id"
                element={<SecretShowPage />}
              ></Route>

              <Route
                path="/lectureboard/post"
                element={<LectureWritePage />}
              ></Route>
              <Route
                path="/lectureboard/list"
                element={<LectureListPage />}
              ></Route>

              <Route
                path="/lectureboard/:id"
                element={<LectureShowPage />}
              ></Route>

              <Route path="/chatbot" element={<ChatBotPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<SignUpPage />}></Route>
              <Route path="/mypage" element={<MyPage />}></Route>

              <Route path="/message" element={<MessagePage />}></Route>
            </NavBar>
          </Routes>
        </Card>
      </Router>
    </div>
  );
};

export default RouterPage;

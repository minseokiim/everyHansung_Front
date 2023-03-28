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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./page/mainPage/MainPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* //nav 보여주고 싶은 페이지 */}
        <Route element={<NavBar />}>
          <Route path="/chatbot" element={<ChatBotPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/freeboard/post" element={<FreeWritePage />} />
          <Route path="/freeboard/list" element={<FreeListPage />} />
          <Route path="/freeboard/edit/:id" element={<FreeEditPage />} />
          <Route path="/freeboard/:id" element={<FreeShowPage />} />

          <Route path="/secretboard/post" element={<SecretWritePage />} />
          <Route path="/secretboard/list" element={<SecretListPage />} />
          <Route path="/secretboard/edit/:id" element={<SecretEditPage />} />
          <Route path="/secretboard/:id" element={<SecretShowPage />} />

          <Route path="/lectureboard/post" element={<LectureWritePage />} />
          <Route path="/lectureboard/list" element={<LectureListPage />} />
          <Route path="/lectureboard/:id" element={<LectureShowPage />} />
        </Route>

        {/* //숨기고 싶은 페이지 */}

        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

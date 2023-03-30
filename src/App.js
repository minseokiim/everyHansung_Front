import NavBar from "./NavBar";
import "./App.css";
import Card from "./Card";

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

import FindInfoPage from "./page/loginPage/FindInfoPage";
import HowToUsePage from "./page/myPage/CommunityPage/HowToUsePage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./page/mainPage/MainPage";
import ChangePwPage from "./page/myPage/AccountPage/ChangePwPage";
import ChangeEmailPage from "./page/myPage/AccountPage/ChangeEmailPage";
import ChangeNickPage from "./page/myPage/CommunityPage/ChangeNickPage";

import Footer from "./page/mainPage/Footer";
import ServiceAgreementPage from "./page/myPage/AboutPage/ServiceAgreementPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* //nav 보여주고 싶은 페이지 */}
        <Route element={<NavBar />}>
          <Route
            path="/chatbot"
            element={
              <div>
                <Card>
                  <ChatBotPage />
                </Card>
                <Footer />
              </div>
            }
          />
          <Route
            path="/my"
            element={
              <div>
                <Card>
                  <MyPage />
                </Card>
                <Footer />
              </div>
            }
          />
          <Route
            path="/message"
            element={
              <Card>
                <MessagePage />
              </Card>
            }
          />
          <Route
            path="/freeboard/post"
            element={
              <Card>
                <FreeWritePage />
              </Card>
            }
          />
          <Route
            path="/freeboard/list"
            element={
              <div>
                <Card>
                  <FreeListPage />
                </Card>
                <Footer />
              </div>
            }
          />
          <Route
            path="/freeboard/edit/:id"
            element={
              <Card>
                <FreeEditPage />
              </Card>
            }
          />
          <Route
            path="/freeboard/:id"
            element={
              <Card>
                <FreeShowPage />
              </Card>
            }
          />

          <Route
            path="/secretboard/post"
            element={
              <Card>
                <SecretWritePage />
              </Card>
            }
          />
          <Route
            path="/secretboard/list"
            element={
              <div>
                <Card>
                  <SecretListPage />
                </Card>
                <Footer />
              </div>
            }
          />
          <Route
            path="/secretboard/edit/:id"
            element={
              <Card>
                <SecretEditPage />
              </Card>
            }
          />
          <Route
            path="/secretboard/:id"
            element={
              <Card>
                <SecretShowPage />
              </Card>
            }
          />

          <Route
            path="/lectureboard/post"
            element={
              <Card>
                <LectureWritePage />
              </Card>
            }
          />
          <Route
            path="/lectureboard/list"
            element={
              <div>
                <Card>
                  <LectureListPage />
                </Card>
                <Footer />
              </div>
            }
          />
          <Route
            path="/lectureboard/:id"
            element={
              <Card>
                <LectureShowPage />
              </Card>
            }
          />
          <Route
            path="/my/password"
            element={
              <Card>
                <ChangePwPage />
              </Card>
            }
          />

          <Route
            path="/my/nickname"
            element={
              <Card>
                <ChangeNickPage />
              </Card>
            }
          />

          <Route
            path="/my/email"
            element={
              <Card>
                <ChangeEmailPage />
              </Card>
            }
          />

          <Route
            path="/page/rules"
            element={
              <Card>
                <HowToUsePage />
              </Card>
            }
          />
          <Route
            path="/page/serviceagreement"
            element={
              <div>
                <Card>
                  <ServiceAgreementPage />
                </Card>
                <Footer />
              </div>
            }
          />
        </Route>

        {/* //숨기고 싶은 페이지 */}

        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/forgot" element={<FindInfoPage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

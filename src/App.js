import NavBar from "./NavBar";
import "./App.css";
import Card from "./Card";
import Footer from "./page/mainPage/Footer";

import FreeWritePage from "./page/freeBoardPage/Board/FreeWritePage";
import FreeListPage from "./page/freeBoardPage/Board/FreeListPage";
import FreeEditPage from "./page/freeBoardPage/Board/FreeEditPage";
import FreeShowPage from "./page/freeBoardPage/Board/FreeShowPage";

import LectureWritePage from "./page/lectureBoardPage/LectureWritePage";
import LectureListPage from "./page/lectureBoardPage/LectureListPage";
import LectureShowPage from "./page/lectureBoardPage/LectureShowPage";

import SecretWritePage from "./page/secretBoardPage/Board/SecretWritePage";
import SecretListPage from "./page/secretBoardPage/Board/SecretListPage";
import SecretEditPage from "./page/secretBoardPage/Board/SecretEditPage";
import SecretShowPage from "./page/secretBoardPage/Board/SecretShowPage";

import NewChatBot from "./page/chatbotPage/NewChatBot";
import TimeTable from "./page/timeTable/TimeTable";
import ShowTimeTable from "./page/timeTable/ShowTimeTable";
import InfoTablePage from "./page/infoTablePage/InfoTablePage";

import LoginPage from "./page/loginPage/LoginPage";
import SignUpPage from "./page/signupPage/SignUpPage";
import FindIdPage from "./page/signupPage/FindIdPage";
import FindPwPage from "./page/signupPage/FindPwPage";
import EmailAuthPage from "./page/signupPage/EmailAuthPage";
import SetPasswdPage from "./page/signupPage/SetPasswdPage";
import ChangeEmailPage from "./page/myPage/AccountPage/ChangeEmailPage";
import ChangeNickPage from "./page/myPage/AccountPage/ChangeNickPage";
import DeleteAccountPage from "./page/myPage/OtherPage/DeleteAccountPage";
import MyPage from "./page/myPage/MyPage";
import HowToUsePage from "./page/myPage/AboutPage/HowToUsePage";
import ServiceAgreementPage from "./page/myPage/AboutPage/ServiceAgreementPage";
import PrivacyPage from "./page/myPage/AboutPage/PrivacyPage";
import PolicyPage from "./page/myPage/AboutPage/PolicyPage";
import MainPage from "./page/mainPage/MainPage";
import MemberMainPage from "./page/mainPage/MemberMainPage";

import MessageListPage from "./page/messagePage/List/ReceivedMessageListPage";
import ShowRoomPage from "./page/messagePage/List/ShowRoomPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Authentication from "./page/myPage/AccountPage/Authentication/Authentication";
import ChooseStudentAuth from "./page/myPage/AccountPage/Authentication/ChooseStudentAuth";
import CardAuthentication from "./page/myPage/AccountPage/Authentication/CardAuthentication";
import ChooseGraduateAuth from "./page/myPage/AccountPage/Authentication/ChooseGraduateAuth";
import CertificateAuthentication from "./page/myPage/AccountPage/Authentication/CertificateAuthentication";
import Check from "./page/myPage/AccountPage/Authentication/Check";
import Success from "./page/myPage/AccountPage/Authentication/Success";

import BookListPage from "./page/bookPage/BookListPage";
import BookWritePage from "./page/bookPage/BookWritePage";
import BookShowPage from "./page/bookPage/BookShowPage";

import AdminShowPage from "./page/adminPage/AdminShowPage";
import AdminPage from "./page/adminPage/AdminPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* //nav 보여주고 싶은 페이지 */}

        <Route element={<NavBar />}>
          <Route
            path="/admin"
            element={
              <div>
                <Card>
                  <AdminPage />
                  <br />
                  <br />
                </Card>
                <Footer />
              </div>
            }
          />

          <Route
            path="/admin/:studentId"
            element={
              <div>
                <Card>
                  <AdminShowPage />
                  <br />
                  <br />
                </Card>
                <Footer />
              </div>
            }
          />

          <Route
            path="/timetable/post"
            element={
              <div>
                <Card>
                  <TimeTable />
                  <br />
                  <br />
                </Card>
                <Footer />
              </div>
            }
          />

          <Route
            path="/timetable"
            element={
              <div>
                <Card>
                  <ShowTimeTable />
                  <br />
                  <br />
                </Card>
                <Footer />
              </div>
            }
          />

          <Route
            path="/require"
            element={
              <div className="p-5">
                <InfoTablePage />
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          <Route
            path="/chatbot"
            element={
              <>
                <div className="chatback">
                  <NewChatBot />
                  <br />
                  <br />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/my"
            element={
              <div>
                <Card>
                  <MyPage />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          <Route
            path="/message/:id"
            element={
              <div>
                <Card>
                  <ShowRoomPage />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          {/* <Route
            path="/message/my"
            element={
              <div>
                <Card>
                  <SentListPage />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          /> */}

          <Route
            path="/message"
            element={
              <div>
                <Card>
                  <MessageListPage />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
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
            path="/freeboard"
            element={
              <div>
                <Card>
                  <FreeListPage />
                </Card>
                <br />
                <br />
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
            path="/secretboard"
            element={
              <div>
                <Card>
                  <SecretListPage />
                </Card>
                <br />
                <br />
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
            path="/lectureboard"
            element={
              <div>
                <Card>
                  <LectureListPage />
                </Card>

                <br />
                <br />
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
            path="/bookstore/post"
            element={
              <Card>
                <BookWritePage />
              </Card>
            }
          />
          <Route
            path="/bookstore"
            element={
              <div>
                <Card>
                  <BookListPage />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          />
          <Route
            path="/bookstore/:id"
            element={
              <Card>
                <BookShowPage />
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
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          <Route
            path="/page/privacy"
            element={
              <div>
                <Card>
                  <PrivacyPage />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          <Route
            path="/page/youthpolicy"
            element={
              <div>
                <Card>
                  <PolicyPage />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          <Route
            path="/my/deleteaccount"
            element={
              <div>
                <DeleteAccountPage />
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          <Route
            path="/my/auth"
            element={
              <div>
                <Card>
                  <Authentication />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          />
          <Route
            path="/auth/student"
            element={
              <div>
                <Card>
                  <ChooseStudentAuth />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          <Route
            path="/auth/graduate"
            element={
              <div>
                <Card>
                  <ChooseGraduateAuth />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          <Route
            path="/auth/idcard"
            element={
              <div>
                <Card>
                  <CardAuthentication />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          <Route
            path="/auth/certificate"
            element={
              <div>
                <Card>
                  <CertificateAuthentication />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          <Route
            path="/auth/check"
            element={
              <div>
                <Card>
                  <Check />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          <Route
            path="/auth/success"
            element={
              <div>
                <Card>
                  <Success />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          <Route
            path="/my/email"
            element={
              <div>
                <ChangeEmailPage />
                <br />
                <br />
                <Footer />
              </div>
            }
          />
          <Route
            path="/my/nickname"
            element={
              <div>
                <ChangeNickPage />
                <br />
                <br />
                <Footer />
              </div>
            }
          />

          <Route
            path="/main"
            element={
              <div>
                <Card>
                  <MemberMainPage />
                </Card>
                <br />
                <br />
                <Footer />
              </div>
            }
          />
        </Route>

        {/* //nav를 숨기고 싶은 페이지 */}

        <Route path="/" element={<MainPage />} />

        <Route path="/register" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>

        <Route path="/forgot" element={<FindIdPage />}></Route>
        <Route path="/forgot/password" element={<FindPwPage />}></Route>
        <Route
          path="/forgot/password/userid"
          element={<EmailAuthPage />}
        ></Route>
        <Route
          path="/forgot/password/identity/result"
          element={<SetPasswdPage />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;

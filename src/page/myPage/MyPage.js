import { useState, useEffect } from "react";
import "./MyPage.css";
import AccountPage from "./AccountPage/AccountPage";
import AboutPage from "./AboutPage/AboutPage";
import { useNavigate } from "react-router-dom";
import OtherPage from "./OtherPage/OtherPage";
import apiClient from "../../apiClient";

const MyPage = () => {
  const studentId = localStorage.getItem("studentId");

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const move = useNavigate();

  useEffect(() => {
    if (studentId) {
      apiClient
        .get(`http://localhost:8080/member/${studentId}`)
        .then((res) => {
          const member = res.data;
          setName(member.username);
          setNickname(member.nickname);
        })
        .catch((error) => {
          console.error("Error fetching name:", error);
        });
    } else {
      console.log("데이터 못받아옴");
    }
  }, [studentId]);

  return (
    <div className="p-3">
      <div className="mini-card">
        <div className="d-flex justify-content-between">
          <strong className="p-3">내 정보</strong>
          <div className="p-3">
            <button
              className="logout-button m-1 "
              onClick={(e) => {
                e.preventDefault();
                localStorage.clear();
                move("/");
              }}
            >
              로그아웃
            </button>
          </div>
        </div>

        <div className="grey">
          <img alt="hansung" src="img/chatlogo.png" className="logo" />
          {name} / {studentId} / {nickname}
        </div>
        <br />
      </div>
      <br />
      <AccountPage />
      <br />
      <AboutPage />
      <br />
      <OtherPage />
    </div>
  );
};

export default MyPage;

import { useState, useEffect } from "react";
import "./MyPage.css";
import AccountPage from "./AccountPage/AccountPage";
import CommunityPage from "./CommunityPage/CommunityPage";
import AboutPage from "./AboutPage/AboutPage";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  //axios.get으로 이름이랑 닉네임 , 학번 받아오기
  const studentId = useSelector((state) => state.auth.studentId);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const move = useNavigate();

  useEffect(() => {
    if (studentId) {
      axios
        .get(`http://localhost:8080/members/${studentId}`)
        .then((res) => {
          const member = res.data;
          setName(member.username);
        })
        .catch((error) => {
          console.error("Error fetching name:", error);
        });
    }
  }, [studentId]);

  return (
    <div className="p-3">
      <div className="mini-card p-3">
        <strong>내 정보 </strong>
        <br />
        <br />
        <div className="grey">
          <img alt="hansung" src="img/chatlogo.png" className="logo" />
          {name} / {studentId} / {nickname}
          <button
            className="logout-button "
            onClick={(e) => {
              e.preventDefault();
              move("/");
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
      <br />
      <AccountPage />
      <br />
      <CommunityPage />
      <br />
      <AboutPage />
    </div>
  );
};

export default MyPage;

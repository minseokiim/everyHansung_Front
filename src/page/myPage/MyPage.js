import { useState, useEffect } from "react";
import "./MyPage.css";
import AccountPage from "./AccountPage/AccountPage";
import CommunityPage from "./CommunityPage/CommunityPage";
import AboutPage from "./AboutPage/AboutPage";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const studentId = useSelector((state) => state.auth.studentId);

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  // const [, setStudentId] = useState("");
  const move = useNavigate();

  useEffect(() => {
    if (studentId) {
      axios
        .get(`http://localhost:8080/members/${studentId}`)
        .then((res) => {
          const member = res.data;
          setName(member.username);
          // setStudentId(member.studentId);
          setNickname(member.nickname || "닉네임 없음");
        })
        .catch((error) => {
          console.error("Error fetching name:", error);
        });
    } else {
      axios
        .get(`http://localhost:8080/members`)
        .then((res) => {
          const member = res.data[0];
          setName(member.username);
          setNickname(member.nickname || "닉네임 없음");
        })
        .catch((error) => {
          console.error("Error fetching name:", error);
        });
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
      <CommunityPage />
      <br />
      <AboutPage />
    </div>
  );
};

export default MyPage;

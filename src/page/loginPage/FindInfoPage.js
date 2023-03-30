import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const FindInfoPage = () => {
  const move = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [passwd, setPasswd] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    // axios
    //   .get("http://localhost:8080/members, {
    //     studentId,
    //     passwd,
    //   })
    //   .then((response) => {
    //     alert(response.data);
    //     move("/freeboard/list");
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       if (error.response.status === 401) {
    //         alert("아이디가 존재하지 않습니다.");
    //       } else if (error.response.status === 402) {
    //         alert("비밀번호가 틀렸습니다.");
    //       } else {
    //         alert("로그인에 실패했습니다.");
    //       }
    //     } else {
    //       alert("서버에 연결할 수 없습니다.");
    //     }
    //   });
  };

  return (
    <div id="register-container">
      <div className="login-box">
        <div className="mb-3 ">
          <h2>아이디/비밀번호 찾기</h2>
          <hr />

          <div className="input">
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="이름"
            ></input>
          </div>

          <div className="input">
            <input
              type="text"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
              }}
              placeholder="학번"
            ></input>
          </div>

          <div className="input">
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="이메일"
            ></input>
          </div>

          <div className="input">
            <p className="find">
              <a href="/login">로그인하기</a>
            </p>
            <button
              className="lec-button mb-3"
              type="submit"
              onClick={onSubmit}
            >
              아이디/비밀번호 찾기
            </button>
            <p className="register">
              <span>에브리한성에 처음이신가요?</span>
              <a href="/register">회원가입</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindInfoPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const move = useNavigate();
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (email.trim().length === 0) {
      alert("이메일을 입력하세요");
      return;
    } else if (passwd.trim().length === 0) {
      alert("비밀번호를 입력하세요");
      return;
    } else {
      axios
        .post("http://localhost:8080/login", {
          email,
          passwd,
        })
        .then(() => {
          alert("로그인 되었습니다!");
          move("/freeboard/list");
        });
    }
  };

  return (
    <div id="register-container">
      <div className="login-box">
        <div className="mb-3 ">
          <h2>로그인</h2>
          <hr />

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
            <input
              type="password"
              value={passwd}
              onChange={(e) => {
                setPasswd(e.target.value);
              }}
              placeholder="비밀번호"
            ></input>
          </div>

          <div className="input">
            <label className="autologin">
              <input type="checkbox" name="autologin" value="1" />
              로그인 유지
            </label>
            <p className="find">
              <a href="/forgot">아이디/비밀번호 찾기</a>
            </p>
            <button
              className="lec-button mb-3"
              type="submit"
              onClick={onSubmit}
            >
              로그인
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

export default LoginPage;

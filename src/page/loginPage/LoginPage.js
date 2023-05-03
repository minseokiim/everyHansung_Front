import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const move = useNavigate();

  const [studentId, setStudentId] = useState(
    localStorage.getItem("rememberMe") ? localStorage.getItem("studentId") : ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("rememberMe") ? localStorage.getItem("password") : ""
  );
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true"
  );

  useEffect(() => {
    if (rememberMe && studentId && password) {
      axios
        .post("https://localhost:8080/auth/login", {
          studentId,
          password,
        })
        .then(() => {
          move("/membermain");
        })
        .catch(() => {
          console.log("로그인 실패");
        });
    }
  }, [rememberMe, studentId, password, move]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (studentId.trim() === "" || password.trim() === "") {
      alert("학번과 비밀번호를 입력해주세요.");
      return;
    }

    axios
      .post("http://localhost:8080/auth/login", {
        studentId,
        password,
      })
      .then((response) => {
        localStorage.setItem("rememberMe", true);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("studentId", studentId);
        if (rememberMe) {
        } else {
          localStorage.removeItem("rememberMe");
        }
        move("/membermain");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            alert("아이디가 존재하지 않습니다.");
          } else if (error.response.status === 402) {
            alert("비밀번호가 틀렸습니다.");
          } else {
            alert("로그인에 실패했습니다.");
          }
        } else {
          alert("서버에 연결할 수 없습니다.");
        }
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSubmit(event);
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
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
              }}
              placeholder="학번"
            ></input>
          </div>

          <div className="input">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyUp={handleKeyPress}
              placeholder="비밀번호"
            ></input>
          </div>

          <div className="input">
            <label className="autologin">
              <input
                type="checkbox"
                name="autologin"
                checked={rememberMe}
                onChange={(e) => {
                  setRememberMe(e.target.checked);
                  if (e.target.checked) {
                    localStorage.setItem("studentId", studentId);
                    localStorage.setItem("password", password);
                    localStorage.setItem("rememberMe", true);
                  } else {
                    localStorage.setItem("rememberMe", false);
                  }
                }}
              />
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/authActions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const studentIdFromStore = useSelector((state) => state.auth.studentId);

  const move = useNavigate();

  const [studentId, setStudentId] = useState(
    localStorage.getItem("rememberMe") ? localStorage.getItem("studentId") : ""
  );
  const [passwd, setPasswd] = useState(
    localStorage.getItem("rememberMe") ? localStorage.getItem("passwd") : ""
  );
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true"
  );

  useEffect(() => {
    if (rememberMe && studentId && passwd) {
      dispatch(login(studentId, passwd))
        .then(() => {
          move("/freeboard/list");
        })
        .catch(() => {
          // 로그인 실패 시 아무것도 하지 않음
        });
    }
  }, [rememberMe, studentId, passwd, move]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login(studentId, passwd))
      .then(() => {
        // 로그인 성공 시 처리
        if (rememberMe) {
          localStorage.setItem("rememberMe", true);
          localStorage.setItem("studentId", studentId);
          localStorage.setItem("passwd", passwd);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("studentId");
          localStorage.removeItem("passwd");
        }
        move("/freeboard/list");
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
              value={passwd}
              onChange={(e) => {
                setPasswd(e.target.value);
              }}
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

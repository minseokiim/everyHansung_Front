import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const move = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [passwd, setPasswd] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (studentId.trim().length === 0) {
      alert("학번을 입력하세요");
      return;
    } else if (passwd.trim().length === 0) {
      alert("비밀번호를 입력하세요");
      return;
    } else {
      axios
        .post("http://localhost:8080/login", {
          studentId,
          passwd,
        })
        .then(() => {
          alert("작성되었습니다!");
          move("/");
        });
    }
  };

  return (
    <div id="register-container"> 
      <div className="mb-3">
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
          <label className="autologin"><input type="checkbox" name="autologin" value="1" />로그인 유지</label>
          <p className="find">
            <a href="/forgot">아이디/비밀번호 찾기</a>
          </p>
          <button className="lec-button mb-3" type="submit" onClick={onSubmit}>
            로그인
          </button>
          <p className="register">
                        <span>에브리한성에 처음이신가요?</span>
                        <a href="/register">회원가입</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;

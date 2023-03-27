import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const move = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [passwd, setPasswd] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (studentId.trim().length === 0) {
      alert("아이디를 입력하세요");
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
    <form className="lec-back">
      <div className="mb-3">
        <label className="form-label m-2 mb-0"> 로그인</label>
        <hr />

        <div className="mb-3">
          <input
            className="form-control"
            value={studentId}
            onChange={(e) => {
              setStudentId(e.target.value);
            }}
            placeholder="학번"
          ></input>
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            value={passwd}
            onChange={(e) => {
              setPasswd(e.target.value);
            }}
            placeholder="비밀번호"
          ></input>
        </div>

        <button className="lec-button mb-3" type="submit" onClick={onSubmit}>
          로그인
        </button>

        <button
          className="lec-button mb-3"
          type="submit"
          onClick={() => {
            move("/register");
          }}
        >
          회원가입
        </button>
      </div>
    </form>
  );
};

export default LoginPage;

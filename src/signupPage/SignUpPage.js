import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [checkPasswd, setCheckPasswd] = useState("");
  const [nickName, setNickName] = useState("");
  const move = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (userName.trim().length === 0) {
      alert("이름을 입력하세요");
      return;
    } else if (passwd.trim().length === 0) {
      alert("비밀번호를 입력하세요");
      return;
    } else if (email.trim().length === 0) {
      alert("이메일을 입력하세요");
      return;
    } else if (nickName.trim().length === 0) {
      alert("사용할 닉네임을 입력하세요");
      return;
    } else if (studentId.trim().length === 0) {
      alert("학번을 입력하세요");
      return;
    } else {
      axios
        .post("http://localhost:8080/register", {
          userName,
          email,
          studentId,
          passwd,
          nickName,
        })
        .then(() => {
          alert("작성되었습니다!");
          move("/login");
        });
    }
  };

  const checkPw = (passwd) => {
    if (passwd != checkPasswd) {
      alert("비밀번호를 다시 확인해주세요");
    }
  };

  return (
    <div className="lec-back p-4">
      <h5>회원가입</h5>
      <br />
      <div>
        <input
          className="form-control"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          placeholder="이름을 입력해주세요."
        ></input>
        <br />
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="이메일을 입력해주세요."
        ></input>
        <br />

        <input
          className="form-control"
          value={studentId}
          onChange={(e) => {
            setStudentId(e.target.value);
          }}
          placeholder="학번을 입력해주세요."
        ></input>
        <br />

        <input
          className="form-control"
          type="password"
          value={passwd}
          onChange={(e) => {
            setPasswd(e.target.value);
          }}
          placeholder="비밀번호를 입력해주세요."
        ></input>
        <br />

        <input
          className="form-control"
          type="password"
          value={checkPasswd}
          onChange={(e) => {
            setCheckPasswd(e.target.value);
          }}
          placeholder="비밀번호를 한번 더 입력해주세요."
        ></input>
        <br />

        <input
          className="form-control"
          value={nickName}
          onChange={(e) => {
            setNickName(e.target.value);
          }}
          placeholder="닉네임을 입력해주세요."
        ></input>
        <br />
        <button className="lec-button mb-3" type="submit" onClick={onSubmit}>
          회원가입 완료
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;

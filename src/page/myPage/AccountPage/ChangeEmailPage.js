import { useState } from "react";
import axios from "axios";
import "../../signupPage/SignUpPage.css";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { useNavigate } from "react-router-dom";

const ChangeEmailPage = () => {
  const [email, setEmail] = useState("");
  const [passwd,  setPasswd] = useState("");
  const studentId = localStorage.getItem("studentId");

  const [checkEmailDisplay, setCheckEmailDisplay] = useState("none");
  const [clearEmailDisplay, setClearEmailDisplay] = useState("none");

  const [checkPasswdDisplay, setCheckPasswdDisplay] = useState("none");
  const [clearPasswdDisplay, setClearPasswdDisplay] = useState("none");

  const move = useNavigate();

  const emailCheck = (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
      if (regex.test(e.target.value)) {
        setEmail(e.target.value);
        setCheckEmailDisplay("block");
        setClearEmailDisplay("none");
      } else {
        setClearEmailDisplay("block");
        setCheckEmailDisplay("none");
      }
    } catch (e) {}
  };

  const passwdCheck = (e) => {
    const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,}$/;

    if (regex.test(e.target.value)) {
      setPasswd(e.target.value);
      setCheckPasswdDisplay("block");
      setClearPasswdDisplay("none");
    } else {
      setClearPasswdDisplay("block");
      setCheckPasswdDisplay("none");
    }
  };

  // const confirmEmailCheck = (e) => {
  //   if (e.target.value !== email) {
  //     setClearPasswdDisplay("block");
  //     setCheckPasswdDisplay("none");
  //   } else {
  //     setCheckPasswdDisplay("block");
  //     setClearPasswdDisplay("none");
  //   }
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    if (checkEmailDisplay === "block") {
      axios
        .patch("http://localhost:8080/my/email", {
          studentId,
          passwd,
          email
        })
        .then(() => {
          alert("이메일 변경하였습니다.");
          move("/my");
        })
        .catch((error) => {
          alert("이메일 변경에 실패하셨습니다.");
        });
    }
  };

  return (
    <div id="register-container">
      <div className="">
        <div className="mb-3 ">
          <strong>이메일 변경</strong>

          <div className="input">
            <div className="label">
              <label>이메일</label>
            </div>

            <div className="inputbox">
              <input
                onChange={emailCheck}
                type="email"
                name="user_email"
                maxLength="50"
                placeholder="이메일을 입력하세요."
                className="search"
              />
              <CheckIcon
                className="checkIcon"
                style={{ display: checkEmailDisplay }}
              />
              <ClearIcon
                className="clearIcon"
                style={{ display: clearEmailDisplay }}
              />
            </div>
          </div>

          <div className="input">
            <div className="label">
              <label>계정 비밀번호</label>
            </div>

            <div className="inputbox">
              <input
                onChange={passwdCheck}
                type="password"
                name="passwd"
                maxLength="20"
                placeholder="계정 비밀번호"
                className="search"
              />
              <CheckIcon
                className="checkIcon"
                style={{ display: checkPasswdDisplay }}
              />
              <ClearIcon
                className="clearIcon"
                style={{ display: clearPasswdDisplay }}
              />
            </div>
          </div>

          <div className="input">
            <button
              className="lec-button mb-3"
              type="submit"
              onClick={onSubmit}
            >
              이메일 변경
            </button>
          </div>

          <div className="grey">
            <div className="text">
              ※ 반드시 본인의 이메일을 입력해주세요.
              <br />※ 계정 분실 시 아이디/비밀번호 찾기, 개인정보 관련 주요
              고지사항 안내 등에서 사용됩니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmailPage;

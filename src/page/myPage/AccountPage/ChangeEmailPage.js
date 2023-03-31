import { useState } from "react";
import axios from "axios";
import "../../signupPage/SignUpPage.css";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { useNavigate, useLocation } from "react-router-dom";

const ChangeEmailPage = () => {
  const [email, setEmail] = useState("");

  const [checkEmailDisplay, setCheckEmailDisplay] = useState("none");
  const [clearEmailDisplay, setClearEmailDisplay] = useState("none");

  const [checkConfirmemailDisplay, setCheckConfirmemailDisplay] =
    useState("none");
  const [clearConfirmemailDisplay, setClearConfirmemailDisplay] =
    useState("none");

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

  const confirmEmailCheck = (e) => {
    if (e.target.value !== email) {
      setClearConfirmemailDisplay("block");
      setCheckConfirmemailDisplay("none");
    } else {
      setCheckConfirmemailDisplay("block");
      setClearConfirmemailDisplay("none");
    }
  };

  const onSubmit = (e) => {
    if (checkEmailDisplay === "block" && checkConfirmemailDisplay === "block") {
      axios
        .patch("http://localhost:8080/my/email", {
          email,
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
          <strong>에브리한성 이메일 변경</strong>

          <div className="input">
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
            <div className="inputbox">
              <input
                onChange={confirmEmailCheck}
                type="email"
                name="user_email"
                maxLength="50"
                placeholder="이메일을 다시 입력하세요."
                className="search"
              />
              <CheckIcon
                className="checkIcon"
                style={{ display: checkConfirmemailDisplay }}
              />
              <ClearIcon
                className="clearIcon"
                style={{ display: clearConfirmemailDisplay }}
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
        </div>
      </div>
    </div>
  );
};

export default ChangeEmailPage;

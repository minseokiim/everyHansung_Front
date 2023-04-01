import { useState } from "react";
import axios from "axios";
import "./SignUpPage.css";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { useNavigate, useLocation } from "react-router-dom";

const SetPasswdPage = () => {
  const [passwd, setPasswd] = useState("");

  const [checkPasswdDisplay, setCheckPasswdDisplay] = useState("none");
  const [clearPasswdDisplay, setClearPasswdDisplay] = useState("none");

  const [checkConfirmpasswdDisplay, setCheckConfirmpasswdDisplay] =
    useState("none");
  const [clearConfirmpasswdDisplay, setClearConfirmpasswdDisplay] =
    useState("none");

  const move = useNavigate();
  const location = useLocation();
  const studentId = location.state.studentId;

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

  const confirmPasswdCheck = (e) => {
    if (e.target.value !== passwd) {
      setClearConfirmpasswdDisplay("block");
      setCheckConfirmpasswdDisplay("none");
    } else {
      setCheckConfirmpasswdDisplay("block");
      setClearConfirmpasswdDisplay("none");
    }
  };

  const onSubmit = (e) => {
    if (checkPasswdDisplay === "block" && checkConfirmpasswdDisplay === "block") {
      axios
        .patch("http://localhost:8080/forgot/password/identity/result", {
          studentId,
          passwd,
        })
        .then((response) => {
          alert("비밀번호 변경하였습니다.");
          move("/login");
        })
        .catch((error) => {
          alert("비밀번호 변경에 실패하셨습니다.");
        });
    }
  };

  return (
    <div id="register-container">
      <div className="">
        <div className="mb-3 ">
          <strong>에브리한성 비밀번호 변경</strong>

          <div className="text">
            ※ 영문, 숫자, 특수문자 모두 1개 이상 조합된 8~20자
          </div>

          <div className="input">
            <div className="inputbox">
              <input
                onChange={passwdCheck}
                type="password"
                name="passwd"
                maxLength="20"
                placeholder="새 비밀번호"
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
            <div className="inputbox">
              <input
                onChange={confirmPasswdCheck}
                type="password"
                name="user_repw"
                maxLength="20"
                placeholder="비밀번호를 다시 입력하세요."
                className="search"
              />
              <CheckIcon
                className="checkIcon"
                style={{ display: checkConfirmpasswdDisplay }}
              />
              <ClearIcon
                className="clearIcon"
                style={{ display: clearConfirmpasswdDisplay }}
              />
            </div>
          </div>

          <div className="input">
            <button
              className="lec-button mb-3"
              type="submit"
              onClick={onSubmit}
            >
              비밀번호 변경
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SetPasswdPage;

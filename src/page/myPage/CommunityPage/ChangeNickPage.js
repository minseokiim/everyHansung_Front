import { useState } from "react";
import axios from "axios";
import "../../signupPage/SignUpPage.css";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { useNavigate, useLocation } from "react-router-dom";

const ChangeNickPage = () => {
  const [nickname, setNickname] = useState("none");

  const [checkNicknameDisplay, setCheckNicknameDisplay] = useState("none");
  const [clearNicknameDisplay, setClearNicknameDisplay] = useState("none");

  const [checkConfirmNicknameDisplay, setCheckConfirmNicknameDisplay] =
    useState("none");
  const [clearConfirmNicknameDisplay, setClearConfirmNicknameDisplay] =
    useState("none");

  const move = useNavigate();

  const nicknameCheck = (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
      if (regex.test(e.target.value)) {
        setNickname(e.target.value);
        setCheckNicknameDisplay("block");
        setClearNicknameDisplay("none");
      } else {
        setClearNicknameDisplay("block");
        setCheckNicknameDisplay("none");
      }
    } catch (e) {}
  };

  const confirmNicknameCheck = (e) => {
    if (e.target.value !== nickname) {
      setClearConfirmNicknameDisplay("block");
      setCheckConfirmNicknameDisplay("none");
    } else {
      setCheckConfirmNicknameDisplay("block");
      setClearConfirmNicknameDisplay("none");
    }
  };

  const onSubmit = (e) => {
    if (
      checkNicknameDisplay === "block" &&
      checkConfirmNicknameDisplay === "block"
    ) {
      axios
        .patch("http://localhost:8080/my/nickname", {
          nickname,
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
          <strong>에브리한성 닉네임 변경</strong>

          <div className="input">
            <div className="inputbox">
              <input
                onChange={nicknameCheck}
                type="text"
                name="user_nickName"
                maxLength="20"
                placeholder="닉네임(별명)을 입력하세요."
                className="search"
              />
              <CheckIcon
                className="checkIcon"
                style={{ display: checkNicknameDisplay }}
              />
              <ClearIcon
                className="clearIcon"
                style={{ display: clearNicknameDisplay }}
              />
            </div>
          </div>

          <div className="input">
            <div className="inputbox">
              <input
                onChange={nicknameCheck}
                type="text"
                name="user_nickName"
                maxLength="20"
                placeholder="닉네임(별명)을 입력하세요."
                className="search"
              />
              <CheckIcon
                className="checkIcon"
                style={{ display: checkNicknameDisplay }}
              />
              <ClearIcon
                className="clearIcon"
                style={{ display: clearNicknameDisplay }}
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

export default ChangeNickPage;

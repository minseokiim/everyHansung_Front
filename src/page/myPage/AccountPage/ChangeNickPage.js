import { useState } from "react";
import axios from "axios";
import "../../signupPage/SignUpPage.css";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { useNavigate } from "react-router-dom";

const ChangeNickPage = () => {
  const [nickname, setNickname] = useState("none");

  const [checkNicknameDisplay, setCheckNicknameDisplay] = useState("none");
  const [clearNicknameDisplay, setClearNicknameDisplay] = useState("none");

  const studentId = localStorage.getItem("studentId");

  const nicknameCheck = (e) => {
    if (e.target.value.length >= 2) {
      setNickname(e.target.value);
      setCheckNicknameDisplay("block");
      setClearNicknameDisplay("none");
    } else {
      setClearNicknameDisplay("block");
      setCheckNicknameDisplay("none");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (checkNicknameDisplay === "block") {
      axios
        .patch(`http://localhost:8080/my/nickname`, {
          studentId,
          nickname
        })
        .then(() => {
          alert("닉네임 변경하였습니다.");
        })
        .catch((error) => {
          alert("닉네임 변경에 실패하셨습니다.");
        });
    }
  };

  return (
    <div id="register-container">
      <div className="">
        <div className="mb-3 ">
          <strong>닉네임 설정</strong>

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

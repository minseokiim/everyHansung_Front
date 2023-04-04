import { useState } from "react";
import axios from "axios";
import "../../signupPage/SignUpPage.css";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const DeleteAccountPage = () => {
  const move = useNavigate();
  const studentId = localStorage.getItem("studnetId");
  const [passwd, setPasswd] = useState("");

  const [checkPasswdDisplay, setCheckPasswdDisplay] = useState("none");
  const [clearPasswdDisplay, setClearPasswdDisplay] = useState("none");

  const passwdCheck = (e) => {
    const regex =
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,}$/;

    if (regex.test(e.target.value)) {
      setPasswd(e.target.value);
      setCheckPasswdDisplay("block");
      setClearPasswdDisplay("none");
    } else {
      setClearPasswdDisplay("block");
      setCheckPasswdDisplay("none");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (checkPasswdDisplay === "block") {
      axios
        .delete(`http://localhost:8080/members/${studentId}`, {
          passwd,
        })
        .then(() => {
          alert("탈퇴되었습니다. 그동안 이용해주셔서 감사합니다.");
          move("/");
        })
        .catch((error) => {
          if (error.response.status === 402) {
            setClearPasswdDisplay("block");
            setCheckPasswdDisplay("none");
            alert("비밀번호를 다시 확인해주세요.");
          }
        });
    }
  };

  return (
    <div id="register-container">
      <div className="">
        <div className="mb-3 ">
          <strong>회원탈퇴</strong>

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

          <div className="grey">
            <div className="text">
              ※ 탈퇴 및 가입을 반복할 경우, 서비스 악용 방지를 위해 재가입이
              제한됩니다. 최초 탈퇴 시에는 가입 시점을 기준으로 1일간 제한되며,
              2회 이상 탈퇴를 반복할 경우 30일간 제한됩니다.
              <br />
            </div>

            <div className="text">
              ※ 탈퇴 후 개인 정보 데이터가 삭제되며, 복구할 수 없습니다.
              <br />
              ※ 작성한 게시물은 삭제되지 않으며, (알수없음)으로 닉네임이
              표시됩니다.
              <br />※ 자세한 내용은 개인정보처리방침을 확인해주세요.
            </div>
          </div>

          <div className="input">
            <button
              className="lec-button mb-3"
              type="submit"
              onClick={onSubmit}
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPage;

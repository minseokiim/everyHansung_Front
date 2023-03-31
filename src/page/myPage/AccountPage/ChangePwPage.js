import { useState } from "react";
import axios from "axios";
import "../../signupPage/SignUpPage.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ChangePwPage = () => {
  const [passwd, setPasswd] = useState("");
  const [newpasswd, setNewPasswd] = useState("");
  const move = useNavigate();
  const { id } = useParams();

  //   //axios.get으로 내 pw 받아온 후, oldpw에 저장
  //   //바꾸고 싶은 pw은 newpw에 저장후 patch로 members정보 업데이트 해주기

  const onSubmit = () => {
    axios
      .patch(`http://localhost:8080/members/${id}`, {
        passwd,
      })
      .then((e) => {
        e.preventDefault();
        alert("변경 되었습니다!");
        move("/login");
      });
  };

  return (
    <div id="register-container">
      <div className="">
        <div className="mb-3 ">
          <strong>비밀번호 변경하기</strong>
          <div className="input">
            <input
              type="text"
              value={passwd}
              onChange={(e) => {
                setPasswd(e.target.value);
              }}
              placeholder="새 비밀번호"
            ></input>
            <input
              type="text"
              value={passwd}
              onChange={(e) => {
                setPasswd(e.target.value);
              }}
              placeholder="새 비밀번호 확인"
            ></input>
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
export default ChangePwPage;

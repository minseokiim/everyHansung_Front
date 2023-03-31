import { useState } from "react";
import axios from "axios";
import "../../signupPage/SignUpPage.css";
import { useNavigate } from "react-router-dom";

const DeleteAccountPage = () => {
  const move = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    alert("탈퇴완료. 그동안 이용해주셔서 감사합니다.");
    move("/");

    // axios.delete(`http://localhost:3001/members/${id}`).then(() => {
    //   alert("탈퇴되었습니다. 그동안 이용해주셔서 감사합니다.");
    // move("/");
    // });
  };

  return (
    <div className="p-3">
      <br />

      <div id="register-container">
        <div className="">
          <div className="mb-3 ">
            <strong>회원탈퇴</strong>
            <br />
            <br />
            <div className="grey">
              <div className="text">
                ※ 탈퇴 및 가입을 반복할 경우, 서비스 악용 방지를 위해 재가입이
                제한됩니다. 최초 탈퇴 시에는 가입 시점을 기준으로 1일간
                제한되며, 2회 이상 탈퇴를 반복할 경우 30일간 제한됩니다.
                <br />
              </div>
              <div className="text">
                ※ 탈퇴 후 개인 정보 데이터가 삭제되며, 복구할 수 없습니다.
                <br />
              </div>
              <div className="text">
                ※ 작성한 게시물은 삭제되지 않으며, (알수없음)으로 닉네임이
                표시됩니다.
                <br />
              </div>{" "}
              <div className="text">
                ※ 자세한 내용은 개인정보처리방침을 확인해주세요.
                <br />
                <br />
              </div>
            </div>
            <div className="input">
              <button className="lec-button mb-3" onClick={onSubmit}>
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPage;

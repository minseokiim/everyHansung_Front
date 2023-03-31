import { useState } from "react";
import axios from "axios";
import "../../../signupPage/SignUpPage.css";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const move = useNavigate();

  return (
    <div className="p-3">
      <strong>인증하기</strong> <br />
      <br />
      <div
        className="mini-card p-3 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          move("/auth/student");
        }}
      >
        <strong>재학생 인증</strong>
        <br />
        <div className="grey">재학 증명 자료를 통해 이용 가능</div>
      </div>
      <br />
      <div
        className="mini-card p-3 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          move("/auth/student");
        }}
      >
        <strong>졸업생 인증</strong>
        <br />
        <div className="grey">졸업 증명 자료를 통해 이용 가능</div>
      </div>
    </div>
  );
};
export default Authentication;

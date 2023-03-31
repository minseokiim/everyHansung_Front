import { useState } from "react";
import axios from "axios";
import "../../../signupPage/SignUpPage.css";
import { useNavigate } from "react-router-dom";

const ChooseAuth = () => {
  const move = useNavigate();
  return (
    <div className="p-3">
      <strong>인증 수단 선택</strong> <br />
      <br />
      <div
        className="mini-card p-3 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          move("/auth/idcard");
        }}
      >
        <strong>학생증 인증</strong>
        <br />
        <div className="grey">학생증을 스캔 / 촬영 / 캡처 후 첨부하여 인증</div>
      </div>
      <br />
      <div
        className="mini-card p-3 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          move("/auth/certificate");
        }}
      >
        <strong>증명서</strong>
        <br />
        <div className="grey">재학 / 졸업 증명서를 첨부하여 인증</div>
      </div>
    </div>
  );
};

export default ChooseAuth;

import { useState } from "react";
import axios from "axios";
import "../../../signupPage/SignUpPage.css";
import { useNavigate } from "react-router-dom";

const ChooseGraduateAuth = () => {
  const move = useNavigate();
  return (
    <div className="p-3">
      <strong>졸업 증명서를 첨부하여 인증</strong>
      <div className="p-3 cursor-pointer">
        <div className="grey">
          학교에서 공식적으로 발급한 졸업 증명서를 제출 하여 인증
        </div>
      </div>
    </div>
  );
};

export default ChooseGraduateAuth;

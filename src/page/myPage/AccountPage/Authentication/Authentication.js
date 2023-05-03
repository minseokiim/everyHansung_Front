import "../../../signupPage/SignUpPage.css";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaSchool } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import apiClient from "../../../../apiClient";
import { useState, useEffect } from "react";

const Authentication = () => {
  const move = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const [isCertification, setIsCertification] = useState(false);
  const [isFile, setIsFile] = useState(false);

  const getAuth = () => {
    apiClient.get(`http://localhost:8080/member/${studentId}`).then((res) => {
      setIsCertification(res.data.certification);
      setIsFile(res.data.file);
    });
  };

  useEffect(() => {
    getAuth();
  }, []);

  return isCertification ? (
    move("/auth/success")
  ) : isFile ? (
    move("/auth/check")
  ) : (
    <div className="p-3">
      <AiFillSafetyCertificate />
      <strong className="p-1">인증하기</strong>
      <br />
      <br />
      <div
        className="mini-card p-3 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          move("/auth/student");
        }}
      >
        <FaSchool />
        <strong className="p-1">재학생 인증</strong>
        <br />
        <div className="grey">학생증이나, 재학 증명 자료를 통해 이용 가능</div>
      </div>
      <br />
      <div
        className="mini-card p-3 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          move("/auth/graduate");
        }}
      >
        <FaUserGraduate />
        <strong className="p-1">졸업생 인증</strong>
        <br />
        <div className="grey">졸업 증명 자료를 통해 이용 가능</div>
      </div>
    </div>
  );
};
export default Authentication;

import { useState } from "react";
import axios from "axios";
import "./SignUpPage.css";
import emailjs from "emailjs-com";
import { useNavigate, useLocation } from "react-router-dom";

const EmailAuthPage = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [inputVerificationCode, setInputVerificationCode] = useState("");
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const studentId = location.state.studentId;

  const sendEmail = async () => {
    const generatedCode = Math.floor(100000 + Math.random() * 900000); // 6자리 인증 코드 생성
    setVerificationCode(generatedCode);

    try {
      const templateParams = {
        email,
        verificationCode: generatedCode,
      };
      await emailjs.send(
        "service_ogh6vg4",
        "template_r6z03sd",
        templateParams,
        "KUYn7pjZiQPRaff54"
      );
      alert("인증코드 이메일로 전송되었습니다.");
      setIsVerificationCodeSent(true);
    } catch (error) {
      alert("인증코드 이메일로 전송을 실패했습니다.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isVerificationCodeSent) {
      if (inputVerificationCode === verificationCode.toString()) {
        alert("인증 번호가 확인되었습니다.");
        navigate("/forgot/password/identity/result", { state: { studentId: studentId } });
      } else {
        alert("인증 번호가 일치하지 않습니다.");
      }
    } else {
      sendEmail();
    }
  };

  return (
    <div id="register-container">
      <div className="">
        <div className="mb-3 ">
          <strong
            className="notimportant cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              move("/forgot");
            }}
          >
            아이디 찾기
          </strong>
          &nbsp;&nbsp;
          <strong className="important cursor-pointer">비밀번호 찾기</strong>
          <div className="input">
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="이메일"
            ></input>
          </div>
          {isVerificationCodeSent && (
            <div className="input">
              <input
                type="text"
                value={inputVerificationCode}
                onChange={(e) => {
                  setInputVerificationCode(e.target.value);
                }}
                placeholder="인증 번호"
              ></input>
            </div>
          )}

          <div className="input">
            <button
              className="lec-button mb-3"
              type="submit"
              onClick={onSubmit}
            >
              {isVerificationCodeSent ? "인증 번호 확인" : "이메일 인증"}
            </button>
          </div>

          <div className="grey">
            <div className="text">
              ※ 가입된 이메일이 있을 경우, 입력하신 이메일로 비밀번호
              인증코드를 안내해 드립니다.
            </div>

            <div className="text">
              ※ 만약 이메일이 오지 않는다면, 스팸 편지함으로 이동하지
              않았는지 학인해주세요.
            </div>

            <div className="text">
              ※ 이메일 서비스 제공자 사정에 의해 즉시 도착하지 않을 수
              있으니, 최대 30분 정도 기다리신 후 다시 시도해주세요.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmailAuthPage;
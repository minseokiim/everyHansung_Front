import { useState } from "react";
import axios from "axios";
import "./SignUpPage.css";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

const FindPwPage2 = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = async () => {
    try {
      const templateParams = {
        email,
        verificationCode: Math.floor(100000 + Math.random() * 900000) // 6자리 인증 코드 생성
      };
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID');
      setMessage('Verification code sent!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to send verification code.');
    }
  };

  const changePassword = async (e) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/forgot/password",{
          params: { email },
        }
      );
      setMessage('Password changed!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to change password.');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8080/forgot/password",
        {
          params: { email },
        }
      );
      const studentId = response.data; // API 응답에 따라 경로를 변경해야 할 수 있습니다.
      const now = new Date();
      const time =
        now.getMonth() +
        1 +
        "월 " +
        now.getDate() +
        "일 " +
        now.getHours() +
        "시 " +
        now.getMinutes() +
        "분";

      await sendEmail("KUYn7pjZiQPRaff54", email, time, studentId);
      alert("비밀번호 정보가 이메일로 전송되었습니다.");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("가입되지 않은 이메일입니다.");
      }
    }
  };
  return (
    <div id="register-container">
      <div className="">
        <div className="mb-3 ">
          <strong
            className="notimportant"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            학번 찾기
          </strong>
          &nbsp;&nbsp;
          <strong className="important">비밀번호 찾기</strong>
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
          <div className="input">
            <button
              className="lec-button mb-3"
              type="submit"
              onClick={onSubmit}
            >
              비밀번호 찾기
            </button>
          </div>
          <div className="grey">
            <div className="text">
              ※ 가입된 이메일이 있을 경우, 입력하신 이메일로 비밀번호를 안내해
              드립니다.
            </div>

            <div className="text">
              ※ 만약 이메일이 오지 않는다면, 스팸 편지함으로 이동하지 않았는지
              학인해주세요.
            </div>

            <div className="text">
              ※ 이메일 서비스 제공자 사정에 의해 즉시 도착하지 않을 수 있으니,
              최대 30분 정도 기다리신 후 다시 시도해주세요.
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FindPwPage2;

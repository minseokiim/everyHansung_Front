import { useState } from "react";
import axios from "axios";
import "./SignUpPage.css";
import emailjs from "emailjs-com";

const FindInfoPage = () => {
  const [email, setEmail] = useState("");

  const sendEmail = async (userId, email, time, studentId) => {
    const templateParams = {
      to_email: email,
      student_id: studentId,
      time: time
    };

    await emailjs.send("service_ogh6vg4", "template_x2e3w1b", templateParams, userId);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // 3월 31일 12시 19분
    try {
      const response = await axios.get("http://localhost:8080/forget", { params: { email } });
      const studentId = response.data; // API 응답에 따라 경로를 변경해야 할 수 있습니다.
      const now = new Date();
      const time = (now.getMonth() + 1) + "월 " + now.getDate() + "일 " + now.getHours() + "시 " + now.getMinutes() + "분";

      await sendEmail("KUYn7pjZiQPRaff54", email, time, studentId);
      alert("아이디 정보가 이메일로 전송되었습니다.");
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
          <h2>아이디</h2>
          <hr />

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
              아이디 찾기
            </button>
          </div>

          <div className="text">
            ※ 가입된 아이디가 있을 경우, 입력하신 이메일로 아이디를 안내해 드립니다.
          </div>

          <div className="text">
            ※ 만약 이메일이 오지 않는다면, 스팸 편지함으로 이동하지 않았는지 학인해주세요.
          </div>
          
          <div className="text">
            ※ 이메일 서비스 제공자 사정에 의해 즉시 도착하지 않을 수 있으니, 최대 30분 정도 기다리신 후 다시 시도해주세요.<br/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindInfoPage;

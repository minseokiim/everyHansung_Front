import { useState } from "react";
import axios from "axios";
import "./SignUpPage.css";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

const FindIdPage = () => {
  const [email, setEmail] = useState("");
  const move = useNavigate();

  const sendEmail = async (email, time, studentId) => {
    const templateParams = {
      email,
      student_id: studentId,
      time,
    };

    try {
      await emailjs.send(
        "service_i8n5vol",
        "template_g89w2kt",
        templateParams,
        "mkhz5jwAhnOJiYgoW"
      );
      alert("이메일로 전송되었습니다.");
    } catch (error) {
      alert(" 이메일로 전송을 실패했습니다.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/auth/email", {
        params: { email },
      });
      const studentId = response.data;

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

      await sendEmail(email, time, studentId);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("가입되지 않은 이메일입니다.");
      }
    }
  };

  return (
    <div id="register-container">
      <div className="">
        <div className="mb-3 ">
          <strong className="important">아이디 찾기</strong>
          &nbsp;&nbsp;
          <strong
            className="notimportant cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              move("/forgot/password");
            }}
          >
            비밀번호 찾기
          </strong>
          <div className="input">
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="가입된 이메일"
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
          <div className="grey">
            <div className="text">
              ※ 가입된 학번이 있을 경우, 입력하신 이메일로 학번을 안내해
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

export default FindIdPage;

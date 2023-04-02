import { useState } from "react";
import axios from "axios";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";

const FindPwPage = () => {
  const [studentId, setStudentId] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (studentId.trim() === "") {
      alert("학번을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/members/${studentId}`
      );
      if (response && response.data !== null) {
        navigate("/forgot/password/userid", {
          state: { studentId: studentId },
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("가입되지 않은 학번입니다.");
      }
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
              navigate("/forgot");
            }}
          >
            아이디 찾기
          </strong>
          &nbsp;&nbsp;
          <strong className="important cursor-pointer">비밀번호 찾기</strong>
          <div className="input">
            <input
              type="text"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
              }}
              placeholder="가입된 학번"
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
        </div>
      </div>
    </div>
  );
};

export default FindPwPage;

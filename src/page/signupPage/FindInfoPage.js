import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpPage.css";

const FindInfoPage = () => {
  const move = useNavigate();
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    // axios
    //   .get("http://localhost:8080/members, {
    //     studentId,
    //     passwd,
    //   })
    //   .then((response) => {
    //     alert(response.data);
    //     move("/freeboard/list");
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       if (error.response.status === 401) {
    //         alert("아이디가 존재하지 않습니다.");
    //       } else if (error.response.status === 402) {
    //         alert("비밀번호가 틀렸습니다.");
    //       } else {
    //         alert("로그인에 실패했습니다.");
    //       }
    //     } else {
    //       alert("서버에 연결할 수 없습니다.");
    //     }
    //   });
  };

  return (
    <div id="register-container">
      <div className="">
        <div className="mb-3 ">
          <h2>아이디/비밀번호 찾기</h2>
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

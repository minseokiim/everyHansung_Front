import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";
import emailjs from "emailjs-com";

const SingUpPage = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [inputVerificationCode, setInputVerificationCode] = useState("");
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [isHansungEmail, setIsHansungEmail] = useState("");

  const sendEmail = async () => {
    const generatedCode = Math.floor(100000 + Math.random() * 900000); // 6자리 인증 코드 생성
    setVerificationCode(generatedCode);

    try {
      const templateParams = { email, verificationCode: generatedCode };
      await emailjs.send(
        "service_fe94oyw",
        "template_23upm73",
        templateParams,
        "PgtbJif1CAURhFHws"
      );
      alert("인증코드 이메일로 전송되었습니다.");
      setIsVerificationCodeSent(true);
    } catch (error) {
      alert("인증코드 이메일로 전송을 실패했습니다.");
    }
  };

  const move = useNavigate();

  const [studentId, setStudentId] = useState("none");
  const [password, setPassword] = useState("none");
  const [email, setEmail] = useState("none");
  const [username, setUsername] = useState("none");
  const [nickname, setNickname] = useState("none");

  const [checkIdDisplay, setCheckIdDisplay] = useState("none");
  const [clearIdDisplay, setClearIdDisplay] = useState("none");

  const [checkPasswordDisplay, setCheckPasswordDisplay] = useState("none");
  const [clearPasswordDisplay, setClearPasswordDisplay] = useState("none");

  const [checkConfirmpasswdDisplay, setCheckConfirmpasswdDisplay] = useState(
    "none"
  );
  const [clearConfirmpasswdDisplay, setClearConfirmpasswdDisplay] = useState(
    "none"
  );

  const [checkEmailDisplay, setCheckEmailDisplay] = useState("none");
  const [clearEmailDisplay, setClearEmailDisplay] = useState("none");

  const [checknameDisplay, setChecknameDisplay] = useState("none");
  const [clearnameDisplay, setClearnameDisplay] = useState("none");

  const [checkNicknameDisplay, setCheckNicknameDisplay] = useState("none");
  const [clearNicknameDisplay, setClearNicknameDisplay] = useState("none");

  const studentIdCheck = (e) => {
    try {
      if (e.target.value.length === 7) {
        setStudentId(e.target.value);
        setCheckIdDisplay("block");
        setClearIdDisplay("none");
      } else {
        setClearIdDisplay("block");
        setCheckIdDisplay("none");
      }
    } catch (e) {}
  };

  const passwordCheck = (e) => {
    const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,}$/;

    if (regex.test(e.target.value)) {
      setPassword(e.target.value);
      setCheckPasswordDisplay("block");
      setClearPasswordDisplay("none");
    } else {
      setClearPasswordDisplay("block");
      setCheckPasswordDisplay("none");
    }
  };

  const confirmPasswordCheck = (e) => {
    if (e.target.value !== password) {
      setClearConfirmpasswdDisplay("block");
      setCheckConfirmpasswdDisplay("none");
    } else {
      setCheckConfirmpasswdDisplay("block");
      setClearConfirmpasswdDisplay("none");
    }
  };

  const emailCheck = (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
      if (regex.test(e.target.value)) {
        setEmail(e.target.value);
        setCheckEmailDisplay("block");
        setClearEmailDisplay("none");
        setIsHansungEmail(e.target.value.endsWith("@hansung.ac.kr"));
      } else {
        setClearEmailDisplay("block");
        setCheckEmailDisplay("none");
        setIsHansungEmail(false);
      }
    } catch (e) {}
  };

  const nameCheck = (e) => {
    if (e.target.value.length >= 2) {
      setUsername(e.target.value);
      setChecknameDisplay("block");
      setClearnameDisplay("none");
    } else {
      setClearnameDisplay("block");
      setChecknameDisplay("none");
    }
  };

  const nicknameCheck = (e) => {
    if (e.target.value.length >= 2) {
      setNickname(e.target.value);
      setCheckNicknameDisplay("block");
      setClearNicknameDisplay("none");
    } else {
      setClearNicknameDisplay("block");
      setCheckNicknameDisplay("none");
    }
  };
  //원래 onSubmit

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (isVerificationCodeSent) {
  //     if (inputVerificationCode === verificationCode.toString()) {
  //       alert("인증 번호가 확인되었습니다.");

  //       if (
  //         checkIdDisplay === "block" &&
  //         checkPasswordDisplay === "block" &&
  //         checkConfirmpasswdDisplay === "block" &&
  //         checkEmailDisplay === "block" &&
  //         checknameDisplay === "block" &&
  //         checkNicknameDisplay === "block"
  //       ) {
  //         axios
  //           .post("http://localhost:8080/auth/register", {
  //             studentId,
  //             email,
  //             password,
  //             username,
  //             nickname,
  //           })
  //           .then((response) => {
  //             alert(username + "님, 회원가입을 축하합니다.");
  //             move("/login");
  //           })
  //           .catch((error) => {
  //             if (error.response.status === 401) {
  //               setClearIdDisplay("block");
  //               setCheckIdDisplay("none");
  //               alert("이미 가입된 학번입니다.");
  //             } else if (error.response.status === 402) {
  //               setClearNicknameDisplay("block");
  //               setCheckNicknameDisplay("none");
  //               alert("이미 사용중인 닉네임입니다.");
  //             }
  //           });
  //       }
  //     } else {
  //       alert("인증 번호가 일치하지 않습니다.");
  //     }
  //   } else {
  //     sendEmail();
  //   }
  // };

  //인증코드 주석해놨을때 쓰는 onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      checkIdDisplay === "block" &&
      checkPasswordDisplay === "block" &&
      checkConfirmpasswdDisplay === "block" &&
      checkEmailDisplay === "block" &&
      checknameDisplay === "block" &&
      checkNicknameDisplay === "block"
    ) {
      axios
        .post("http://localhost:8080/auth/register", {
          studentId,
          email,
          password,
          username,
          nickname,
        })
        .then(() => {
          alert(username + "님, 회원가입을 축하합니다.");
          move("/login");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setClearIdDisplay("block");
            setCheckIdDisplay("none");
            alert("이미 가입된 학번입니다.");
          } else if (error.response.status === 402) {
            setClearNicknameDisplay("block");
            setCheckNicknameDisplay("none");
            alert("이미 사용중인 닉네임입니다.");
          }
        });
    }
  };

  return (
    <div id="register-container">
      <h2>에브리한성 회원가입</h2>
      <p className="description">
        에브리한성 계정으로 다양한 대학생 서비스를 이용하실 수 있습니다.
      </p>

      <div className="input">
        <div className="label">
          <label>아이디</label>
        </div>
        <div className="inputbox idAvailable">
          <input
            onChange={studentIdCheck}
            type="text"
            name="user_id"
            maxLength="20"
            placeholder="학번을 입력하세요."
            className="search id_search"
          />
          <CheckIcon
            className="checkIcon"
            style={{ display: checkIdDisplay }}
          />
          <ClearIcon
            className="clearIcon"
            style={{ display: clearIdDisplay }}
          />
        </div>
      </div>

      <div className="input">
        <div className="label">
          <label>비밀번호</label>
        </div>
        <div className="inputbox">
          <input
            onChange={passwordCheck}
            type="password"
            name="password"
            maxLength="20"
            placeholder="소문자, 숫자, 특수문자를 포함하여 8자 이상 입력하세요."
            className="search"
          />
          <CheckIcon
            className="checkIcon"
            style={{ display: checkPasswordDisplay }}
          />
          <ClearIcon
            className="clearIcon"
            style={{ display: clearPasswordDisplay }}
          />
        </div>
      </div>

      <div className="input">
        <div className="label">
          <label>비밀번호 확인</label>
        </div>
        <div className="inputbox">
          <input
            onChange={confirmPasswordCheck}
            type="password"
            name="user_repw"
            maxLength="20"
            placeholder="비밀번호를 다시 입력하세요."
            className="search"
          />
          <CheckIcon
            className="checkIcon"
            style={{ display: checkConfirmpasswdDisplay }}
          />
          <ClearIcon
            className="clearIcon"
            style={{ display: clearConfirmpasswdDisplay }}
          />
        </div>
      </div>

      <div className="input">
        <div className="label">
          <label>이름</label>
        </div>
        <div className="inputbox">
          <input
            onChange={nameCheck}
            type="text"
            name="userName"
            maxLength="20"
            placeholder="이름을 입력하세요."
            className="search"
          />
          <CheckIcon
            className="checkIcon"
            style={{ display: checknameDisplay }}
          />
          <ClearIcon
            className="clearIcon"
            style={{ display: clearnameDisplay }}
          />
        </div>
      </div>

      <div className="input">
        <div className="label">
          <label>닉네임</label>
        </div>
        <div className="inputbox">
          <input
            onChange={nicknameCheck}
            type="text"
            name="user_nickName"
            maxLength="20"
            placeholder="닉네임을 입력하세요."
            className="search"
          />
          <CheckIcon
            className="checkIcon"
            style={{ display: checkNicknameDisplay }}
          />
          <ClearIcon
            className="clearIcon"
            style={{ display: clearNicknameDisplay }}
          />
        </div>
      </div>
      <div className="input">
        <div className="label">
          <label>이메일</label>
        </div>
        <div className="inputbox">
          <input
            onChange={emailCheck}
            type="email"
            name="user_email"
            maxLength="50"
            placeholder="ex) ******@hansung.ac.kr "
            className="search"
          />
          <CheckIcon
            className="checkIcon"
            style={{ display: checkEmailDisplay }}
          />
          <ClearIcon
            className="clearIcon"
            style={{ display: clearEmailDisplay }}
          />
        </div>
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
        {!isHansungEmail && (
          <div className="important-sm p-1">
            <strong>
              * 한성대학교 이메일(@hansung.ac.kr)로 입력해주세요. <br />
              회원 가입 후에는 자주 사용하는 이메일로 변경 가능합니다.
            </strong>
          </div>
        )}
        {isHansungEmail && (
          <button className="lec-button mb-3" type="submit" onClick={onSubmit}>
            가입하기
            {/* {isVerificationCodeSent ? "가입하기" : "이메일 인증"} */}
          </button>
        )}
      </div>

      <br />

      <p className="find">
        <a href="/login">로그인하기</a>
      </p>
    </div>
  );
};

export default SingUpPage;

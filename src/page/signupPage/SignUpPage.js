import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SignUpPage.css";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";

const SingUpPage = () => {
  const move = useNavigate();
  // const { nick } = useParams();

  const [studentId, setStudentId] = useState("none");
  const [passwd, setPasswd] = useState("none");
  const [email, setEmail] = useState("none");
  const [username, setUsername] = useState("none");
  const [nickname, setNickname] = useState("none");

  const [checkIdDisplay, setCheckIdDisplay] = useState("none");
  const [clearIdDisplay, setClearIdDisplay] = useState("none");

  const [checkPasswdDisplay, setCheckPasswdDisplay] = useState("none");
  const [clearPasswdDisplay, setClearPasswdDisplay] = useState("none");

  const [checkConfirmpasswdDisplay, setCheckConfirmpasswdDisplay] = useState("none");
  const [clearConfirmpasswdDisplay, setClearConfirmpasswdDisplay] = useState("none");

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

  const passwdCheck = (e) => {
    const regex =
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,}$/;

    if (regex.test(e.target.value)) {
      setPasswd(e.target.value);
      setCheckPasswdDisplay("block");
      setClearPasswdDisplay("none");
    } else {
      setClearPasswdDisplay("block");
      setCheckPasswdDisplay("none");
    }
  };

  const confirmPasswdCheck = (e) => {
    if (e.target.value !== passwd) {
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
      } else {
        setClearEmailDisplay("block");
        setCheckEmailDisplay("none");
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

  //수정한 코드
  // const getNickname = async (nick) => {
  //   try {
  //     const res = await axios.get(`http://localhost:8080/members/${nick}`);
  //     return res.data;
  //   } catch (error) {
  //     if (error.res && error.res.status === 404) {
  //       return null;
  //     } else {
  //       console.error(error);
  //     }
  //   }
  // };

  // const nicknameCheck = async (e) => {
  //   try {
  //     const isDuplicate = await getNickname(e.target.value);
  //     if (!isDuplicate) {
  //       setNickname(e.target.value);
  //       setCheckNicknameDisplay("block");
  //       setClearNicknameDisplay("none");
  //     } else {
  //       setClearNicknameDisplay("block");
  //       setCheckNicknameDisplay("none");
  //       alert("이미 사용중인 닉네임입니다.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //  원래 검사하는 코드

  // const checkNickname = (nick) => {
  //   axios
  //     .get(`http://localhost:8080/members/${nick}`)
  //     .then((res) => console.log(res.data))
  //     .catch((err) => {
  //       if (err.response) {
  //         if (err.response.status === 401) {
  //           setClearIdDisplay("block");
  //           setCheckIdDisplay("none");
  //           alert('이미 가입된 학번입니다.');
  //         } else if (err.response.status === 402) {
  //           setClearnameDisplay("block");
  //           setChecknameDisplay("none");
  //           alert('이미 사용중인 닉네임입니다.');
  //         } else {
  //           alert('로그인에 실패했습니다.');
  //         }
  //       } else {
  //         alert('서버에 연결할 수 없습니다.');
  //       }
  //     });
  // };

  // const nicknameCheck = (e) => {
  //   try {
  //     if (getNickname(e.target.value) != null) {
  //       setNickname(e.target.value);
  //       setCheckNicknameDisplay("block");
  //       setClearNicknameDisplay("none");
  //     }
  //   } catch (e) {
  //     setClearNicknameDisplay("block");
  //     setCheckNicknameDisplay("none");
  //     alert("이미 사용중인 닉네임입니다.");
  //   }
  // };

  const onSubmit = (e) => {
    if (checkIdDisplay === "block" && 
      checkPasswdDisplay === "block" && 
      checkConfirmpasswdDisplay === "block" && 
      checkEmailDisplay === "block" &&
      checknameDisplay === "block" &&
      checkNicknameDisplay === "block") {
        axios.post("http://localhost:8080/register", {
          studentId,
          email,
          passwd,
          username,
          nickname
        })
        .then((response) => {
          alert(username + "님, 회원가입을 축하합니다.");
          move("/login");
        })
        .catch((error) => {
          if (error.response.status === 401) {
              alert('이미 가입된 학번입니다.');
          } else if (error.response.status === 402) {
            alert('이미 사용중인 닉네임입니다.');
          }
        })
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
          <label>학번</label>
        </div>
        <div className="inputbox idAvailable">
          <input
            onChange={studentIdCheck}
            type="text"
            name="user_id"
            maxLength="20"
            placeholder="아이디를 입력하세요."
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
            onChange={passwdCheck}
            type="password"
            name="passwd"
            maxLength="20"
            placeholder="소문자, 숫자, 특수문자를 포함하여 8자 이상 입력하세요."
            className="search"
          />
          <CheckIcon
            className="checkIcon"
            style={{ display: checkPasswdDisplay }}
          />
          <ClearIcon
            className="clearIcon"
            style={{ display: clearPasswdDisplay }}
          />
        </div>
      </div>
      <div className="input">
        <div className="label">
          <label>비밀번호 확인</label>
        </div>
        <div className="inputbox">
          <input
            onChange={confirmPasswdCheck}
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
          <label>이메일</label>
        </div>
        <div className="inputbox">
          <input
            onChange={emailCheck}
            type="email"
            name="user_email"
            maxLength="50"
            placeholder="이메일을 입력하세요."
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
            placeholder="닉네임(별명)을 입력하세요."
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
      <button onClick={onSubmit} type="submit">
        가입하기
      </button>
      <br />
      <p className="find">
        <a href="/login">로그인하기</a>
      </p>
    </div>
  );
};

export default SingUpPage;

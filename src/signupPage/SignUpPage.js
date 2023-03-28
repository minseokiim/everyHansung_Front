import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './SignUpPage.css';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';

const SingUpPage = () => {
    const move = useNavigate();
    
    const [studentId, setStudentId] = useState("none");
    const [passwd, setPasswd] = useState("none");
    const [email, setEmail] = useState("none");
    const [userName, setUserName] = useState("none");
    const [nickName, setnickName] = useState("none");

    const [checkIdDisplay, setCheckIdDisplay] = useState("none");
    const [clearIdDisplay, setClearIdDisplay] = useState("none");

    const [checkPasswdDisplay, setCheckPasswdDisplay] = useState("none");
    const [clearPasswdDisplay, setClearPasswdDisplay]= useState("none");

    const [checkConfirmpasswdDisplay, setCheckConfirmpasswdDisplay] = useState("none");
    const [clearConfirmpasswdDisplay, setClearConfirmpasswdDisplay] = useState("none");

    const [checkEmailDisplay, setCheckEmailDisplay] = useState("none");
    const [clearEmailDisplay, setClearEmailDisplay] = useState("none");

    const [checkNameDisplay, setCheckNameDisplay] = useState("none");
    const [clearNameDisplay, setClearNameDisplay] = useState("none");

    const [checknickNameDisplay, setChecknickNameDisplay] = useState("none");
    const [clearnickNameDisplay, setClearnickNameDisplay] = useState("none");

    const studentIdCheck = (e) => {
        try {
            if(e.target.value.length === 7) {
                setStudentId(e.target.value);
                setCheckIdDisplay("block");
                setClearIdDisplay("none");
            } else{
                setClearIdDisplay("block");
                setCheckIdDisplay("none");
            }
        } catch(e) {

        }
    };

    const passwdCheck = (e) => {
        const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,}$/;

        if(regex.test(e.target.value)) {
            setPasswd(e.target.value);
            setCheckPasswdDisplay("block");
            setClearPasswdDisplay("none");
        } else {
            setClearPasswdDisplay("block");
            setCheckPasswdDisplay("none");
        }
    };

    const confirmPasswdCheck = (e) => {
        if(e.target.value !== passwd) {
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
            if(regex.test(e.target.value)) {
                setEmail(e.target.value);
                setCheckEmailDisplay("block");
                setClearEmailDisplay("none");
            } else {
                setClearEmailDisplay("block");
                setCheckEmailDisplay("none");
            }
        } catch(e) {

        }
    };

    const nameCheck = (e) => {
        if(e.target.value.length >= 3) {
            setUserName(e.target.value);
            setCheckNameDisplay("block");
            setClearNameDisplay("none");
        } else {
            setClearNameDisplay("block");
            setCheckNameDisplay("none");
        }
    };

    const nickNameCheck = (e) => {
        try {
            if( e.target.value.length >= 3) {
                setnickName(e.target.value);
                setChecknickNameDisplay("block");
                setClearnickNameDisplay("none");
            } else {
                setClearnickNameDisplay("block");
                setChecknickNameDisplay("none");
            }
        } catch(e) {

        }
    };

    const onSubmit = (e) => {
      e.preventDefault();
      
        if(checkIdDisplay === "block" && checkPasswdDisplay === "block" && checkConfirmpasswdDisplay === "block" && checkEmailDisplay === "block" && checkNameDisplay === "block" && checknickNameDisplay === "block" ) {
          axios.post("http://localhost:8080/register", {
            studentId,
            email, 
            passwd,
            userName,
            nickName
          })
          alert(userName + "님, 회원가입을 축하합니다.");
          move("/login")
        } else {
            alert("입력사항을 다시 확인해주세요.");
        }
        
    };

    return (
        <div id="register-container">
            <h2>에브리타임 회원가입</h2>
            <p className="description">에브리타임 계정으로 <strong>캠퍼스픽, 에브리타임</strong> 등<br />다양한 대학생 서비스를 모두 이용하실 수 있습니다.</p>
            <div className="input">
                <div className="label"><label>학번</label></div>
                <div className="inputbox idAvailable">
                    <input onChange={studentIdCheck} type="text" name="user_id" maxlength="20" placeholder="아이디를 입력하세요." className="search id_search" />
                    <CheckIcon className="checkIcon"style={{ display: checkIdDisplay }}/>    
                    <ClearIcon className="clearIcon" style={{ display: clearIdDisplay }}/>    
                </div>
            </div>
            <div className="input">
                <div className="label"><label>비밀번호</label></div>
                <div className="inputbox">
                    <input onChange={passwdCheck} type="password" name="passwd" maxlength="20" placeholder="소문자, 숫자, 특수문자를 포함하여 8자 이상 입력하세요." className="search" />
                    <CheckIcon className="checkIcon"style={{ display: checkPasswdDisplay }}/>    
                    <ClearIcon className="clearIcon" style={{ display: clearPasswdDisplay }}/>  
                </div>
            </div>
            <div className="input">
                <div className="label"><label>비밀번호 확인</label></div>
                <div className="inputbox">
                    <input onChange={confirmPasswdCheck} type="password" name="user_repw" maxlength="20" placeholder="비밀번호를 다시 입력하세요." className="search" />
                    <CheckIcon className="checkIcon"style={{ display: checkConfirmpasswdDisplay }}/>    
                    <ClearIcon className="clearIcon" style={{ display: clearConfirmpasswdDisplay }}/>  
                </div>
            </div>
            <div className="input">
                <div className="label"><label>이메일</label></div>
                <div className="inputbox">
                    <input onChange={emailCheck} type="email" name="user_email" maxlength="50" placeholder="이메일을 입력하세요." className="search" />
                    <CheckIcon className="checkIcon"style={{ display: checkEmailDisplay }}/>    
                    <ClearIcon className="clearIcon" style={{ display: clearEmailDisplay }}/>  
                </div>
            </div>
            <div className="input">
                <div className="label"><label>이름</label></div>
                <div className="inputbox">
                    <input onChange={nameCheck} type="text" name="userName" maxlength="20" placeholder="이름을 입력하세요." className="search" />
                    <CheckIcon className="checkIcon"style={{ display: checkNameDisplay }}/>    
                    <ClearIcon className="clearIcon" style={{ display: clearNameDisplay }}/>  
                </div>
            </div>
            <div className="input">
                <div className="label"><label>닉네임</label></div>
                <div className="inputbox">
                    <input onChange={nickNameCheck} type="text" name="user_nickName" maxlength="20" placeholder="닉네임(별명)을 입력하세요." className="search" />
                    <CheckIcon className="checkIcon"style={{ display: checknickNameDisplay }}/>    
                    <ClearIcon className="clearIcon" style={{ display: clearnickNameDisplay }}/>  
                </div>
            </div>
            <button onClick={onSubmit} type="submit">가입하기</button>
        </div>
    )    
}

export default SingUpPage;

import "./MessagePage.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { BsFillSendFill } from "react-icons/bs";
import apiClient from "../../apiClient";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SendMessagePage = ({ isOpen, onRequestClose, isClose }) => {
  //보내고 난 후에는 modal이 close되게?

  const [message, setMessage] = useState("");
  const move = useNavigate();
  const [nickname, setNickname] = useState(""); //익명이랑 닉네임 선택 위해
  const { id } = useParams();
  const studentId = localStorage.getItem("studentId"); //발신자 정보
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [postId, setPostId] = useState(""); //작성자 정보 저장

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const getPostId = (id) => {
    axios.get(`http://localhost:8080/freeboard/${id}`).then((res) => {
      setPostId(res.data.studentId); //작성자 정보 받아오기
    });
  };

  useEffect(() => {
    if (studentId) {
      apiClient
        .get(`http://localhost:8080/member/${studentId}`)
        .then((res) => {
          setNickname(res.data.nickname);
        })
        .catch((error) => {
          console.error("Error fetching name:", error);
        });
    } else {
      console.log("닉네임 못받아옴");
    }
  }, [studentId]);

  const onSubmit = (e) => {
    e.preventDefault();
    getPostId(id);

    if (message.trim().length === 0) {
      alert("쪽지 내용을 입력하세요");
      return;
    } else {
      apiClient
        .post("http://localhost:8080/message", {
          studentId,
          message,
          isAnonymous,
          nickname,
          //시간은 백엔드에서 처리
        })
        .then(() => {
          move("/messages");
        });
    }
  };

  const onChangeIsAnonymous = (e) => {
    setIsAnonymous(e.target.checked);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <form className="p-4">
          <textarea
            className="message-input"
            rows="10"
            cols="40"
            placeholder="쪽지를 입력해주세요."
            value={message}
            onChange={handleMessageChange}
          />
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={onChangeIsAnonymous}
          />
          익명
          <br />
          <BsFillSendFill className="message-button" onClick={onSubmit} />
        </form>
      </Modal>
    </div>
  );
};

export default SendMessagePage;

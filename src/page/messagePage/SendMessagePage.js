import "./MessagePage.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { BsFillSendFill } from "react-icons/bs";
import apiClient from "../../apiClient";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SendMessagePage = ({ isOpen, onRequestClose, isClose }) => {
  //보내고 난 후에는 modal이 close되게?
  const [content, setContent] = useState("");
  const { id } = useParams();
  const studentId = localStorage.getItem("studentId"); //발신자 정보
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
    setContent(e.target.value);
  };

  const getPostId = (id) => {
    axios.get(`http://localhost:8080/freeboard/${id}`).then((res) => {
      setPostId(res.data.studentId); //작성자 정보 받아오기
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getPostId(id);

    if (content.trim().length === 0) {
      alert("쪽지 내용을 입력하세요");
      return;
    } else {
      apiClient
        .post("http://localhost:8080/message", {
          receiver: postId,
          sender: studentId,
          content,
          //시간은 백엔드에서 처리
        })
        .then(() => {
          alert("전송 완료");
          setContent("");
        });
    }
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
            value={content}
            onChange={handleMessageChange}
          />

          <br />
          <BsFillSendFill className="message-button" onClick={onSubmit} />
        </form>
      </Modal>
    </div>
  );
};

export default SendMessagePage;

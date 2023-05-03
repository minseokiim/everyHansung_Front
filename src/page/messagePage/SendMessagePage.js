import "./MessagePage.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { BsFillSendFill } from "react-icons/bs";
import apiClient from "../../apiClient";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SendMessagePage = ({ isOpen, onRequestClose, isClose }) => {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const studentId = localStorage.getItem("studentId");
  const [postId, setPostId] = useState("");

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

  const getPostId = async (id) => {
    const res = await axios.get(`http://localhost:8080/freeboard/${id}`);
    setPostId(res.data.studentId);
    console.log("작성자 정보 " + res.data.studentId);
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
        })
        .then(() => {
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

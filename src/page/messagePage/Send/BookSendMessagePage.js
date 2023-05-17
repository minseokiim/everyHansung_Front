import "../MessagePage.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { BsFillSendFill } from "react-icons/bs";
import apiClient from "../../../apiClient";
import { useParams } from "react-router-dom";
import axios from "axios";
import { VscChromeClose } from "react-icons/vsc";

const BookSendMessagePage = ({ isOpen, onRequestClose }) => {
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
    const res = await axios.get(`http://localhost:8080/book/${id}`);

    return res.data.studentId;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const postId = await getPostId(id);

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
          onRequestClose();
          alert("쪽지가 전송되었습니다");
        })
        .catch((error) => {
          console.error(error);
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
        <VscChromeClose
          className="message-button message-icon"
          onClick={onRequestClose}
        />
        <form className="p-4">
          <textarea
            className="message-input"
            rows="10"
            cols="40"
            placeholder="쪽지 내용을 입력해주세요."
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

export default BookSendMessagePage;

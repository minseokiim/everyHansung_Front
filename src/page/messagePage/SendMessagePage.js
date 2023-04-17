import "./MessagePage.css";
import React, { useState } from "react";
import Modal from "react-modal";
import { BsFillSendFill } from "react-icons/bs";

const SendMessagePage = ({ isOpen, onRequestClose, isClose }) => {
  //보내고 난 후에는 modal이 close되게 추가?

  const [message, setMessage] = useState("");

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

  const handleClick = (e) => {
    e.preventDefault();
    //내용, 시간, 발신자(익명) post해주기
    setMessage("");
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
          <br />
          <BsFillSendFill className="message-button" onClick={handleClick} />
        </form>
      </Modal>
    </div>
  );
};

export default SendMessagePage;

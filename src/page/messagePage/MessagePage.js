import "./MessagePage.css";
import React, { useState } from "react";
import Modal from "react-modal";
import { BiMessage } from "react-icons/bi";
import { BsFillSendFill } from "react-icons/bs";

const MessagePage = () => {
  const [message, setMessage] = useState("");
  const [dearId, setDearId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(true);

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

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    //내용, 시간, 발신자&수신자 post해주기(익명으로 전송되게)
    setMessage("");
    setDearId("");
  };

  const dearChange = (e) => {
    setDearId(e.target.value);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form className="p-4">
          {/* <input
            className="message-input"
            placeholder="수신자의 학번을 입력해주세요."
            type="text"
            value={dearId}
            onChange={dearChange}
          /> */}
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

export default MessagePage;

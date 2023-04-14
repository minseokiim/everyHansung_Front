import "./MessagePage.css";
import React, { useState } from "react";

const MessagePage = () => {
  const [message, setMessage] = useState("");
  const [dearId, setDearId] = useState("");

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
      <form className="p-3">
        <input
          className="message-input"
          placeholder="수신자의 학번을 입력해주세요."
          type="text"
          value={dearId}
          onChange={dearChange}
        />
        <textarea
          className="message-input"
          rows="10"
          cols="30"
          placeholder="쪽지를 입력해주세요."
          value={message}
          onChange={handleMessageChange}
        />
        <br />
        <button className="message-button" onClick={handleClick}>
          전송
        </button>
      </form>
    </div>
  );
};

export default MessagePage;

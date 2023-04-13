import "./MessagePage.css";
import React, { useState } from "react";

const MessagePage = () => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
  };

  return (
    <div>
      <form className="p-3">
        <textarea
          className="message-input"
          rows="10"
          cols="30"
          placeholder="쪽지를 입력해주세요."
          value={message}
          onChange={handleMessageChange}
        />
        <button className="message-button">전송</button>
      </form>
    </div>
  );
};

export default MessagePage;

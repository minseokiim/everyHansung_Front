import "./ChatBotPage.css";

const ChatBotInput = ({ newMessage, handleChange, handleMessageSubmit }) => {
  return (
    <div>
      {/* 메시지 입력 폼을 작성합니다. */}
      <form className="chat-form" onSubmit={handleMessageSubmit}>
        <input
          className="chat-input"
          type="text"
          value={newMessage}
          onChange={handleChange}
          placeholder="질문을 입력해주세요."
        />
        <button className="chat-button">전송</button>
      </form>
    </div>
  );
};
export default ChatBotInput;

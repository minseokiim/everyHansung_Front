import "./MessagePage.css";

const MessagePage = () => {
  return (
    <div>
      <form className="form">
        <input
          className="message-input"
          type="text"
          placeholder="쪽지를 입력해주세요."
        />
        <button className="message-button">전송</button>
      </form>
    </div>
  );
};

export default MessagePage;

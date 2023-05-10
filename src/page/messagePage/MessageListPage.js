import { useState, useEffect } from "react";
import apiClient from "../../apiClient";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./MessagePage.css";

const MessageListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    apiClient
      .get(`http://localhost:8080/message/${studentId}/all`)
      .then((res) => {
        setMessages(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getMessages();
  }, []);

  const timeDifference = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    const days = Math.floor(diffInSeconds / 86400);
    const hours = Math.floor((diffInSeconds % 86400) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return `${seconds}초 전`;
    }
  };

  return (
    <div className="p-3">
      <strong className="p-3">쪽지함</strong> <hr />
      {messages.length > 0
        ? messages.map((message) => {
            return (
              <div
                key={message.id}
                className=" card-body cursor-pointer"
                onClick={() => {
                  navigate(`/message/${studentId}`);
                }}
              >
                <div>
                  {message.content}
                  <br />
                  <div className="big-grey">
                    <div className="grey ">
                      {timeDifference(message.createdAt)}&nbsp; &nbsp;
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : "쪽지가 없습니다"}
    </div>
  );
};
export default MessageListPage;

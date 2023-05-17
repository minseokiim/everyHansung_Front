import { useState, useEffect } from "react";
import apiClient from "../../../apiClient";
import { useNavigate } from "react-router-dom";
import "../MessagePage.css";
import { BiTimeFive } from "react-icons/bi";
import { TbMessagesOff } from "react-icons/tb";
import { HiBellAlert } from "react-icons/hi2";

const ReceivedMessageListPage = () => {
  const move = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    apiClient
      .get(`http://localhost:8080/message/${studentId}/all`)
      .then((res) => {
        const validMessages = res.data.filter(
          (message) => message && message.content
        );
        const sortedMessages = validMessages.sort((a, b) => b.id - a.id);
        setMessages(sortedMessages);
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
    <>
      <div className="p-4">
        <strong>쪽지함</strong>
        &nbsp;&nbsp;
        <hr />
        {messages.length > 0 ? (
          messages.map((message) => {
            return (
              <div key={message.id}>
                <div
                  className="card-body cursor-pointer"
                  onClick={() => {
                    move(`/message/${message.room.id}`);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0",
                    }}
                  >
                    {message.content.length > 30
                      ? `${message.content.substring(0, 30)}...`
                      : message.content}
                    &nbsp;
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "auto",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {!message.readCheck && message.receiver === studentId && (
                        <HiBellAlert
                          className="m-1"
                          style={{ color: "#c62917" }}
                        />
                      )}
                    </span>
                  </div>
                  <span className="grey">
                    <BiTimeFive /> {timeDifference(message.sendTime)}&nbsp;
                    &nbsp;
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <h4>
              <TbMessagesOff />
            </h4>
            <div>주고 받은 쪽지가 없습니다.</div>

            <div className="grey pt-1">
              쪽지는 자유게시판, 비밀게시판, 책방을 통해 보낼 수 있어요!
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ReceivedMessageListPage;

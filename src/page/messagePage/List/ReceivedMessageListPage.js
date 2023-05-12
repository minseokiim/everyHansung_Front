import { useState, useEffect } from "react";
import apiClient from "../../../apiClient";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../MessagePage.css";
import ReplyMessagePage from "../Send/ReplyMessagePage";
import { BiTimeFive, BiMessage } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";

const ReceivedMessageListPage = () => {
  const move = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const [messages, setMessages] = useState([]);
  const [openModalMessageId, setOpenModalMessageId] = useState(null);
  const [refresh, setRefresh] = useState(false);

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

  const deleteMessage = async (id) => {
    try {
      await apiClient.delete(`http://localhost:8080/message/room/${id}`);
      alert("쪽지가 삭제되었습니다.");
    } catch (error) {
      alert("쪽지 삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="p-4">
        <strong>쪽지함</strong>
        &nbsp;&nbsp;
        <hr />
        {messages.length > 0
          ? messages.map((message) => {
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
                      {message.content}

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
                        <BiMessage
                          className="cursor-pointer icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenModalMessageId(message.id);
                          }}
                        />
                        &nbsp;
                        <ReplyMessagePage
                          isOpen={openModalMessageId === message.id}
                          onRequestClose={() => setOpenModalMessageId(null)}
                          messageSender={message.sender}
                          setRefresh={setRefresh}
                        />
                        <BsFillTrashFill
                          className="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              window.confirm(
                                "쪽지 내용을 모두 삭제하시겠습니까?"
                              )
                            ) {
                              deleteMessage(message.room.id);
                            }
                          }}
                        />
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
          : "쪽지가 없습니다"}
      </div>
    </>
  );
};
export default ReceivedMessageListPage;

import "./Message.css";
import apiClient from "../../../apiClient";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReplyMessagePage from "../Send/ReplyMessagePage";
import React from "react";
import {
  BsFillSendFill,
  BsFillPersonFill,
  BsFillTrashFill,
} from "react-icons/bs";
import config from "../../../config";

const ShowRoomPage = () => {
  const studentId = localStorage.getItem("studentId");
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const [refresh, setRefresh] = useState(false);

  const [openModalMessageId, setOpenModalMessageId] = useState(null);

  const getMessages = () => {
    apiClient
      .get(`${config.API_BASE_URL}/message/room/${id}/${studentId}`)
      .then((res) => {
        setMessages(res.data);
      });
  };

  useEffect(() => {
    getMessages();
  }, [id, refresh]);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(new Date(date));
  };

  const deleteMessage = async (id) => {
    try {
      await apiClient.delete(`${config.API_BASE_URL}/message/room/${id}`);
      alert("쪽지가 삭제되었습니다.");

      setMessages(messages.filter((message) => message.room.id !== id));
    } catch (error) {
      alert("쪽지 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="p-4">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>주고 받은 쪽지</strong>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {messages.map((message) => {
            if (
              studentId !== message.sender &&
              // message.sender !== "admin" &&
              message.id ===
                messages.filter((msg) => studentId !== msg.sender).slice(-1)[0]
                  .id
            ) {
              return (
                <React.Fragment key={message.id}>
                  <BsFillSendFill
                    className="cursor-pointer message-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenModalMessageId(message.id);
                    }}
                  />
                  <ReplyMessagePage
                    isOpen={openModalMessageId === message.id}
                    onRequestClose={() => setOpenModalMessageId(null)}
                    messageSender={message.sender}
                    setRefresh={setRefresh}
                  />
                  &nbsp;
                  <BsFillTrashFill
                    className="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("쪽지방을 나가시겠습니까?")) {
                        deleteMessage(message.room.id);
                      }
                    }}
                  />
                </React.Fragment>
              );
            }
            return null;
          })}
        </div>
      </div>
      <hr />
      <div className="pl-2">
        {messages.map((message) => (
          <div key={message.id}>
            {studentId !== message.sender && (
              <div className="p-1">
                <div className="message-left-box ">
                  <span>
                    <BsFillPersonFill /> &nbsp;
                  </span>
                  <div className="message-left p-2">{message.content} </div>
                  &nbsp;
                </div>
                <div className="message-left-box grey pt-2">
                  {/* &nbsp; &nbsp; &nbsp; &nbsp; */}
                  {formatDate(message.sendTime)}
                </div>
              </div>
            )}

            {studentId === message.sender && (
              <div>
                <div className="message-right-box">
                  <div className="message-right p-2">{message.content} </div>
                  &nbsp;
                  <span>
                    <BsFillPersonFill />
                  </span>
                </div>
                <div className="message-right-box grey">
                  {formatDate(message.sendTime)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <hr />
      <div className="grey">
        * 쪽지 이용 시 개인정보 및 금융정보 보호에 유의해주시기 바랍니다.
      </div>
    </div>
  );
};

export default ShowRoomPage;

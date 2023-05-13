import apiClient from "../../../apiClient";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReplyMessagePage from "../Send/ReplyMessagePage";
import { BiTimeFive, BiMessage } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import React from "react";

const ShowRoomPage = () => {
  const studentId = localStorage.getItem("studentId");
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const [refresh, setRefresh] = useState(false);

  const [openModalMessageId, setOpenModalMessageId] = useState(null);

  const getMessages = () => {
    apiClient.get(`http://localhost:8080/message/room/${id}`).then((res) => {
      setMessages(res.data);
      console.log(res.data);
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

  return (
    <div className="p-4">
      <strong>주고 받은 쪽지</strong>
      <hr />
      <div className="p-2">
        {messages.map((message) => (
          <div key={message.id}>
            {studentId !== message.sender && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
                className="p-1"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BsFillPersonFill />
                  <span>: {message.content} </span>&nbsp;
                  <BiMessage
                    className="cursor-pointer icon"
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
                </div>
                <div className="grey">{formatDate(message.sendTime)}</div>
              </div>
            )}
            {studentId === message.sender && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
                className="p-1"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <span> {message.content} :</span>
                  <BsFillPersonFill />
                </div>
                <div className="grey">{formatDate(message.sendTime)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <hr />
      <div className="grey">
        쪽지 이용 시 개인정보 및 금융정보 보호에 유의해주시기 바랍니다.
      </div>
    </div>
  );
};

export default ShowRoomPage;

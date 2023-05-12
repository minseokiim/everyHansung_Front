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

  return (
    <div className="p-4">
      <strong>주고 받은 쪽지</strong>
      <hr />
      {messages.map((message, index) => (
        <React.Fragment key={message.id}>
          {studentId !== message.sender && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <BsFillPersonFill />
              <span>: {message.content}</span>
              {/* 
              시간 보이는 부분 수정->timeDifference로!
              <span className="grey">{message.sendTime}</span> */}
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
          )}

          {studentId === message.sender && (
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
          )}

          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ShowRoomPage;

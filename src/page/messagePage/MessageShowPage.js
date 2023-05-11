import apiClient from "../../apiClient";
import { useState, useEffect } from "react";

//쪽지 누르면 보이는 페이지: 쪽지방의 내부를 보여줌
//수신자가 a발신자가b 또는 수신자가 b발신자가a면 다 나오게 하고
//++ 최신 문자도 따로 리턴해서 리스트에서 보여지게 추가?
//주소는 message/id로 바꿈

const MessageShowPage = () => {
  const studentId = localStorage.getItem("studentId");

  // const [messages, setMessages] = useState([]);
  // const [sender, useSender] = useState("");
  // const [receiver, useReceiver] = useState("");
  // useEffect(() => {
  //   apiClient
  //     .get(`http://localhost:8080/message/message/${studentId}/all`)
  //     .then((response) => {
  //       setMessages(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error", error);
  //     });
  //   apiClient
  //     .get(`http://localhost:8080/message/message/${sender}/${receiver}`)
  //     .then((response) => {
  //       setMessages(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error", error);
  //     });
  // }, []);
  // return (
  //   <div>
  //     {messages.map((message, index) => (
  //       <div key={index}>
  //         <h2>{message.title}</h2>
  //         <p>{message.body}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default MessageShowPage;

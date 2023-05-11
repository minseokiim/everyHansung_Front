import apiClient from "../../apiClient";
import { useState, useEffect } from "react";

const MessageShowPage = () => {
  // const [messages, setMessages] = useState([]);
  // const studentId = localStorage.getItem("studentId");
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

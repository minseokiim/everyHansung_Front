// import React, { useState, useEffect } from "react";
// import "./ChatBotPage.css";
// import axios from "axios";
// import ChatBotInput from "./ChatBotInput";

// function ChatBotPage() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   // const logo = <img alt="hansung" src="img/chatlogo.png" className="logo" />;

//   useEffect(() => {
//     // 초기 메시지를 생성합니다.
//     const initialMessage = {
//       // logo,
//       content: "안녕하세요! 무엇을 도와드릴까요?",
//       isBot: true,
//     };
//     setMessages([initialMessage]);
//   }, []);

//   async function handleMessageSubmit(event) {
//     event.preventDefault();

//     if (newMessage.trim().length === 0) {
//       alert("메세지를 입력하세요");
//       return;
//     }

//     // 사용자 메시지를 추가합니다.
//     setMessages([...messages, { content: newMessage, isBot: false }]);
//     setNewMessage("");

//     // ChatGPT와 대화합니다.
//     const botMessage = await fetchBotMessage(newMessage);

//     // 챗봇 답변을 추가합니다.
//     setMessages([...messages, botMessage]);
//   }

//   async function fetchBotMessage(userMessage) {
//     const apiUrl =
//       "https://api.openai.com/v1/engines/davinci-codex/completions";
//     const prompt = `사용자: ${userMessage}\nChatGPT:`;
//     const response = await axios.post(
//       apiUrl,
//       {
//         prompt,
//         max_tokens: 50,
//         temperature: 0.7,
//         n: 1,
//         stop: "\n",
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//         },
//       }
//     );

//     // 챗봇 답변을 생성합니다.
//     const botMessage = {
//       content: response.data.choices[0].text.trim(),
//       isBot: true,
//     };
//     return botMessage;
//   }

//   function handleChange(event) {
//     setNewMessage(event.target.value);
//   }

//   return (
//     <div className="chat-container">
//       {/* 대화 메시지를 보여줍니다. */}
//       {messages.map((message, index) => (
//         <div className="message-container" key={index}>
//           {message.isBot ? (
//             <div className="bot-message">{message.content}</div>
//           ) : (
//             <div className="user-message">{message.content}</div>
//           )}
//         </div>
//       ))}

//       <ChatBotInput
//         newMessage={newMessage}
//         handleChange={handleChange}
//         handleMessageSubmit={handleMessageSubmit}
//       />
//     </div>
//   );
// }

// export default ChatBotPage;

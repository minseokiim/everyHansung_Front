import React from "react";
import ChatBot from "react-simple-chatbot";
import "./NewChatBot.css";

const NewChatBot = () => {
  const steps = [
    {
      id: "1",
      message:
        "안녕하세요! 에브리한성 상담사 챗부기입니다. 질문 시작을 눌러주세요",
      trigger: "2",
    },
    {
      id: "2",
      options: [
        { value: "date", label: "질문 시작", trigger: "3" },
        { value: "end", label: "질문 끝", end: true },
      ],
    },
    {
      id: "3",
      message: "묻고 싶은것을 클릭해주세요",
      trigger: "4",
    },
    {
      id: "4",
      options: [
        { value: "date", label: "학사일정", trigger: "5" },
        { value: "page", label: "학교 페이지", trigger: "2" },
      ],
    },
    {
      id: "5",
      message: "https://www.hansung.ac.kr/sites/hansung/index.do",
      end: true,
    },
  ];

  return (
    <ChatBot
      steps={steps}
      hideHeader={false}
      headerTitle="챗부기"
      placeholder={"채팅이 불가한 채널입니다."}
    />
  );
};

export default NewChatBot;

import React from "react";
import ChatBot from "react-simple-chatbot";
import logo from "./everyhansung.png";
import chatlogo from "./chatlogo.png";

const NewChatBot = () => {
  const steps = [
    {
      id: "1",
      message: "안녕하세요, 챗부기입니다! 질문 시작을 눌러주세요",
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
        { value: "date", label: "학사일정 페이지", trigger: "5" },
        { value: "open", label: "개강", trigger: "6" },
        { value: "mid-exam", label: "중간고사 기간", trigger: "7" },
        { value: "fin-exam", label: "기말고사 기간", trigger: "8" },
        { value: "season", label: "계절학기 개강", trigger: "9" },
        { value: "fin", label: "1학기 종강", trigger: "10" },
        { value: "re", label: "재입학 신청", trigger: "11" },
        { value: "app-2", label: "2학기 수강신청", trigger: "12" },
        { value: "season-fin", label: "계절학기 종강", trigger: "13" },
        { value: "want", label: "휴복학신청", trigger: "14" },
      ],
    },
    {
      id: "5",
      message: "https://www.hansung.ac.kr/sites/hansung/index.do",
      trigger: "3",
    },
    {
      id: "6",
      message: "2023년 3월 2일",
      trigger: "3",
    },
    {
      id: "7",
      message: "4월 20일(목) ~ 4월 26일(수)",
      trigger: "3",
    },
    {
      id: "8",
      message: "6월 8일(목) ~ 6월 21일(수)",
      trigger: "3",
    },
    {
      id: "9",
      message: "6월 22일(목)",
      trigger: "3",
    },
    {
      id: "10",
      message: "6월 21일(수)",
      trigger: "3",
    },

    {
      id: "11",
      message: "6월 5일(월) ~ 6월 12일(월)",
      trigger: "3",
    },

    {
      id: "12",
      message:
        "8월 14일(월) ~8월 18일(금) ** 학년마다 다르니 꼭 페이지 참조하기",
      trigger: "3",
    },
    {
      id: "13",
      message: "7월 12일(수)",
      trigger: "3",
    },
    {
      id: "14",
      message: "8월 1일(화) ~ 8월 25일 (금)",
      trigger: "3",
    },
  ];

  return (
    <ChatBot
      botAvatar={logo}
      userAvatar={chatlogo}
      steps={steps}
      hideHeader={false}
      headerTitle="자주 묻는 질문"
      placeholder={"채팅이 불가한 채널입니다."}
      width="70%" // 챗봇 너비 설정
      height="100%" // 챗봇 높이 설정
      bubbleStyle={{ backgroundColor: "white", color: "navy" }}
      userBubbleStyle={{ backgroundColor: "white", color: "navy" }}
      optionStyle={{ backgroundColor: "white", color: "navy" }}
      optionHoverStyle={{
        backgroundColor: "rgba(0,0,128,0.8)",
        color: "white",
      }}
    />
  );
};

export default NewChatBot;

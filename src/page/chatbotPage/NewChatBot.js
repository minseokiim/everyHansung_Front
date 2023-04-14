import React from "react";
import ChatBot from "react-simple-chatbot";
import logo from "./everyhansung.png";
import chatlogo from "./chatlogo.png";
import { ThemeProvider } from "styled-components";

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
        { value: "academic-schedule", label: "학사일정 페이지", trigger: "5" },
        { value: "start-of-class", label: "개강", trigger: "6" },
        { value: "midterm", label: "중간고사 기간", trigger: "7" },
        { value: "final", label: "기말고사 기간", trigger: "8" },
        { value: "start-of-season", label: "계절학기 개강", trigger: "9" },
        { value: "finish-of-class", label: "1학기 종강", trigger: "10" },
        { value: "re-admission", label: "재입학 신청", trigger: "11" },
        { value: "application-for", label: "2학기 수강신청", trigger: "12" },
        { value: "finish-of-season", label: "계절학기 종강", trigger: "13" },
        {
          value: "leave-or-back-to-school",
          label: "휴복학신청",
          trigger: "14",
        },
        { value: "number", label: "학교 연락처", trigger: "15" },
        { value: "depart-num", label: "단과대학/트랙 연락처", trigger: "26" },
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
      message: "8월 14일(월) ~8월 18일(금)",
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
    {
      id: "15",
      options: [
        { value: "operation", label: "학사운영팀", trigger: "16" },
        { value: "scholarship", label: "학생장학팀", trigger: "17" },
        { value: "employment-support", label: "취업지원팀", trigger: "18" },
        { value: "startup-support", label: "창업지원팀", trigger: "19" },
        { value: "education-support", label: "교육혁신지원팀", trigger: "20" },
        {
          value: "education-develop",
          label: "교육역량개발센터",
          trigger: "21",
        },
        { value: "counseling", label: "학생상담센터", trigger: "22" },
        { value: "info-team", label: "정보화팀 ", trigger: "23" },
        { value: "fac-support", label: "시설지원팀", trigger: "24" },
        { value: "dis-support", label: "장애학생지원센터", trigger: "25" },
      ],
    },
    {
      id: "16",
      message:
        "학적, 교무, 성적, 졸업, 전자출결, 교직, 휴학, 복학 (02-760-4219)",
      trigger: "3",
    },
    {
      id: "17",
      message: "장학 (02-760-4221)",
      trigger: "3",
    },
    {
      id: "18",
      message: "교육장학금, 365캠퍼스, 취업지원, 진로상담 (02-760-4295)",
      trigger: "3",
    },
    {
      id: "19",
      message: "학생창업 (02-760-5610)",
      trigger: "3",
    },
    {
      id: "20",
      message:
        "한성e-포트폴리오 HOPE, 학생이력관리시스템, 비교과포인트, 지도교수 (02-760-5816)",
      trigger: "3",
    },
    {
      id: "21",
      message: "한성E-CLASS (02-760-4248)",
      trigger: "3",
    },
    {
      id: "22",
      message: "학생상담센터 (02-760-4171)",
      trigger: "3",
    },
    {
      id: "23",
      message:
        "홈페이지, 전산처리, Wi-Fi, 네트워크, 한성웹메일, 오피스365 (02-760-4291)",
      trigger: "3",
    },
    {
      id: "24",
      message: "시설, 건축, 안전 (02-760-4232)",
      trigger: "3",
    },
    {
      id: "25",
      message: "장애학생지원 (02-760-4363)",
      trigger: "3",
    },
    {
      id: "26",
      options: [
        { value: "creative", label: "크리에이티브인문예술대학", trigger: "27" },
        { value: "social", label: "미래융합사회과학대학", trigger: "28" },
        { value: "design", label: "디자인대학", trigger: "29" },
        { value: "it", label: "IT공과대학", trigger: "30" },
        { value: "conv", label: "창의융합대학", trigger: "31" },
        { value: "plus", label: "미래플러스대학", trigger: "32" },
        { value: "sangsang", label: "상상력교양대학 ", trigger: "33" },
        { value: "inter-center", label: "국제교류원", trigger: "34" },
      ],
    },
    {
      id: "27",
      message: "크리에이티브인문예술대학: 02-760-5674",
      trigger: "35",
    },
    {
      id: "28",
      message: "미래융합사회과학대학: 02-760-4431",
      trigger: "44",
    },
    {
      id: "29",
      message: "디자인대학: 02-760-4432",
      trigger: "52",
    },
    {
      id: "30",
      message: "IT공과대학: 02-760-4433",
      trigger: "3",
      //trigger : 수정 이어서 하기
    },
    {
      id: "31",
      message: "창의융합대학: 02-760-5735",
      trigger: "3",
    },
    {
      id: "32",
      message: "미래플러스대학: 02-760-5745",
      trigger: "3",
    },

    {
      id: "33",
      message: "상상력교양대학: 02-760-5821",
      trigger: "3",
    },
    {
      id: "34",
      message: "국제교류원: 02-760-4473/4095",
      trigger: "3",
    },
    {
      id: "35",
      options: [
        { value: "eng", label: "영미문학문화/영미언어정보트랙", trigger: "36" },
        { value: "korean", label: "한국어교육트랙", trigger: "37" },
        {
          value: "his",
          label: "역사문화큐레이션/역사콘텐츠트랙",
          trigger: "38",
        },
        {
          value: "lib",
          label: "도서관정보문화트랙/디지털인문정보학트랙",
          trigger: "39",
        },
        { value: "art", label: "동/서양화전공", trigger: "40" },
        { value: "dance", label: "한국/현대무용/발레전공", trigger: "41" },
        { value: "kor-dan", label: "한국무용전공", trigger: "42" },
        { value: "cul", label: "이민·다문화트랙 ", trigger: "43" },
      ],
    },
    {
      id: "36",
      message: "영미문학문화/영미언어정보트랙: 02-760-4027",
      trigger: "3",
    },
    {
      id: "37",
      message: "한국어교육트랙: 02-760-4017",
      trigger: "3",
    },
    {
      id: "38",
      message: "역사문화큐레이션/역사콘텐츠트랙: 02-760-4037",
      trigger: "3",
    },
    {
      id: "39",
      message: "도서관정보문화트랙/디지털인문정보학트랙: 02-760-4087",
      trigger: "3",
    },
    {
      id: "40",
      message: "동/서양화전공: 02-760-4117",
      trigger: "3",
    },
    {
      id: "41",
      message: "한국/현대무용/발레전공: 02-760-4107",
      trigger: "3",
    },
    {
      id: "42",
      message: "동/서양화전공: 02-760-4117",
      trigger: "3",
    },
    {
      id: "43",
      message: "이민·다문화트랙: 02-760-4268",
      trigger: "3",
    },
    {
      id: "44",
      options: [
        { value: "trade", label: "국제무역트랙", trigger: "45" },
        { value: "global", label: "글로벌비즈니스트랙", trigger: "46" },
        { value: "econ", label: "기업경제분석트랙", trigger: "47" },
        {
          value: "finan-data",
          label: "금융데이터분석트랙",
          trigger: "48",
        },
        {
          value: "pub-law",
          label: "공공행정/법&정책트랙",
          trigger: "49",
        },
        {
          value: "city",
          label: "부동산트랙/스마트도시교통계획트랙",
          trigger: "50",
        },
        {
          value: "finance",
          label: "기업/벤처/회계·재무경영트랙",
          trigger: "51",
        },
      ],
    },
    {
      id: "45",
      message: "국제무역트랙: 02-760-4057",
      trigger: "3",
    },
    {
      id: "46",
      message: "글로벌비즈니스트랙: 02-760-5722",
      trigger: "3",
    },
    {
      id: "47",
      message: "기업경제분석트랙: 02-760-4067",
      trigger: "3",
    },
    {
      id: "48",
      message: "금융데이터분석트랙: 02-760-4067",
      trigger: "3",
    },
    {
      id: "49",
      message: "공공행정/법&정책트랙: 02-760-4077",
      trigger: "3",
    },
    {
      id: "50",
      message: "부동산트랙/스마트도시교통계획트랙: 02-760-4427",
      trigger: "3",
    },
    {
      id: "51",
      message: "기업/벤처/회계·재무경영트랙: 02-760-4047",
      trigger: "3",
    },
    {
      id: "52",
      options: [
        {
          value: "fashion-marketing",
          label: "패션마케팅/디자인/크리에이티브디렉션트랙",
          trigger: "53",
        },
        {
          value: "advertisement",
          label: "뉴미디어광고·커뮤니케이션디자인/브랜드패키지디자인트랙",
          trigger: "54",
        },
        {
          value: "animation",
          label: "영상애니메이션/UX·UI/게임그래픽/게임그래픽디자인트랙",
          trigger: "55",
        },
        {
          value: "interior",
          label: "인테리어디자인/VMD전시디자인트랙",
          trigger: "56",
        },
        { value: "beauty", label: "뷰티디자인매니지먼트학과", trigger: "57" },
      ],
    },
    {
      id: "53",
      message:
        "패션마케팅/디자인/크리에이티브디렉션트랙: 02-760-5794/4147/4467",
      trigger: "3",
    },
    {
      id: "54",
      message: "뉴미디어광고·커뮤니케이션/브랜드패키지디자인트랙: 02-760-4157",
      trigger: "3",
    },
    {
      id: "55",
      message:
        "영상애니메이션/UX·UI/게임그래픽/게임그래픽디자인트랙: 02-760-4422",
      trigger: "3",
    },
    {
      id: "56",
      message: "인테리어디자인/VMD전시디자인트랙: 02-760-5792",
      trigger: "3",
    },
    {
      id: "57",
      message: "뷰티디자인매니지먼트학과: 02-760-4422",
      trigger: "3",
    },
    //공대부터 이어서 하기
  ];
  const theme = {
    background: "#f5f8fb",
    headerBgColor: "hsl(227, 49%, 31%)",
    headerFontColor: "#fff",
    headerFontSize: "17px",
    botBubbleColor: "white",
    botFontColor: "hsl(227, 49%, 31%)",
    userBubbleColor: "hsl(227, 49%, 31%)",
    userFontColor: "white",
  };

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        botAvatar={logo}
        userAvatar={chatlogo}
        steps={steps}
        hideHeader={false}
        headerTitle="자주 묻는 질문"
        placeholder={"채팅이 불가한 채널입니다."}
        width="70%" // 챗봇 너비 설정
        height="100%" // 챗봇 높이 설정
        // bubbleStyle={{ backgroundColor: "white", color: "navy" }}
        // optionHoverStyle={{
        //   backgroundColor: "rgba(0,0,128,0.8)",
        //   color: "white",
        // }}
      />
    </ThemeProvider>
  );
};

export default NewChatBot;

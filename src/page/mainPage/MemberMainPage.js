// const MemberMainPage = () => {
//   const handleOpenNewTab = (url) => {
//     window.open(url, "_blank", "noopener, noreferrer");
//   };

//   return (
//     <div className="p-3">
//       <img
//         alt="everyhansung"
//         src="img/MainSangSang.png"
//         className="MainSangSang cursor-pointer"
//         onClick={() => {
//           window.open(
//             "https://www.hansung.ac.kr/sites/hansung/index.do",
//             "_blank"
//           );
//         }}
//       />

//       <img
//         alt="hansung"
//         src="img/MainSangSang.png"
//         className="MainSangSang cursor-pointer"
//         onClick={() => handleOpenNewTab("https://www.naver.com/")}
//       />
//       <br />
//       <br />
//       <div className="grey">부기 누르면 한성대학교 홈페이지로 이동</div>

//       <div className="grey">부기 누르면 네이버로 이동</div>
//     </div>
//   );
// };

import React from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import Card from "../../Card";
import { useNavigate } from "react-router-dom";
import LectureListPage from "../lectureBoardPage/LectureListPage";
import FreeListPage from "../freeBoardPage/FreeListPage";
import SecretListPage from "../secretBoardPage/SecretListPage";

const MemberMainPage = () => {
  const move = useNavigate();

  return (
    <div className=" p-3">
      {/* <div>
        {/* <div className="grey"> */}
      {/* <img alt="hansung" src="img/chatlogo.png" className="logo" /> */}
      {/* </div> */}
      {/* <div
          className="cursor-pointer grey"
          onClick={(e) => {
            e.preventDefault();
            move("/my");
          }}
        >
          정보 설정
        </div> */}
      {/* <div
          className="cursor-pointer grey"
          onClick={(e) => {
            e.preventDefault();
            move("/");
          }}
        >
          로그아웃
        </div> */}
      {/* </div>
      <hr /> */}
      <div className="service ">
        <br />
        <h2>
          한성대 학생을 위한
          <br />
          <div className="navy">
            <strong>"에브리한성"</strong>
            <br />
            <br />
          </div>
        </h2>
      </div>
      <div className="mini-card">
        <div className="info">상상부기를 누르면 해당 페이지로 이동합니다.</div>
        <div
          className="image-container"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            className="image-text-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="img/mainsang.png"
              className="mainsang cursor-pointer"
              onClick={() => {
                window.open(
                  "https://www.hansung.ac.kr/sites/hansung/index.do",
                  "_blank"
                );
              }}
            />
            <div className=" grey cursor-pointer" style={{ marginTop: 4 }}>
              학교 홈페이지
            </div>
          </div>

          <div
            className="image-text-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="img/sangsang2.png"
              className="sangsang2 cursor-pointer"
              onClick={() => {
                window.open(
                  "https://www.hansung.ac.kr/hansung/8385/subview.do",
                  "_blank"
                );
              }}
            />
            <div className="grey cursor-pointer">공지사항</div>
          </div>

          <div
            className="image-text-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="img/MainSangSang.png"
              className="MainSangSang cursor-pointer"
              onClick={() => {
                window.open("https://info.hansung.ac.kr/", "_blank");
              }}
            />
            <div className="grey cursor-pointer">종합정보시스템</div>
          </div>

          <div
            className="image-text-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="img/sangsang.png"
              className="sangsang cursor-pointer"
              onClick={() => {
                window.open("https://learn.hansung.ac.kr/", "_blank");
              }}
            />
            <div className="grey cursor-pointer" style={{ marginTop: 8 }}>
              e-class
            </div>
          </div>

          <div
            className="image-text-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="img/heartsang.png"
              className="heartsang cursor-pointer"
              onClick={() => {
                window.open(
                  "https://www.hansung.ac.kr/hansung/1920/subview.do",
                  "_blank"
                );
              }}
            />
            <div className=" grey cursor-pointer" style={{ marginTop: -11 }}>
              학식
            </div>
          </div>
        </div>
      </div>

      <br />

      <div className="mini-card">
        <FreeListPage />
      </div>
      <br />

      <div className="mini-card">
        <SecretListPage />
      </div>

      <br />

      <div className="mini-card">
        <LectureListPage />
      </div>
    </div>
  );
};

export default MemberMainPage;

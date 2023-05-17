import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import Secretboard from "./mainBoardList/Secretboard";
import Freeboard from "./mainBoardList/Freeboard";
import Lectureboard from "./mainBoardList/Lectureboard";
import apiClient from "../../apiClient";
import { useState, useEffect } from "react";
import Bookboard from "./mainBoardList/Bookboard";

const MemberMainPage = () => {
  const move = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const [name, setName] = useState("");

  useEffect(() => {
    if (studentId) {
      apiClient
        .get(`http://localhost:8080/member/${studentId}`)
        .then((res) => {
          const member = res.data;
          setName(member.username);
        })
        .catch((error) => {
          console.error("Error fetching name:", error);
        });
    }
  }, [studentId]);

  return (
    <div className=" p-3">
      <div className="service ">
        {name && (
          <div className="my-info">
            <img
              alt="hansung"
              src="img/everyhansung.png"
              className="every-logo cursor-pointer"
              onClick={() => move("/")}
            />
            {name}님, 안녕하세요!
          </div>
        )}
        {!name && (
          <div className=" my-info ">
            <img
              alt="hansung"
              src="img/everyhansung.png"
              className="every-logo cursor-pointer"
              onClick={() => move("/")}
            />
            로그인이나 회원가입 하시려면 저를 눌러주세요!
          </div>
        )}
        <hr />
        <br />
        <h2>
          한성대 학생을 위한
          <br />
          <div className="navy">
            <strong>"에브리한성"</strong> <br /> <br />
            <img
              alt="sangsangs"
              src="img/springsang.png"
              className="springsang"
            />
          </div>
        </h2>
      </div>
      <hr />
      <br />
      <div>
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
            <div className=" grey cursor-pointer" style={{ marginTop: -5 }}>
              학식
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="info">(상상부기를 누르면 해당 페이지로 이동합니다.)</div>
      <hr />
      <div className="p-4">
        <strong className="m-1">최근 게시물</strong>
        <br /> <br />
        <Freeboard />
        <Secretboard />
        <Lectureboard />
        <Bookboard />
      </div>
    </div>
  );
};

export default MemberMainPage;

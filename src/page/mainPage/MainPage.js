import React from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    //jshint ignore:start
    <div className="notlogin">
      <aside>
        <div className="login">
          <div className="padd">
            <img
              alt="everyhansung"
              src="img/everyhansung.png"
              className="logo-image"
            />
          </div>
          <Link to="/login" className="button login">
            로그인
          </Link>

          <Link to="/register" className="button regis">
            회원가입
          </Link>
          <p className="find">
            <a href="/forgot">아이디/비밀번호 찾기</a>
          </p>
          <hr />
        </div>
      </aside>

      <section className="service white">
        <h2>
          한성대 학생을 위한
          <br />
          <strong>
            서비스 "에브리한성"
            <br />
          </strong>
          <p>
            <br />
            <img
              alt="sangsangs"
              src="img/sangsangs.png"
              className="sangsangs"
            />
          </p>
        </h2>
        <div className="paragraph">
          <p>
            시간표 작성, 수업 일정 및 할일 등 편리한
            <strong> 학업관리</strong>
            가 가능하고,
            <br />
            학식 등 유용한
            <strong> 학교 생활 정보</strong>
            를 접할 수 있으며,
            <br />
            같은 캠퍼스의 학생들과 소통하는
            <strong> 익명 커뮤니티</strong>를 이용할 수 있습니다.
          </p>
        </div>
      </section>
      <section className="footer white">
        <ul className="links">
          <li>
            <a href="/page/serviceagreement">서비스 이용약관</a>
          </li>
          <li className="privacy">
            <a href="/page/rules">커뮤니티 이용규칙</a>
          </li>
          <li>
            <a href="/">문의:capstone23m@gmail.com</a>
          </li>
          <li className="copyright">
            <a href="/">© 에브리 한성</a>
          </li>
        </ul>
      </section>
    </div>
    //jshint ignore:end
  );
};

export default MainPage;

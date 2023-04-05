import "./NavBar.css";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AiOutlineUser } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import axios from "axios";

const NavBar = () => {
  const studentId = localStorage.getItem("studentId");
  const [name, setName] = useState("");
  // const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (studentId) {
      axios
        .get(`http://localhost:8080/members/${studentId}`)
        .then((res) => {
          const member = res.data;
          setName(member.username);
        })
        .catch((error) => {
          console.error("Error fetching name:", error);
        });
    }
  }, [studentId]);

  const handleLogout = () => {
    // 로그아웃 버튼을 클릭했을 때 실행되는 함수
    // studentId 상태값을 null로 설정하여 초기화
  };

  return (
    <div>
      <Navbar className="color-nav" variant="dark">
        <Container>
          <Navbar.Brand href="/membermain">에브리한성</Navbar.Brand>
          <Nav className="mx-auto">
            <NavDropdown title="게시판" id="basic-nav-dropdown">
              <NavDropdown.Item href="/freeboard/list">
                자유 게시판
              </NavDropdown.Item>
              <NavDropdown.Item href="/secretboard/list">
                비밀 게시판
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/lectureboard/list">강의평</Nav.Link>
            <Nav.Link href="/chatbot">챗부기</Nav.Link>
            <Nav.Link href="/bookstore">책방</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="">
              {" "}
              <div className="white">{studentId}님, 안녕하세요!</div>
            </Nav.Link>
            <div className="white">
              <Nav.Link href="/message">
                <BiMessage />
              </Nav.Link>
            </div>
            <div className="white">
              <Nav.Link href="/my">
                <AiOutlineUser />
              </Nav.Link>
            </div>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
};

export default NavBar;

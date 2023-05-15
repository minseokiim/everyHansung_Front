import "./NavBar.css";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AiOutlineUser } from "react-icons/ai";
import { GiTurtle } from "react-icons/gi";
import { useState, useEffect } from "react";
import apiClient from "./apiClient";
import { TfiEmail } from "react-icons/tfi";

import { HiOutlineBookOpen } from "react-icons/hi";
import { ImNewspaper } from "react-icons/im";

const NavBar = () => {
  const studentId = localStorage.getItem("studentId");
  const [name, setName] = useState("");
  const isAdmin = studentId === "admin";

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
    <div>
      <Navbar className="color-nav" variant="dark">
        <Container>
          <Navbar.Brand href="/main">
            <GiTurtle />
            에브리한성
          </Navbar.Brand>
          <Nav className="p-3 mx-auto">
            <Nav.Link /> <Nav.Link /> <Nav.Link />
            <Nav.Link />
            <NavDropdown title="게시판" id="basic-nav-dropdown">
              <NavDropdown.Item href="/freeboard">자유 게시판</NavDropdown.Item>
              <NavDropdown.Item href="/secretboard">
                비밀 게시판
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/lectureboard">강의평</Nav.Link>
            <Nav.Link href="/bookstore">
              <HiOutlineBookOpen />
              책방
            </Nav.Link>
            <Nav.Link href="/timetable">시간표</Nav.Link>
            <Nav.Link href="/chatbot">챗부기</Nav.Link>
            <Nav.Link href="/require">졸업요건</Nav.Link>
            {isAdmin && <Nav.Link href="/admin">관리자 인증</Nav.Link>}
          </Nav>

          <Nav className="ms-auto">
            {name && (
              <>
                <div className="white">
                  <Nav.Link href="/message">
                    <TfiEmail />
                  </Nav.Link>
                </div>
                <div className="white">
                  <Nav.Link href="/my">
                    <AiOutlineUser />
                  </Nav.Link>
                </div>
                <div className="white">
                  <Nav.Link
                    href="/"
                    onClick={() => {
                      localStorage.clear();
                    }}
                  >
                    로그아웃
                  </Nav.Link>
                </div>
              </>
            )}
            {!name && (
              <>
                <div className="white">
                  <Nav.Link href="/login">로그인</Nav.Link>
                </div>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
};

export default NavBar;

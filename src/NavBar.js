import "./NavBar.css";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import axios from "axios";

const NavBar = () => {
  const studentId = useSelector((state) => state.auth.studentId);
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

  return (
    <div>
      <Navbar className="color-nav" variant="dark">
        <Container>
          <Navbar.Brand href="/freeboard/list">
            {/* <img alt="sangsang" src="img/sangsang.png" className="image" /> */}
            에브리한성
          </Navbar.Brand>
          <Nav className="mr-3">
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
            <Nav.Link href="/message">쪽지</Nav.Link>
            <Nav.Link href="/my">마이페이지</Nav.Link>
          </Nav>

          {studentId && (
            <div className="white">
              <Nav.Link href="/">
                {studentId}님, 안녕하세요!
                {/* axios 되면  {name} 으로 바꾸기  */}
              </Nav.Link>
            </div>
          )}
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
};

export default NavBar;

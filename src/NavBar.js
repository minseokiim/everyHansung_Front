import "./NavBar.css";
import { Outlet } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = () => {
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
            <Nav.Link href="/">로그아웃</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
};

export default NavBar;

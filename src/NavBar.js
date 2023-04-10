import "./NavBar.css";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AiOutlineUser } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";

const NavBar = () => {
  return (
    <div>
      <Navbar className="color-nav" variant="dark">
        <Container>
          <Navbar.Brand href="/membermain">에브리한성</Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Link /> <Nav.Link /> <Nav.Link /> <Nav.Link />
            <Nav.Link /> <Nav.Link /> <Nav.Link />
            <NavDropdown title="게시판" id="basic-nav-dropdown">
              <NavDropdown.Item href="/freeboard/list">
                자유 게시판
              </NavDropdown.Item>
              <NavDropdown.Item href="/secretboard/list">
                비밀 게시판
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/lectureboard/list">강의평</Nav.Link>
            <Nav.Link href="/bookstore/list">책방</Nav.Link>
            <Nav.Link href="/chatbot">챗부기</Nav.Link>
            <Nav.Link href="/timetable">시간표</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
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
            {/* <Nav.Link href="">
              <div className="grey">{studentId}님, 안녕하세요!</div>
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
};

export default NavBar;

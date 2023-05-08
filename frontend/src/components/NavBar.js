import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../App.css";
import Logo from "./Logo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// NavBar that also handles search

// takes the props from the Home page to manage both DatePickers congruently
function NavBar({ displayDate, setDisplayDate }) {
  const [keyword, setKeyword] = useState("");

  // Navigate was creating errors so used useNavigate hook instead here
  const navigate = useNavigate();

  // navigates to search page with the entered keyword when button is clicked
  const handleSubmit = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      navigate("/search?keyword=" + keyword);
      setKeyword("");
    }
  };

  // called when search input changes. Updates keyword with values provided
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  // Code below is a modified version of example code previded by React-Bootstrap
  // https://react-bootstrap.github.io/components/navbar/

  // DatePicker code modified from whats provided at https://reactdatepicker.com/

  // NavDropdown is a placeholder but also used for demo purposes

  return (
    <Navbar className="navBar sticky-top" expand="lg" bg="dark" variant="dark">
      <Container className="nav-container" fluid>
        <Navbar.Brand className="brand" href="/">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle className="nav" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            id="nav-nav"
            className="justify-content-end flex-grow-1 pe-3"
            style={{ maxHeight: "220px" }}
            navbarScroll
          >
            <DatePicker
              className="datePickerNav"
              maxDate={new Date()}
              minDate={new Date("2023-01-02")}
              selected={displayDate}
              onChange={(date) => setDisplayDate(date)}
            />
            <NavDropdown title=". . . " id="navbarScrollingDropdown">
              <NavDropdown.Item href="/login">
                login is not going to go here
              </NavDropdown.Item>
              <NavDropdown.Item href="/register">
                neither is registration
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">
                something else here I guess
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/create">create</Nav.Link>
            <Nav.Link href="/logout">logout</Nav.Link>
          </Nav>
          <Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control
              type="search"
              placeholder="search"
              className="me-2"
              value={keyword}
              onChange={handleKeywordChange}
              autoFocus
            />
            <Button className="outline-dark" variant="dark" type="submit">
              search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = (props) => {
  return (
    <div>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          {props.title} Benchmark Platfrom
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>Link1</Nav.Link>
            <Nav.Link>Link2</Nav.Link>
            <Nav.Link> Link2</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;

import React, { useEffect, useRef } from "react";
import { Button, Navbar, Nav, Form } from "react-bootstrap";
import HeaderMenuItems from "./HeaderMenuItems";
import { useSelector } from "react-redux";
import Logo from "./Logo";

const Header = () => {
  const menuItems = useSelector(
    (state) => state.common.mainMenu.headermenus.main
  );
  const rightSideMenuItems = useSelector(
    (state) => state.common.mainMenu.headermenus.rightSideMenu
  );

  const header = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (header.current) {
        if (window.scrollY >= 50) {
          header.current.classList.add("fixed-me");
        } else {
          header.current.classList.remove("fixed-me");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="header" ref={header}>
      <div className="container">
        <div className="row">
          <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Brand>
              <Logo />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              {menuItems && menuItems.length > 0 && (
                <Nav className="me-auto">
                  <HeaderMenuItems menuItems={menuItems} />
                </Nav>
              )}
              {rightSideMenuItems && rightSideMenuItems.length > 0 && (
                <Nav>
                  <HeaderMenuItems menuItems={rightSideMenuItems} />
                </Nav>
              )}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </header>
  );
};

export default Header;

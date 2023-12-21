import React, { useEffect, useRef, useState } from "react";
import { Button, Navbar, Nav, Form } from "react-bootstrap";
import HeaderMenuItems from "./HeaderMenuItems";
import Logo from "./Logo";
import HeaderSearchForm from "./HeaderSearchForm";

const Header = ({ headerElements }) => {
  const { main, rightSideMenu } = headerElements;
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
              {main && main.length > 0 && (
                <Nav className="me-auto">
                  <HeaderMenuItems menuItems={main} />
                </Nav>
              )}
              {rightSideMenu && rightSideMenu.length > 0 && (
                <Nav>
                  <HeaderMenuItems menuItems={rightSideMenu} />
                </Nav>
              )}
              <HeaderSearchForm />
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { config } from "../../config";

const HeaderMenuItems = ({ menuItems }) => {
  const generateMenuItems = (items) => {
    return items
      .slice() // Create a copy of the array to avoid modifying the original
      .sort((a, b) => a.weight - b.weight)
      .map((item, index) => {
        return (
          <div key={item.id ? item.id : index + 1000}>
            {item.enabled &&
            item.expanded &&
            item.items &&
            item.items.length > 0 ? (
              <NavDropdown title={item.title} id="navbarScrollingDropdown">
                {generateSubMenuItems(item.items)}
              </NavDropdown>
            ) : (
              item.enabled && (
                <Nav.Link
                  href={
                    item.title === "Home"
                      ? config.nextBaseUrl
                      : item.url.includes("http")
                      ? item.url
                      : config.nextBaseUrl +
                        item.url.replace(config.drupalDomain, "")
                  }
                  target={item.url.includes("http") ? "_blank" : undefined}
                >
                  {item.title}
                </Nav.Link>
              )
            )}
          </div>
        );
      });
  };

  const generateSubMenuItems = (items) => {
    return items
      .slice() // Create a copy of the array to avoid modifying the original
      .sort((a, b) => a.weight - b.weight)
      .map((item, index) => {
        return (
          <div key={index + 2000}>
            {item.enabled &&
            item.expanded &&
            item.items &&
            item.items.length > 0 ? (
              <NavDropdown title={item.title} id="navbarScrollingDropdown">
                {generateSubMenuItems(item.items)}
              </NavDropdown>
            ) : (
              item.enabled && (
                <NavDropdown.Item
                  href={
                    item.url.includes("http")
                      ? item.url
                      : config.nextBaseUrl +
                        item.url.replace(config.drupalDomain, "")
                  }
                  target={item.url.includes("http") ? "_blank" : undefined}
                >
                  {item.title}
                </NavDropdown.Item>
              )
            )}
          </div>
        );
      });
  };

  return generateMenuItems(menuItems);
};

export default HeaderMenuItems;

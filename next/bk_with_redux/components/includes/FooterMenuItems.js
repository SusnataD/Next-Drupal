import { config } from "../../config";
import Link from "next/link";

const FooterMenuItems = ({ menuItems }) => {
  const generateMenuItems = (items) => {
    return items
      .slice() // Create a copy of the array to avoid modifying the original
      .sort((a, b) => a.weight - b.weight)
      .map((item, index) => {
        return (
          <div
            className={
              item.enabled &&
              item.expanded &&
              item.items &&
              item.items.length > 0
                ? "has-child col-md-4"
                : "has-no-child col-md-4"
            }
            key={item.id ? item.id : index + 1000}
          >
            {item.enabled &&
            item.expanded &&
            item.items &&
            item.items.length > 0 ? (
              <ul>
                <span>{item.title}</span>
                <li>{generateSubMenuItems(item.items)}</li>
              </ul>
            ) : (
              item.enabled && (
                <Link
                  className=""
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
                </Link>
              )
            )}
          </div>
        );
      });
  };

  const generateSubMenuItems = (items) => {
    return (
      <ul className="child-menu-item">
        {items
          .slice() // Create a copy of the array to avoid modifying the original
          .sort((a, b) => a.weight - b.weight)
          .map((item, index) => {
            return (
              <li key={index + 2000}>
                {item.enabled &&
                item.expanded &&
                item.items &&
                item.items.length > 0 ? (
                  <ul className="has-sub-child">
                    <span>title={item.title}</span>
                    <li>{generateSubMenuItems(item.items)}</li>
                  </ul>
                ) : (
                  item.enabled && (
                    <Link
                      href={
                        item.url.includes("http")
                          ? item.url
                          : config.nextBaseUrl +
                            item.url.replace(config.drupalDomain, "")
                      }
                      target={item.url.includes("http") ? "_blank" : undefined}
                    >
                      {item.title}
                    </Link>
                  )
                )}
              </li>
            );
          })}
      </ul>
    );
  };
  return generateMenuItems(menuItems);
};

export default FooterMenuItems;

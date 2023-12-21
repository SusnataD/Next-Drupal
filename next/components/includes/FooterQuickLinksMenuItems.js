import { config } from "../../config";
import Link from "next/link";

const FooterQuickLinksMenuItems = ({ menuItems }) => {
  const generateMenuItems = (items) => {
    return (
      items &&
      items.length > 0 && (
        <ul className="quick-links-wrapper">
          {items
            .slice() // Create a copy of the array to avoid modifying the original
            .sort((a, b) => a.weight - b.weight)
            .map((item, index) => {
              return (
                item.enabled && (
                  <li key={item.id ? item.id : index + 1000}>
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
                  </li>
                )
              );
            })}
        </ul>
      )
    );
  };

  return generateMenuItems(menuItems);
};

export default FooterQuickLinksMenuItems;

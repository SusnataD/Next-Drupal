import { useSelector } from "react-redux";
import { config } from "../../config";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import FooterMenuItems from "../includes/FooterMenuItems";
import FooterQuickLinksMenuItems from "../includes/FooterQuickLinksMenuItems";

const Footer = () => {
  const menuItems = useSelector(
    (state) => state.common.footerMainMenu.footermenus
  );

  const copyright = useSelector(
    (state) => state.common.copyright.copyright.body
  );

  return (
    <footer>
      <div className="container p-5">
        {/* {console.log("menuItems > ", menuItems)} */}
        <div className="footer-main">
          <div className="row">
            <div className="col-md-2">
              <Logo />
            </div>
            <div className="col-md-8">
              {menuItems.main && menuItems.main.length > 0 && (
                <div className="footer-menu">
                  <div className="row">
                    <FooterMenuItems menuItems={menuItems.main} />
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-2">
              {menuItems.quickLinks && menuItems.quickLinks.length > 0 && (
                <div className="footer-quick-links">
                  <FooterQuickLinksMenuItems menuItems={menuItems.quickLinks} />
                </div>
              )}
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
      {copyright?.processed && (
        <div className="footer-copyright mt-5 text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  dangerouslySetInnerHTML={{
                    __html: copyright?.processed.replace(
                      "####YEAR####",
                      new Date().getFullYear()
                    ),
                  }}
                  className="content"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
export default Footer;

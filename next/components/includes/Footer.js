import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import FooterMenuItems from "../includes/FooterMenuItems";
import FooterQuickLinksMenuItems from "../includes/FooterQuickLinksMenuItems";

const Footer = ({ footermenus, socialMedia, copyright }) => {
  return (
    <footer>
      <div className="container p-5">
        <div className="footer-main">
          <div className="row">
            <div className="col-md-2">
              <Logo />
            </div>
            <div className="col-md-8">
              {footermenus?.main && footermenus.main.length > 0 && (
                <div className="footer-menu">
                  <div className="row">
                    <FooterMenuItems menuItems={footermenus.main} />
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-2">
              {footermenus?.quickLinks && footermenus.quickLinks.length > 0 && (
                <div className="footer-quick-links">
                  <FooterQuickLinksMenuItems
                    menuItems={footermenus.quickLinks}
                  />
                </div>
              )}
              <SocialMedia socialMediaElements={socialMedia} />
            </div>
          </div>
        </div>
      </div>
      {copyright?.body?.processed && (
        <div className="footer-copyright mt-5 text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  dangerouslySetInnerHTML={{
                    __html: copyright?.body?.processed.replace(
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

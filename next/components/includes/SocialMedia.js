import Link from "next/link";
import "remixicon/fonts/remixicon.css";

const SocialMedia = ({ socialMediaElements }) => {
  return (
    <>
      {socialMediaElements?.length > 0 && (
        <ul className="social-media-items">
          {socialMediaElements.map((item) => (
            <li key={item.id}>
              <Link
                href={item.field_url.uri}
                title={item.field_url.title}
                target="_blank"
              >
                <i className={item.field_class}></i>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default SocialMedia;

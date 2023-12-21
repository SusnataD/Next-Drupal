import Link from "next/link";
import { useSelector } from "react-redux";
import "remixicon/fonts/remixicon.css";

const SocialMedia = () => {
  const socialMedia = useSelector(
    (state) => state.common.socialMedia.socialMedia
  );
  return (
    <>
      {socialMedia && socialMedia.length > 0 && (
        <ul className="social-media-items">
          {socialMedia.map((item) => (
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

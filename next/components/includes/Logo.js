import { config } from "../../config";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={config.nextBaseUrl + "/"}>
      <Image
        src={config.nextBaseUrl + "/logo.png"}
        loader={({ src, width }) => {
          return src + "?w=" + width;
        }}
        width={120}
        height={55}
        alt={"Barand Logo"}
      />
    </Link>
  );
};

export default Logo;

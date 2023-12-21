import { Html, Head, Main, NextScript } from "next/document";
import { config } from "../config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href={config.nextBaseUrl + "/favicon.ico"}
        />
      </Head>
      <body className="set-loader">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

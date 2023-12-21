import "styles/globals.css";
import { wrapper } from "../store/reducers/store";
import { CommonProvider } from "../context/CommonContext";

function App({ Component, pageProps }) {
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <CommonProvider>
        <Component {...pageProps} />
      </CommonProvider>
    </>
  );
}
export default wrapper.withRedux(App);

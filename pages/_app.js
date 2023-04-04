import "../styles/app.css";
import "normalize.css/normalize.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

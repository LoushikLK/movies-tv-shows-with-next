import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <AppTheme>
    <div className={"dark"}>
      <Component {...pageProps} />
    </div>
    // </AppTheme>
  );
}

export default MyApp;

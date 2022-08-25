import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextNProgress from "nextjs-progressbar";

import type { AppProps } from "next/app";
import { AppContextProvider } from "context/useAppContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <NextNProgress
        color="#00bcd4"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
      />
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;

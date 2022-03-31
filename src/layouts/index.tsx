import Head from "next/head";
import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
  title?: string;
};

export default ({ children, title = "Movie Hub" }: Props) => {
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={darkTheme ? "dark" : "light"}>
        <Header setDarkTheme={setDarkTheme} />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Movie Hub" }: Props) => {
  const [darkTheme, setDarkTheme] = useState<boolean>();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (darkTheme === undefined) return;
      localStorage?.setItem("darkTheme", JSON.stringify(darkTheme));
    }
    return () => {
      mounted = false;
    };
  }, [darkTheme]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      let theme = localStorage?.getItem("darkTheme");
      setDarkTheme(theme === "true");
    }
    return () => {
      mounted = false;
    };
  });

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={darkTheme ? "dark" : "light"}>
        <Header setDarkTheme={setDarkTheme} darkTheme={darkTheme} />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;


import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
  title?: string;
};

export default ({ children, title = "MV" }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="dark ">{children}</main>
      <Footer />
    </>

  );
};

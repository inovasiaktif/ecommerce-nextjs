import Head from "next/head";
import { AppProvider } from "./context/AppContext";
import Footer from "./Footer";
import client from "./ApolloClient";
import { ApolloProvider } from "@apollo/client";
import Menu from "./Menu";
import React from "react";
import BottomMenu from "./BottomMenu";

const Layout = ({ pageType, title, isHomepage, menuTitle, children, product }) => {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <Head>
          <title>{title ? title : "IA Digital Printing | Percetakan Online Terbaik di Indonesia"}</title>
          <link rel="shortcut icon" href="https://cms.inovasiaktif.com/wp-content/uploads/2022/09/cropped-ia-digital-printing-2-32x32.png" />
        </Head>
        <Menu isHomepage={isHomepage} menuTitle={menuTitle} pageType={pageType} />
        <BottomMenu pageType={pageType} product={product} />
        {children}
        <Footer />
      </ApolloProvider>
    </AppProvider>
  );
};

export default Layout;

import Head from "next/head";
import { AppProvider } from "./context/AppContext";
import Footer from "./Footer";
import client from "./ApolloClient";
import { ApolloProvider } from "@apollo/client";
import Menu from "./Menu";
import React from "react";
import BottomMenu from "./BottomMenu";
import Script from 'next/script'

const Layout = ({ pageType, title, isHomepage, menuTitle, children, product, noIndex, t }) => {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <Head>
          <title>{title ? title : "Inovasi Aktif - Solusi untuk semua kebutuhanmu"}</title>
          <link rel="shortcut icon" href="/images/logo.png" />
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover" />
          <meta charSet="utf-8" />
          <meta name="google" content="notranslate" />
          {noIndex && <meta name="robots" content="noindex" />}
          <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8615035709040167" async="true" crossorigin="anonymous" strategy="beforeInteractive" />
        </Head>
        <Menu isHomepage={isHomepage} menuTitle={menuTitle} pageType={pageType} />
        <BottomMenu pageType={pageType} product={product} />
        <div style={
          {
            "paddingTop": !isHomepage && pageType != "product" ? "50px" : "0px"
          }
        }>
          {children}
        </div>
        <Footer pageType={pageType} />
      </ApolloProvider>
    </AppProvider>
  );
};

export default Layout;

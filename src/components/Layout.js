import Head from "next/head";
import { AppProvider } from "./context/AppContext";
import Header from "./Header";
import Footer from "./Footer";
import client from "./ApolloClient";
import Router from "next/router";
import NProgress from "nprogress";
import { ApolloProvider } from "@apollo/client";
import TopHeader from "./TopHeader";
import Menu from "./Menu";
import React from "react";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = (props) => {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <Head>
          <title>IA Digital Printing - Percetakan Online Terbaik di Indonesia</title>
          <link rel="shortcut icon" href="https://cms.inovasiaktif.com/wp-content/uploads/2022/09/cropped-ia-digital-printing-2-32x32.png" />
        </Head>
        {/* <Header /> */}
        {props && props.homepage && <Menu />}
        {props.children}
        <Footer />
      </ApolloProvider>
    </AppProvider>
  );
};

export default Layout;

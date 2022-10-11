import Head from "next/head";
import { AppProvider } from "./context/AppContext";
import Footer from "./Footer";
import client from "./ApolloClient";
import { ApolloProvider } from "@apollo/client";
import Menu from "./Menu";
import React from "react";
import BottomMenu from "./BottomMenu";
import SubMenu from "./SubMenu";
import ProductMenu from "./ProductMenu";

const Layout = (props) => {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <Head>
          <title>{props && props.title ? props.title : "IA Digital Printing | Percetakan Online Terbaik di Indonesia"}</title>
          <link rel="shortcut icon" href="https://cms.inovasiaktif.com/wp-content/uploads/2022/09/cropped-ia-digital-printing-2-32x32.png" />
        </Head>
        {/* <Header /> */}
        {props && props.homepage ?
          <Menu /> : props.menuType && props.menuType == "product" ?
            <ProductMenu /> : <SubMenu menuTitle={props.menuTitle} />
        }
        <BottomMenu />
        {props.children}
        <Footer />
      </ApolloProvider>
    </AppProvider>
  );
};

export default Layout;

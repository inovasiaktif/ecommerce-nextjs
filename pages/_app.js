import "../src/styles/style.scss";
import "../src/styles/main.scss";

import Router, { useRouter } from 'next/router';
import NProgress from '../src/components/NProgress'
import React, { useState, useEffect } from "react";
// import ReactLoading from 'react-loading';

NProgress.configure({ showSpinner: false });

let timeout;
Router.events.on('routeChangeStart', () => {
  timeout = setTimeout(() => {
    NProgress.start()
  }, 100);
});
Router.events.on('routeChangeComplete', () => {
  clearTimeout(timeout);
  NProgress.done()
});
Router.events.on('routeChangeError', () => {
  clearTimeout(timeout);
  NProgress.done()
});

if (typeof window !== 'undefined') {
  NProgress.start();
  timeout = setTimeout(() => {
    NProgress.done();
  }, 1000);
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp
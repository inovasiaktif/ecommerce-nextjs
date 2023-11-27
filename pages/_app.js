import "../src/styles/style.scss";
import "../src/styles/main.scss";

import Router, { useRouter } from 'next/router';
import NProgress from '../src/components/NProgress'
import React, { useState, useEffect } from "react";
import { event, GoogleAnalytics } from "nextjs-google-analytics";

NProgress.configure({ showSpinner: false });

let timeout;
Router.events.on('routeChangeStart', () => {
  clearTimeout(timeout);
  
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

export function reportWebVitals({ id, name, label, value }) {
  event(name, {
    category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
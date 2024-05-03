// _app.js

import React from 'react';
import Head from 'next/head';
import '../styles/globals.css'; // 引入全局样式文件

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* 这里添加全局样式 */}
        <style>{`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
          }
        `}</style>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

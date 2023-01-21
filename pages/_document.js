import React from 'react';
import {ServerStyleSheets} from '@material-ui/core/styles';
import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="styleSheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets ();
  const originalRenderPage = ctx.renderPage;

  // Run the React rendering logic synchronously
  ctx.renderPage = () => {
    return originalRenderPage ({
      // Useful for wrapping the whole react tree
      enhanceApp: App => props => sheets.collect (<App {...props} />),
    });
  };
  // Run the parent `getInitialProps`, it now includes the custom `renderPage`
  const initialProps = await Document.getInitialProps (ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray (initialProps.styles),
      sheets.getStyleElement (),
    ],
  };
};

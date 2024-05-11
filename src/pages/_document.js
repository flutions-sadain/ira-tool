import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* meta begin */}
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          {/* meta end */}

          {/* favicon begin */}
          <link rel="icon" type="image/png" href="favicon/favicon.ico" />
          <meta name="theme-color" content="#ffffff" />
          {/* favicon end*/}

          {/* public assets begin */}

          {/* public assets end */}

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

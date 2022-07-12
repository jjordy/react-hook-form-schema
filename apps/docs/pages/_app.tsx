import "styles/globals.css";
// import "./styles/synthwave84.css";`

import { FormSchemaProvider } from "react-hook-form-schema";

import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <FormSchemaProvider>
      <Head>
        <title>React Hook Form Schema</title>
      </Head>
      <Component {...pageProps} />
    </FormSchemaProvider>
  );
}

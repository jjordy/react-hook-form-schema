import "../css/globals.css";
import "../css/synthwave84.css";

import { FormSchemaProvider } from "react-hook-form-schema";

import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <FormSchemaProvider>
      <Component {...pageProps} />
    </FormSchemaProvider>
  );
}

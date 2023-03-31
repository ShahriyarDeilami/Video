import "@/styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Session } from "@supabase/supabase-js";
import type { AppProps } from "next/app";
import { useState } from "react";
import { store } from "@/store";
import { Provider } from "react-redux";
import Head from "next/head";
import Header from "../static/components/Header";
export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient({
      supabaseUrl,
      supabaseKey,
    })
  );

  return (
    <Provider store={store}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <div className="app">
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, minimal-ui"
            />
            <title>Video Edditing APP</title>
            <link rel="shortcut icon" href="/favicon.png" />
          </Head>
          <Header />

          <Component {...pageProps} />
        </div>
      </SessionContextProvider>
    </Provider>
  );
}

import { ProviderAuth } from '@hooks/useAuth';
import MainLayout from '@layout/MainLayout';
import '@styles/tailwind.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import favicon from '@assets/control.png';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Product manager</title>
        <link rel="shortcut icon" href={favicon.src} />
      </Head>
      <SessionProvider session={session}>
        <ProviderAuth>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ProviderAuth>
      </SessionProvider>
    </>
  );
}

export default MyApp;

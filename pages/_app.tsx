import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth/core/types';
import NavBar from '../components/NavBar';
import '../styles/globals.css';

type MyAppProps = AppProps & {
    session: Session;
};


const MyApp = ({ Component, pageProps, session }: MyAppProps) => {
    return (
        <SessionProvider session={session}>
            <NavBar />
            <Component {...pageProps} />
        </SessionProvider>
    );
};

export default MyApp

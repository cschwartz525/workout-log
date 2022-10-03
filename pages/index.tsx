import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Login = () => {
    const { data: session, status } = useSession({ required: true });

    if (status === 'authenticated') {
        return (
            <div>
                <p>Welcome {session.user?.name}</p>
                <Image 
                    alt=''
                    height='50px'
                    src={session.user?.image as string}
                    width='50px'
                />
                <button onClick={() => signOut()}>LOGOUT</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>You are not signed in</p>
                <button onClick={() => signIn()}>LOGIN</button>
            </div>
        );
    }
};

export default Login;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);

    return {
        props: { session }
    };
}

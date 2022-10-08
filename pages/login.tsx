import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession, signIn } from 'next-auth/react';

const Login = () => (
    <div>
        <p>You are not signed in</p>
        <button onClick={() => signIn()}>LOGIN</button>
    </div>
);

export const getServerSideProps: GetServerSideProps<{}> = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    } else {
        return {
            props: {}
        };
    }
}

export default Login;

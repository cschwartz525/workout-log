import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import Image from 'next/image';

type IndexProps = {
    session: Session
};

const Index = ({ session }: IndexProps) => {
    if (session?.user) {
        return (
            <div>
                <p>Welcome {session.user.name}</p>
                <Image 
                    alt=''
                    height='50px'
                    src={session.user.image as string}
                    width='50px'
                />
                <button onClick={() => signOut()}>LOGOUT</button>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Error</h2>
                <p>Please try logging out and logging in again</p>
                <button onClick={() => signOut()}>LOGOUT</button>
            </div>
        );
    }
};

export const getServerSideProps: GetServerSideProps<IndexProps> = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);

    if (session) {
        return {
            props: { session }
        };
    } else {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
}

export default Index;

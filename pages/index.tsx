import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import WeeklyTarget from '../components/WeeklyTarget';
import { User } from '../types/user';

type IndexProps = {
    session: Session;
    user: User;
};

const Index = ({ session, user }: IndexProps) => {
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
                <WeeklyTarget weeklyTarget={user.weeklyTarget} />
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
    const userId = session?.user?.id;

    if (userId) {
        const res = await fetch(`${process.env.API_BASE_URL}/api/users/${userId}`);
        const { user } = await res.json();

        return {
            props: {
                session,
                user: user[0]
            }
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

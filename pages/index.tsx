import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import WeeklyTarget from '../components/WeeklyTarget';
import { User } from '../types/user';
import WorkoutTable from '../components/WorkoutTable';
import { getMondayOfCurrentWeek, getMondayOfNextWeek, getTenYearsAgo } from '../utils/date';

type IndexProps = {
    session: Session;
    user: User;
};

const Index = ({ session, user }: IndexProps) => {
    if (session?.user && user) {
        const startOfThisWeek = getMondayOfCurrentWeek();
        const startOfNextWeek = getMondayOfNextWeek();
        const tenYearsAgo = getTenYearsAgo();

        return (
            <div>
                <WeeklyTarget weeklyTarget={user.weeklyTarget} />
                <hr />
                <h3>This Week</h3>
                <WorkoutTable
                    endDate={startOfNextWeek}
                    startDate={startOfThisWeek}
                    workouts={user.workouts}
                />
                <hr />
                <h3>All Time</h3>
                <WorkoutTable
                    endDate={startOfThisWeek}
                    startDate={tenYearsAgo}
                    workouts={user.workouts}
                />
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
                user: user
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

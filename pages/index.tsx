import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import WeeklyTarget from '../components/WeeklyTarget';
import { User } from '../types/user';
import WorkoutTable from '../components/WorkoutTable';
import {
    getEndOfCurrentWeek,
    getEndOfPreviousWeek,
    getStartOfCurrentWeek,
    getTenYearsAgo
} from '../utils/date';
import { formatDate } from '../utils/formatters';
import { filterAndSortWorkouts } from '../utils/workouts';

type IndexProps = {
    session: Session;
    user: User;
};

const Index = ({ session, user }: IndexProps) => {
    if (session?.user && user) {
        const endOfCurrentWeek = getEndOfCurrentWeek();
        const endOfPreviousWeek = getEndOfPreviousWeek();
        const startOfCurrentWeek = getStartOfCurrentWeek();
        const tenYearsAgo = getTenYearsAgo();
        const workoutsThisWeek = filterAndSortWorkouts(user.workouts, startOfCurrentWeek, endOfCurrentWeek);
        const historicalWorkouts = filterAndSortWorkouts(user.workouts, tenYearsAgo, endOfPreviousWeek);

        return (
            <div>
                <WeeklyTarget
                    weeklyTarget={user.weeklyTarget}
                    workouts={workoutsThisWeek}
                />
                <hr />
                <WorkoutTable
                    heading={`This Week (${formatDate(startOfCurrentWeek)} - ${formatDate(endOfCurrentWeek)})`}
                    showAddButton
                    showTotal
                    workouts={workoutsThisWeek}
                />
                <hr />
                <WorkoutTable
                    heading='All Time'
                    workouts={historicalWorkouts}
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

import React, { useCallback, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { User } from '../types/user';

type AddWorkoutProps = {
    user: User;
};

type AddWorkoutArgs = {
    date: Date | null;
    duration: number;
    router: NextRouter;
    setError: (error: string) => void;
    type: string;
    userId: string;
};

const addWorkout = async ({
    date,
    duration,
    router,
    setError,
    type,
    userId
}: AddWorkoutArgs) => {
    if (duration < 0) {
        setError('Duration must be greater than 0');
        return;
    }

    if (!type) {
        setError('Please select a type');
        return;
    }

    await fetch(`/api/workouts/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            date,
            duration,
            type,
            userId
        }),
    });

    router.push('/');
}

const AddWorkout = ({ user }: AddWorkoutProps) => {
    const router = useRouter();
    const [date, setDate] = useState<Date | null>(null);
    const [duration, setDuration] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [type, setType] = useState<string>('');

    const handleSave = useCallback(() => addWorkout({
        date,
        duration,
        router,
        setError,
        type,
        userId: user?.id
    }), [date, duration, router, type, user]);

    return (
        <form>
            <p>Add workout</p>
            <input
                name='date'
                onChange={(e) => setDate(new Date(e.target.value))}
                type='date'
            />
            <input
                min={0}
                name='duration'
                onChange={(e) => setDuration(parseInt(e.target.value))}
                placeholder='Duration (min)'
                type='number'
            />
            <select
                id='type'
                name='type'
                onChange={(e) => setType(e.target.value)}
                required
            >
                <option value='' disabled selected>Select a workout type</option>
                <option value='Bike'>Bike</option>
                <option value='Cardio'>Cardio</option>
                <option value='Run'>Run</option>
                <option value='Strength'>Strength</option>
                <option value='Weights'>Weights</option>
                <option value='Other'>Other</option>
            </select>
            {error && <p>{error}</p>}
            <button onClick={(e) => {
                e.preventDefault();
                handleSave();
            }}>SAVE</button>
        </form>
    );
};

export const getServerSideProps: GetServerSideProps<AddWorkoutProps> = async (context: GetServerSidePropsContext) => {
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

export default AddWorkout;

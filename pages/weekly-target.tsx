import React, { useCallback, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { User } from '../types/user';

type WeeklyTargetProps = {
    user: User;
};

type UpdateWeeklyTargetArgs = {
    router: NextRouter,
    setError: (error: boolean) => void,
    userId: string,
    weeklyTarget: string
};

const updateWeeklyTarget = async ({
    router,
    setError,
    userId,
    weeklyTarget
}: UpdateWeeklyTargetArgs) => {
    if (parseInt(weeklyTarget) < 0) {
        setError(true);
        return;
    }

    await fetch(`/api/users/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weeklyTarget }),
    });

    router.push('/');
}

const WeeklyTarget = ({ user }: WeeklyTargetProps) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [minutes, setMinutes] = useState<string>(user.weeklyTarget?.toString() as string);

    const handleSave = useCallback(() => updateWeeklyTarget({
        router,
        setError,
        userId: user.id,
        weeklyTarget: minutes,
    }), [minutes, router, setError, user]);

    return (
        <form>
            <p>Set weekly target in minutes</p>
            <input
                min='0'
                onChange={(e) => setMinutes(e.target.value)}
                type='number'
                value={minutes}
            />
            {error && <p>Please enter a positive number</p>}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                SAVE
            </button>
        </form>
    );
};

export const getServerSideProps: GetServerSideProps<WeeklyTargetProps> = async (context: GetServerSidePropsContext) => {
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

export default WeeklyTarget;

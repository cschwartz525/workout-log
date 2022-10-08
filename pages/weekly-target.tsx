import React, { useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { User } from '../types/user';

type WeeklyTargetProps = {
    user: User;
};

const updateWeeklyTarget = async (
    userId: string,
    weeklyTarget: string,
    router: NextRouter
) => {
    await fetch(`/api/users/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weeklyTarget }),
    });

    router.push('/');
}

const WeeklyTarget = ({ user }: WeeklyTargetProps) => {
    const router = useRouter();
    const [minutes, setMinutes] = useState<string>(user.weeklyTarget?.toString() as string);

    return (
        <div>
            <p>Set weekly target in minutes</p>
            <input onChange={(e) => setMinutes(e.target.value)} type='number' value={minutes}></input>
            <button onClick={() => updateWeeklyTarget(user.id, minutes, router)}>SAVE</button>
        </div>
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

export default WeeklyTarget;

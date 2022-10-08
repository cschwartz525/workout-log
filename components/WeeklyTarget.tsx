import React from 'react';
import { useRouter } from 'next/router';

type WeeklyTargetProps = {
    weeklyTarget: number | undefined;
};

const WeeklyTarget = ({ weeklyTarget }: WeeklyTargetProps) => {
    const router = useRouter();

    if (weeklyTarget) {
        return (
            <div>
                <p>Weekly Target: {weeklyTarget} minutes</p>
                <button onClick={() => router.push('/weekly-target')}>Update</button>
            </div>
        );
    } else {
        return <button onClick={() => router.push('/weekly-target')}>Set Weekly Target</button>
    }
};

export default WeeklyTarget;
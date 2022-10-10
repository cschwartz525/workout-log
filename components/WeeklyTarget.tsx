import React from 'react';
import { useRouter } from 'next/router';
import { formatTime } from '../utils/formatters';

type WeeklyTargetProps = {
    weeklyTarget: number | undefined;
};

const WeeklyTarget = ({ weeklyTarget }: WeeklyTargetProps) => {
    const router = useRouter();

    if (weeklyTarget) {
        return (
            <div>
                <p>Weekly Target: {formatTime(weeklyTarget)}</p>
                <button onClick={() => router.push('/weekly-target')}>Update</button>
            </div>
        );
    } else {
        return <button onClick={() => router.push('/weekly-target')}>Set Weekly Target</button>
    }
};

export default WeeklyTarget;
import React from 'react';
import { useRouter } from 'next/router';
import { Workout } from '../types/workout';
import { formatTime } from '../utils/formatters';
import { calculateTotalDuration } from '../utils/workouts';

type WeeklyTargetProps = {
    weeklyTarget: number | undefined;
    workouts: Workout[];
};

const WeeklyTarget = ({ weeklyTarget, workouts }: WeeklyTargetProps) => {
    const router = useRouter();
    const weeklyTotal = calculateTotalDuration(workouts);

    if (weeklyTarget) {
        return (
            <div>
                <p>🎯 Weekly target: <strong>{formatTime(weeklyTarget)}</strong> 🎯</p>
                {
                    weeklyTarget > weeklyTotal
                    ? <p>⏱️ Remaining time: <strong>{formatTime(weeklyTarget - weeklyTotal)}</strong> ⏱️</p>
                    : <p>🎉 <strong>Congratulations!</strong> You hit your target for this week 🎉</p>
                }
                <button onClick={() => router.push('/weekly-target')}>UPDATE</button>
            </div>
        );
    } else {
        return <button onClick={() => router.push('/weekly-target')}>Set Weekly Target</button>
    }
};

export default WeeklyTarget;
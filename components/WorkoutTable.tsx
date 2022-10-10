import React from 'react';
import { Workout } from '../types/workout';
import WorkoutLineItem from './WorkoutLineItem';

type WorkoutTableProps = {
    workouts: Workout[];
};

const WorkoutTable = ({ workouts }: WorkoutTableProps) => (
    <table>
        <tr>
            <th>Date</th>
            <th>Duration</th>
            <th>Type</th>
        </tr>
        {workouts.map(workout => <WorkoutLineItem key={workout.id} workout={workout} />)}
    </table>
);

export default WorkoutTable;
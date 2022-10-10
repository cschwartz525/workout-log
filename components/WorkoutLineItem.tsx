import React from 'react';
import { Workout } from '../types/workout';

type WorkoutLineItemProps = {
    workout: Workout;
};

const WorkoutLineItem = ({ workout }: WorkoutLineItemProps) => (
    <tr>
        <td>{workout.date?.toString()}</td>
        <td>{workout.duration}</td>
        <td>{workout.type}</td>
    </tr>
);

export default WorkoutLineItem;
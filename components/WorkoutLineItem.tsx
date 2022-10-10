import React from 'react';
import { formatDate, formatTime } from '../utils/formatters';
import { Workout } from '../types/workout';

type WorkoutLineItemProps = {
    workout: Workout;
};

const WorkoutLineItem = ({ workout }: WorkoutLineItemProps) => (
    <tr>
        <td>{formatDate(workout.date)}</td>
        <td>{formatTime(workout.duration)}</td>
        <td>{workout.type}</td>
    </tr>
);

export default WorkoutLineItem;
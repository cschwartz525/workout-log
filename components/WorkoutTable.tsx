import React from 'react';
import { Workout } from '../types/workout';
import { isDateInRange } from '../utils/date';
import WorkoutLineItem from './WorkoutLineItem';

type WorkoutTableProps = {
    endDate: Date;
    startDate: Date;
    workouts: Workout[];
};

const WorkoutTable = ({ endDate, startDate, workouts }: WorkoutTableProps) => (
    <table>
        <tr>
            <th>Date</th>
            <th>Duration</th>
            <th>Type</th>
        </tr>
        {
            workouts
                // Dates come back from API as string and need to be converted to Date before filtering and sorting
                .map(workout => ({ ...workout, date: new Date(workout.date) }))
                // Limit workouts in the table between startDate and endDate
                .filter(workout => isDateInRange(workout.date, startDate, endDate))
                // Sort workouts by date descending
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                // Render a WorkoutLineItem to display each workout
                .map(workout => <WorkoutLineItem key={workout.id} workout={workout} />)
        }
    </table>
);

export default WorkoutTable;
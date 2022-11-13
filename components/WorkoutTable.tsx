import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { Workout } from '../types/workout';
import { isDateInRange } from '../utils/date';
import { formatTime } from '../utils/formatters';
import WorkoutLineItem from './WorkoutLineItem';

type WorkoutTableProps = {
    endDate: Date;
    heading: string;
    showAddButton?: boolean;
    showTotal?: boolean;
    startDate: Date;
    workouts: Workout[];
};

const AddButton = styled.button`
    border: none;
    border-radius: 50%;
    cursor: pointer;
    height: 30px;
    width: 30px;
`;

const Header = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

/**
 * Formats, filters, and sorts an array of workouts given a start and end date
 *
 * @param workouts Workouts provided as a prop to the WorkoutTable component
 * @param startDate Start date of the range
 * @param endDate End date of the range
 * @returns Filtered array of workouts containing only workouts within the given date range, sorted by date descending
 */
const filterAndSortWorkouts = (workouts: Workout[], startDate: Date, endDate: Date): Workout[] => (
    workouts
        // Dates come back from API as string and need to be converted to Date before filtering and sorting
        .map(workout => ({ ...workout, date: new Date(workout.date) }))
        // Limit workouts in the table between startDate and endDate
        .filter(workout => isDateInRange(workout.date, startDate, endDate))
        // Sort workouts by date descending
        .sort((a, b) => b.date.getTime() - a.date.getTime())
);

/**
 * Helper function to calculate the sum of durations for given set of workouts
 *
 * @param workouts Workouts provided as a prop to the WorkoutTable component
 * @param startDate Start date of the range
 * @param endDate End date of the range
 * @returns Total number of minutes worked out during the given date range
 */
const calculateTotalDuration = (workouts: Workout[], startDate: Date, endDate: Date): number => {
    const filteredSortedWorkouts = filterAndSortWorkouts(workouts, startDate, endDate);

    return filteredSortedWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
};

const WorkoutTable = ({
    endDate,
    heading,
    showAddButton,
    showTotal,
    startDate,
    workouts
}: WorkoutTableProps) => {
    const router = useRouter();

    return (
        <div>
            <Header>
                <h3>{heading}</h3>
                {showAddButton && <AddButton onClick={() => router.push('/add-workout')}>+</AddButton>}
            </Header>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Type</th>
                </tr>
                {
                    filterAndSortWorkouts(workouts, startDate, endDate)
                        // Render a WorkoutLineItem to display each workout
                        .map(workout => <WorkoutLineItem key={workout.id} workout={workout} />)
                }
                {
                    showTotal &&
                    <tr>
                        <td>Total</td>
                        <td>{formatTime(calculateTotalDuration(workouts, startDate, endDate))}</td>
                        <td></td>
                    </tr>
                }
            </table>
        </div>
    );
};

export default WorkoutTable;
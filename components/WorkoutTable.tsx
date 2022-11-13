import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { Workout } from '../types/workout';
import { isDateInRange } from '../utils/date';
import WorkoutLineItem from './WorkoutLineItem';

type WorkoutTableProps = {
    endDate: Date;
    heading: string;
    showAddButton?: boolean;
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

const WorkoutTable = ({ endDate, heading, showAddButton, startDate, workouts }: WorkoutTableProps) => {
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
        </div>
    );
};

export default WorkoutTable;
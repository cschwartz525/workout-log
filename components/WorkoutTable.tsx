import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { Workout } from '../types/workout';
import { calculateTotalDuration } from '../utils/workouts';
import { formatTime } from '../utils/formatters';
import WorkoutLineItem from './WorkoutLineItem';

type WorkoutTableProps = {
    heading: string;
    showAddButton?: boolean;
    showTotal?: boolean;
    workouts: Workout[];
};

const AddButton = styled.button`
    border: none;
    border-radius: 50%;
    cursor: pointer;
    height: 30px;
    padding: 0;
    width: 30px;
`;

const WorkoutTable = ({
    heading,
    showAddButton,
    showTotal,
    workouts
}: WorkoutTableProps) => {
    const router = useRouter();

    return (
        <div>
            <div className='table-header'>
                <h3 className='left'>{heading}</h3>
                <div className='right'>
                    {showTotal && <span>Total: {formatTime(calculateTotalDuration(workouts))}</span>}
                    {showAddButton && <AddButton onClick={() => router.push('/add-workout')}>+</AddButton>}
                </div>
            </div>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Type</th>
                </tr>
                {
                    workouts.map(workout => <WorkoutLineItem key={workout.id} workout={workout} />)
                }
            </table>
        </div>
    );
};

export default WorkoutTable;
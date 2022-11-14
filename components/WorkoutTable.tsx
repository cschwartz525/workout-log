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

const Header = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
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
                    workouts.map(workout => <WorkoutLineItem key={workout.id} workout={workout} />)
                }
                {
                    showTotal &&
                    <tr>
                        <td>Total</td>
                        <td>{formatTime(calculateTotalDuration(workouts))}</td>
                        <td></td>
                    </tr>
                }
            </table>
        </div>
    );
};

export default WorkoutTable;
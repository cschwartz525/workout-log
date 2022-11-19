import React, { Fragment } from 'react';
import WorkoutTable from '../components/WorkoutTable';
import { Workout } from '../types/workout';
import {
    getEndOfWeek,
    getStartOfWeek,
    isDateInRange
} from '../utils/date';
import { formatDate } from '../utils/formatters';

type Week = {
    startDate: Date;
    endDate: Date;
    workouts: Workout[]
};

const groupWorkoutsByWeek = (workouts: Workout[]): Week[] => {
    const res = [];
    const _workouts = [...workouts];

    let offset = 0;

    while (_workouts.length) {
        let startDate = getStartOfWeek(offset);
        let endDate = getEndOfWeek(offset);

        const cur = [];
        let i = 0;

        while (i < _workouts.length) {
            const workout = _workouts[i];

            if (isDateInRange(new Date(workout.date), startDate, endDate)) {
                cur.push(workout);
                _workouts.splice(i, 1);
            } else {
                i++;
            }
        }

        res.push({ startDate, endDate, workouts: cur });

        offset += 1;
    }

    return res;
}

const HistoricalWorkouts = ({ workouts }: { workouts: Workout[] }): JSX.Element => {
    const weeks = groupWorkoutsByWeek(workouts);

    // Remove current week from the array;
    weeks.splice(0, 1);

    return (
        <div>
            {weeks.map((week, index) => (
                <Fragment key={`workout-table-${index}`}>
                    <hr />
                    <WorkoutTable
                        heading={`${formatDate(week.startDate)} - ${formatDate(week.endDate)}`}
                        showTotal
                        workouts={week.workouts}
                    />
                </Fragment>
            ))}
        </div>
    );
}

export default HistoricalWorkouts;
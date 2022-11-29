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
    
    const _workouts = workouts
        .map(workout => ({ ...workout, date: new Date(workout.date) }))
        .sort((a, b) => b.date.getTime() - a.date.getTime());

    let offset = 0;
    let i = 0;

    while (i < _workouts.length) {
        let startDate = getStartOfWeek(offset);
        let endDate = getEndOfWeek(offset);

        const cur = [];

        while (i < _workouts.length && isDateInRange(new Date(_workouts[i].date), startDate, endDate)) {
            cur.push(_workouts[i]);
            i++;
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
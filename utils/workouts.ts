import { Workout } from '../types/workout';
import { isDateInRange } from '../utils/date';

/**
 * Formats, filters, and sorts an array of workouts given a start and end date
 *
 * @param workouts Workouts provided as a prop to the WorkoutTable component
 * @param startDate Start date of the range
 * @param endDate End date of the range
 * @returns Filtered array of workouts containing only workouts within the given date range, sorted by date descending
 */
export const filterAndSortWorkouts = (workouts: Workout[], startDate: Date, endDate: Date): Workout[] => (
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
 * @returns Total number of minutes worked out during the given date range
 */
export const calculateTotalDuration = (workouts: Workout[]): number => (
    workouts.reduce((sum, workout) => sum + workout.duration, 0)
);
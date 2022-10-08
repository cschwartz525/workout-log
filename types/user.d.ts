import { Workout } from './workout';

type User = {
    id: string;
    name: string;
    weeklyTarget?: number;
    workouts?: [Workout];
};
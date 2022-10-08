import { User } from './user';

type Workout = {
    id: string;
    date: Date,
    duration: number,
    type: string,
    user: User
};

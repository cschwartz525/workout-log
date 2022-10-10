import type { NextApiRequest, NextApiResponse } from 'next';
import { User, Workout } from '../../../db/models';
import connectMongo from '../../../db/connect-mongo';

type WorkoutData = {
    workout: any;
};

type ErrorData = {
    error: string;
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<WorkoutData | ErrorData>
) => {
    const { userId } = req.body;

    try {
        await connectMongo();
        const user = await User.findOne({ id: '101927703181492899764' });
        const workout = await Workout.create({ id: 1, date: Date.now(), duration: 30, type: 'Run', user });
        user.workouts.push(workout);
        user.save();
        res.status(200).json({ workout })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error as string });
    }
};

export default handler;
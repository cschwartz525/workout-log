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
    const { date, duration, type, userId } = req.body;

    try {
        await connectMongo();
        const user = await User.findOne({ id: userId });
        const workout = await Workout.create({ date, duration, type, user });
        user.workouts.push(workout);
        user.save();
        res.status(200).json({ workout })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error as string });
    }
};

export default handler;
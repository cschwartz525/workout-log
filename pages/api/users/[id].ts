import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/user';
import connectMongo from '../../../utils/connect-mongo';

type UserData = {
    user: any;
};

type ErrorData = {
    error: string;
};

const handler = (
    req: NextApiRequest,
    res: NextApiResponse<UserData | ErrorData>
) => {
    if (req.method === 'GET') {
        return getUser(req, res);
    } else if (req.method === 'POST') {
        return updateUser(req, res);
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};

const getUser = async (
    req: NextApiRequest,
    res: NextApiResponse<UserData | ErrorData>
) => {
    const { id } = req.query;

    try {
        await connectMongo();
        const user = await User.find({ id });
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ error: error as string });
    }
};

const updateUser = async (
    req: NextApiRequest,
    res: NextApiResponse<UserData | ErrorData>
) => {
    const { id } = req.query;

    try {
        await connectMongo();
        const user = await User.findOneAndUpdate({ id }, req.body);
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ error: error as string });
    }
};

export default handler;
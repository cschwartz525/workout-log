import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../models/user';
import connectMongo from '../../../utils/connect-mongo';

export default NextAuth({
    callbacks: {
        async session({ session, token }) {
            const id = token.sub as string;

            if (session?.user) {
                session.user.id = id;

                // If user exists in the data store, pull user's data
                // If user does not exist in the data store, create and persist a record for the user
                try {
                    await connectMongo();
                    const userExists = await User.exists({ id });

                    if (!userExists) {
                        const newUser = await User.create({
                            id,
                            name: session?.user.name,
                            weeklyTarget: 0
                        });
                        console.log('User created', newUser);
                    }
                } catch (error) {
                    console.error(error);
                }
            }

            return session;
        }
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    secret: process.env.JWT_SECRET
});

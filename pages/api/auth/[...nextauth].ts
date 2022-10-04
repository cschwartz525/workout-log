import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    callbacks: {
        async session({ session, token }) {
            console.log('session', session);
            console.log('token', token);

            if (session?.user) {
                session.user.id = token.sub as string;
            }

            // If user exists in the data store, pull user's data

            // If user does not exist in the data store, create and persist a record for the user

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
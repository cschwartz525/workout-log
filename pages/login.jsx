import React from 'react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

const Login = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <div>
                <p>Welcome {session.user.name}</p>
                <img src={session.user.image} alt='' />
                <button onClick={() => signOut()}>LOGOUT</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>You are not signed in</p>
                <button onClick={() => signIn()}>LOGIN</button>
            </div>
        );
    }
};

export default Login

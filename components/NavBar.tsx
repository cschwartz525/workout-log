import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import styled from 'styled-components';

const Nav = styled.nav`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;

const Avatar = styled(Image)`
    border-radius: 50%;
    margin-left: 5px;
`;

const Dropdown = styled.div`
    height: 0;
    margin-top: 10px;
    position: absolute;
    right: 0;
`;

const DropdownTrigger = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
`;

const UserDetails = styled.div`
    position: relative;
`;

const UserName = styled.span`
    margin-right: 5px;

    @media screen and (max-width: 400px) {
        display: none;
    }
`;

const NavBar = () => {
    const { data } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <Nav>
            <Link href='/'>💪 Workout Log</Link>
            {
                data?.user &&
                <UserDetails>
                    <DropdownTrigger onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <UserName>{data.user.name}</UserName>
                        <Avatar 
                            alt=''
                            height={50}
                            src={data.user.image as string}
                            width={50}
                        />
                    </DropdownTrigger>
                    {
                        isDropdownOpen &&
                        <Dropdown>
                            <button onClick={() => signOut()}>Logout</button>
                        </Dropdown>
                    }
                </UserDetails>
            }
        </Nav>
    )
};

export default NavBar;
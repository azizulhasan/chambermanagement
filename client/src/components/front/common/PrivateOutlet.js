import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { authenTicateUser } from '../../../utilities/utilities';

const PrivateOutlet = () => {
    const { loggedInUser } = useSelector(state => state.users)
    useEffect(() => {
        console.log(loggedInUser)
    }, [loggedInUser])
    return loggedInUser === undefined ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateOutlet;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authenTicateUser } from '../../../utilities/utilities';

const PrivateOutlet = () => {
    const auth = authenTicateUser();
    return !auth ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateOutlet;

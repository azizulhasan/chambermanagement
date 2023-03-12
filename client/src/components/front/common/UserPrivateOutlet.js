import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserPrivateOutlet = () => {
    const { loggedInUser } = useSelector((state) => state.users);

    return loggedInUser.accessToken &&
        (loggedInUser.userRole === 'USER' ||
            loggedInUser.userRole === 'DOCTOR') ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

export default UserPrivateOutlet;

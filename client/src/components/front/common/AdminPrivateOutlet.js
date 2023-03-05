import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateOutlet = () => {
    const { loggedInUser } = useSelector((state) => state.users);

    return loggedInUser.accessToken && loggedInUser.userRole === 'ADMIN' ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};

export default AdminPrivateOutlet;

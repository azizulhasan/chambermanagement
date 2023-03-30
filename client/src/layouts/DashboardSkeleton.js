import DashboardSideNav from '../features/dashboard/components/DashboardSideNav';
import DashboardTopNav from '../features/dashboard/components/DashboardTopNav';

const DashboardSkeleton = ({ children }) => {
    return (
        <>
            <DashboardTopNav />
            <div id="layoutSidenav">
                <DashboardSideNav />
                {children}
            </div>
        </>
    );
};

export default DashboardSkeleton;

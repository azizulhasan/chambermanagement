import DashboardSideNav from './DashboardSideNav';
import DashboardTopNav from './DashboardTopNav';

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

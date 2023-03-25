import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchData } from '../../../utilities/utilities';
import DataTable from '../components/DataTable';

const Status = ({ status }) => (
    <a
        href="https://meet.google.com/fss-jspv-wtw"
        target="_blank"
        rel="noreferrer"
        className="bg-themeColor drop-shadow-md text-white px-4 py-1 rounded-md"
    >
        {status}
    </a>
);

const Schedule = () => {
    const [body, setBody] = useState([]);
    const [loading, setLoading] = useState(false);
    const loggedInUser = useSelector((state) => state.users.loggedInUser);

    let headers = [];

    if (loggedInUser.userRole === 'USER' || null) {
        headers = [
            { prop: 'session', title: 'Session', isFilterable: true },
            {
                prop: 'doctor',
                title: 'Doctor',
                isFilterable: true,
            },
            { prop: 'duration', title: 'Duration', isFilterable: true },
            { prop: 'date', title: 'Date', isFilterable: true },
            { prop: 'time', title: 'Time', isFilterable: true },
            { prop: 'status', title: 'Status' },
        ];
    } else if (loggedInUser.userRole === 'DOCTOR') {
        headers = [
            { prop: 'session', title: 'Session', isFilterable: true },
            {
                prop: 'patient',
                title: 'Patient',
                isFilterable: true,
            },
            { prop: 'duration', title: 'Duration', isFilterable: true },
            { prop: 'date', title: 'Date', isFilterable: true },
            { prop: 'time', title: 'Time', isFilterable: true },
            { prop: 'status', title: 'Status', isFilterable: true },
        ];
    }

    const fetchUserSchedules = async (id) => {
        setLoading(true);

        try {
            const { data } = await fetchData({
                endpoint: `/api/userSchedule/userschedules/${id}`,
            });
            setLoading(false);
            if (loggedInUser.userRole === 'USER' || null) {
                setBody(() =>
                    data.map((schedule) => {
                        return {
                            _id: 'nbdg5b87wsc3946',
                            session: schedule.session_name,
                            doctor: schedule.doctor_id,
                            duration: '',
                            date: schedule.session_date.slice(0, 10),
                            time: schedule.session_time,
                            status: <Status status={schedule.status} />,
                        };
                    })
                );
            } else if (loggedInUser.userRole === 'DOCTOR') {
                setBody(() =>
                    data.map((schedule) => {
                        return {
                            _id: 'nbdg5b87wsc3946',
                            session: schedule.session_name,
                            patient: schedule.name,
                            duration: '',
                            date: schedule.session_date.slice(0, 10),
                            time: schedule.session_time,
                            status: <Status status={schedule.status} />,
                        };
                    })
                );
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    };

    useEffect(() => {
        fetchUserSchedules(loggedInUser.id);
    }, []);

    if (loading) {
        return <div>Loading, please wait...</div>;
    } else if (body.length === 0) {
        return <div>No data found</div>;
    }

    return (
        <div>
            <DataTable
                title="Scheduled Sessions"
                titleUnderlined
                headers={headers}
                body={body}
                withFilter
                withPagination
                rowsPerPageOptions={[5, 10, 20, 30, 50, 70, 100]}
            />
        </div>
    );
};

export default Schedule;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchData } from '../../../utilities/utilities';
import DataTable from '../components/DataTable';

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
            { prop: 'phone', title: 'Phone', isFilterable: true },
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
            { prop: 'phone', title: 'Phone', isFilterable: true },
            { prop: 'status', title: 'Status', isFilterable: true },
            { prop: 'actions', title: 'Actions', isFilterable: true },
        ];
    }

    const Status = ({ status }) => (
        <span className="bg-themeColor drop-shadow-md text-white px-4 py-1 rounded-md">
            {status}
        </span>
    );

    const Actions = () => (
        <span className="bg-themeColor drop-shadow-md text-white px-4 py-1 rounded-md">
            Edit
        </span>
    );

    const fetchSchedules = async (id) => {
        setLoading(true);
        let endpoint = '';
        if (loggedInUser.userRole === 'USER' || null) {
            endpoint = `/api/userSchedule/userschedules/${id}`;
        } else if (loggedInUser.userRole === 'DOCTOR') {
            endpoint = `/api/userSchedule/doctorschedules/${id}`;
        }

        try {
            const { data } = await fetchData({
                endpoint,
            });
            setLoading(false);
            if (loggedInUser.userRole === 'USER' || null) {
                let bodyData = [];
                for (let i = 0; i < data.length; i++) {
                    let doctorDetails = await fetchData({
                        endpoint: `/api/users/${data[i]['doctor_id']}`,
                    });
                    bodyData[i] = {
                        _id: 'nbdg5b87wsc3946',
                        session: data[i].session_name,
                        doctor: doctorDetails.name,
                        phone: doctorDetails.phone,
                        status: <Status status={data[i].status} />,
                    };
                }

                setBody(bodyData);
            } else if (loggedInUser.userRole === 'DOCTOR') {
                setBody(() =>
                    data.map((schedule) => {
                        return {
                            _id: 'nbdg5b87wsc3946',
                            session: schedule.session_name,
                            patient: schedule.name,
                            phone: schedule.phone,
                            status: <Status status={schedule.status} />,
                            actions: <Actions />,
                        };
                    })
                );
            }
        } catch (e) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedules(loggedInUser.id);
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

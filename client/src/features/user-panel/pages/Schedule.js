import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchData } from '../../../utilities/utilities';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import SessionUpdateForm from '../components/SessionUpdateForm';

const Schedule = () => {
    const [body, setBody] = useState([]);
    const [loading, setLoading] = useState(false);
    const loggedInUser = useSelector((state) => state.users.loggedInUser);
    const currentDoctorSchedules = useSelector(
        (state) => state.userSchedules.currentDoctorSchedules
    );

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
        <button className="bg-themeColor drop-shadow-md text-white px-2.5 rounded-md">
            {status}
        </button>
    );

    const Actions = ({ data }) => {
        const [open, setOpen] = useState(false);
        return (
            <div>
                <button
                    className="bg-themeColor drop-shadow-md text-white px-2.5 rounded-md"
                    onClick={() => setOpen(true)}
                >
                    Edit
                </button>

                {open && (
                    <Modal
                        open={open}
                        setOpen={setOpen}
                        extraClasses="min-w-[85%] sm:min-w-[60%] rounded-md"
                    >
                        <SessionUpdateForm
                            currentValues={data}
                            setOpen={setOpen}
                        />
                    </Modal>
                )}
            </div>
        );
    };

    async function fetchSchedules(id) {
        setLoading(true);
        let endpoint = '';
        if (loggedInUser.userRole === 'USER' || null) {
            endpoint = `/api/userSchedules/userschedules/${id}`;
        } else if (loggedInUser.userRole === 'DOCTOR') {
            endpoint = `/api/userSchedules/doctorschedules/${id}`;
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
                    data.map((schedule, i) => {
                        return {
                            _id: 'nbdg5b87wsc3946',
                            session: schedule.session_name,
                            patient: schedule.name,
                            phone: schedule.phone,
                            status: <Status status={schedule.status} />,
                            actions: <Actions data={data[i]} />,
                        };
                    })
                );
            }
        } catch (e) {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSchedules(loggedInUser.id);
    }, [currentDoctorSchedules, loggedInUser.id]);

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

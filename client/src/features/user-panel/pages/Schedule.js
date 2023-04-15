import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../../components/form/Select';
import { updateSchedule } from '../../../store/userScheduleSlice';
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
            { prop: 'phone', title: 'Phone', isFilterable: true },
            { prop: 'date', title: 'Date', isFilterable: true },
            { prop: 'time', title: 'Time', isFilterable: true },
            { prop: 'status', title: 'Status', isFilterable: true },
            // { prop: 'actions', title: 'Actions', isFilterable: true },
        ];
    }

    const Status = ({ currentState, options, id }) => {
        const [statusState, setStatusState] = useState('');
        const dispatch = useDispatch();

        const bgColor =
            statusState === 'Completed'
                ? 'bg-themeColor'
                : statusState === 'Upcomming'
                    ? 'bg-yellow-600'
                    : statusState === 'Ongoing'
                        ? 'bg-red-600'
                        : 'black';

        const handleStatusChange = (e) => {
            setStatusState(e.target.value);
            dispatch(updateSchedule([id, { status: e.target.value }]));
        };

        useEffect(() => {
            setStatusState(currentState);
        }, []);

        return (
            //TODO: status will be updatable like dashboard for only doctor.
            // <Select
            //     name="status"
            //     value={statusState}
            //     onChange={(e) => handleStatusChange(e)}
            //     options={options}
            //     classes={bgColor + ' rounded-md text-white py-1 px-1.5'}
            // />
            <div className='bg-themeColor text-white py-1 px-1.5 w-24'>{statusState}</div>
        );
    };

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
                        _id: data[i]._id,
                        session: data[i].session_name,
                        doctor: doctorDetails.name,
                        phone: doctorDetails.phone,
                        date: data[i].session_date,
                        time: data[i].session_time,
                        status: <Status currentState={data[i].status} />,
                    };
                }
                setBody(bodyData);
            } else if (loggedInUser.userRole === 'DOCTOR') {
                setBody(() =>
                    data.map((schedule, i) => {
                        return {
                            _id: schedule._id,
                            session: schedule.session_name,
                            patient: schedule.name,
                            phone: schedule.phone,
                            date: schedule.session_date.slice(0, 10),
                            time: schedule.session_time,
                            status: (
                                <Status
                                    currentState={schedule.status}
                                    id={schedule._id}
                                    options={schedule.statusOptions}
                                />
                            ),
                            // actions: <Actions data={data[i]} />,
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

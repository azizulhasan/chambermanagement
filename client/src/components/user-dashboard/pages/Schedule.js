import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchData } from '../../../utilities/utilities';
import DataTable from '../components/DataTable';

const Action = () => (
    <a
        href="https://meet.google.com/fss-jspv-wtw"
        target="_blank"
        rel="noreferrer"
        className="bg-themeColor drop-shadow-md text-white px-4 py-1 rounded-md"
    >
        Join
    </a>
);

const headers = [
    { prop: 'session', title: 'Session', isFilterable: true },
    {
        prop: 'patient',
        title: 'Patient',
        isFilterable: true,
    },
    // { prop: 'department', title: 'Department', isFilterable: true },
    { prop: 'duration', title: 'Duration', isFilterable: true },
    { prop: 'date', title: 'Date', isFilterable: true },
    { prop: 'time', title: 'Time', isFilterable: true },
    { prop: 'action', title: 'Action' },
];

const body = [
    {
        _id: 'nbdg5b87wsc394y',
        session: 'XYZ',
        doctor: 'Dr. Bruno Rodrigues',
        patient: 'Asdf',
        dept: 'Mental Health',
        duration: '30 mins',
        date: '5th May, 2023',
        time: '20:00',
        action: <Action />,
    },
    {
        _id: 'nbdg5b87wsc3941',
        session: 'XYZ',
        doctor: 'Dr. Abc Rodrigues',
        patient: 'Sdfg',
        dept: 'Mental Health',
        duration: '30 mins',
        date: '2nd April, 2023',
        time: '20:00',
        action: <Action />,
    },
    {
        _id: 'nbdg5b87wsc3942',
        session: 'XYZ',
        doctor: 'Dr. Def Rodrigues',
        patient: 'Dfgh',
        dept: 'Mental Health',
        duration: '30 mins',
        date: '2nd April, 2023',
        time: '20:00',
        action: <Action />,
    },
    {
        _id: 'nbdg5b87wsc3943',
        session: 'XYZ',
        doctor: 'Dr. Bruno Rodrigues',
        patient: 'Fghj',
        dept: 'Mental Health',
        duration: '40 mins',
        date: '2nd April, 2023',
        time: '20:00',
        action: <Action />,
    },
    {
        _id: 'nbdg5b87wsc3944',
        session: 'XYZ',
        doctor: 'Dr. Bruno Rodrigues',
        patient: 'Ghjk',
        dept: 'Mental Health',
        duration: '30 mins',
        date: '2nd April, 2023',
        time: '20:00',
        action: <Action />,
    },
    {
        _id: 'nbdg5b87wsc3945',
        session: 'XYZ',
        doctor: 'Dr. Bruno Rodrigues',
        patient: 'Hjkl',
        dept: 'Mental Health',
        duration: '60 mins',
        date: '3rd April, 2023',
        time: '20:00',
        action: <Action />,
    },
    {
        _id: 'nbdg5b87wsc3946',
        session: 'ABC',
        doctor: 'Dr. Bruno Rodrigues',
        patient: 'Jklz',
        dept: 'Mental Health',
        duration: '30 mins',
        date: '2nd April, 2023',
        time: '20:00',
        action: <Action />,
    },
];

// ~ /doctorschedules/:doctor_id

const Schedule = () => {
    // const [body, setBody] = useState([]);

    // const loggedInUser = useSelector((state) => state.users.loggedInUser);

    // const fetchDoctorDetails = async (id) => {
    //     try {
    //         const { data } = await fetchData({
    //             endpoint: `/api/userSchedule/doctorschedules/${id}`,
    //         });
    //         console.log({ data });
    //         setBody(() =>
    //             data.map((schedule) => {
    //                 return {
    //                     _id: 'nbdg5b87wsc3946',
    //                     session: schedule.session_name,
    //                     patient: schedule.name,
    //                     // department: '',
    //                     duration: '',
    //                     date: schedule.session_date.slice(0, 10),
    //                     time: schedule.session_time,
    //                     action: <Action />,
    //                 };
    //             })
    //         );
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // console.log({ loggedInUser });
    // useEffect(() => {
    //     fetchDoctorDetails(loggedInUser.id);
    // }, []);

    // if (body.length === 0) {
    //     return <div>Loading, Please wait...</div>;
    // }

    return (
        <div>
            <DataTable
                title="Scheduled Sessions"
                titleUnderlined
                headers={headers}
                body={body}
                withFilter
                withPagination
                rowsPerPageOptions={[1, 5, 10, 20, 30, 50, 70, 100]}
            />
        </div>
    );
};

export default Schedule;

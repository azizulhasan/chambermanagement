import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFomattedDate } from '../../utilities/utilities';

export default function PatientDetails() {
    const [notice, setNotice] = useState('')
    const { isNewSchedule, registerUserSchedule, } = useSelector(
        (state) => state.userSchedules
    );

    const { singleUser } = useSelector(
        (state) => state.users
    );




    function getNewSessionNotice() {
        let date = getFomattedDate(registerUserSchedule[1].session_date);
        let time = registerUserSchedule[1].session_time;
        let sessionName = registerUserSchedule[1].session_name;
        let patientName = registerUserSchedule[2].name
        let doctorName = singleUser.name;
        return <>
            <h1 className='font-size-lg'>Congratulations:</h1>
            <p>You just booked a Session with {doctorName} at {time}  on {date}. The price for the service is ৳5,000.00.</p>
            <p> Session Status: <strong className='bg-themeColor p-1 text-white' >On Hold</strong></p>
            <p>Please pay for this session through <strong>BKASH</strong>. To confirm the session. </p>
        </>;
    }
    return (
        <>
            <div className="w-full col-span-12 pt-10">
                {!isNewSchedule && Object.keys(registerUserSchedule).length && registerUserSchedule[2].hasOwnProperty('email') && getNewSessionNotice()}
            </div>
        </>
    );
}

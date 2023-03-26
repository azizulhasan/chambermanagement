import React, { useState, useEffect } from 'react';

import Input from '../../components/front/common/form/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionStorage, prepareDataForSave, saveSessionData } from '../../utilities/utilities';
import { amOrPm, convertUTCDateToLocalDate } from '../../utilities/timeUtilities';

export default function PatientDetails() {
    const [sessionData, setSessionData] = useState({})
    const pageNo = 3
    const dispatch = useDispatch();

    const { registerUserSchedule, isNewSchedule } = useSelector((state) => state.userSchedules);

    const getTime = (datetime) => {
        let date = new Date(datetime)
        return convertUTCDateToLocalDate(date)
    }

    return (
        <>
            <div className='w-full col-span-12 pt-10'>
                {
                    !isNewSchedule && Object.keys(registerUserSchedule).length && <p>{`You selected a booking for Session by ${registerUserSchedule[1].doctor_id} at ${registerUserSchedule[1].session_time} am on ${getTime(registerUserSchedule[1].session_date)}. The price for the service is ৳5,000.00.
                Please provide your details in the form below to proceed with booking.`}</p>
                }
            </div>
        </>

    );
}

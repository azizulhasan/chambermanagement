import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Input from '../../components/front/common/form/Input';
import { useDispatch, useSelector } from 'react-redux';
import { prepareScheduleSessionData } from '../../utilities/utilities';
import { updateRegisterSchedule, updateNewSessionNotice } from '../../store/userScheduleSlice';
import { fetchSingleUser } from '../../store/usersSlice';
import { convertUTCDateToLocalDate, getMonthName } from '../../utilities/timeUtilities';

export default function PatientDetails() {

    const dispatch = useDispatch();
    const pageNo = 2
    const { registerUserSchedule, isNewSchedule, newSessionNotice } = useSelector((state) => state.userSchedules);
    const { singleUser } = useSelector((state) => state.users);

    const getTime = (datetime) => {
        let date = new Date(datetime)
        return date.getDate() + " " + getMonthName(date.getMonth()) + " " + date.getFullYear();
    }

    useEffect(() => {
        if (registerUserSchedule[1].doctor_id) {
            dispatch(fetchSingleUser(registerUserSchedule[1].doctor_id))
        }
    }, [registerUserSchedule])



    useEffect(() => {
        if (singleUser.hasOwnProperty('name')) {

            let date = getTime(registerUserSchedule[1].session_date)

            let notice = getNewSessionNotice(singleUser.name, date)
            dispatch(updateNewSessionNotice(notice))
        }
    }, [singleUser])

    const getDoctorName = (doctor_id, users) => {
        let data = users.filter((user, i) => user._id === doctor_id);
        return data.length ? data[0].name : '';
    }

    function getNewSessionNotice(doctorName, date) {
        return `You selected a booking for Session by ${doctorName} at ${registerUserSchedule[1].session_time}  on ${date}. The price for the service is ৳5,000.00.
                Please provide your details in the form below to proceed with booking.`
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const getFormValue = (e) => {
        let data = prepareScheduleSessionData(e.target.name, e.target.value, 2)
        dispatch(updateRegisterSchedule(data));
    };



    return (
        <>
            <div className='col-span-12 pt-10'>
                {
                    !isNewSchedule && newSessionNotice && <p>{newSessionNotice}</p>
                }
            </div>
            <div className="flex justify-between py-4 mb-8 ">
                <div className=" w-full col-span-4">
                    <Input
                        label={'Patient Name'}
                        name="name"
                        type="text"
                        placeholder="Name"
                        id="name"
                        value={registerUserSchedule[pageNo].name}
                        classes={'w-full border p-2'}
                        onChange={(e) => getFormValue(e)}
                    />
                </div>
                <div className="w-full px-2 col-span-4">
                    <Input
                        label={"Email ID"}
                        name="email"
                        type="email"
                        placeholder="Email"
                        id="email"
                        value={registerUserSchedule[pageNo].email}
                        classes={'w-full border p-2 '}
                        onChange={(e) => getFormValue(e)}
                        validate={register('email', {
                            required: true,
                            pattern:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                    />
                    {errors.email && (
                        <span className="error">
                            Emai is require.
                        </span>
                    )}
                </div>
                <div className="w-full col-span-4">
                    <Input
                        label={"Phone Number"}
                        name="phone"
                        type="number"
                        placeholder="Phone number"
                        id="phone"
                        value={registerUserSchedule[pageNo].phone}
                        classes={'w-full border p-2'}
                        onChange={(e) => getFormValue(e)}
                    />
                </div>
            </div>
        </>

    );
}

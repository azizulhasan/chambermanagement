import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Input from '../../components/form/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getFomattedDate, prepareScheduleSessionData } from '../../utilities/utilities';
import {
    updateRegisterSchedule,
    updateNewSessionNotice,
    fetchDoctorSchedules,
} from '../../store/userScheduleSlice';
import { fetchSingleUser } from '../../store/usersSlice';
import { fetchSchedules } from '../../store/schedulesSlice';


export default function PatientDetails() {
    const dispatch = useDispatch();
    const pageNo = 2;
    const { registerUserSchedule, isNewSchedule, newSessionNotice } =
        useSelector((state) => state.userSchedules);
    const { schedules } =
        useSelector((state) => state.schedules);
    const { singleUser } = useSelector((state) => state.users);

    useEffect(() => {
        if (registerUserSchedule[1].doctor_id) {
            dispatch(
                fetchSchedules()
            );
            dispatch(fetchSingleUser(registerUserSchedule[1].doctor_id));

        }
    }, [registerUserSchedule]);

    useEffect(() => {
        if (singleUser.hasOwnProperty('name')) {
            let date = getFomattedDate(registerUserSchedule[1].session_date);
            console.log(schedules)
            let notice = getNewSessionNotice(singleUser.name, registerUserSchedule[1].session_time, date, registerUserSchedule[1].session_fee);
            dispatch(updateNewSessionNotice(notice));
        }
    }, [singleUser]);


    function getNewSessionNotice(doctorName, time, date, sessionFee) {
        return `You selected a booking for Session with ${doctorName} at ${time}  on ${date}. The price for the service is ৳${sessionFee}.`;
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const getFormValue = (e) => {
        let data = prepareScheduleSessionData(e.target.name, e.target.value, 2);
        dispatch(updateRegisterSchedule(data));
    };
    return (
        <>
            <div className="col-span-12 pt-10">
                {!isNewSchedule && newSessionNotice && (
                    <p>
                        {newSessionNotice}
                        <br />{' '}
                        <strong>
                            Please provide your details in the form below to
                            proceed with booking.
                        </strong>
                    </p>
                )}
            </div>
            <div className="flex flex-wrap  justify-between py-4 mb-8 ">
                <div className="py-2 sm:py-0">
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
                <div className="py-2 sm:py-0">
                    <Input
                        label={'Email ID'}
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
                        <span className="error">Emai is require.</span>
                    )}
                </div>
                <div className=" py-2 sm:py-0">
                    <Input
                        label={'Phone Number'}
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

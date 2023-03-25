import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Input from '../../components/front/common/form/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionStorage, saveSessionData } from '../../utilities/utilities';

export default function PatientDetails() {
    const [patientData, setPatientData] = useState({})
    const [sessionData, setSessionData] = useState({})

    const dispatch = useDispatch();
    const pageNo = 2

    const { registerUserSchedule } = useSelector((state) => state.userSchedules);

    useEffect(() => {
        let sessionData = getSessionStorage(['registerUserSchedule'])
        setSessionData(sessionData['registerUserSchedule'])
        setPatientData(sessionData['registerUserSchedule'][pageNo])

    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const getFormValue = (e) => {
        prepareScheduleSessionData(e.target.name, e.target.value)
    };

    function prepareScheduleSessionData(key, value = '', pageNumber = pageNo, sessionKey = 'registerUserSchedule') {
        let sessionData = getSessionStorage([sessionKey])
        if (pageNumber && key) {
            Object.keys(sessionData[sessionKey][pageNumber]).map(currentKey => {
                if (currentKey == key) {
                    sessionData[sessionKey][pageNumber][key] = value
                }
            })
        }
        setPatientData(sessionData[sessionKey][pageNo])
        saveSessionData(sessionKey, sessionData[sessionKey])
    }
    return (
        <>
            <div className='col-span-12 pt-10'>
                {
                    Object.keys(sessionData).length && <p>{`You selected a booking for Session by ${sessionData[1].doctor_id} at ${sessionData[1].session_time} am on ${sessionData[1].session_date}. The price for the service is ৳5,000.00.
                Please provide your details in the form below to proceed with booking.`}</p>
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
                        value={patientData.name}
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
                        value={patientData.email}
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
                        value={patientData.phone}
                        classes={'w-full border p-2'}
                        onChange={(e) => getFormValue(e)}
                    />
                </div>
            </div>
        </>

    );
}

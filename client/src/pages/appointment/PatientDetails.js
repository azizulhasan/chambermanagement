import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Input from '../../components/front/common/form/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionStorage, saveSessionData } from '../../utilities/utilities';

export default function PatientDetails() {
    const [sessionData, setSessionData] = useState({})
    const dispatch = useDispatch();
    const pageNo = 2

    const { registerUserSchedule } = useSelector((state) => state.userSchedules);

    useEffect(() => {
        let sessionData = getSessionStorage(['registerUserSchedule'])
        setSessionData(sessionData['registerUserSchedule'][pageNo])
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const getFormValue = (e, currentSlide) => {
        prepareScheduleSessionData(e.target.name, e.target.value)
    };

    function prepareScheduleSessionData(key, value, pageNumber = pageNo, sessionKey = 'registerUserSchedule') {
        let sessionData = getSessionStorage([sessionKey])
        if (pageNumber && key && value) {
            Object.keys(sessionData[sessionKey][pageNumber]).map(currentKey => {
                if (currentKey == key) {
                    sessionData[sessionKey][pageNumber][key] = value
                }
            })
        }
        setSessionData(sessionData[sessionKey][pageNo])
        saveSessionData(sessionKey, sessionData[sessionKey])
    }
    return (
        <div className="flex border justify-between py-4 mb-8 ">
            <div className=" w-full col-span-4">
                <Input
                    label={'Patient Name'}
                    name="name"
                    type="text"
                    placeholder="Name"
                    id="name"
                    value={sessionData.name}
                    classes={'w-full border p-2'}
                    onChange={(e) => getFormValue(e, sessionData)}
                />
            </div>
            <div className="w-full px-2 col-span-4">
                <Input
                    label={"Email ID"}
                    name="email"
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={sessionData.email}
                    classes={'w-full border p-2 '}
                    onChange={(e) => getFormValue(e, sessionData)}
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
                    value={sessionData.phone}
                    classes={'w-full border p-2'}
                    onChange={(e) => getFormValue(e, sessionData)}
                />
            </div>
        </div>
    );
}

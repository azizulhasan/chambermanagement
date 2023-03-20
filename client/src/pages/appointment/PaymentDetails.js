import React, { useState, useEffect } from 'react';

import Input from '../../components/front/common/form/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionStorage, saveSessionData } from '../../utilities/utilities';

export default function PatientDetails() {
    const [sessionData, setSessionData] = useState({})
    const pageNo = 3
    const dispatch = useDispatch();

    const { registerUserSchedule } = useSelector((state) => state.userSchedules);

    useEffect(() => {
        let sessionData = getSessionStorage(['registerUserSchedule'])
        setSessionData(sessionData['registerUserSchedule'][pageNo])
    }, [])

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
        setSessionData(sessionData[sessionKey][pageNo])
        saveSessionData(sessionKey, sessionData[sessionKey])
    }
    return (
        <div className="flex border justify-between py-4 mb-8 ">
            <div className="w-full col-span-4">
                <Input
                    label={'Payment Method'}
                    name="paymentMethod"
                    type="text"
                    placeholder="paymentMethod"
                    id="paymentMethod"
                    value={sessionData.paymentMethod}
                    classes={'w-full border p-2'}
                    onChange={(e) => getFormValue(e)}
                />
            </div>
        </div>
    );
}

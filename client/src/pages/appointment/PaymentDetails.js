import React, { useState, useEffect } from 'react';

import Input from '../../components/front/common/form/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionStorage, prepareDataForSave, saveSessionData } from '../../utilities/utilities';
import { proceed_to_pay } from '../../store/paymentSlice';

export default function PatientDetails() {
    const [paymentDetails, setPaymentDetails] = useState({})
    const [sessionData, setSessionData] = useState({})
    const pageNo = 3
    const dispatch = useDispatch();

    const { registerUserSchedule } = useSelector((state) => state.userSchedules);

    useEffect(() => {
        let paymentDetails = getSessionStorage(['registerUserSchedule'])
        setPaymentDetails(paymentDetails['registerUserSchedule'][pageNo])
        setSessionData(paymentDetails['registerUserSchedule'])

    }, [])

    const getFormValue = (e) => {
        prepareScheduleSessionData(e.target.name, e.target.value)
    };

    function prepareScheduleSessionData(key, value = '', pageNumber = pageNo, sessionKey = 'registerUserSchedule') {
        let paymentDetails = getSessionStorage([sessionKey])
        if (pageNumber && key) {
            Object.keys(paymentDetails[sessionKey][pageNumber]).map(currentKey => {
                if (currentKey == key) {
                    paymentDetails[sessionKey][pageNumber][key] = value
                }
            })
        }
        setPaymentDetails(paymentDetails[sessionKey][pageNo])
        saveSessionData(sessionKey, paymentDetails[sessionKey])
    }

    const proceedToPay = (e) => {
        e.preventDefault();
        let paymentDetails = getSessionStorage(['registerUserSchedule'])
        let data = prepareDataForSave(paymentDetails['registerUserSchedule'])
        dispatch(proceed_to_pay({
            endpoint: '/api/payment',
            config: {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
            },
        }))
    }

    return (
        <div className="flex border justify-between py-4 mb-8 ">
            <div className='col-span-12 pt-10'>
                {/* {
                    Object.keys(sessionData).length && <p>{`You selected a booking for Session by ${sessionData[1].doctor_id} at ${sessionData[1].session_time} am on ${sessionData[1].session_date}. The price for the service is ৳5,000.00.
                Please provide your details in the form below to proceed with booking.`}</p>
                } */}
            </div>
            <div className="w-full col-span-4">
                <Input
                    label={'Payment Method'}
                    name="paymentMethod"
                    type="text"
                    placeholder="paymentMethod"
                    id="paymentMethod"
                    value={paymentDetails.paymentMethod}
                    classes={'w-full border p-2'}
                    onChange={(e) => getFormValue(e)}
                />
                <button type='button' className='button p-2 bg-themeColor text-white' onClick={(e) => proceedToPay(e)}>Proceed To Pay</button>
            </div>
        </div>
    );
}

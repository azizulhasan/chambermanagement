import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Input from '../../components/front/common/form/Input';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentSlide } from '../../store/userScheduleSlice';
import { addToImutableObject, setSessionStorage, getSessionStorage } from '../../utilities/utilities';

export default function PatientDetails() {
    const { currentSlide } = useSelector((state) => state.userSchedules);
    const dispatch = useDispatch();
    const [patientDetails, setPatientDetails] = useState({
        name: '',
        email: '',
        phome: '',
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        // setSessionStorage({
        //     registerUserSchedule: JSON.stringify({
        //         1: {
        //             session_name: '',
        //             doctor_name: '',
        //             session_date: '',
        //             session_time: '',
        //         },
        //         2: {
        //             name: '',
        //             email: '',
        //             phone: '',
        //         },
        //         3: {
        //             paymentWay: ''
        //         }
        //     })
        // })
        // console.log(getSessionStorage());
    }, [])

    const getFormValue = (e, currentSlide) => {
        setPatientDetails({ ...currentSlide, ...{ [e.target.name]: e.target.value } })
        let data = addToImutableObject(e.target.name, e.target.value, currentSlide)
        dispatch(updateCurrentSlide(data))
    };
    return (
        <div className="flex border justify-between py-4 mb-8 ">
            <div className=" w-full col-span-4">
                <Input
                    label={'Patient Name'}
                    name="name"
                    type="text"
                    placeholder="Name"
                    id="name"
                    value={patientDetails.name}
                    classes={'w-full border p-2'}
                    onChange={(e) => getFormValue(e, currentSlide)}
                />
            </div>
            <div className="w-full px-2 col-span-4">
                <Input
                    label={"Email ID"}
                    name="email"
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={patientDetails.email}
                    classes={'w-full border p-2 '}
                    onChange={(e) => getFormValue(e, currentSlide)}
                />
            </div>
            <div className="w-full col-span-4">
                <Input
                    label={"Phone Number"}
                    name="phone"
                    type="number"
                    placeholder="Phone number"
                    id="phone"
                    value={patientDetails.phone}
                    classes={'w-full border p-2'}
                    onChange={(e) => getFormValue(e, currentSlide)}
                />
            </div>
        </div>
    );
}

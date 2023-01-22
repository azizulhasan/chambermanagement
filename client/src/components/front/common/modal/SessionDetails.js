import React from "react";
import Select from "../form/Select";
import Calendar from 'react-calendar'
import SlotPicker from './timeslots/SlotPicker'
import { amOrPm } from '../../../../utilities/timeUtilities';

export default function SessionDetails() {
    const getFormValue = (e) => {
        console.log(e);
    }

    const addToSelectedArray = (slot) => {
        let from = slot.format('hh:mm') + amOrPm(slot);
        let to = slot.add(60, 'm').format('hh:mm') + amOrPm(slot)

    }
    return <div className="flex border py-4 mb-8 ">
        <div className="w-60 ">
            <Select defaultValue="" defaultOption="Select Session" classes={'border w-60 p-2'} options={['option', 'option-2', 'option-3']} id="session_name" name="session_name" />
        </div>
        <div className="w-60">
            <Select defaultValue="" defaultOption="Select Doctor" classes={'border w-60 p-2'} options={['option', 'option-2', 'option-3']} id="doctor_name" name="doctor_name" />
        </div>
        <div className="w-60">
            <Calendar className="m-2 border border-themeColor " onChange={(e) => getFormValue(e)} />
        </div>
        <div className="w-60">
            <SlotPicker
                interval={60}
                from={'07:00'}
                to={'23:00'}
                unAvailableSlots={['12:00']}
                lang={'en'}
                defaultSelectedTime=""
                onSelectTime={s => addToSelectedArray(s)}
            />
        </div>
    </div>;
}

import React from "react";
import Select from "../../components/front/common/form/Select";
import Calendar from 'react-calendar'
import SlotPicker from './timeslots/SlotPicker'
import { amOrPm } from '../../utilities/timeUtilities';

export default function SessionDetails() {
    const getFormValue = (e) => {
        console.log(e);
    }

    const addToSelectedArray = (slot) => {
        let from = slot.format('hh:mm') + amOrPm(slot);
        let to = slot.add(60, 'm').format('hh:mm') + amOrPm(slot)
    }

    const onChange = e => {
        console.log(e)
    }
    return <div className="flex border py-4 mb-8 ">
        <div className="w-60 ">
            <Select defaultValue="0" onChange={onChange} defaultOption="Select Session" classes={'border w-60 p-2'} options={['option', 'option-2', 'option-3']} id="session_name" name="session_name" />
        </div>
        <div className="w-60">
            <Select defaultValue="0" onChange={onChange} defaultOption="Select Doctor" classes={'border w-60 p-2'} options={['option', 'option-2', 'option-3']} id="doctor_name" name="doctor_name" />
        </div>
        <div className="w-60">
            <Calendar
                OnChangeDateCallback={(e) => console.log(e)}
                ClickWeekNumberCallback={(e) => console.log(e)}
                tileClassName={'p-1 hover:bg-gray-200'}
                tileContent={({ date, view }) => null}
                activeStartDate={new Date(2023, 0, 1)}
                tileDisabled={({ activeStartDate, date, view }) => {
                    console.log(date.getDay())
                    // unable to select
                    return date.getDay() === 0
                }}
                defaultActiveStartDate={new Date()}
                // navigationLabel={(e) => {
                //     console.log(e)
                //     return e
                // }
                // }
                nextLabel={<p className="inline ml-1 p-1 hover:bg-gray-200" >{'>'}</p>}
                next2Label={<p className="inline ml-3 p-1 hover:bg-gray-200" >{'>>'}</p>}
                prevLabel={<p className="inline mr-1 p-1 hover:bg-gray-200" >{'<'}</p>}
                prev2Label={<p className="inline mr-3 p-1 hover:bg-gray-200" >{'<<'}</p>}

                className="m-2 border border-themeColor "
                onChange={(e) => getFormValue(e)}
            />
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
    </div >;
}

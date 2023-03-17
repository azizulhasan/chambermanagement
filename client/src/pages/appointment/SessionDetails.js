import React, { useEffect, useState } from 'react';
import Select from '../../components/front/common/form/Select';
import Calendar from 'react-calendar';
import SlotPicker from './timeslots/SlotPicker';
import { amOrPm } from '../../utilities/timeUtilities';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from '../../store/schedulesSlice';
import { fetchUsers } from '../../store/usersSlice';

export default function SessionDetails() {
    const [date, setDate] = useState(new Date());

    const dispatch = useDispatch();
    const { schedules, singleSchedule, isModalActive, options } = useSelector(
        (state) => state.schedules
    );
    const { users } = useSelector((state) => state.users);
    useEffect(() => {
        dispatch(fetchSchedules());
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        // console.log(users)
        // console.log(schedules);
    }, [users, schedules]);




    const getFormValue = (e) => {
        // console.log(e);
    };

    const addToSelectedArray = (slot) => {
        let from = slot.format('hh:mm') + amOrPm(slot);
        let to = slot.add(60, 'm').format('hh:mm') + amOrPm(slot);
    };

    const onChange = (e) => {
        console.log(e);
    };

    const clickWeekNumber = (e) => {
        // console.log(e);
    };
    useEffect(() => {
        console.log(date)
    }, [date])
    return (
        <div className="flex border py-4 mb-8 ">
            <div className="w-60 ">
                <label htmlFor="session_name">Session</label>
                <Select
                    defaultValue="0"
                    onChange={(e) => onChange(e)}
                    defaultOption="Select Session"
                    classes={'border w-60 p-2'}
                    options={['option', 'option-2', 'option-3']}
                    id="session_name"
                    name="session_name"
                />
            </div>
            <div className="w-60">
                <label htmlFor="doctor_name">Doctor</label>
                <Select
                    defaultValue="0"
                    onChange={(e) => onChange(e)}
                    defaultOption="Select Doctor"
                    classes={'border w-60 p-2'}
                    options={['option', 'option-2', 'option-3']}
                    id="doctor_name"
                    name="doctor_name"
                />
            </div>
            <div className="w-60">
                <label htmlFor="session_date">Select Date</label>
                <Calendar
                    // OnChangeDateCallback={(e) => clickWeekNumber(e)}
                    // ClickWeekNumberCallback={(e) => clickWeekNumber(e)}
                    tileClassName={'p-1.5 hover:text-white hover:bg-themeColor '}
                    // tileContent={({ date, view }) => null}
                    // activeStartDate={new Date(2023, 0, 1)}
                    // tileDisabled={({ activeStartDate, date, view }) => {
                    //     // unable to select
                    //     return date.getDay() === 0;
                    // }}
                    // defaultActiveStartDate={new Date()}
                    // navigationLabel={({ date, label, locale, view }) => `Current view: ${view}, date: ${date.toLocaleDateString(locale)}`
                    // }
                    // nextLabel={
                    //     <p className="inline ml-1 p-1 hover:bg-gray-200">
                    //         {'>'}
                    //     </p>
                    // }
                    // next2Label={
                    //     <p className="inline ml-3 p-1 hover:bg-gray-200">
                    //         {'>>'}
                    //     </p>
                    // }
                    // prevLabel={
                    //     <p className="inline mr-1 p-1 hover:bg-gray-200">
                    //         {'<'}
                    //     </p>
                    // }
                    // prev2Label={
                    //     <p className="inline mr-3 p-1 hover:bg-gray-200">
                    //         {'<<'}
                    //     </p>
                    // }
                    className="mx-2 border border-themeColor session_date"
                    onChange={(e) => setDate(e)}
                    value={date}
                />
            </div>
            <div className="w-60">
                <label htmlFor="session_data">Session Time</label>
                <SlotPicker
                    interval={60}
                    from={'07:00'}
                    to={'13:00'}
                    unAvailableSlots={['12:00']}
                    lang={'en'}
                    defaultSelectedTime=""
                    onSelectTime={(s) => addToSelectedArray(s)}
                    classes=""
                />
            </div>
        </div>
    );
}

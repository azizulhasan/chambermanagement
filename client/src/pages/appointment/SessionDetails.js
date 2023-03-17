import React, { useEffect, useState } from 'react';
import Select from '../../components/front/common/form/Select';
import Calendar from 'react-calendar';
import SlotPicker from './timeslots/SlotPicker';
import { amOrPm } from '../../utilities/timeUtilities';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from '../../store/schedulesSlice';
import { fetchUsers } from '../../store/usersSlice';

export default function SessionDetails() {
    const [date, setDate] = useState(null);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [doctors, setDoctors] = useState([])
    const [specialities, setSpecialities] = useState([])
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [offDays, setOffDays] = useState([])
    const ref = React.useRef();

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
        let data = users.filter((user, i) => user.userRole === 'DOCTOR');
        setDoctors(data)
        let specialities = []
        data.map(doctor => {
            if (!specialities.includes(doctor.speciality)) {
                specialities.push(doctor.speciality)
            }
        })
        setSpecialities(specialities)
        setFilteredDoctors(data)
    }, [users]);


    const getFormValue = (e) => {
        // console.log(e);
    };


    const addToSelectedArray = (slot) => {
        let from = slot.format('hh:mm') + amOrPm(slot);
        let to = slot.add(60, 'm').format('hh:mm') + amOrPm(slot);
    };

    const onChange = (e) => {
        // console.log(e);
        if (e.target.name === 'session_name') {
            let filteredDoctors = doctors.filter(doctor => doctor.speciality === e.target.value)
            if (filteredDoctors.length) setFilteredDoctors(filteredDoctors)
        }
        if (e.target.name === 'doctor_name') {
            let filteredSchedule = schedules.filter(schedule => schedule.user === e.target.value)
            if (filteredSchedule.length && filteredSchedule[0].offDay.length) {
                setOffDays(filteredSchedule[0].offDay)
            }
        }
    };

    const clickWeekNumber = (e) => {
        // console.log(e);
    };
    useEffect(() => {
        let dates = document.getElementsByClassName('react-calendar__month-view__days__day')
        Object.values(dates).map(date => {
            if (date.hasAttribute('disabled')) {
                date.classList.add('bg-[#b9b9b9]')
                // date.classList.add('text-white')
                date.classList.remove('hover:bg-themeColor')
                date.classList.remove('hover:text-white')

            } else {
                date.classList.remove('bg-[#b9b9b9]')
                date.classList.remove('text-white')
                date.classList.add('hover:bg-themeColor')
                date.classList.add('hover:text-white')
            }
        })
    }, [offDays])

    const setSessionDate = (e) => {
        setDate(e)
    }
    useEffect(() => {
        if (date !== null) {
            let selectedDay = parseInt(date.getDate());
            let allDates = document.querySelectorAll('.react-calendar__tile')
            Object.values(allDates).map(date => {
                if (parseInt(date.firstChild.innerText) === selectedDay) {
                    date.classList.add('bg-themeColor')
                    date.classList.add('text-white')
                } else {
                    date.classList.remove('bg-themeColor')
                    date.classList.remove('text-white')
                }
            })
        }
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
                    options={specialities}
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
                    options={filteredDoctors}
                    id="doctor_name"
                    name="doctor_name"
                />
            </div>
            <div className="w-72">
                <label htmlFor="session_date">Select Date</label>
                <Calendar
                    // OnChangeDateCallback={(e) => clickWeekNumber(e)}
                    // ClickWeekNumberCallback={(e) => clickWeekNumber(e)}
                    tileClassName={'p-2.5 hover:text-white hover:bg-themeColor '}
                    // tileContent={({ date, view }) => null}
                    // activeStartDate={new Date(2023, 0, 1)}
                    tileDisabled={({ activeStartDate, date, view }) => {
                        // unable to select
                        let day = days[date.getDay()]
                        if (offDays.includes(day)) {
                            // console.log(date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear())
                            return true;
                        }

                        return false;
                    }}
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
                    onChange={(e) => setSessionDate(e)}
                    value={date}
                    // showFixedNumberOfWeeks={true}
                    showNeighboringMonth={false}
                    inputRef={ref}
                    calendarType={'US'}
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
                    classes="hover:cursor-pointer"
                />
            </div>
        </div>
    );
}

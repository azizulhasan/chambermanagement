import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import SlotPicker from './timeslots/SlotPicker';
import { amOrPm } from '../../utilities/timeUtilities';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from '../../store/schedulesSlice';
import { fetchUsers } from '../../store/usersSlice';
import { updateCurrentSlide } from '../../store/userScheduleSlice';
import Select from '../../components/front/common/form/Select';
import { addToImutableObject, getSessionStorage, saveSessionData, setSessionStorage } from '../../utilities/utilities';

export default function SessionDetails() {
    const [date, setDate] = useState(null);
    const [doctors, setDoctors] = useState([])
    const [specialities, setSpecialities] = useState([])
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [sessionData, setSessionData] = useState({})

    const [filteredSchedule, setFilteredSchedule] = useState({
        timeSlots: [],
        perSessionLength: 60,
    })
    const [timeSlots, setTimeSlots] = useState([])
    const [offDays, setOffDays] = useState([])
    const ref = React.useRef();
    const dispatch = useDispatch();

    const { schedules, singleSchedule, isModalActive, options } = useSelector(
        (state) => state.schedules
    );
    const { users } = useSelector((state) => state.users);
    const { days, currentSlide, registerUserSchedule } = useSelector((state) => state.userSchedules);

    useEffect(() => {
        dispatch(fetchSchedules());
        dispatch(fetchUsers());
        let sessionData = getSessionStorage(['registerUserSchedule'])

        if (!Object.keys(sessionData).length) {
            saveSessionData('registerUserSchedule', registerUserSchedule)
            setSessionData(registerUserSchedule[1])
        } else {
            setSessionData(sessionData['registerUserSchedule'][1])
        }
    }, []);
    useEffect(() => {
        console.log(sessionData)
    }, [sessionData])

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

    useEffect(() => {
        if (sessionData.session_date) setDate(new Date(sessionData.session_date))
    }, [sessionData])

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

    useEffect(() => {
        let limit = 100;
        let startsAt = '00:00'
        let endsAt = '23:00';
        let interval = filteredSchedule.perSessionLength
        let slots = []
        let initialSlots = 7;
        while (
            dayjs(`2001-01-01 ${startsAt}`, 'YYYY-MM-DD HH:mm').isBefore(
                dayjs(`2001-01-01 ${endsAt}`, 'YYYY-MM-DD HH:mm')
            ) &&
            limit > 0
        ) {
            let t = dayjs()
                .set('h', Number.parseInt(startsAt.split(':')[0]))
                .set('m', Number.parseInt(startsAt.split(':')[1]))
                .add(interval, 'm');
            if (filteredSchedule.timeSlots.length && filteredSchedule.timeSlots.includes(t.format('HH:mm'))) {
                slots.push(t)
            }
            if (filteredSchedule.timeSlots.length < 1) {
                slots.length <= initialSlots && slots.push(t)
            }

            startsAt = t.format('HH:mm');
            limit--;
        }
        setTimeSlots(slots)
    }, [filteredSchedule])

    const addToSelectedArray = (slot) => {
        let from = slot.format('hh:mm') + amOrPm(slot);
        let to = slot.add(filteredSchedule.perSessionLength, 'm').format('hh:mm') + amOrPm(slot);
        let data = addToImutableObject('session_time', from + "-" + to, currentSlide)
        dispatch(updateCurrentSlide(data))
        prepareScheduleSessionData('session_time', from + "-" + to)

    };

    const onChange = (e, currentSlide) => {
        let data = addToImutableObject(e.target.name, e.target.value, currentSlide)
        if (e.target.name === 'session_name') {
            let filteredDoctors = doctors.filter(doctor => doctor.speciality === e.target.value)
            if (filteredDoctors.length) setFilteredDoctors(filteredDoctors)
        }
        if (e.target.name === 'doctor_name') {
            let filteredSchedule = schedules.filter(schedule => schedule.user === e.target.value)
            if (filteredSchedule.length && filteredSchedule[0].offDay.length) {
                setOffDays(filteredSchedule[0].offDay)
                setFilteredSchedule(filteredSchedule[0])
            }
        }
        dispatch(updateCurrentSlide(data))
        prepareScheduleSessionData(e.target.name, e.target.value)
    };

    const setSessionDate = (date) => {
        setDate(date)
        let data = addToImutableObject('session_date', date, currentSlide)
        dispatch(updateCurrentSlide(data))
        prepareScheduleSessionData('session_date', date)

    }

    function prepareScheduleSessionData(key, value, pageNumber = 1, sessionKey = 'registerUserSchedule') {
        let sessionData = getSessionStorage([sessionKey])
        if (pageNumber && key && value) {
            Object.keys(sessionData[sessionKey][pageNumber]).map(currentKey => {
                if (currentKey == key) {
                    sessionData[sessionKey][pageNumber][key] = value
                }
            })
        }
        setSessionData(sessionData[sessionKey][1])
        saveSessionData(sessionKey, sessionData[sessionKey])
    }


    return (
        <div className="flex border py-4 mb-8 ">
            <div className="w-60 ">
                <label htmlFor="session_name">Session</label>
                <Select
                    defaultValue="0"
                    onChange={(e) => onChange(e, currentSlide)}
                    defaultOption="Select Session"
                    classes={'border w-60 p-2'}
                    options={specialities}
                    selected={sessionData.session_name}
                    id="session_name"
                    name="session_name"
                    required={true}
                />
            </div>
            <div className="w-60">
                <label htmlFor="doctor_name">Doctor</label>
                <Select
                    defaultValue="0"
                    onChange={(e) => onChange(e, currentSlide)}
                    defaultOption="Select Doctor"
                    classes={'border w-60 p-2'}
                    options={filteredDoctors}
                    id="doctor_name"
                    name="doctor_name"
                    required={true}
                    selected={sessionData.doctor_name}
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
                        let day = days[date.getDay()]
                        if (offDays.includes(day)) {
                            return true;
                        }
                        return false;
                    }}
                    // defaultActiveStartDate={new Date()}
                    // navigationLabel={({ date, label, locale, view }) => `Current view: ${view}, date: ${date.toLocaleDateString(locale)}`
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
                <label htmlFor="session_time">Session Time</label>
                <SlotPicker
                    interval={filteredSchedule.perSessionLength}
                    timeSlots={timeSlots}
                    from={'07:00'}
                    to={'23:00'}
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

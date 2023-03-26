import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import SlotPicker from './timeslots/SlotPicker';
import { amOrPm } from '../../utilities/timeUtilities';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from '../../store/schedulesSlice';
import { fetchUsers } from '../../store/usersSlice';
import {
    fetchDoctorSchedules,
    updateRegisterSchedule,
} from '../../store/userScheduleSlice';
import Select from '../../components/front/common/form/Select';
import {
    addToImutableObject,
    getOffDates,
    getSessionStorage,
    get_all_dates,
    prepareScheduleSessionData,
    saveSessionData,
    setSessionStorage,
} from '../../utilities/utilities';

export default function SessionDetails() {
    const pageNo = 1;

    const [date, setDate] = useState(null);
    const [currentDateString, setCurrentDateString] = useState(
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1) +
        '-' +
        new Date().getDate()
    );

    const [doctors, setDoctors] = useState([]);
    const [specialities, setSpecialities] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [sessionData, setSessionData] = useState({});
    const [defaultSelectedTime, setDefaultSelectedTime] = useState([]);
    const [unAvailableSlots, setUnAvailableSlots] = useState([]);
    const [filteredSchedule, setFilteredSchedule] = useState({
        timeSlots: [],
        perSessionLength: 60,
    });
    const [timeSlots, setTimeSlots] = useState([]);
    const [offDays, setOffDays] = useState([]);
    const [offDates, setOffDates] = useState([]);
    const ref = React.useRef();
    const dispatch = useDispatch();
    const { schedules, singleSchedule, isModalActive, options } = useSelector(
        (state) => state.schedules
    );
    const { users } = useSelector((state) => state.users);
    const { currentSlide, registerUserSchedule, currentDoctorSchedules } =
        useSelector((state) => state.userSchedules);

    useEffect(() => {
        dispatch(fetchSchedules());
        dispatch(fetchUsers());
        let sessionData = getSessionStorage(['registerUserSchedule']);

        if (!Object.keys(sessionData).length) {
            saveSessionData('registerUserSchedule', registerUserSchedule);
            setSessionData(registerUserSchedule[pageNo]);
        } else {
            setSessionData(sessionData['registerUserSchedule'][pageNo]);
        }
    }, []);

    useEffect(() => {
        let data = users.filter((user, i) => user.userRole === 'DOCTOR');
        setDoctors(data);
        let specialities = [];
        data.map((doctor) => {
            if (!specialities.includes(doctor.speciality)) {
                specialities.push(doctor.speciality);
            }
        });
        setSpecialities(specialities);
        setFilteredDoctors(data);
    }, [users]);

    useEffect(() => {
        let limit = 100;
        let startsAt = '00:00';
        let endsAt = '23:00';
        let interval = filteredSchedule.perSessionLength;
        let slots = [];
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
            if (
                filteredSchedule.timeSlots.length &&
                filteredSchedule.timeSlots.includes(t.format('HH:mm'))
            ) {
                slots.push(t);
            }
            if (filteredSchedule.timeSlots.length < 1) {
                slots.length <= initialSlots && slots.push(t);
            }

            startsAt = t.format('HH:mm');
            limit--;
        }

        if (registerUserSchedule[pageNo].session_time) {
            setDefaultSelectedTime([registerUserSchedule[pageNo].session_time]);
        }
        setTimeSlots(slots);
    }, [filteredSchedule]);

    useEffect(() => {
        let dates = document.getElementsByClassName(
            'react-calendar__month-view__days__day'
        );
        Object.values(dates).map((date) => {
            if (date.hasAttribute('disabled')) {
                date.classList.add('bg-[#b9b9b9]');
                // date.classList.add('text-white')
                date.classList.remove('hover:bg-themeColor');
                date.classList.remove('hover:text-white');
            } else {
                date.classList.remove('bg-[#b9b9b9]');
                date.classList.remove('text-white');
                date.classList.add('hover:bg-themeColor');
                date.classList.add('hover:text-white');
            }
        });
    }, [offDates]);

    useEffect(() => {
        if (registerUserSchedule[pageNo].session_date)
            setDate(new Date(registerUserSchedule[pageNo].session_date));
        if (registerUserSchedule[pageNo].doctor_id) {
            let filteredSchedule = schedules.filter(
                (schedule) => schedule.user === registerUserSchedule[pageNo].doctor_id
            );
            if (filteredSchedule.length && filteredSchedule[0].offDay.length) {
                setOffDays(filteredSchedule[0].offDay);
                let offDates = getOffDates(filteredSchedule[0].offDay, currentDateString);
                console.log(offDates, filteredSchedule[0].offDay)

                setOffDates(offDates);
                setFilteredSchedule(filteredSchedule[0]);
            }
        }
    }, [registerUserSchedule, schedules]);

    useEffect(() => {
        if (date !== null) {
            let selectedDay = parseInt(date.getDate());
            let allDates = document.querySelectorAll('.react-calendar__tile');
            Object.values(allDates).map((date) => {
                if (parseInt(date.firstChild.innerText) === selectedDay) {
                    date.classList.add('bg-themeColor');
                    date.classList.add('text-white');
                } else {
                    date.classList.remove('bg-themeColor');
                    date.classList.remove('text-white');
                }
            });
        }
    }, [date]);

    const addToSelectedArray = (time) => {
        let data = prepareScheduleSessionData('session_time', time);
        dispatch(updateRegisterSchedule(data));
    };

    const onChange = (e, currentSlide) => {
        if (e.target.name === 'session_name') {
            let filteredDoctors = doctors.filter(
                (doctor) => doctor.speciality === e.target.value
            );
            if (filteredDoctors.length) setFilteredDoctors(filteredDoctors);
        }
        if (e.target.name === 'doctor_id') {
            if (e.target.value !== '0') {
                dispatch(
                    fetchDoctorSchedules({
                        endpoint:
                            '/api/userSchedule/doctorschedules/' +
                            e.target.value,
                        config: {},
                    })
                );
            }

            let filteredSchedule = schedules.filter(
                (schedule) => schedule.user === e.target.value
            );
            if (filteredSchedule.length && filteredSchedule[0].offDay.length) {
                prepareScheduleSessionData(
                    'per_session_length',
                    filteredSchedule[0].perSessionLength
                );
                var date = new Date(),
                    y = date.getFullYear(),
                    m = date.getMonth();
                var firstDay = new Date(y, m, 1);
                var lastDay = new Date(y, m + 1, 0);
                // let date = new Date(), y = date.getFullYear(), m = date.getMonth();
                // let firstDay = new Date(y, m, 1);
                // let lastDay = new Date(y, m + 1, 0);

                setOffDays(filteredSchedule[0].offDay);
                setFilteredSchedule(filteredSchedule[0]);
            }
        }

        let data = prepareScheduleSessionData(e.target.name, e.target.value, 1);
        dispatch(updateRegisterSchedule(data));
    };

    const setSessionDate = (date) => {
        setDate(date);
        let data = prepareScheduleSessionData('session_date', date);
        dispatch(updateRegisterSchedule(data));
        if (currentDoctorSchedules.length) {
            let bookedSchedules = [];
            for (let i = 0; i < currentDoctorSchedules.length; i++) {
                let session = currentDoctorSchedules[i];
                let tempDate = new Date(session.session_date);
                if (tempDate.getDate() === date.getDate()) {
                    bookedSchedules.push(session.session_time);
                }
            }
            setUnAvailableSlots(bookedSchedules);
        }
    };

    useEffect(() => {
        let tempOffDates = JSON.parse(JSON.stringify(offDates));
        let tempObj = {};
        let currentMonth = new Date().getMonth();
        if (currentDoctorSchedules.length) {
            for (let i = 0; i < currentDoctorSchedules.length; i++) {
                let session = currentDoctorSchedules[i];
                let tempDate = new Date(session.session_date);
                if (tempDate.getMonth() === currentMonth) {
                    if (!tempObj[tempDate.getDate()]) {
                        tempObj[tempDate.getDate()] = [session.session_time];
                    } else {
                        tempObj[tempDate.getDate()].push(session.session_time);
                    }
                }
            }
            Object.keys(tempObj).map((date) => {
                if (tempObj[date].length === timeSlots.length) {
                    tempOffDates.push(parseInt(date));
                }
            });
            setOffDates(tempOffDates);
        }
    }, [currentDoctorSchedules]);


    useEffect(() => {
        console.log(registerUserSchedule)
    }, [registerUserSchedule])
    return (
        <div className="flex border py-4 mb-8 ">
            <div className="w-60 ">
                <label htmlFor="session_name">Session</label>
                <Select
                    value={registerUserSchedule[pageNo].session_name ? registerUserSchedule[pageNo].session_name : '0'}
                    onChange={(e) => onChange(e, currentSlide)}
                    defaultOption="Select Session"
                    classes={'border w-60 p-2'}
                    options={specialities}
                    id="session_name"
                    name="session_name"
                    required={true}
                />
            </div>
            <div className="w-60">
                <label htmlFor="doctor_id">Doctor</label>
                <Select
                    onChange={(e) => onChange(e, currentSlide)}
                    defaultOption="Select Doctor"
                    classes={'border w-60 p-2'}
                    options={filteredDoctors}
                    id="doctor_id"
                    name="doctor_id"
                    required={true}
                    value={registerUserSchedule[pageNo].doctor_id ? registerUserSchedule[pageNo].doctor_id : '0'}
                />
            </div>
            <div className="w-72">
                <label htmlFor="session_date">Select Date</label>
                <Calendar
                    tileClassName={
                        'p-2.5 hover:text-white hover:bg-themeColor '
                    }
                    tileDisabled={({ activeStartDate, date, view }) => {
                        if (offDates.includes(date.getDate())) {
                            return true;
                        }
                        return false;
                    }}
                    className="mx-2 border border-themeColor session_date"
                    onChange={(e) => setSessionDate(e)}
                    value={date}
                    showNeighboringMonth={false}
                    inputRef={ref}
                    calendarType={'US'}
                    onActiveStartDateChange={({
                        action,
                        activeStartDate,
                        value,
                        view,
                    }) => {
                        setCurrentDateString(
                            activeStartDate.getFullYear() +
                            '-' +
                            (activeStartDate.getMonth() + 1) +
                            '-' +
                            activeStartDate.getDate()
                        );
                    }}
                />
            </div>
            <div className="w-60">
                <label htmlFor="session_time">Session Time</label>
                <SlotPicker
                    interval={filteredSchedule.perSessionLength}
                    from={'07:00'}
                    to={'23:00'}
                    unAvailableSlots={unAvailableSlots}
                    lang={'en'}
                    defaultSelectedTime={defaultSelectedTime}
                    onSelectTime={(s) => addToSelectedArray(s)}
                    classes="hover:cursor-pointer"
                    timeSlots={timeSlots}
                />
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import TimeSlot from './TimeSlot';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

import { useDispatch, useSelector } from 'react-redux';
import { updateScheduleState } from '../../../../../store/schedulesSlice';

dayjs.extend(utc);
dayjs.extend(duration);

/**
 *
 * @param {*} param0
 * @returns
 * @url : https://github.com/wassimbj/slotpicker/
 */
export default function SlotPicker({
    interval,
    unAvailableSlots,
    from, // 09:00
    to, // 20:00
    lang,
    selectedSlotColor,
    defaultSelectedTime,
    onSelectTime,
}) {
    // default stuff
    lang = !lang ? 'en' : lang;
    let disabledSlots = [];
    if (!!unAvailableSlots) {
        disabledSlots = unAvailableSlots;
    }

    selectedSlotColor = !selectedSlotColor ? '#028702' : selectedSlotColor;
    // following the 24-hour clock
    let startsAt = !from ? '08:00' : from; // 8AM
    let endsAt = !to ? '20:00' : to; // 8PM
    if (
        Number.parseInt(startsAt.split(':')[0]) < 0 ||
        Number.parseInt(startsAt.split(':')[0]) > 23 ||
        Number.parseInt(endsAt.split(':')[0]) < 0 ||
        Number.parseInt(endsAt.split(':')[0]) > 23 ||
        Number.parseInt(startsAt.split(':')[1]) < 0 ||
        Number.parseInt(startsAt.split(':')[1]) > 59 ||
        Number.parseInt(endsAt.split(':')[1]) < 0 ||
        Number.parseInt(endsAt.split(':')[1]) > 59
    ) {
        throw new Error(
            'SlotPicker Error: hours value is between 00-23, and minutes is between 00-59'
        );
    }

    let [selectedTime, setSelectedTime] = useState([
        defaultSelectedTime || undefined,
    ]);
    const { singleSchedule } = useSelector((state) => state.schedules);
    const dispatch = useDispatch();

    const handleSelection = (data) => {
        let slots = [];
        if (selectedTime.includes(data.format('HH:mm'))) {
            slots = selectedTime.filter(
                (item) => item !== data.format('HH:mm')
            );
            setSelectedTime(slots);
        } else {
            slots = [data.format('HH:mm')].concat(selectedTime);
            setSelectedTime(slots);
        }
        slots = slots.filter((item) => item != undefined);
        dispatch(updateScheduleState(slots));
        onSelectTime(data);
    };

    const currTime = dayjs().format('HH:mm');
    const timeSlots = [
        dayjs()
            .set('h', Number.parseInt(startsAt.split(':')[0]))
            .set('m', Number.parseInt(startsAt.split(':')[1])),
    ];

    // `i` is just to not cause an infinity loop, if sth went wrong
    let limit = 100;
    let timeAt = startsAt;
    // console.log(timeAt, endsAt);
    // console.log(
    //   dayjs(`2001-01-01 ${timeAt}`, 'YYYY-MM-DD HH:mm'),
    //   dayjs(`2001-01-01 ${endsAt}`, 'YYYY-MM-DD HH:mm')
    // );

    while (
        dayjs(`2001-01-01 ${timeAt}`, 'YYYY-MM-DD HH:mm').isBefore(
            dayjs(`2001-01-01 ${endsAt}`, 'YYYY-MM-DD HH:mm')
        ) &&
        limit > 0
    ) {
        let t = dayjs()
            .set('h', Number.parseInt(timeAt.split(':')[0]))
            .set('m', Number.parseInt(timeAt.split(':')[1]))
            .add(interval, 'm');

        timeSlots.push(t);

        timeAt = t.format('HH:mm');
        limit--;
    }

    return (
        <div className="p-5">
            <div
                className={`time-selector-w d-block ${
                    lang == 'ar' && 'sp-rtl'
                }`}
            >
                <div className="os-times-w">
                    <div className="timeslots">
                        {timeSlots.map((slot, i) => (
                            <TimeSlot
                                interval={interval}
                                // the slot is off if it's less then current time or already blacklisted(in unAvailableSlots)
                                selectedSlotColor={selectedSlotColor}
                                slot={slot}
                                key={i}
                                isSelected={selectedTime.includes(
                                    slot.format('HH:mm')
                                )}
                                onSelect={handleSelection}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

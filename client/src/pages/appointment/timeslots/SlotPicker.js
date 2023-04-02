import React, { useEffect, useState } from 'react';
import TimeSlot from './TimeSlot';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

import { useDispatch, useSelector } from 'react-redux';
import { updateScheduleState } from '../../../store/schedulesSlice';
import { amOrPm } from '../../../utilities/timeUtilities';

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
    onSelectTime,
    classes = 'p-5',
    timeSlots = [],
    defaultSelectedTime = [],
}) {
    const { themeColor } = useSelector((state) => state.common);

    // default stuff
    lang = !lang ? 'en' : lang;
    let disabledSlots = [];
    if (!!unAvailableSlots) {
        disabledSlots = unAvailableSlots;
    }

    selectedSlotColor = !selectedSlotColor ? themeColor : selectedSlotColor;
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
    let [selectedTime, setSelectedTime] = useState(defaultSelectedTime);
    useEffect(() => {
        setSelectedTime(defaultSelectedTime)
    }, [defaultSelectedTime])

    const handleSelection = (data) => {
        // let slots = [];
        // if (selectedTime.includes(data.format('hh:mm'))) {
        //     slots = selectedTime.filter(
        //         (item) => item !== data.format('hh:mm')
        //     );
        // } else {
        //     slots = [data.format('hh:mm')].concat(selectedTime);
        // }

        // console.log(slots, selectedTime)
        // let tempSlots = slots.filter((item) => item != undefined);
        setSelectedTime([data.format('hh:mm') + "" + amOrPm(data)]);
        onSelectTime(data.format('hh:mm') + "" + amOrPm(data));
    };

    return (
        <div className={classes}>
            <div
                className={`time-selector-w d-block ${lang == 'ar' && 'sp-rtl'
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
                                    slot.format('hh:mm') + "" + amOrPm(slot)
                                )}
                                onSelect={handleSelection}
                                disabled={disabledSlots.includes(slot.format('hh:mm') + "" + amOrPm(slot))}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

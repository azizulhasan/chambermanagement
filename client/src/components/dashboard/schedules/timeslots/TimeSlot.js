import React from 'react';
import langText from './lang';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { amOrPm } from '../../../../utilities/timeUtilities';

dayjs.extend(utc);
dayjs.extend(duration);

export default function TimeSlot({
    slot,
    interval,
    lang = 'en',
    selectedSlotColor,
    isSelected,
    onSelect,
}) {
    const isOnTheHour = slot.get('m') === 0; // e.g: 01:00 is, while 01:05 is not ¯\_(ツ)_/¯
    const langData = langText[lang];
    const handleOnSelect = (e) => {
        e.preventDefault();
        onSelect(slot);
    };
    return (
        <React.Fragment>
            <div
                onClick={(e) => handleOnSelect(e)}
                className={`sp-timeslot  ${isSelected ? 'selected' : ''} ${
                    isOnTheHour && 'with-tick'
                }`}
                style={isSelected ? { background: selectedSlotColor } : {}}
            >
                <span
                    className="sp-label"
                    style={isSelected ? { background: selectedSlotColor } : {}}
                >
                    {isSelected ? (
                        <span className="sp-success-label">
                            {langData.selectedTitle}
                        </span>
                    ) : null}
                    {`${slot.format('hh:mm')}${amOrPm(slot)} - `}
                    {`${slot.add(interval, 'm').format('hh:mm')}${amOrPm(
                        slot
                    )}`}
                </span>
                <button
                    onClick={(e) => handleOnSelect(e)}
                    className="radioBtn"
                ></button>
                {isOnTheHour && (
                    <span className="sp-tick">
                        <strong>{`${slot.format('hh')}`}</strong>
                        {amOrPm(slot)}
                    </span>
                )}
            </div>
        </React.Fragment>
    );
}

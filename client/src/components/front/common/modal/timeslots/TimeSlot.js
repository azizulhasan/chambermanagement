import React from 'react';
import langText from './lang';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { amOrPm } from '../../../../../utilities/timeUtilities';

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
  }
  return (
    <React.Fragment>
      <div
        onClick={(e) => handleOnSelect(e)}
        className={`sp-timeslot p-1 border border-themeColor text-black py-1 rounded-sm my-1  ${isSelected ? 'selected' : ''
          } ${isOnTheHour && 'with-tick'}`}
        style={isSelected ? { background: selectedSlotColor, color: 'white' } : {}}
      >
        <span
          className="sp-label"
          style={isSelected ? { background: selectedSlotColor, color: 'white' } : {}}
        >

          {`${slot.format('hh:mm')}${amOrPm(slot)} - `}
          {`${slot.add(interval, 'm').format('hh:mm')}${amOrPm(slot)}`}
        </span>
        <button onClick={(e) => handleOnSelect(e)} className="radioBtn"></button>
        {/* {isOnTheHour && (
          <span className="sp-tick">
            <strong>{`${slot.format('hh')}`}</strong>
            {amOrPm(slot)}
          </span>
        )} */}
      </div>
    </React.Fragment>
  );
}
import React from 'react';
import langText from './lang';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

import notify from '../../../../../utilities/Notify';
import { amOrPm } from '../../../../../utilities/timeUtilities';

dayjs.extend(utc);
dayjs.extend(duration);

export default function TimeSlot({
  isOff,
  slot,
  interval,
  lang,
  selectedSlotColor,
  isSelected,
  onSelect,
}) {
  const isOnTheHour = slot.get('m') == 0; // e.g: 01:00 is, while 01:05 is not ¯\_(ツ)_/¯
  const langData = langText[lang];
  const handleOnSelect = (e) => {
    e.preventDefault();
    onSelect(slot);
  }
  return (
    <React.Fragment>
      <div
        onClick={(e) => handleOnSelect(e)}
        className={`sp-timeslot ${isOff ? 'is-booked' : ''} ${isSelected && !isOff ? 'selected' : ''
          } ${isOnTheHour && 'with-tick'}`}
        style={isSelected && !isOff ? { background: selectedSlotColor } : {}}
      >
        <span
          className="sp-label"
          style={isSelected && !isOff ? { background: selectedSlotColor } : {}}
        >
          {isSelected && !isOff ? (
            <span className="sp-success-label">{langData.selectedTitle}</span>
          ) : null}
          {`${slot.format('hh:mm')}${amOrPm(slot)} - `}
          {`${slot.add(interval, 'm').format('hh:mm')}${amOrPm(slot)}`}
        </span>
        {isOff ? <button onClick={(e) => notify('This time will will not be selected')} className="radioBtn"></button> : (
          <button onClick={(e) => handleOnSelect(e)} className="radioBtn"></button>
        )}
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
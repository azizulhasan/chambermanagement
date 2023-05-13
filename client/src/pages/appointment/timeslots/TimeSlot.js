import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { amOrPm } from '../../../utilities/timeUtilities';

dayjs.extend(utc);
dayjs.extend(duration);

export default function TimeSlot({
    slot,
    interval,
    lang = 'en',
    selectedSlotColor,
    isSelected,
    onSelect,
    disabled,
    disableColor = '#b9b9b9'
}) {
    const isOnTheHour = slot.get('m') === 0; // e.g: 01:00 is, while 01:05 is not ¯\_(ツ)_/¯
    const handleOnSelect = (e) => {
        e.preventDefault();
        onSelect(slot);
    };

    return (
        <>
            {disabled ? <div
                className={`sp-timeslot cursor-default py-1 rounded-sm my-1.5  ${disabled ? 'selected' : ''
                    } ${isOnTheHour && 'with-tick'}`}
                style={
                    disabled
                        ? { background: disableColor, color: 'black' }
                        : {}
                }
            >
                <span
                    className="sp-label"
                    style={
                        isSelected
                            ? { background: disableColor, color: 'black' }
                            : {}
                    }
                >
                    {`${slot.format('hh:mm')}${amOrPm(slot)} - `}
                    {`${slot.add(interval, 'm').format('hh:mm')}${amOrPm(
                        slot
                    )}`}
                </span>
                <button
                    disabled={true}
                    className="radioBtn"
                ></button>
            </div> : <div
                onClick={(e) => handleOnSelect(e)}
                className={`sp-timeslot py-1 rounded-sm my-1.5  ${isSelected ? 'selected' : ''
                    } ${isOnTheHour && 'with-tick'}`}
                style={
                    isSelected
                        ? { background: selectedSlotColor, color: 'white' }
                        : {}
                }
            >
                <span
                    className="sp-label"
                    style={
                        isSelected
                            ? { background: selectedSlotColor, color: 'white' }
                            : {}
                    }
                >
                    {`${slot.format('hh:mm')}${amOrPm(slot)} - `}
                    {`${slot.add(interval, 'm').format('hh:mm')}${amOrPm(
                        slot
                    )}`}
                </span>
                <button
                    onClick={(e) => handleOnSelect(e)}
                    className="radioBtn"
                ></button>
            </div>}
        </>
    );
}

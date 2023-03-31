import Input from '../../components/form/Input';
import { useSelector } from 'react-redux';

export default function PatientDetails() {
    const { isNewSchedule, newSessionNotice } = useSelector(
        (state) => state.userSchedules
    );
    return (
        <>
            <div className="w-full col-span-12 pt-10">
                {!isNewSchedule && newSessionNotice && (
                    <p>
                        {newSessionNotice}
                        <br />
                        <strong>
                            Please pay for this session through BKASH.
                        </strong>
                    </p>
                )}
            </div>
        </>
    );
}

import Input from '../../components/front/common/form/Input';
import { useSelector } from 'react-redux';

export default function PatientDetails() {
    const { isNewSchedule, newSessionNotice } = useSelector((state) => state.userSchedules);
    return (
        <>
            <div className='w-full col-span-12 pt-10'>
                {
                    !isNewSchedule && newSessionNotice && <p>{newSessionNotice}</p>
                }
            </div>
        </>

    );
}

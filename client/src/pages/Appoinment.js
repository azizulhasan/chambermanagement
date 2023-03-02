import GeneralLayout from '../components/front/common/GeneralLayout';
import ModalContent from './appointment/ModalContent';

export default function Appoinment() {
    return (
        <GeneralLayout
            css={[
                '/assets/front/css/tailwind.css',
                '/assets/front/css/carousel.css',
                '/assets/front/css/appointment.css',
            ]}
        >
            <ModalContent />
        </GeneralLayout>
    );
}

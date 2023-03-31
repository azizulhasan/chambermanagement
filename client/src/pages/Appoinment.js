import FrontSkeleton from '../layouts/FrontSkeleton';
import ModalContent from './appointment/ModalContent';

export default function Appoinment() {
    return (
        <FrontSkeleton
            css={[
                '/assets/front/css/tailwind.css',
                '/assets/front/css/carousel.css',
                '/assets/front/css/appointment.css',
                '/assets/front/css/footer.css',
            ]}
        >
            <ModalContent />
        </FrontSkeleton>
    );
}

import SiteSkeleton from '../components/front/common/SiteSkeleton';
import ModalContent from './appointment/ModalContent';

export default function Appoinment() {
    return (
        <SiteSkeleton
            css={[
                '/assets/front/css/tailwind.css',
                '/assets/front/css/carousel.css',
                '/assets/front/css/appointment.css',
                '/assets/front/css/footer.css',

            ]}
        >
            <ModalContent />
        </SiteSkeleton>
    );
}

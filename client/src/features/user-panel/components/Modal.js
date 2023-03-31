import ReactDom from 'react-dom';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const Modal = ({ open, closeModal, children, stylingClasses }) => {
    //   if (!open) return null;

    return ReactDom.createPortal(
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-gray-900/70 z-[999]"
                    onClick={closeModal}
                />
            )}
            <div
                className={`z-[1000] fixed top-0 left-0 bg-white ${stylingClasses} min-w-min min-h-screen ${
                    open ? '' : 'border-r border-gray-700/50'
                }`}
            >
                {children}
            </div>
        </>,
        document.getElementById('dashboard-portal')
    );
};

export default Modal;

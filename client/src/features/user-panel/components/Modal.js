import ReactDom from 'react-dom';

const Modal = ({
    open,
    setOpen,
    children,
    variant = 'normal',
    extraClasses = '',
}) => {
    const handleClose = () => {
        setOpen(false);
    };

    let normalStyle = `z-[1000] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-fit min-h-fit bg-white ${extraClasses} ${
        !open ? 'hidden' : ''
    }`;

    let sidebarStyle = `z-[1000] fixed top-0 left-0 bg-white ${
        open ? 'open-sidebar' : 'close-sidebar'
    } min-w-min min-h-screen ${
        open ? '' : 'border-r border-gray-700/50'
    } ${extraClasses}`;

    return ReactDom.createPortal(
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-gray-900/70 z-[999]"
                    onClick={handleClose}
                />
            )}

            <div
                className={
                    variant === 'normal'
                        ? normalStyle
                        : variant === 'sidebar'
                        ? sidebarStyle
                        : extraClasses
                }
            >
                {children}
            </div>
        </>,
        document.getElementById('dashboard-portal')
    );
};

export default Modal;

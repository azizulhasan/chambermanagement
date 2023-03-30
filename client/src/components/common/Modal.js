import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { classNames } from '../../utilities/utilities';

export default function Modal({
    children,
    showModal,
    closeModal,
    modalSize = 'sm:w-3/12',
    classes = '',
}) {
    const modalSizes = {
        xs: 'sm:w-3/12',
        sm: 'sm:w-4/12',
        md: 'sm:w-5/12',
        lg: 'sm:w-7/12',
        xl: 'sm:w-9/12',
        xxl: 'sm:w-10/12',
    };
    let modalClasses =
        'relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full ';
    modalClasses +=
        modalSizes[modalSize] !== undefined ? modalSizes[modalSize] : modalSize;
    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog
                as="div"
                className="ctx-relative ctx-z-10"
                onClose={closeModal}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ctx-ease-out ctx-duration-300"
                    enterFrom="ctx-opacity-0"
                    enterTo="ctx-opacity-100"
                    leave="ctx-ease-in ctx-duration-200"
                    leaveFrom="ctx-opacity-100"
                    leaveTo="ctx-opacity-0"
                >
                    <div className="ctx-fixed ctx-inset-0 ctx-bg-gray-500 ctx-bg-opacity-75 ctx-transition-opacity" />
                </Transition.Child>

                <div className="ctx-fixed ctx-inset-0 ctx-z-10 ctx-overflow-y-auto">
                    <div className="ctx-flex ctx-min-h-full ctx-items-end ctx-justify-center ctx-p-4 ctx-text-center sm:ctx-items-center sm:ctx-p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ctx-ease-out ctx-duration-300"
                            enterFrom="ctx-opacity-0 ctx-translate-y-4 sm:ctx-translate-y-0 sm:ctx-scale-95"
                            enterTo="ctx-opacity-100 ctx-translate-y-0 sm:ctx-scale-100"
                            leave="ctx-ease-in ctx-duration-200"
                            leaveFrom="ctx-opacity-100 ctx-translate-y-0 ctx-sm:scale-100"
                            leaveTo="ctx-opacity-0 ctx-translate-y-4 sm:ctx-translate-y-0 sm:ctx-scale-95"
                        >
                            <Dialog.Panel
                                className={classNames(modalClasses, classes)}
                            >
                                <div className="ctx-absolute ctx-top-0 ctx-right-0 ctx-hidden ctx-pt-4 ctx-pr-4 sm:ctx-block">
                                    <button
                                        type="button"
                                        className="ctx-rounded-md ctx-bg-white ctx-text-gray-400 hover:ctx-text-gray-500 focus:ctx-outline-none focus:ctx-ring-2 focus:ctx-ring-indigo-500 focus:ctx-ring-offset-2"
                                        onClick={(e) => closeModal(false)}
                                    >
                                        <span className="ctx-sr-only">
                                            Close
                                        </span>
                                        <XMarkIcon
                                            className="ctx-h-6 ctx-w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

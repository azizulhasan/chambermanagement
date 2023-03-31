import { Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { displayNotice } from '../../store/commonDataSlice';

export default function Notify() {
    const dispatch = useDispatch();
    const { showNotice, noticeMessage, noticeDelay } = useSelector(
        (state) => state.modal
    );
    useEffect(() => {
        if (showNotice) setTimer();
    }, [showNotice]);

    const setTimer = () => {
        setTimeout(() => dispatch(displayNotice('')), noticeDelay);
    };

    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                id={'notify'}
                className="ctx-pointer-events-none ctx-fixed ctx-inset-0 ctx-flex ctx-items-end ctx-px-4 ctx-py-6 sm:ctx-items-start sm:ctx-p-6"
            >
                <div className="ctx-flex ctx-w-full ctx-flex-col ctx-items-center ctx-space-y-4 sm:ctx-items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={showNotice}
                        as={Fragment}
                        enter="ctx-transform ctx-ase-out ctx-duration-300 ctx-transition"
                        enterFrom="ctx-translate-y-2 ctx-opacity-0 sm:ctx-translate-y-0 sm:ctx-translate-x-2"
                        enterTo="ctx-translate-y-0 ctx-opacity-100 sm:ctx-translate-x-0"
                        leave="ctx-transition ctx-ease-in ctx-duration-100"
                        leaveFrom="ctx-opacity-100"
                        leaveTo="ctx-opacity-0"
                    >
                        <div className="ctx-pointer-events-auto ctx-w-full ctx-max-w-sm ctx-overflow-hidden ctx-rounded-lg ctx-bg-white ctx-shadow-lg ctx-ring-1 ctx-ring-black ctx-ring-opacity-5">
                            <div className="ctx-p-4">
                                <div className="ctx-flex ctx-items-start">
                                    <div className="ctx-flex-shrink-0">
                                        <CheckCircleIcon
                                            className="ctx-h-6 ctx-w-6 ctx-text-green-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="ctx-ml-3 ctx-w-0 ctx-flex-1 ctx-pt-0.ctx-5">
                                        <p className="ctx-mt-1 ctx-text-sm ctx-text-gray-500">
                                            {noticeMessage}
                                        </p>
                                    </div>
                                    <div className="ctx-ml-4 ctx-flex ctx-flex-shrink-0">
                                        <button
                                            type="button"
                                            className="ctx-inline-flex ctx-rounded-md ctx-bg-white ctx-text-gray-400 hover:ctx-text-gray-500 focus:ctx-outline-none focus:ctx-ring-2 focus:ctx-ring-indigo-500 focus:ctx-ring-offset-2"
                                            onClick={() => {
                                                dispatch(displayNotice(''));
                                            }}
                                        >
                                            <span className="ctx-sr-only">
                                                Close
                                            </span>
                                            <XMarkIcon
                                                className="ctx-h-5 ctx-w-5"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    );
}

import React from "react";
/**
 * Utilities
 */
import { addCSS } from "../../../utilities/utilities";
/**
 * Sections
 */
import MenuBar from "./sections/MenuBar";
import Slider from "./sections/Slider";
import Professionals from "./sections/Professionals";
import HealthSerivces from './sections/HealthSerivces'
import GoogleMap from "./sections/GoogleMap";
import Contact from "./sections/Contact";
import Footer from "../common/partials/Footer";
import WhatsAppIcon from "../common/WhatsAppIcon";
import TopNav from "./sections/TopNav";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/commonDataSlice";
import Modal from "../common/modal/Modal";
import ScrollToTop from "../common/partials/ScrollToTop";
import ContactSection from "../common/partials/ContactSection";
import ModalContent from "../common/modal/ModalContent";

export default function Home({ modalConfig = {} }) {
    const { showModal } = useSelector(state => state.common)
    const dispatch = useDispatch();
    addCSS([
        '/assets/front/css/slider.css',
        '/assets/front/css/carousel.css',
        '/assets/front/css/professional.css',
    ])
    return (
        <React.Fragment>
            {/* Header Section*/}
            <TopNav />
            <MenuBar />
            <main id="main">
                {/* End Header */}
                {/** Slider Section */}

                <Slider />
                {/** End Slider */}
                <Professionals />

                {/** Healteh Service Section */}
                <HealthSerivces />
                {/** End Health Service */}

                {/* <GoogleMap /> */}
                {/** Contact Section */}
                {/* <Contact /> */}
                {/** End Contact Section */}
            </main>
            {/* End #main */}
            {/* <WhatsAppIcon /> */}
            {/** Footer */}
            <Footer />
            {/* End Footer */}
            <ScrollToTop />
            {

                <Modal
                    modalSize={'xxl'}
                    showModal={showModal}
                    closeModal={(e) => dispatch(openModal({ displayModal: false }))}
                    classes={['mx-auto'].join(' ')}
                >
                    <ModalContent />
                </Modal>
            }

            {/* MODAL */}
            <div className="hidden min-h-full relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full sm:w-7/12 sm:w-4/12" ></div>
            <div className="hidden ml-16 ml-60 ml-96 bg-red-700 -ml-2 mr-2 sm:ml-10 md:ml-20 lg:ml-40 xl:ml-48 2xl:ml-60"></div>
            <div className="hidden mx-auto ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 opacity-100 translate-y-0 sm:scale-100 ease-in duration-200 opacity-100 translate-y-0 sm:scale-100 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"></div>
            <div className="hidden z-50 relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full sm:w-10/12 mx-auto opacity-100 translate-y-0 sm:scale-100 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 absolute top-0 right-0 hidden pt-4 pr-4 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-6 w-6 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 fixed inset-0 z-10 overflow-y-auto"></div>
            {/* Professionals */}
            <div className="hidden col-span-3 w-300"></div>


            {/*buttonOne*/}
            <div
                className="hidden relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full sm:w-7/12 opacity-100 translate-y-0 sm:scale-100 relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-1 5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-themeColor focus:text-white"></div>
            <div
                className="hidden text-themeColor bg-themeColor text-white px-2.5 py-1.5 sm:w-3/12 sm:w-4/12 sm:w-5/12 sm:w-7/12 sm:w-9/12 sm:w-10/12"></div>
            <div
                className="hidden ease-out duration-300 opacity-0 ease-in duration-200 opacity-100 translate-y-4  sm:scale-95 translate-y-0 sm:scale-100 sm:scale-100"></div>
            {/*TABLE*/}
            <div
                className="hidden bg-gray-100 bg-gray-200 bg-gray-50 bg-gray-400 dark:bg-gray-700 dark:text-gray-400 h-10"></div>
            {/*INPUT*/}
            <div className="hidden focus:border-gray-2000 focus:ring-gray-200"></div>
            {/*SELECT*/}
            <div className="hidden overflow-scroll sm:w-28 xl:w-28 2xl:w-32"></div>
            <div
                className="hidden bg-gray-50 border-b dark:bg-gray dark:border-gray border-gray"></div>
            {/* MODAL */}
            <div className="hidden  border-themeColor my-1 bg-[rgba(0,0,0,.5)] w-60 mx-2 px-2 col-span-4  py-4 mb-8 ml-16 ml-60 ml-96 bg-red-700 -ml-2 mr-2 sm:ml-10 md:ml-20 lg:ml-40 xl:ml-48 2xl:ml-60"></div>
            {/*LOADER*/}
            <div className="hidden w-8 w-36 w-48 w-44 w-32  !bg-gray-500 w-fit h-fit rounded animate-pulse space-y-8 inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 bg-gray-500 rounded w-fit h-4 bg-gray-700"></div>
            {/*GENEREL*/}
            <div className='hidden lg:mr-1 xl:mr-3 2xl:mr-4'></div>
            {/*ADD PREFIX TO EVERY CLASS*/}
            {/*in your editor (i used phpstorm ctrl+shift+f for find and replace in all files of a specific folder):*/}
            {/*find  : (?<=class=["'][^"']*)([0-9a-zA-Z_-]+\s*)(?=[^"']*["'])*/}
            {/*replace : tw-$1*/}

        </React.Fragment >
    );
}

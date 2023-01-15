import React from "react";

// import './tailwind.css'
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
import GoogleMap from "./sections/GoogleMap";
import Contact from "./sections/Contact";
import Footer from "../common/partials/Footer";
import WhatsAppIcon from "../common/WhatsAppIcon";
import TopNav from "./sections/TopNav";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/commonDataSlice";
import Modal from "../common/Modal";

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
            {/* <TopNav /> */}
            {/* <MenuBar /> */}
            <main id="main">
                {/* End Header */}
                {/** Slider Section */}
                {

                    <Modal
                        modalSize={'xxl'}
                        showModal={showModal}
                        closeModal={(e) => dispatch(openModal({ displayModal: false }))}
                        classes={['mx-auto'].join(' ')}
                    >
                        'test'
                    </Modal>
                }
                <Slider />
                {/** End Slider */}
                {/* <Professionals /> */}
                {/* <GoogleMap /> */}
                {/** About Section */}
                {/* <About /> */}
                {/** End About Section */}
                {/** Skills Section */}
                {/* <Skills /> */}
                {/** End Skills Section */}
                {/** Resume Section */}
                {/* <Resume /> */}
                {/** End Resume Section */}
                {/** Contact Section */}
                {/* <Contact /> */}
                {/** End Contact Section */}
            </main>
            {/* End #main */}
            {/* <WhatsAppIcon /> */}
            {/** Footer */}
            {/* <Footer /> */}
            {/* End Footer */}
            {/* <ScrollToTop /> */}


            {/* MODAL */}
            <div className="hidden min-h-full relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full sm:w-7/12 " ></div>
            <div className="hidden ml-16 ml-60 ml-96 bg-red-700 -ml-2 mr-2 sm:ml-10 md:ml-20 lg:ml-40 xl:ml-48 2xl:ml-60"></div>
            <div className="hidden mx-auto ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 opacity-100 translate-y-0 sm:scale-100 ease-in duration-200 opacity-100 translate-y-0 sm:scale-100 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"></div>
            <div className="hidden ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 opacity-100 translate-y-0 sm:scale-100 ease-in duration-200 opacity-100 translate-y-0 sm:scale-100 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"></div>
        </React.Fragment>
    );
}

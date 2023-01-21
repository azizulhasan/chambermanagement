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
import Modal from "../common/Modal";
import ScrollToTop from "../common/partials/ScrollToTop";
import ContactSection from "../common/partials/ContactSection";

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
                <HealthSerivces/>
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
                    modalSize={'sm'}
                    showModal={showModal}
                    closeModal={(e) => dispatch(openModal({ displayModal: false }))}
                    classes={['mx-auto'].join(' ')}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna a placerat congue, risus odio faucibus ante, sit amet tincidunt magna lorem quis augue. Sed id enim euismod, congue nibh non, ornare velit. Sed tempor mauris vel elit pellentesque, id placerat velit aliquet. Aliquam erat volutpat. Sed id dolor a libero tristique malesuada. Sed congue ante euismod, convallis risus eu, pellentesque risus. Sed id hendrerit risus.
                </Modal>
            }

            {/* MODAL */}
            <div className="hidden min-h-full relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full sm:w-7/12 sm:w-4/12" ></div>
            <div className="hidden ml-16 ml-60 ml-96 bg-red-700 -ml-2 mr-2 sm:ml-10 md:ml-20 lg:ml-40 xl:ml-48 2xl:ml-60"></div>
            <div className="hidden mx-auto ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 opacity-100 translate-y-0 sm:scale-100 ease-in duration-200 opacity-100 translate-y-0 sm:scale-100 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"></div>
            <div className="hidden z-50 relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full sm:w-10/12 mx-auto opacity-100 translate-y-0 sm:scale-100 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 absolute top-0 right-0 hidden pt-4 pr-4 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-6 w-6 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 fixed inset-0 z-10 overflow-y-auto"></div>
            {/* Login */}
            {/* <div className="sm:hidden"></div> */}
        </React.Fragment>
    );
}

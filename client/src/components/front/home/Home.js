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
            <TopNav />
            <MenuBar />
            <main id="main">
                {/* End Header */}
                {/** Slider Section */}
                <Slider />
                {/** End Slider */}
                <Professionals />
                <GoogleMap />
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
                <Contact />
                {/** End Contact Section */}
            </main>
            {/* End #main */}
            <WhatsAppIcon />
            {/** Footer */}
            <Footer />
            {/* End Footer */}
            {/* <ScrollToTop /> */}

            {

                <Modal
                    modalSize={'lg'}
                    showModal={showModal}
                    closeModal={(e) => dispatch(openModal({ displayModal: false }))}
                    classes={['mx-auto'].join(' ')}
                >
                    'test'
                </Modal>
            }

        </React.Fragment>
    );
}

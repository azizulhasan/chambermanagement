import React from "react";
import { Carousel } from "react-responsive-carousel";
import SessionDetails from "./SessionDetails";
import PatientDetails from "./PatientDetails"
import PaymentDetails from "./PaymentDetails"
export default function ModalContent() {
    return <div className="py-5 mt-5">
        <Carousel showThumbs={false} autoPlay={false} infiniteLoop={true} emulateTouch={true} autoFocus={true} showArrows={true} className="presentation-mode">
            <SessionDetails />
            <PatientDetails />
            <PaymentDetails />
        </Carousel>
    </div>;
}

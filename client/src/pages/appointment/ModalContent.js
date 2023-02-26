import React from "react";
import { Carousel } from "react-responsive-carousel";
import SessionDetails from "./SessionDetails";
import PatientDetails from "./PatientDetails"
import PaymentDetails from "./PaymentDetails"
export default function ModalContent() {
    const slides = [
        {
            component: <SessionDetails />
        },
        {
            component: <PatientDetails />
        },
        {
            component: <PaymentDetails />
        }
    ]
    return (
        <Carousel showThumbs={false} autoPlay={false} infiniteLoop={true} emulateTouch={true} autoFocus={true} showArrows={true} className="presentation-mode appointment px-5 ">
            {
                slides.map((item, index) => {
                    return <div key={index} >{item.component}</div>
                })
            }
        </Carousel>
    )
}

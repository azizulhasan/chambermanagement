import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import SessionDetails from './SessionDetails';
import PatientDetails from './PatientDetails';
import PaymentDetails from './PaymentDetails';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentSlide } from '../../store/userScheduleSlice';
import { getSessionStorage } from '../../utilities/utilities';
export default function ModalContent() {
    const slides = [
        {
            component: <SessionDetails />,
        },
        {
            component: <PatientDetails />,
        },
        {
            component: <PaymentDetails />,
        },
    ];
    const { registerUserSchedule } = useSelector(state => state.userSchedules)
    function isCurrentSlideIsValid(e, callback) {
        let status = document.getElementsByClassName('carousel-status')[0].innerHTML
        let currentPage = parseInt(status.split('of')[0])
        let slideObject = registerUserSchedule[currentPage]
        let sessionData = getSessionStorage(['registerUserSchedule'])
        if (sessionData === undefined) {
            alert('Please fill the value of session_name, doctor_name, session_date, session_time.')
        } else {
            sessionData = sessionData['registerUserSchedule']
            sessionData = sessionData[currentPage]
        }
        let alertData = []
        Object.keys(slideObject).map(key => {
            if (!sessionData.hasOwnProperty(key) || sessionData[key] === undefined || sessionData[key] === '' || sessionData[key] == '0') {
                alertData.push(key)
            }
        })
        if (alertData.length) {
            alert('Please fill the value of ' + alertData.join(', '))
        } else {
            callback();
        }
    }

    return (
        <Carousel
            showStatus={true} // default true. i.e 1 of 3
            showThumbs={false}
            autoPlay={false}
            infiniteLoop={false}
            emulateTouch={false}
            autoFocus={true}
            // showArrows={true}
            showIndicators={false}
            renderArrowPrev={(hasPrev, label) => <button type='button' className='absolute top-[88%] left-[44%] px-4 py-2 z-50 bg-themeColor text-white hover:bg-white hover:text-themeColor hover:border-2 hover:border-themeColor' onClick={hasPrev}>Back</button>}
            renderArrowNext={(hasNext, label) => <button type='button' className='absolute top-[88%] left-[54%] justify-center px-4 py-2 z-50 bg-themeColor text-white hover:bg-white hover:text-themeColor hover:border-2 hover:border-themeColor' onClick={(e) => isCurrentSlideIsValid(e, hasNext)}>Next</button>}
            className="presentation-mode appointment px-5 my-8"
        >
            {slides.map((item, index) => {
                return <div key={index}>{item.component}</div>;
            })}
        </Carousel>
    );
}

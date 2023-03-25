import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import SessionDetails from './SessionDetails';
import PatientDetails from './PatientDetails';
import PaymentDetails from './PaymentDetails';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserSchedule } from '../../store/userScheduleSlice';
import { getSessionStorage, prepareDataForSave, saveSessionData } from '../../utilities/utilities';
import { saveUser, userFromSchedule } from '../../store/usersSlice';
import WelcomeMessage from './WelcomeMessage';
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
        {
            component: <WelcomeMessage />,
        },
    ];
    const { registerUserSchedule } = useSelector(
        (state) => state.userSchedules
    );
    const { scheduleUser } = useSelector(
        (state) => state.users
    );
    const dispatch = useDispatch();
    function isCurrentSlideIsValid(e, callback) {
        let status =
            document.getElementsByClassName('carousel-status')[0].innerHTML;
        let currentPage = parseInt(status.split('of')[0]);
        let slideObject = registerUserSchedule[currentPage];
        let sessionData = getSessionStorage(['registerUserSchedule']);
        if (sessionData === undefined) {
            alert(
                'Please fill the value of session_name, doctor_id, session_date, session_time.'
            );
        } else {
            sessionData = sessionData['registerUserSchedule'];
            sessionData = sessionData[currentPage];
        }
        let alertData = [];
        Object.keys(slideObject).map((key) => {
            if (
                !sessionData.hasOwnProperty(key) ||
                sessionData[key] === undefined ||
                sessionData[key] === '' ||
                sessionData[key] == '0'
            ) {
                if (key !== 'user_id') alertData.push(key);
            }
        });
        if (alertData.length) {
            alert('Please fill the value of ' + alertData.join(', '));
        } else {
            let data = getSessionStorage(['registerUserSchedule']);
            data = data['registerUserSchedule'];
            let isLastPage = parseInt(status.split('of')[1]) === currentPage;
            data = prepareDataForSave(data);

            if (currentPage === 2) {
                let userData = {
                    email: data.email,
                    name: data.name,
                    phone: data.phone,
                };
                dispatch(userFromSchedule({
                    endpoint: '/api/users/user_from_schedule',
                    config: {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                        body: JSON.stringify(userData),
                    }
                }));
            }


            if (currentPage === 3) {
                dispatch(
                    saveUserSchedule({
                        endpoint: '/api/userSchedule',
                        config: {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            method: 'POST',
                            body: JSON.stringify(data),
                        },
                    })
                );
                saveSessionData('registerUserSchedule', registerUserSchedule);
            }

            callback();
        }

    }

    useEffect(() => {
        if (scheduleUser.hasOwnProperty('_id')) {
            prepareScheduleSessionData(
                'user_id',
                scheduleUser._id
            );
        }
    }, [scheduleUser])

    function prepareScheduleSessionData(
        key,
        value,
        pageNumber = 2,
        sessionKey = 'registerUserSchedule'
    ) {
        let sessionData = getSessionStorage([sessionKey]);
        if (pageNumber && key && value) {
            Object.keys(sessionData[sessionKey][pageNumber]).map(
                (currentKey) => {
                    if (currentKey == key) {
                        sessionData[sessionKey][pageNumber][key] = value;
                    }
                }
            );
        }
        saveSessionData(sessionKey, sessionData[sessionKey]);
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
            renderArrowPrev={(hasPrev, label) => (
                <button
                    type="button"
                    className="absolute top-[88%] left-[44%] px-4 py-2 z-50 bg-themeColor text-white hover:bg-white hover:text-themeColor hover:border-2 hover:border-themeColor"
                    onClick={hasPrev}
                >
                    Back
                </button>
            )}
            renderArrowNext={(hasNext, label) => (
                <button
                    type="button"
                    className="absolute top-[88%] left-[54%] justify-center px-4 py-2 z-50 bg-themeColor text-white hover:bg-white hover:text-themeColor hover:border-2 hover:border-themeColor"
                    onClick={(e) => isCurrentSlideIsValid(e, hasNext)}
                >
                    Next
                </button>
            )}
            className="presentation-mode appointment px-5 my-8"
        >
            {slides.map((item, index) => {
                return <div key={index}>{item.component}</div>;
            })}
        </Carousel>
    );
}

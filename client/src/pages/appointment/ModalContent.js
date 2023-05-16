import React, { useEffect, lazy, Suspense } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { clearRegisterUserSchedule, clearUserSchedule, saveUserSchedule } from '../../store/userScheduleSlice';
import { getSessionStorage, prepareDataForSave, saveSessionData, isAndroid } from '../../utilities/utilities';
import { userFromSchedule } from '../../store/usersSlice';
import { useState } from 'react';
// import { proceed_to_pay } from '../../store/paymentSlice';

const SessionDetails = lazy(() => import('./SessionDetails'))
const PatientDetails = lazy(() => import('./PatientDetails'))
const PaymentDetails = lazy(() => import('./PaymentDetails'))
const WelcomeMessage = lazy(() => import('./WelcomeMessage'))

export default function ModalContent() {
    const slides = [
        {
            component: <SessionDetails />,
        },
        {
            component: <PatientDetails />,
        },
        {
            component: <WelcomeMessage />,
        },
        {
            component: <PaymentDetails />,
        },
    ];
    const { registerUserSchedule, frontUserSingleSchedule, defaultSchedule } = useSelector(
        (state) => state.userSchedules
    );
    const { scheduleUser, users } = useSelector(
        (state) => state.users
    );
    const { branches } = useSelector(
        (state) => state.branches
    );
    const [pageNo, setPageNo] = useState(1)
    const dispatch = useDispatch();

    const checkValidation = (e) => {
        let status =
            document.getElementsByClassName('carousel-status')[0].innerHTML;
        let currentPage = parseInt(status.split('of')[0]);
        setPageNo(currentPage)
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

        return { alertData, currentPage };
    }

    function isCurrentSlideIsValid(e, callback) {

        let validateData = checkValidation(e);

        if (validateData.alertData.length) {
            alert('Please fill the value of ' + validateData.alertData.join(', '));
        } else {
            let data = getSessionStorage(['registerUserSchedule']);
            data = data['registerUserSchedule'];
            data = prepareDataForSave(data);
            if (validateData.currentPage === 2) {
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

    const submitSchedule = async (e, currentPage, callback) => {
        e.preventDefault();
        if (!document.getElementById('tems_and_conditions').checked) return alert('Please check the terms of services and refund policy.')

        let data = getSessionStorage(['registerUserSchedule'])
        data = prepareDataForSave(data['registerUserSchedule'])
        branches.map(branch => {
            if (data.branch_id === branch._id) {
                data.branch_name = branch.name;
            }
        })
        if (!data.hasOwnProperty('branch_name')) {
            data.branch_name = 'online';
        }
        if (scheduleUser && scheduleUser.hasOwnProperty('name')) {
            data.doctor_name = scheduleUser.name;
        }

        // Save session detail to database.
        /**
         * Mail session details to user
         * 
         * Pro feature mail will be send to admin and doctor.
         */
        dispatch(
            saveUserSchedule({
                endpoint: '/api/userschedules',
                config: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(data),
                },
            })
        );

        callback()


    }

    const proceedToPay = (e, frontUserSingleSchedule) => {
        e.preventDefault();
        if (frontUserSingleSchedule.hasOwnProperty('_id') && frontUserSingleSchedule._id) {
            window.open('https://shop.bkash.com/md-mehedi-hasan01715703260/paymentlink/default-payment');
            saveSessionData('registerUserSchedule', defaultSchedule);
            dispatch(clearUserSchedule({}))
            dispatch(clearRegisterUserSchedule(defaultSchedule))
            ////////////////////////////////////////////////
            // This code will be applied for sslcommercz
            ///////////////////////////////////////////////
            // dispatch(proceed_to_pay({
            //     endpoint: '/api/payment',
            //     config: {
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         method: 'POST',
            //         body: JSON.stringify(frontUserSingleSchedule),
            //     },
            // }))
        } else {
            alert('Something went wrong. Please try again.')
        }
    }


    /**
     * https://codingartistweb.com/2022/09/how-to-detect-swipe-direction-with-javascript/
     */
    // setTimeout(() => {
    //     let touchArea = document.querySelector(".appointment");
    //     let output = document.getElementById("output");

    //     //Initial mouse X and Y positions are 0

    //     let mouseX,
    //         initialX = 0;
    //     let mouseY,
    //         initialY = 0;
    //     let isSwiped;

    //     //Events for touch and mouse
    //     let events = {
    //         mouse: {
    //             down: "mousedown",
    //             move: "mousemove",
    //             up: "mouseup",
    //         },
    //         touch: {
    //             down: "touchstart",
    //             move: "touchmove",
    //             up: "touchend",
    //         },
    //     };

    //     let deviceType = "";

    //     //Detect touch device

    //     const isTouchDevice = () => {
    //         try {
    //             //We try to create TouchEvent (it would fail for desktops and throw error)
    //             document.createEvent("TouchEvent");
    //             deviceType = "touch";
    //             return true;
    //         } catch (e) {
    //             deviceType = "mouse";
    //             return false;
    //         }
    //     };

    //     //Get left and top of touchArea
    //     let rectLeft = touchArea.getBoundingClientRect().left;
    //     let rectTop = touchArea.getBoundingClientRect().top;

    //     //Get Exact X and Y position of mouse/touch
    //     const getXY = (e) => {
    //         mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
    //         mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
    //     };

    //     isTouchDevice();

    //     //Start Swipe
    //     touchArea.addEventListener(events[deviceType].down, (event) => {
    //         isSwiped = true;
    //         //Get X and Y Position
    //         getXY(event);
    //         initialX = mouseX;
    //         initialY = mouseY;
    //     });

    //     //Mousemove / touchmove
    //     touchArea.addEventListener(events[deviceType].move, (event) => {
    //         if (!isTouchDevice()) {
    //             event.preventDefault();
    //         }
    //         if (isSwiped) {
    //             getXY(event);

    //             let diffX = mouseX - initialX;
    //             let diffY = mouseY - initialY;
    //             if (Math.abs(diffY) > Math.abs(diffX)) {


    //                 output.innerText = diffY > 0 ? "Down" : "Up";

    //                 // down:  value e.g 1 or more
    //                 if (diffY > 0) {
    //                     console.log(diffY)
    //                     document.body.scrollTop = diffY;
    //                     document.documentElement.scrollTop = diffY;
    //                 } else {
    //                     // Up:  value e.g -1 or more
    //                     document.body.scrollTop = diffY;
    //                     document.documentElement.scrollTop = diffY;
    //                     console.log(diffY)
    //                 }
    //             } else {
    //                 output.innerText = diffX > 0 ? "Right" : "Left";
    //             }
    //         }
    //     });

    //     //Stop Drawing
    //     touchArea.addEventListener(events[deviceType].up, () => {
    //         isSwiped = false;
    //     });

    //     touchArea.addEventListener("mouseleave", () => {
    //         isSwiped = false;
    //     });

    //     window.onload = () => {
    //         isSwiped = false;
    //     };

    // }, 3000)






    /**
     * https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
     * @returns 
     */

    // setTimeout(() => {
    //     // left: 37, up: 38, right: 39, down: 40,
    //     // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    //     var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    //     function preventDefault(e) {
    //         e.preventDefault();
    //     }

    //     function preventDefaultForScrollKeys(e) {
    //         if (keys[e.keyCode]) {
    //             preventDefault(e);
    //             return false;
    //         }
    //     }

    //     // modern Chrome requires { passive: false } when adding event
    //     var supportsPassive = false;
    //     try {
    //         window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    //             get: function () { supportsPassive = true; }
    //         }));
    //     } catch (e) { }

    //     var wheelOpt = supportsPassive ? { passive: false } : false;
    //     var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    //     // call this to Disable
    //     function disableScroll() {
    //         window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    //         window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    //         window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    //         window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    //     }

    //     // call this to Enable
    //     function enableScroll() {
    //         window.removeEventListener('DOMMouseScroll', preventDefault, false);
    //         window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    //         window.removeEventListener('touchmove', preventDefault, wheelOpt);
    //         window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    //     }
    //     disableScroll();
    // }, 3000);


    const getButtonPosition = () => {
        let buttonPosition = 'top-[88%]';
        if (pageNo === 4) {
            buttonPosition = 'top-[35%]'
            if (window.innerWidth > 575) {
                buttonPosition = 'top-[50%]'
            }
        } else if (pageNo === 3) {
            buttonPosition = 'top-[50%]'
            if (window.innerWidth > 575) {
                buttonPosition = 'top-[88%]'
            }
        } else if (pageNo === 2) {
            buttonPosition = 'top-[50%]'
        }

        return buttonPosition;
    }

    return (
        <Suspense fallback={<h1>Loading</h1>} >
            <Carousel
                showStatus={true} // default true. i.e 1 of 3
                showThumbs={false}
                autoPlay={false}
                infiniteLoop={false}
                emulateTouch={true}
                autoFocus={false}
                onSwipeMove={(e) => {
                    // console.log(e);
                    // let validateData = checkValidation(e);
                    // if (validateData.alertData.length) {
                    //     alert('Please fill the value of ' + validateData.alertData.join(', '));
                    // }
                }}
                // showArrows={true}
                showIndicators={false}
                renderArrowPrev={(hasPrev, label) => (
                    <button
                        type="button"
                        className={["absolute top-[88%] left-[10%] sm:left-[44%] px-4 py-2 z-50 bg-themeColor text-white hover:bg-white hover:text-themeColor hover:border-2 hover:border-themeColor", getButtonPosition()].join(' ')}
                        onClick={hasPrev}
                    >
                        Back
                    </button>
                )}
                renderArrowNext={(hasNext, label) => {
                    let currentPage = 1;
                    if (document.getElementsByClassName('carousel-status').length) {
                        let status =
                            document.getElementsByClassName('carousel-status')[0].innerHTML;
                        currentPage = parseInt(status.split('of')[0]);
                    }
                    setPageNo(currentPage)
                    {
                        return currentPage !== 4 ? currentPage === 3 ? <button
                            type="button"
                            className={["absolute top-[88%] left-[54%] justify-center px-4 py-2 z-50 bg-themeColor text-white hover:bg-white hover:text-themeColor hover:border-2 hover:border-themeColor", getButtonPosition()].join(' ')}
                            onClick={(e) => submitSchedule(e, currentPage, hasNext)}
                        >
                            Submit
                        </button> : <>
                            <button
                                type="button"
                                className={["absolute left-[54%] justify-center px-4 py-2 z-50 bg-themeColor text-white hover:bg-white hover:text-themeColor hover:border-2 hover:border-themeColor", getButtonPosition()].join(' ')}
                                onClick={(e) => isCurrentSlideIsValid(e, hasNext)}
                            >
                                Next
                            </button> <div id='output'></div>
                        </> : <button type='button' className={['absolute left-[54%] justify-center px-4 py-2 z-50 bg-themeColor text-white hover:bg-white hover:text-themeColor hover:border-2 hover:border-themeColor', getButtonPosition()].join(' ')} onClick={(e) => proceedToPay(e, frontUserSingleSchedule)}>Proceed To Pay</button>
                    }
                }}
                className="presentation-mode appointment px-5 my-8 !overflow-y-scroll "
            >
                {slides.map((item, index) => {
                    return <div key={index}>{item.component}</div>;
                })}
            </Carousel>
        </Suspense>
    );
}

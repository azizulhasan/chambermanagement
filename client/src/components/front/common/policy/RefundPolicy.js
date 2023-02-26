import React from 'react';
import MenuBar from '../../home/sections/MenuBar';
import TopNav from '../../home/sections/TopNav';
import Footer from '../partials/Footer';

const initialData = {
    title: 'Refund Policy',
    headingWiseData: [
        {
            heading: 'Policy',
            paragraph: [
                {
                    paraOne:
                        'Thank you for booking an appointment/ buying a course with us. We want to make sure that our customers have an excellent experience with us. As with any online purchase experience, below are the terms and conditions that govern the Refund Policy. You agree to pay fees and charges to avail the available services on this website and that you are solely responsible for the payment of these fees and charges. When you book or buy a service on this platform you agree to our Privacy Policy, Terms of Use, and the conditions covered below.',
                    paraTwo: '',
                    paraThree: '',
                },
            ],
        },
        {
            heading: 'Cancellation & Refunds Regarding Courses',
            paragraph: [
                {
                    paraOne:
                        'We comprehend that you can change your mind. That is why before getting access to the course you can ask for a refund and we shall process it within 10 days after the approval of your refund request. On the other hand, within 24 hours after getting access to the course, if you change your mind, you can ask for a refund and we would process it accordingly. You will get a refund if service interruptions arise as a result of technical issues/cancellation of the course occurs from our side. Such issues shall be verified and it has to have an impact that denies access to the subject matter for which the user has paid. In such cases refund shall be made by lifespring within 10 days from the date of approval of the refund request.',
                    paraTwo:
                        'However, Refunds will not be given against any cancellation/nonattendance in the service by the User for any reason. Also, in the issue of Force Majeure (unforeseeable circumstances that prevent someone from fulfilling a contract) lifespring shall not be liable for a refund.',
                    paraThree: '',
                },
            ],
        },
        {
            heading: 'Cancellation & Refunds Regarding Appointments',
            paragraph: [
                {
                    paraOne:
                        'You can cancel your booked appointment and become eligible to get a refund if: ',
                    paraTwo:
                        '– Counselor/consultant postpone/reschedule the counseling date & time.',
                    paraThree:
                        '– You shall be eligible for a refund if you cancel your appointment before availing of the counseling.',
                },
            ],
        },
        {
            heading: 'Refunds through Payment Gateway',
            paragraph: [
                {
                    paraOne:
                        'When it’s about a refund through a payment gateway, our sole responsibility will be to the degree of approval of a refund and to process it to the payment gateway vendors within 10 working days from the date of approval of the refund and in no circumstances, lifespring will be responsible for any delays in the credit of a refund to the User. All refund amounts will be handled by the bank or the payment gateway vendor and any delays in the credit of a refund, beyond the approval by LifeSpring of a refund, will be between the User and bank or payment gateway.',
                    paraTwo: '',
                    paraThree: '',
                },
            ],
        },
        {
            heading: 'Refunds for Duplicate Payment',
            paragraph: [
                {
                    paraOne:
                        'A refund of the duplicate payment made by the customer will be processed via the same (original method of payment) or convenient sources within 10 working days after intimation by the customer.',
                    paraTwo:
                        'Note: All refunds will be processed within 10 days of approval and validation of refund request (condition applies). LifeSpring reserves the right to change prices for subscriptions at any time and does not provide price protection.',
                    paraThree: '',
                },
            ],
        },
    ],
};

const RefundPolicy = () => {
    return (
        <div>
            <TopNav />
            <MenuBar />
            <div className="md:max-w-screen-sm text-center px-4 sm:px-6 lg:px-8 pt-24 pb-6 mx-auto">
                <h1 className="text-2xl font-bold md:text-4xl mt-3">
                    {initialData?.title}
                </h1>
            </div>

            <div className="md:max-w-screen-sm lg:max-w-[992px] px-4 sm:px-6 lg:px-8 pb-12 md:pt-6 sm:pb-20 mx-auto">
                <div className="grid gap-4 md:gap-8">
                    {initialData?.headingWiseData?.map((item, index) => (
                        <div key={index + 1}>
                            <h2 className="text-lg sm:text-xl font-semibold">
                                {item?.heading}
                            </h2>
                            {item?.paragraph?.map((para, pIdx) => (
                                <div key={pIdx + 1}>
                                    <p className="pt-5">{para?.paraOne}</p>
                                    <p className="pt-5">{para?.paraTwo}</p>
                                    <p className="pt-5">{para?.paraThree}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default RefundPolicy;

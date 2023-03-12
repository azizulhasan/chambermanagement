import React from 'react';
import MenuBar from '../../home/sections/MenuBar';
import TopNav from '../../home/sections/TopNav';
import Footer from '../partials/Footer';

const initialData = {
    title: 'Terms Of Services',
    headingWiseData: [
        {
            heading: 'AGREEMENT TO TERMS',
            paragraph: [
                'These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and LifeSpring Ltd (“we,” “us” or “our”), concerning your access to and use of the lifespringint.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).',
                'You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.',
                'Supplemental Terms of Service or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason.',
                'We will alert you about any changes by updating the “Last updated” date of these Terms of Service, and you waive any right to receive specific notice of each such change.',
                'The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.',
                'Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.',
                'Option 1: The Site is intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to register for the Site.',
                'Option 2: [The Site is intended for users who are at least 13 years of age.] All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Site. If you are a minor, you must have your parent or guardian read and agree to these Terms of Service prior to you using the Site.',
            ],
        },

        {
            heading: 'INTELLECTUAL PROPERTY RIGHTS',
            paragraph: [
                'Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of Bangladesh, foreign jurisdictions, and international conventions.',
                'The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.',
                'Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.',
            ],
        },

        {
            heading: 'USER REPRESENTATIONS',
            paragraph: [
                'By using the Site, you represent and warrant that:',
                '(1) all registration information you submit will be true, accurate, current, and complete;',
                '(2) you will maintain the accuracy of such information and promptly update such registration information as necessary;',
                '(3) you have the legal capacity and you agree to comply with these Terms of Service;',
                '(4) you are not under the age of 13;',
                '(5) not a minor in the jurisdiction in which you reside [, or if a minor, you have received parental permission to use the Site];',
                '(6) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise;',
                '(7) you will not use the Site for any illegal or unauthorized purpose;',
                '(8) your use of the Site will not violate any applicable law or regulation.',
                'If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).',
            ],
        },
    ],
};

const TermsOfServices = () => {
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
                            <h2 className="text-lg sm:text-xl font-semibold mb-2 mt-3">
                                {item?.heading}
                            </h2>
                            {item?.paragraph?.map((para, pIdx) => (
                                <div key={pIdx + 1}>
                                    <p className="pt-5">{para}</p>
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

export default TermsOfServices;

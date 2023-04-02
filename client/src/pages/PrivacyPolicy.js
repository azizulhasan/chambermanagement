import React from 'react';
import FrontSkeleton from '../layouts/front/FrontSkeleton';

const initialData = {
    title: 'Privacy Policy',
    paragraph: [
        'MindToHeart, owner of the www.mindtoheart.com is physical and mental health counselling organization the website respects your privacy. This Privacy Policy provides concisely the manner your data is collected and used by system on the Site. As a visitor to the Site/ Customer you are advised to please read the Privacy Policy carefully. By accessing the services provided by the Site you agree to the collection and use of your data by system.',
        'As part of the registration process on the Site, system may collect the following personally identifiable information about you: Name including first and last name, alternate email address, mobile phone number and contact details, Postal code, Demographic profile (like your age, gender, occupation, education, address etc.) and information about the pages on the site you visit/access, the links you click on the site, the number of times you access the page and any such browsing information.',
        'When you use our Website, we collect and store your personal information which is provided by you from time to time. Our primary goal in doing so is to provide you a safe, efficient, smooth and customized experience. This allows us to provide services and features that most likely meet your needs, and to customize our website to make your experience safer and easier. More importantly, while doing so, we collect personal information from you that we consider necessary for achieving this purpose.',
        'Below are some of the ways in which we collect and store your information:',
        'We receive and store any information you enter on our website or give us in any other way. We use the information that you provide for such purposes as responding to your requests, customizing future shopping for you, improving our stores, and communicating with you.',
        'We also store certain types of information whenever you interact with us. For example, like many websites, we use “cookies,” and we obtain certain types of information when your web browser accesses www.mindtoheart.com or advertisements and other content served by or on behalf of www.mindtoheart.com on other websites.',
        'To help us make e-mails more useful and interesting, we often receive a confirmation when you open e-mail from www.mindtoheart.com if your computer supports such capabilities.',
        'Information about our customers is an important part of our business, and we are not in the business of selling it to others.',
        'We release account and other personal information when we believe release is appropriate to comply with the law; enforce or apply our Terms of Use and other agreements; or protect the rights, property, or safety of www.mindtoheart.com, our users or others. This includes exchanging information with other companies and organizations for fraud protection.',
        'MindToHeart. reserves the right to change or update this policy at any time. Such changes shall be effective immediately upon posting to the Site.',
    ],
};

const PrivacyPolicy = () => {
    return (
        <FrontSkeleton>
            <div className="md:max-w-screen-sm text-center px-4 sm:px-6 lg:px-8 pt-24 pb-6 mx-auto">
                <h1 className="text-2xl font-bold md:text-4xl mt-3">
                    {initialData?.title}
                </h1>
            </div>

            <div className="md:max-w-screen-sm lg:max-w-[992px] px-4 sm:px-6 lg:px-8 pb-12 md:pt-6 sm:pb-20 mx-auto">
                <div className="grid gap-4 md:gap-8">
                    {initialData?.paragraph?.map((item, index) => (
                        <div key={index + 1}>
                            <p className="pt-5 pb-5">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </FrontSkeleton>
    );
};

export default PrivacyPolicy;

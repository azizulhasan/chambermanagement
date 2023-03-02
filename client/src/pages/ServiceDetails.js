import React, { lazy } from 'react';
import { Link, useParams } from 'react-router-dom';
import GeneralLayout from '../components/front/common/GeneralLayout';
import Footer from '../components/front/common/partials/Footer';
import MenuBar from '../components/front/home/sections/MenuBar';
import TopNav from '../components/front/home/sections/TopNav';
import { database } from '../database';
const NotFound = lazy(() =>
    import('../components/front/common/notfound/NotFound')
);

const {
    pages: {
        home: {
            sections: {
                healthServices: { serviceDetailsData },
            },
        },
    },
} = database;

const ServiceDetails = () => {
    const { slug } = useParams();

    const serviceData = serviceDetailsData[slug];
    if (serviceData) {
        return (
            <GeneralLayout>
                <div className="px-4 my-20 max-w-7xl mx-auto md:px-8 flex flex-col gap-10 md:gap-20">
                    <h1 className="text-3xl font-semibold text-center">
                        {serviceData.slogan}
                    </h1>
                    <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
                        {/* image */}
                        <div className="md:flex-1 md:w-full relative overflow-hidden">
                            <img
                                src={serviceData.image}
                                alt={'Image for ' + slug}
                                className="rounded-lg max-w-lg w-full md:w-1/2 mx-auto mt-10 object-cover duration-300 ease-in-out"
                            />
                        </div>
                        {/* description */}
                        <div className="md:flex-1 flex flex-col gap-10">
                            <ul className="flex flex-col gap-1">
                                {serviceData.details.map((point) => (
                                    <li
                                        key={point}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="h-1.5 w-1.5 bg-black" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/appointment"
                                className="w-fit bg-themeColor text-white px-6 py-3 rounded-md"
                            >
                                Book an Appointment
                            </Link>
                        </div>
                    </div>
                </div>
            </GeneralLayout>
        );
    }
    return <NotFound />;
};

export default ServiceDetails;

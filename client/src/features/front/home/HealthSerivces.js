import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { database } from '../../../data/database';
import { decideTotalSlides, fillArray } from '../../../utilities/utilities';

const {
    pages: {
        home: {
            sections: {
                healthServices: { title, carouselData },
            },
        },
    },
} = database;

let currentIndex = 0;
const HealthSerivces = ({ id = 'carouselData' }) => {
    const [perSlideWidth, setPerSlideWith] = useState(100);
    const [itemsInSingleSlide, setItemsInSingleSlide] = useState([]);
    const [totalSlides, setTotalSlides] = useState([]);

    useEffect(() => {
        window.sessionStorage.setItem('currentIndex', 0);
        let data = decideTotalSlides();
        setPerSlideWith(data.perSlideWidth);
        setItemsInSingleSlide(data.itemsInSingleSlide);
    }, []);

    useEffect(() => {
        if (itemsInSingleSlide.length) {
            let slideNumber = Math.ceil(
                carouselData.length / itemsInSingleSlide.length
            );
            if (carouselData.length < itemsInSingleSlide.length) {
                setTotalSlides(fillArray(1));
            } else {
                setTotalSlides(fillArray(slideNumber));
            }
        }
    }, [itemsInSingleSlide]);
    return (
        <>
            <div id={id} className=" my-10">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 pl-5">
                    {title}
                </h1>
                <Carousel
                    autoPlay={false}
                    showArrows={true}
                    emulateTouch={true}
                    infiniteLoop={true}
                    stopOnHover={true}
                    showThumbs={false}
                    className="presentation-mode professional pt-3"
                >
                    {totalSlides.length &&
                        totalSlides.map((i) => {
                            return (
                                <div key={i} className="flex">
                                    {itemsInSingleSlide.map((index) => {
                                        if (i !== 0) {
                                            currentIndex = currentIndex + 1;
                                            if (
                                                currentIndex >=
                                                carouselData.length
                                            ) {
                                                currentIndex = 0;
                                            }
                                        } else {
                                            currentIndex = index;
                                        }
                                        return (
                                            <div
                                                style={{ width: perSlideWidth }}
                                                key={currentIndex}
                                                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-white hover:shadow-2xl mr-2 flex flex-col justify-between"
                                            >
                                                <Link
                                                    to={`service-details/${carouselData[currentIndex].slug}`}
                                                >
                                                    <img
                                                        style={{
                                                            width: perSlideWidth,
                                                        }}
                                                        className="rounded-t-lg"
                                                        src={
                                                            carouselData[
                                                                currentIndex
                                                            ].image
                                                        }
                                                        alt=""
                                                    />
                                                </Link>
                                                <div className="p-5 w-full">
                                                    <Link
                                                        to={`service-details/${carouselData[currentIndex].slug}`}
                                                    >
                                                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                                            {
                                                                carouselData[
                                                                    currentIndex
                                                                ].title
                                                            }
                                                        </h5>
                                                    </Link>
                                                    <Link
                                                        to={`service-details/${carouselData[currentIndex].slug}`}
                                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-themeColor rounded-lg hover:bg-white hover:text-themeColor focus:ring-4 focus:outline-none focus:ring-themeColor dark:bg-themeColor dark:hover:bg-themeColor dark:focus:ring-themeColor border border-color-themeColor"
                                                    >
                                                        Read more
                                                        <svg
                                                            aria-hidden="true"
                                                            className="w-4 h-4 ml-2 -mr-1"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                </Carousel>
            </div>
        </>
    );
};

export default HealthSerivces;

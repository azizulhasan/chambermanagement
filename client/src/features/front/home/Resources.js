import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import YoutubeEmbed from '../../../components/common/YoutubeEmbed';
import { database } from '../../../data/database';
import { decideTotalSlides, fillArray } from '../../../utilities/utilities';

const {
    pages: {
        home: {
            sections: {
                resources: { title, resourceData },
            },
        },
    },
} = database;

let currentIndex = 0;
const Resources = (id = 'resources') => {
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
                resourceData.length / itemsInSingleSlide.length
            );
            if (resourceData.length < itemsInSingleSlide.length) {
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
                                                resourceData.length
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
                                                className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-white hover:shadow-2xl mr-2 overflow-hidden`}
                                            >
                                                <div className="bg-themeColor/20 p-0 m-0">
                                                    <YoutubeEmbed
                                                        title={
                                                            resourceData[
                                                                currentIndex
                                                            ].title
                                                        }
                                                        width={perSlideWidth}
                                                        height={250}
                                                        url={
                                                            resourceData[
                                                                currentIndex
                                                            ].url
                                                        }
                                                    />
                                                </div>
                                                <div className="p-5 w-full">
                                                    <a href="/#">
                                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                            {
                                                                resourceData[
                                                                    currentIndex
                                                                ].title
                                                            }
                                                        </h5>
                                                    </a>
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

export default Resources;

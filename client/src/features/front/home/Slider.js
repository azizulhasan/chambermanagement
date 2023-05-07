// https://www.npmjs.com/package/react-responsive-carousel

import { Carousel } from 'react-responsive-carousel';

import { useDispatch } from 'react-redux';
import { database } from '../../../data/database';
import { Link } from 'react-router-dom';

const {
    pages: {
        home: {
            sections: {
                hero: { slides },
            },
        },
    },
} = database;

const Slider = () => {

    // addCSS([
    //     '/assets/front/css/slider/slider.scss'
    // ])

    // let sliders = [
    //     {
    //         img: '1.jpeg',
    //         content: "Book An Appointment"
    //     },
    //     {
    //         img: '2.jpeg',
    //         content: "Book An Appointment"
    //     },
    //     {
    //         img: '3.jpeg',
    //         content: "Book An Appointment"
    //     },
    //     {
    //         img: '4.jpeg',
    //         content: "Book An Appointment"
    //     },
    //     {
    //         img: '5.jpeg',
    //         content: "Book An Appointment"
    //     },
    //     {
    //         img: '6.jpeg',
    //         content: "Book An Appointment"
    //     }
    // ]

    return (
        <>
            <Carousel
                showThumbs={false}
                infiniteLoop={true}
                emulateTouch={true}
                autoPlay={true}
                showArrows={true}
                className="presentation-mode"
            >
                {slides.length &&
                    slides.map((item, index) => {
                        return (
                            <div key={item.img}>
                                <img src={item.img} alt="" />
                                <Link
                                    className="legend bg-themeColor"
                                    to="/appointment"
                                >
                                    {item.content}
                                </Link>
                            </div>
                        );
                    })}
            </Carousel>
        </>
    );
};

export default Slider;

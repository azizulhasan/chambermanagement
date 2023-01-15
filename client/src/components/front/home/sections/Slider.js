// https://www.npmjs.com/package/react-responsive-carousel

import { Carousel } from 'react-responsive-carousel';
import { addCSS } from '../../../../utilities/utilities';
// onChange = { onChange } onClickItem = { onClickItem } onClickThumb = { onClickThumb }


import { useDispatch, useSelector } from "react-redux";
import { openModal } from '../../../../store/commonDataSlice';
import { useEffect, useState } from 'react';

const Slider = () => {
    const [path, setPath] = useState("./assets/front/images/corousel/")
    const { showNotice, noticeMessage, noticeDelay } = useSelector(state => state.common)

    const dispatch = useDispatch()

    // addCSS([
    //     '/assets/front/css/slider/slider.scss'
    // ])

    let sliders = [
        {
            img: '1.jpeg',
            content: "Book An Appointment"
        },
        {
            img: '2.jpeg',
            content: "Book An Appointment"
        },
        {
            img: '3.jpeg',
            content: "Book An Appointment"
        },
        {
            img: '4.jpeg',
            content: "Book An Appointment"
        },
        {
            img: '5.jpeg',
            content: "Book An Appointment"
        },
        {
            img: '6.jpeg',
            content: "Book An Appointment"
        }
    ]

    useEffect(() => {
        console.log(showNotice);
    }, [showNotice])

    return (
        <button onClick={(e) => dispatch(openModal({ displayModal: true }))}>open</button>
        // <Carousel autoPlay={false} showArrows={true} className="presentation-mode">

        //     {
        //         sliders.length && sliders.map((item, index) => {
        //             return (
        //                 <div key={item.img}>
        //                     <img src={path + item.img} />
        //                     <p className="legend bg-themeColor"><a onClick={(e) => {
        //                         e.preventDefault()
        //                         dispatch(openModal({ displayModal: true }))
        //                     }} href='#' className=''>{item.content}</a></p>
        //                 </div>
        //             )
        //         })
        //     }
        // </Carousel >
    );
}

export default Slider;
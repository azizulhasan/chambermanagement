// https://www.npmjs.com/package/react-responsive-carousel

import { Carousel } from 'react-responsive-carousel';
import { addCSS } from '../../../../utilities/utilities';
// onChange = { onChange } onClickItem = { onClickItem } onClickThumb = { onClickThumb }
const Slider = () => {

    addCSS([
        '/assets/front/css/slider/slider.scss'
    ])
    return (
        <Carousel autoPlay={true} showArrows={false} className="presentation-mode">
            <div>
                <img src="./assets/front/images/corousel/1.jpeg" />
                <p className="legend bg-themeColor"><a href='#' className=''>Book An Appointment</a></p>
            </div>
            <div>
                <img src="./assets/front/images/corousel/2.jpeg" />
                <p className="legend bg-themeColor"><a href='#'>Book An Appointment</a></p>
            </div>
            <div>
                <img src="./assets/front/images/corousel/3.jpeg" />
                <p className="legend bg-themeColor"><a href='#'>Book An Appointment</a></p>
            </div>
            <div>
                <img src="./assets/front/images/corousel/4.jpeg" />
                <p className="legend bg-themeColor"><a href='#'>Book An Appointment</a></p>
            </div>
            <div>
                <img src="./assets/front/images/corousel/5.jpeg" />
                <p className="legend bg-themeColor"><a href='#'>Book An Appointment</a></p>
            </div>
            <div>
                <img src="./assets/front/images/corousel/6.jpeg" />
                <p className="legend bg-themeColor"><a href='#'>Book An Appointment</a></p>
            </div>
        </Carousel>


    );
}

export default Slider;
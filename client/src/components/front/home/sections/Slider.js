// https://www.npmjs.com/package/react-responsive-carousel

import { Carousel } from 'react-responsive-carousel';
import './styles/slider.scss'
// onChange = { onChange } onClickItem = { onClickItem } onClickThumb = { onClickThumb }
const Slider = () => {
    return (
        <Carousel autoPlay={true} showArrows={false} className="presentation-mode">
            <div>
                <img src="./assets/front/images/corousel/1.jpeg" />
                <p className="legend"><a href='#'>Book An Appointment</a></p>
            </div>
            <div>
                <img src="./assets/front/images/corousel/2.jpeg" />
                <p className="legend"><a href='#'>Book An Appointment</a></p>
            </div>
            <div>
                <img src="./assets/front/images/corousel/3.jpeg" />
                <p className="legend"><a href='#'>Book An Appointment</a></p>
            </div>
            <div>
                <img src="./assets/front/images/corousel/4.jpeg" />
                <p className="legend"><a href='#'>Book An Appointment</a></p>
            </div>
            <div>
                <img src="./assets/front/images/corousel/5.jpeg" />
                <p className="legend"><a href='#'>Book An Appointment</a></p>
            </div>
            <div>
                <img src="./assets/front/images/corousel/6.jpeg" />
                <p className="legend"><a href='#'>Book An Appointment</a></p>
            </div>
        </Carousel>


    );
}

export default Slider;
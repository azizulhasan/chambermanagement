// https://www.npmjs.com/package/react-responsive-carousel

import { Carousel } from 'react-responsive-carousel';
import { addCSS } from '../../../../utilities/utilities';

// onChange = { onChange } onClickItem = { onClickItem } onClickThumb = { onClickThumb }
const Professionals = () => {
    return (
        <Carousel autoPlay={false} showArrows={true} className="presentation-mode professional">
            <div className='professional'>
                <div>
                    <img src="./assets/front/images/corousel/1.jpeg" />
                    <p className="professional-legend"><a href='#'>Book An Appointment</a></p>
                </div>
                <div >
                    <img src="./assets/front/images/corousel/1.jpeg" />
                    <p className="professional-legend"><a href='#'>Book An Appointment</a></p>
                </div>
                <div>
                    <img src="./assets/front/images/corousel/1.jpeg" />
                    <p className="professional-legend"><a href='#'>Book An Appointment</a></p>
                </div>
            </div>
            <div className='professional'>
                <div>
                    <img src="./assets/front/images/corousel/2.jpeg" />
                    <p className="professional-legend"><a href='#'>Book An Appointment</a></p>
                </div>
                <div >
                    <img src="./assets/front/images/corousel/3.jpeg" />
                    <p className="professional-legend"><a href='#'>Book An Appointment</a></p>
                </div>
                <div>
                    <img src="./assets/front/images/corousel/4.jpeg" />
                    <p className="professional-legend"><a href='#'>Book An Appointment</a></p>
                </div>
            </div>
            <div className='professional'>
                <div>
                    <img src="./assets/front/images/corousel/1.jpeg" />
                    <p className="professional-legend"><a href='#'>Book An Appointment</a></p>
                </div>
                <div >
                    <img src="./assets/front/images/corousel/5.jpeg" />
                    <p className="professional-legend"><a href='#'>Book An Appointment</a></p>
                </div>
                <div>
                    <img src="./assets/front/images/corousel/6.jpeg" />
                    <p className="professional-legend"><a href='#'>Book An Appointment</a></p>
                </div>
            </div>

        </Carousel>


    );
}

export default Professionals;
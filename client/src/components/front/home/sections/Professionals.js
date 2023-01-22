// https://www.npmjs.com/package/react-responsive-carousel

import { Carousel } from "react-responsive-carousel";

const doctorInformation = [
  { specialist: "PHYCHOLOGIST", name: "Dr. Mr. Madadi Hasan", degree: "", img: './assets/front/images/corousel/1.jpeg' },
  { specialist: "PHYCHOLOGIST", name: "Dr. Mr. Kamrul Hasan", degree: "", img: './assets/front/images/corousel/2.jpeg' },
  { specialist: "PHYCHOLOGIST", name: "Dr. Mr. Imarn Masud", degree: "", img: './assets/front/images/corousel/3.jpeg' },
  { specialist: "PHYCHOLOGIST", name: "Dr. Khadija Sultana", degree: "", img: './assets/front/images/corousel/4.jpeg' },
  { specialist: "PHYCHOLOGIST", name: "Dr. Afifa Jahan", degree: "", img: './assets/front/images/corousel/5.jpeg' },
  { specialist: "PHYCHOLOGIST", name: "Dr. Afifa Jahan", degree: "", img: './assets/front/images/corousel/6.jpeg' },
]

// onChange = { onChange } onClickItem = { onClickItem } onClickThumb = { onClickThumb }
const Professionals = () => {
  return (
    <Carousel
      autoPlay={true}
      showArrows={true}
      emulateTouch={true}
      infiniteLoop={true}
      stopOnHover={true}
      className="presentation-mode professional mt-2 px-5"
    >
      {/* <div className="professional gap-2 flex"> */}
      {
        doctorInformation?.map((item, index) => (
          <div key={index} className="flex-2 w-300 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            <img
              className="h-60 object-cover rounded-xl"
              src={item.img}
              alt=""
            />
            <div className="p-2">
              <h2 className="font-bold text-m text-themeColor">{item.specialist}</h2>
              <h2 className="font-bold text-lg mb-2">{item.name}</h2>

              <div className="m-2">
                <a
                  role="button"
                  href="/"
                  className="text-white bg-themeColor px-3 py-1 flex flex-nowrap rounded-md hover:bg-themeColor"
                >
                  Book An Appointment
                </a>
              </div>
            </div>
          </div>
        ))
      }
      {/* </div> */}
    </Carousel>
  );
};

export default Professionals;

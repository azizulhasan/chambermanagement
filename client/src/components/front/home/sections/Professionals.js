// https://www.npmjs.com/package/react-responsive-carousel

import { useEffect, useLayoutEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";

const doctorInformations = [
  { specialist: "PHYCHOLOGIST", name: "Dr. Mr. Madadi Hasan", degree: "", img: './assets/front/images/corousel/1.jpeg' },
  { specialist: "PHYCHOLOGIST", name: "Dr. Mr. Kamrul Hasan", degree: "", img: './assets/front/images/corousel/2.jpeg' },
  { specialist: "PHYCHOLOGIST", name: "Dr. Mr. Imarn Masud", degree: "", img: './assets/front/images/corousel/3.jpeg' },
  { specialist: "PHYCHOLOGIST", name: "Dr. Khadija Sultana", degree: "", img: './assets/front/images/corousel/4.jpeg' },
  { specialist: "PHYCHOLOGIST", name: "Dr. Afifa Jahan", degree: "", img: './assets/front/images/corousel/5.jpeg' },
  { specialist: "PHYCHOLOGIST", name: "Dr. Afifa Jahan", degree: "", img: './assets/front/images/corousel/6.jpeg' },
]






const Professionals = () => {
  const [perSlideWidth, setPerSlideWith] = useState(100)
  const [itemsInSingleSlide, setItemsInSingleSlide] = useState([])
  const [totalSlides, setTotalSlides] = useState([])
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  function decideTotalSlides() {
    let srWidth = window.screen.width
    let slideWidth = 100;
    let slideInARow = 1;
    if (srWidth < 575) {
      slideWidth = parseInt(srWidth / 1)
      slideInARow = 1;
    } else if (srWidth >= 575 && srWidth < 768) {
      slideWidth = Math.ceil(srWidth / 3)
      slideInARow = 3;
    } else if (srWidth >= 768 && srWidth < 992) {
      slideWidth = Math.ceil(srWidth / 4)
      slideInARow = 4;
    } else {
      slideWidth = Math.ceil(srWidth / 5)
      slideInARow = 5;
    }
    setPerSlideWith(slideWidth + "px")
    setItemsInSingleSlide(fillArray(slideInARow))
    let slideNumber = Math.ceil(doctorInformations.length / itemsInSingleSlide.length)
    setTotalSlides(fillArray(slideNumber))
  }

  function fillArray(length) {
    let data = []
    for (let i = 0; i < length; i++) {
      data.push(i)
    }
    return data;
  }
  useEffect(() => {
    decideTotalSlides()
  }, [])

  useEffect(() => {
    console.log({ width: screenWidth, itemsInSingleSlide: itemsInSingleSlide, perSlideWidth: perSlideWidth });
  }, [screenWidth, itemsInSingleSlide])

  // window.addEventListener('resize', () => {
  //   setScreenWidth(window.innerWidth)
  // })
  return (
    <Carousel
      autoPlay={true}
      showArrows={true}
      emulateTouch={true}
      infiniteLoop={true}
      stopOnHover={true}
      showThumbs={false}
      className="presentation-mode professional mt-2 px-5"
    >
      <div>test</div>
      {/* {
        totalSlides.map(i => {
          itemsInSingleSlide.map(index => {
            return (< div key={index} className={["flex-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl", `w-[${perSlideWidth}]`]} >
              <img
                className="h-60 object-cover rounded-xl"
                src={doctorInformations[index].img}
                alt=""
              />
              <div className="p-2">
                <h2 className="font-bold text-m text-themeColor">{doctorInformations[index].specialist}</h2>
                <h2 className="font-bold text-lg mb-2">{doctorInformations[index].name}</h2>

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
            </div>)
          })
        })
      } */}
    </Carousel>
  );
};

export default Professionals;

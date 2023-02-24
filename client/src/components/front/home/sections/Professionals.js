// https://www.npmjs.com/package/react-responsive-carousel

import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { decideTotalSlides, fillArray } from "../../../../utilities/utilities";

const doctorInformations = [
  {
    specialist: "PHYCHOLOGIST",
    name: "Dr. Mr. Madadi Hasan",
    degree: "",
    img: "./assets/front/images/corousel/1.jpeg",
    slug: "madadiHasan",
  },
  {
    specialist: "PHYCHOLOGIST",
    name: "Dr. Mr. Kamrul Hasan",
    degree: "",
    img: "./assets/front/images/corousel/2.jpeg",
    slug: "kamrulHasan",
  },
  {
    specialist: "PHYCHOLOGIST",
    name: "Dr. Mr. Imarn Masud",
    degree: "",
    img: "./assets/front/images/corousel/3.jpeg",
    slug: "kamrulHasan",
  },
  {
    specialist: "PHYCHOLOGIST",
    name: "Dr. Khadija Sultana",
    degree: "",
    img: "./assets/front/images/corousel/4.jpeg",
    slug: "kamrulHasan",
  },
  {
    specialist: "PHYCHOLOGIST",
    name: "Dr. Afifa Jahan",
    degree: "",
    img: "./assets/front/images/corousel/5.jpeg",
    slug: "kamrulHasan",
  },
  {
    specialist: "PHYCHOLOGIST",
    name: "Dr. Afifa Jahan",
    degree: "",
    img: "./assets/front/images/corousel/6.jpeg",
    slug: "kamrulHasan",
  },
];

let currentIndex = 0;

const Professionals = ({ id = "team" }) => {
  const [perSlideWidth, setPerSlideWith] = useState(100);
  const [itemsInSingleSlide, setItemsInSingleSlide] = useState([]);
  const [totalSlides, setTotalSlides] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    let data = decideTotalSlides();
    setPerSlideWith(data.perSlideWidth);
    setItemsInSingleSlide(data.itemsInSingleSlide);
  }, []);

  useEffect(() => {
    if (itemsInSingleSlide.length) {
      let slideNumber = Math.ceil(
        doctorInformations.length / itemsInSingleSlide.length
      );
      if (doctorInformations.length < itemsInSingleSlide.length) {
        setTotalSlides(fillArray(1));
      } else {
        setTotalSlides(fillArray(slideNumber));
      }
    }
  }, [itemsInSingleSlide]);

  return (
    <div id={id} className=" my-10">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 pl-5">
        Health Professionals
      </h1>
      <Carousel
        autoPlay={false}
        showArrows={true}
        emulateTouch={true}
        infiniteLoop={true}
        stopOnHover={true}
        showThumbs={false}
        className="presentation-mode professional pt-3 px-5"
      >
        {totalSlides.length &&
          totalSlides.map((i) => {
            return (
              <div key={i} className="flex gap-2">
                {itemsInSingleSlide.map((index) => {
                  if (i !== 0) {
                    currentIndex = currentIndex + 1;
                    if (currentIndex >= doctorInformations.length) {
                      currentIndex = 0;
                    }
                  } else {
                    currentIndex = index;
                  }
                  return (
                    <div
                      key={currentIndex}
                      style={{ width: perSlideWidth }}
                      className={[
                        "flex-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl p-2",
                      ].join(" ")}
                    >
                      <Link
                        to={`health-professionals/${doctorInformations[currentIndex].slug}`}
                      >
                        <div className="w-fit">
                          <img
                            className="h-60 object-cover rounded-xl z-[1000]"
                            src={doctorInformations[currentIndex].img}
                            alt=""
                          />
                        </div>
                      </Link>
                      <div className="p-2">
                        <Link
                          to={`health-professionals/${doctorInformations[currentIndex].slug}`}
                        >
                          <h2 className="font-bold text-m text-themeColor">
                            {doctorInformations[currentIndex].specialist}
                          </h2>
                          <h2 className="font-bold text-lg mb-2">
                            {doctorInformations[currentIndex].name}
                          </h2>
                        </Link>
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
                  );
                })}
              </div>
            );
          })}
      </Carousel>
    </div>
  );
};

export default Professionals;

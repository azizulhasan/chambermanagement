import { uniqueId } from "lodash";
import React from "react";
import { Carousel } from "react-responsive-carousel";

const dataAray = [
  {
    id: uniqueId(),
    title: "Psychological Counseling",
    image: "./assets/front/images/3.jpg",
  },
  {
    id: uniqueId(),
    title: "Corporate Service",
    image: "./assets/front/images/4.jpg",
  },
  {
    id: uniqueId(),
    title: "Child Development",
    image: "./assets/front/images/5.jpg",
  },
  {
    id: uniqueId(),
    title: "Development",
    image: "./assets/front/images/2.jpg",
  },
];

const HealthSerivces = () => {
  return (
    <div>
      <div className="text-2xl font-bold tracking-tight text-gray-900 ml-20">
        <h1>Health Services</h1>
      </div>
      <Carousel autoPlay={true} showArrows={true} className="presentation-mode professional">
        {dataAray?.map((item) => (
          <div
            key={item.id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-white hover:shadow-2xl"
          >
            <a href="/#">
              <img className="rounded-t-lg" src={item?.image} alt="" />
            </a>
            <div className="p-5">
              <a href="/#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item?.title}
                </h5>
              </a>
              <a
                href="/#"
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
              </a>
            </div>
          </div>
        ))}
      </Carousel>
    </div >
  );
};

export default HealthSerivces;

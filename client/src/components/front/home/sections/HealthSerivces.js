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
      <div className="justify-center gap-5 flex flex-wrap py-5">
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
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
      </Carousel>

      {/* <div className="container my-5 mx-auto w-full">

    <section className="mb-2 text-gray-800 text-center">
    <div className="px-6 py-6 md:px-12">
        <div className="container mx-auto xl:px-32">
        <div className="grid lg:grid-cols-2 items-center gap-50">
            <div className="md:mt-12 lg:mt-0 mb-12 lg:mb-0">
            <div
                className="block rounded-lg shadow-lg px-6 py-12 md:px-12 lg:-mr-14" style={{background: "hsla(0, 0%, 100%, 0.55)", backdropFilter:"blur(30px)"}}
            >
            <h2 className="text-3xl font-bold mb-12">Contact us</h2>
            <form>
                <div className="form-group mb-6">
                <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleInput7"
                    placeholder="Name"
                />
                </div>
                <div className="form-group mb-6">
                <input
                    type="email"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleInput8"
                    placeholder="Email address"
                />
                </div>
                <div className="form-group mb-6">
                <textarea
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlTextarea13"
                    rows="3"
                    placeholder="Message"
                ></textarea>
                </div>
                <div className="form-group form-check text-center mb-6">
                <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                    id="exampleCheck87"
                    checked
                />
                <label className="form-check-label inline-block text-gray-800" for="exampleCheck87">Send me a copy of this message</label>
                </div>
                <button
                type="submit"
                className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                Send
                </button>
            </form>
            </div>
            </div>
            <div className="md:mb-12 lg:mb-0">
                <div className="map-container relative shadow-lg rounded-lg" style={{height: "499px", zIndex: -1}}>
                    <iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=dhaka,Mind To Heart&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                </div>
            </div>
        </div>
        </div>
    </div>
    </section>

</div> */}


    </div>
  );
};

export default HealthSerivces;

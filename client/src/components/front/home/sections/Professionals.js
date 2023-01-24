// https://www.npmjs.com/package/react-responsive-carousel

import { uniqueId } from "lodash";
import { Carousel } from "react-responsive-carousel";

const doctorInformation = [
  {
    id: uniqueId,
    specialist: "PHYCHOLOGIST",
    name: "Dr. Mr. Madadi Hasan",
    degree: "",
    img: "./assets/front/images/corousel/1.jpeg",
  },
  {
    id: uniqueId,
    specialist: "PHYCHOLOGIST",
    name: "Dr. Mr. Kamrul Hasan",
    degree: "",
    img: "./assets/front/images/corousel/2.jpeg",
  },
  {
    id: uniqueId,
    specialist: "PHYCHOLOGIST",
    name: "Dr. Mr. Imarn Masud",
    degree: "",
    img: "./assets/front/images/corousel/3.jpeg",
  },
  {
    id: uniqueId,
    specialist: "PHYCHOLOGIST",
    name: "Dr. Khadija Sultana",
    degree: "",
    img: "./assets/front/images/corousel/4.jpeg",
  },
  {
    id: uniqueId,
    specialist: "PHYCHOLOGIST",
    name: "Dr. Afifa Jahan",
    degree: "",
    img: "./assets/front/images/corousel/5.jpeg",
  },
  // {id: uniqueId, specialist:"PHYCHOLOGIST", name: "Dr. Afifa Jahan", degree:"", img:'./assets/front/images/corousel/6.jpeg'},
];

// onChange = { onChange } onClickItem = { onClickItem } onClickThumb = { onClickThumb }
const Professionals = () => {
  return (
    <Carousel
      autoPlay={true}
      showArrows={true}
      className="presentation-mode professional mt-2 px-5"
    >
      <div className="professional">
        {doctorInformation?.map((item) => (
          
            <div key={item.id} className="w-200 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl ">
              <img
                className="h-60 object-cover rounded-xl"
                src={item.img}
                alt=""
              />
              <div className="p-2">
                <h2 className="font-bold text-md bg-themeColor text-white">
                  {item.specialist}
                </h2>
                <h2 className="font-bold text-lg mb-2">{item.name}</h2>

                <div className="m-2">
                  <a
                    role="button"
                    href="/"
                    className="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-themeColor"
                  >
                    Book An Appointment
                  </a>
                </div>
              </div>
            </div>
        ))}
        </div>
        {/* <div className="professional">
          <div className="w-200 p-2 bg-white rounded-xl transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            <img src="./assets/front/images/corousel/1.jpeg" />
            <div className="p-2">
              <h2 className="font-bold text-md bg-themeColor text-white">
                {"PHYCHOLOGIST"}
              </h2>
              <h2 className="font-bold text-lg mb-2">
                {"Dr. Mr. Madadi Hasan"}
              </h2>

              <div className="m-2">
                <a
                  role="button"
                  href="/"
                  className="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-themeColor"
                >
                  Book An Appointment
                </a>
              </div>
            </div>
          </div>

          <div className="w-200 p-2 bg-white rounded-xl transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            <img src="./assets/front/images/corousel/1.jpeg" />
            <div className="p-2">
              <h2 className="font-bold text-md bg-themeColor text-white">
                {"PHYCHOLOGIST"}
              </h2>
              <h2 className="font-bold text-lg mb-2">
                {"Dr. Mr. Madadi Hasan"}
              </h2>

              <div className="m-2">
                <a
                  role="button"
                  href="/"
                  className="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-themeColor"
                >
                  Book An Appointment
                </a>
              </div>
            </div>
          </div>

          <div className="w-200 p-2 bg-white rounded-xl transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            <img src="./assets/front/images/corousel/1.jpeg" />
            <div className="p-2">
              <h2 className="font-bold text-md bg-themeColor text-white">
                {"PHYCHOLOGIST"}
              </h2>
              <h2 className="font-bold text-lg mb-2">
                {"Dr. Mr. Madadi Hasan"}
              </h2>

              <div className="m-2">
                <a
                  role="button"
                  href="/"
                  className="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-themeColor"
                >
                  Book An Appointment
                </a>
              </div>
            </div>
          </div>

          <div className="w-200 p-2 bg-white rounded-xl transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            <img src="./assets/front/images/corousel/1.jpeg" />
            <div className="p-2">
              <h2 className="font-bold text-md bg-themeColor text-white">
                {"PHYCHOLOGIST"}
              </h2>
              <h2 className="font-bold text-lg mb-2">
                {"Dr. Mr. Madadi Hasan"}
              </h2>

              <div className="m-2">
                <a
                  role="button"
                  href="/"
                  className="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-themeColor"
                >
                  Book An Appointment
                </a>
              </div>
            </div>
          </div>
        </div> */}
        
      {/* <div className="professional">
        <div>
          <img src="./assets/front/images/corousel/2.jpeg" />
          <p className="">
            <a href="#">Book An Appointment</a>
          </p>
        </div>
        <div>
          <img src="./assets/front/images/corousel/3.jpeg" />
          <p className="">
            <a href="#">Book An Appointment</a>
          </p>
        </div>
        <div>
          <img src="./assets/front/images/corousel/4.jpeg" />
          <p className="">
            <a href="#">Book An Appointment</a>
          </p>
        </div>
      </div>
      <div className="professional">
        <div>
          <img src="./assets/front/images/corousel/1.jpeg" />
          <p className="">
            <a href="#">Book An Appointment</a>
          </p>
        </div>
        <div>
          <img src="./assets/front/images/corousel/5.jpeg" />
          <p className="">
            <a href="#">Book An Appointment</a>
          </p>
        </div>
        <div>
          <img src="./assets/front/images/corousel/6.jpeg" />
          <p className="">
            <a href="#">Book An Appointment</a>
          </p>
        </div>
      </div> */}
    </Carousel>
  );
};

export default Professionals;

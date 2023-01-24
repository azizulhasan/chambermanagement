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
  const [totalSlides, settotalSlides] = useState([0, 1, 2])
  const [slides, setSlides] = useState({})
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  function decideTotalSlides() {
    let width = window.screen.width
    let data = 0
    if (width < 575) {
      let slideItems = parseInt(doctorInformations.length / 1)
      console.log(slideItems)
      data = Array(slideItems).fill().map(item => item)
      settotalSlides(data);
    } else if (width >= 575 && width < 768) {
      let slideItems = Math.ceil(doctorInformations.length / 2)
      console.log(slideItems)

      data = Array(slideItems).fill().map(item => item)
      settotalSlides(data);
    } else if (width >= 768 && width < 992) {
      let slideItems = Math.ceil(doctorInformations.length / 2)
      console.log(slideItems)

      data = Array(slideItems).fill().map(item => item)
      settotalSlides(data);
    } else {
      let slideItems = Math.ceil(doctorInformations.length / 2)
      console.log(slideItems)

      data = Array(slideItems).fill().map(item => item)
      settotalSlides(data);
    }
  }

  useEffect(() => {
    decideTotalSlides()
    console.log(totalSlides);
  }, [screenWidth])

  window.addEventListener('resize', () => {
    setScreenWidth(window.innerWidth)
  })
  return (
    // <Carousel
    //   autoPlay={true}
    //   showArrows={true}
    //   emulateTouch={true}
    //   infiniteLoop={true}
    //   stopOnHover={true}
    //   showThumbs={false}
    //   className="presentation-mode professional mt-2 px-5"
    // >
    //   {
    //     totalSlides.map(index => {
    //       return (< div key={index} className="flex-2 w-300 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl" >
    //         <img
    //           className="h-60 object-cover rounded-xl"
    //           src={doctorInformations[index].img}
    //           alt=""
    //         />
    //         <div className="p-2">
    //           <h2 className="font-bold text-m text-themeColor">{doctorInformations[index].specialist}</h2>
    //           <h2 className="font-bold text-lg mb-2">{doctorInformations[index].name}</h2>

    //           <div className="m-2">
    //             <a
    //               role="button"
    //               href="/"
    //               className="text-white bg-themeColor px-3 py-1 flex flex-nowrap rounded-md hover:bg-themeColor"
    //             >
    //               Book An Appointment
    //             </a>
    //           </div>
    //         </div>
    //       </div>)
    //     })
    //   }
    // </Carousel>
    <div>ad</div>
  );
};

export default Professionals;

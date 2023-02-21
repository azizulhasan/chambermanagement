import React, { lazy } from "react";
import { useParams } from "react-router-dom";
import MenuBar from "../components/front/home/sections/MenuBar";
import TopNav from "../components/front/home/sections/TopNav";
const NotFound = lazy(() =>
  import("../components/front/common/notfound/NotFound")
);

const details = [
  "Psychological Assessment Session",
  "Individual Counselling Session",
  "Online or distant psychological assessment Session",
  "Online or distant counselling Session",
  "Couple Session",
  "Family Session",
  "Group Therapy",
  "Trauma Support Group therapy",
  "Systemic and family and couple therapy",
  "EMDR Based Trauma Therapy",
  "Life Coaching",
  "Corporate Mindfulness Training",
  "Corporate Psychological Wellness Services",
];

const allServices = {
  psychologicalCounseling: {
    slogan: "Counseling for Everyone",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNvdW5zZWxpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    details,
  },
  corporateService: {
    slogan: "About MindToHeart for Corporates",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNvdW5zZWxpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    details,
  },
  childDevelopment: {
    slogan:
      "If The World Is A Stage, Remember Our Children Are Sitting In The Front Row",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNvdW5zZWxpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    details,
  },
};

const ServiceDetails = () => {
  const { slug } = useParams();
  // console.log({ defaultDatabase });

  const serviceData = allServices[slug];
  if (serviceData) {
    return (
      <>
        <TopNav />
        <MenuBar />
        <div className="px-4 my-20 max-w-7xl mx-auto md:px-8 flex flex-col gap-10 md:gap-20">
          <h1 className="text-3xl font-semibold text-center">
            {serviceData.slogan}
          </h1>
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
            {/* image */}
            <div className="md:flex-1 md:w-full relative overflow-hidden">
              <img
                src={serviceData.image}
                alt={"Image for " + slug}
                className="rounded-lg max-w-lg w-full md:w-1/2 mx-auto mt-10 object-cover duration-300 ease-in-out"
              />
            </div>
            {/* description */}
            <div className="md:flex-1 flex flex-col gap-10">
              <ul className="flex flex-col gap-1">
                {serviceData.details.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 bg-black" />
                    {point}
                  </li>
                ))}
              </ul>
              <button className="w-fit bg-themeColor text-white px-6 py-3 rounded-md">
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <NotFound />;
};

export default ServiceDetails;

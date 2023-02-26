/**
 * Sections
 */
import Slider from "./sections/Slider";
import Professionals from "./sections/Professionals";
import HealthSerivces from "./sections/HealthSerivces";
import Contact from "./sections/Contact";
import { useDispatch, useSelector } from "react-redux";
import Resources from "./sections/Resources";
import SiteSkeleton from "../common/SiteSkeleton";

export default function Home() {
  const { showModal } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  return (
    <>
      <SiteSkeleton css={[
        "/assets/front/css/slider.css",
        "/assets/front/css/carousel.css",
        "/assets/front/css/professional.css",
      ]} >
        {/** Slider Section */}
        <Slider />
        {/** End Slider */}
        <Professionals id="team" />
        {/* <Skills /> */}

        {/** Healteh Service Section */}
        <HealthSerivces id="services" />
        {/** End Health Service */}

        <Resources />
        {/* <GoogleMap /> */}
        {/** Contact Section */}
        <Contact id="contact" />
        {/** End Contact Section */}
      </SiteSkeleton>

      {/* MODAL */}
      <div className="hidden min-h-full relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full sm:w-7/12 sm:w-4/12"></div>
      <div className="hidden ml-16 ml-60 ml-96 bg-red-700 -ml-2 mr-2 sm:ml-10 md:ml-20 lg:ml-40 xl:ml-48 2xl:ml-60"></div>
      <div className="hidden mx-auto ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 opacity-100 translate-y-0 sm:scale-100 ease-in duration-200 opacity-100 translate-y-0 sm:scale-100 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"></div>
      <div className="hidden z-50 relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full sm:w-10/12 mx-auto opacity-100 translate-y-0 sm:scale-100 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 absolute top-0 right-0 hidden pt-4 pr-4 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-6 w-6 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 fixed inset-0 z-10 overflow-y-auto"></div>
      {/* Professionals */}
      <div className="hidden col-span-3 w-300"></div>
      {/* Footer */}
      <div className="hidden grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"></div>
      <div className="hidden text-center sm:flex sm:justify-between sm:text-left"></div>
      <div className="hidden inline-block text-black underline transition hover:text-white/75"></div>
    </>
  );
}

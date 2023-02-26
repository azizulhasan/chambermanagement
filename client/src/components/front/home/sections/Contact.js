/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
/**
 *
 * Utilities
 */
import {
  getData,
  setUserAddress,
  hideMenuOnScroll,
  getFormattedDate,
} from "../../../../utilities/utilities";
import submitContactForm from "../../../../utilities/validate";
export default function Contact({ id = "contact" }) {
  const [contact, setContact] = useState({
    _id: "",
    section_title: "",
    subjects: "",
    contacts: [],
    contact_type: "",
    contact_type_value: "",
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    date: getFormattedDate(),
  });
  useEffect(() => {
    /**
     * set user address data
     */
    setUserAddress(window.navigator);
    /**
     * Hide menu on scroll for submitting contact form
     * if window.pageYOffset > 1900
     */
    // hideMenuOnScroll()
    /**
     * Get data from and display to table.
     */
    getData(process.env.REACT_APP_API_URL + "/api/contact").then((res) => {
      if (res.data.length) {
        setContact(res.data[0]);
      }
    });
  }, []);

  /**
   * Create a subjects object from given string which is seperated by "|"
   * @param {subjects} subjects
   * @returns subjectsObj
   */
  const setFormSubjects = (subjects) => {
    let subjectsObj = [];
    if (subjects.indexOf("|") > 0) {
      let stringArr = subjects.trim().split("|");

      for (let i = 0; i < stringArr.length; i++) {
        let key = stringArr[i].trim().replace(/\s/g, "_");
        subjectsObj[key] = stringArr[i];
      }
    } else {
      let key = subjects.trim().replace(/\s/g, "_");
      subjectsObj[key] = subjects;
    }

    return subjectsObj;
  };

  /**
   * Handle content change value.
   * @param {event} e
   */
  const handleChange = (e) => {
    setContactForm({ ...contactForm, ...{ [e.target.name]: e.target.value } });
  };
  /**
   *
   * @param {contact_type} value
   * @returns
   */
  const setUpContactTypeData = (value) => {
    let contactData = {};
    contactData.className = value.toLowerCase();
    contactData.title = value.charAt(0).toUpperCase() + "" + value.slice(1);
    contactData.icon =
      value === "Address"
        ? "geo-alt"
        : value === "Email"
        ? "envelope"
        : value.toLowerCase();

    return contactData;
  };

  return (
    <div id={id} className="container my-2 mx-auto w-full">
      <section className="mb-2 text-gray-800 text-center">
        <div className="px-2 py-6 md:px-5">
          <div className="container mx-auto ">
            <div className="grid lg:grid-cols-2 items-center gap-10">
              <div className="md:mb-12 lg:mb-0 hidden sm:hidden md:hidden lg:block xl:block">
                <div className="map-container relative shadow-lg rounded-lg">
                  <iframe
                    className="w-full border-slate-200"
                    height="500"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=dhaka,Mind To Heart&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                  ></iframe>
                </div>
              </div>

              <div className="md:mt-12 lg:mt-0 mb-12 lg:mb-0">
                <div className="block rounded-lg shadow-lg px-6 py-12 md:px-12 ">
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
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-themeColor checked:border-themeColor focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                        id="exampleCheck87"
                        onChange={(e) => e.preventDefault()}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800"
                        htmlFor="exampleCheck87"
                      >
                        Send me a copy of this message
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-2.5 bg-themeColor text-white font-bold text-xs leading-tight uppercase rounded shadow-md hover:bg-white hover:shadow-lg hover:text-themeColor hover:outline hover:outline-1 hover:outline-gray-100 focus:bg-themeColor focus:shadow-lg focus:outline-none focus:ring-0 active:bg-themeColor active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>

              <div className="md:mb-12 lg:mb-0 sm:block md:block lg:hidden xl:hidden">
                <div className="map-container relative shadow-lg rounded-lg">
                  <iframe
                    className="w-full"
                    height="500"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=dhaka,Mind To Heart&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

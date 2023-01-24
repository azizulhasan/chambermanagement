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
export default function Contact() {
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
    // <section id="contact" className="contact">
    //   <div className="container" data-aos="fade-up">
    //     <div className="section-title">
    //       <h2>{contact.section_title ? contact.section_title : "Contact"}</h2>
    //     </div>

    //     <div className="row mt-1" style={{zIndex: 99999}}>
    //       <div className="col-lg-4">
    //         <div className="info">
    //           {contact.contacts &&
    //             contact.contacts.map((contact, i) => {
    //               return (
    //                 <div  key={i} className={setUpContactTypeData(contact[0]).className}>
    //                   <i
    //                     className={
    //                       "bi bi-" + setUpContactTypeData(contact[0]).icon
    //                     }
    //                   ></i>
    //                   <h4>{setUpContactTypeData(contact[0]).title}:</h4>
    //                   <p>{contact[1]}</p>
    //                 </div>
    //               );
    //             })}
    //         </div>
    //       </div>

    //       <div className="col-lg-8 mt-5 mt-lg-0">
    //         <form
    //           onSubmit={submitContactForm}
    //           className="php-email-form"
    //         >
    //           <div className="row">
    //             <div className="col-md-6 form-group">
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="form-control"
    //                 id="name"
    //                 onChange={handleChange}
    //                 value={contactForm.name}
    //                 placeholder="Your Name"
    //                 required
    //               />
    //             </div>
    //             <div className="col-md-6 form-group mt-3 mt-md-0">
    //               <input
    //                 type="email"
    //                 className="form-control"
    //                 name="email"
    //                 onChange={handleChange}
    //                 value={contactForm.email}
    //                 id="email"
    //                 placeholder="Your Email"
    //                 required
    //               />
    //             </div>
    //           </div>
    //           <div className="form-group mt-3">
    //             <Form.Select
    //               name="subject"
    //               onChange={handleChange}
    //               value={contactForm.subject}
    //               aria-label="Default select example"
    //             >
    //               <option disabled>Open this select menu</option>
    //               {contact.subjects &&
    //                 Object.keys(setFormSubjects(contact.subjects)).map(
    //                   (subject_key) => {
    //                     return (
    //                       <option key={subject_key} value={subject_key}>
    //                         {setFormSubjects(contact.subjects)[subject_key]}
    //                       </option>
    //                     );
    //                   }
    //                 )}
    //             </Form.Select>
    //           </div>

    //           <div className="form-group mt-3">
    //             <textarea
    //               className="form-control"
    //               name="message"
    //               onChange={handleChange}
    //               value={contactForm.message}
    //               rows="5"
    //               placeholder="Message"
    //               required
    //             ></textarea>
    //           </div>
    //           <div className="my-3">
    //             <div className="loading">Loading</div>
    //             <div className="error-message"></div>
    //             <div className="sent-message">
    //               Your message has been sent. Thank you!
    //             </div>
    //           </div>
    //           <div className="text-center">
    //             <button type="submit">Send Message</button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <div className="container my-2 mx-auto w-full">
      <section className="mb-2 text-gray-800 text-center">
        <div className="px-2 py-6 md:px-5">
          <div className="container mx-auto ">
            <div className="grid lg:grid-cols-2 items-center gap-10">
             
              <div className="md:mb-12 lg:mb-0">
                <div
                  className="map-container relative shadow-lg rounded-lg"
                >
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

              <div className="md:mt-12 lg:mt-0 mb-12 lg:mb-0">
                <div
                  className="block rounded-lg shadow-lg px-6 py-12 md:px-12 lg:-mr-14"
                  // style={{
                  //   background: "hsla(0, 0%, 100%, 0.55)",
                  //   backdropFilter: "blur(30px)",
                  // }}
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
                      <label
                        className="form-check-label inline-block text-gray-800"
                        for="exampleCheck87"
                      >
                        Send me a copy of this message
                      </label>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useEffect, useState } from "react";
/**
 *
 * Utilities
 */
import { getData } from "../../../../../utilities/utilities";

export default function Education({ education_title }) {
  const [educations, setEducations] = useState({
    _id: "",
    degree: "",
    from: "",
    to: "",
    institution: "",
    address: "",
    details: "",
  });
  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData(process.env.REACT_APP_API_URL + "/api/education").then((res) => {
      if(res.data.length){
        setEducations(res.data);
      }
    });
  }, []);
  return (
    <>
      <h3 className="resume-title">
        {education_title ? education_title : "Education"}
      </h3>
      {educations && educations.length > 0  && educations.map((education, index)=>{
          return (
            <div className="resume-item" key={index}>
            <h4>{education.degree}</h4>
            <h5>{education.from} {education.to? " - "+education.to: ""} </h5>
            <p>
              <em>{education.institution}, {education.address}</em>
            </p>
            <div dangerouslySetInnerHTML={{__html: education.details}}></div>
          </div>
          )
      })}
    </>
  );
}

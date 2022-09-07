import React, { useEffect, useState } from "react";
/**
 *
 * Utilities
 */
import { getData } from "../../../../context/utilities";
export default function Experience({experience_title}) {
  const [experiences, setExperiences] = useState({
    _id: "",
    position: "",
    from: "",
    to: "",
    company: "",
    address: "",
    details: "",
  });
  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData(process.env.REACT_APP_API_URL + "/api/experience").then((res) => {
      if(res.data.length){
        setExperiences(res.data);
      }
    });
  }, []);
  return (
    <div className="col-lg-6">
      <h3 className="resume-title">
        {experience_title ? experience_title : "Professional Experience"}
      </h3>
      {experiences && experiences.length > 0  && experiences.map((experience, index)=>{
          return (
            <div className="resume-item" key={index}>
            <h4>{experience.position}</h4>
            <h5>{experience.from} {experience.to? " - "+experience.to: ""} </h5>
            <p>
              <em>{experience.company}, {experience.address}</em>
            </p>
            <div dangerouslySetInnerHTML={{__html: experience.details}}></div>
          </div>
          )
      })}
    </div>
  );
}

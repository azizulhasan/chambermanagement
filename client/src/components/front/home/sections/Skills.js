import React, { useEffect, useState } from "react";

/**
 *
 * Utilities
 */
import { getData } from "../../../../utilities/utilities";
export default function Skills() {
  const [skills, setSkills] = useState({
    _id: "",
    section_title: "",
    top_details: "",
    skills: ['abc', 'abc', 'ac', 'ab', 'ad', 'af', 'ag', 'ak'],
    skill_name: "",
    skill_proficiency: "",
  });
  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData(process.env.REACT_APP_API_URL + "/api/skills").then((res) => {
      if (res.data.length) {
        setSkills(res.data[0]);
      }
    });
  }, []);

  const style = {
    single__skill: {
      padding: "5px",
      border: "3px solid #0563bb",
      textAlign: 'center',
      margin: '0 5px 10px',
      color: "black"
    },
  };

  /**
   * if skills is less then 6 then add a class "offset-" based on skill number.
   * @param {array} skills skills array
   */
  const getOffset = (skills, skill_no) => {
    if (skill_no === 0 && skills.length < 6) {
      return "offset-sm-" + (6 - skills.length)
    }

    return;
  }

  return (
    <section id="skills" className="skills section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>{skills.section_title ? skills.section_title : "Skills"}</h2>
          <p>{skills.top_details ? skills.top_details : ""}</p>
        </div>

        <div className="row">
          {skills.skills.map((skill, index) => {
            return (
              <div className={'col-2 ' + getOffset(skills.skills, index)} key={index}>
                <div style={style.single__skill}>{skill[0]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
/**
 * Render if skills lenght is 1
 * @param {skills} skills
 * @returns
 */
function SingleSkill({ skills }) {
  return (
    <div className="col-lg-12">
      {skills.skills &&
        skills.skills.length > 0 &&
        skills.skills.map((skill, index) => {
          return <ProgressBar key={index} skill={skill} index={index} />;
        })}
    </div>
  );
}

/**
 * Progressbar
 * @param {skill}
 * @returns
 */
function ProgressBar({ skill, index }) {
  return (
    <div className="progress" key={index}>
      <span className="skill">
        {skill[0]} <i className="val">{skill[1]}%</i>
      </span>
      <div className="progress-bar-wrap">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={skill[1]}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";

/**
 *
 * Utilities
 */
import { getData } from "../../../../utilities/utilities";
export default function Footer() {
  const [hero, setHero] = useState({
    _id: "",
    title: "",
    profession: "",
    social_icon_name: "",
    social_icon_url: "",
    backgroundImage: "",
    backgroundImageOpacity: "",
    icons: [],
  });
  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData(process.env.REACT_APP_API_URL + "/api/hero").then((res) => {
      if (res.data.length) {
        setHero(res.data[0]);
      }
    });
  }, []);
  return (
    <>
      <footer id="footer">
        <div className="container">
          <h3>{process.env.REACT_APP_WEBSITE_NAME}</h3>

          <div className="social-links">
            {hero.icons.length &&
              JSON.parse(hero.icons).map((icon) => {
                return (
                  <a
                    key={icon[0]}
                    href={icon[1]}
                    target="_blank"
                    className={icon[1]}
                  >
                    <i className={"bx bxl-" + icon[0]}></i>
                  </a>
                );
              })}
          </div>
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span><a rel="noopener" href={hero.icons.length && JSON.parse(hero.icons)[0][1]} target="_blank">
                {process.env.REACT_APP_WEBSITE_NAME}
              </a></span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">
            Developed by <a rel="noopener" href="http://azizulhasan.com/" target="_blank">
              Azizul Hasan
            </a>
          </div>
        </div>
      </footer>

    </>
  );
}

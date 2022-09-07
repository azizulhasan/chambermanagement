import React, { useEffect, useState } from "react";

/**
 *
 * Utilities
 */
import { getData } from "../../../context/utilities";

export default function Hero() {
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

  const styles = {
    hero: {
      width: "100%",
      height: "100vh",
      backgroundImage: `url(${hero.backgroundImage})`,
      backgroundPosition: "top right",
      backgroundRepeat: " no-repeat",
      backgroundSize: "cover",
      position: "relative",
      zIndex: 2,
    },
  };
  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData(process.env.REACT_APP_API_URL + "/api/hero").then((res) => {
      if(res.data.length){
        setHero(res.data[0]);
      }
    });
  }, []);
  return (
    <React.Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: [
            "#hero:before {",
            ' content: "";',
            `background: rgba(255, 255, 255, ${hero.backgroundImageOpacity});`,
            "position: absolute;",
            "bottom: 0;",
            "top: 0px;",
            "left: 0;",
            "right: 0;",
            "z-index: -1",
            "}",
          ].join("\n"),
        }}
      ></style>
      <section
        id="hero"
        style={styles.hero}
        className="d-flex flex-column justify-content-center"
      >
        <div className="container" data-aos="zoom-in" data-aos-delay="100">
          <h1>{hero.title}</h1>
          <p>
            {hero.profession}
          </p>
          <div className="social-links">
            {hero.icons.length &&
              JSON.parse(hero.icons).map((icon) => {
                return (
                  <a
                    key={icon[0]}
                    href={icon[1]}
                    target="_blank"
                    className={icon[1]}
                    rel="noreferrer"
                  >
                    <i className={"bx bxl-" + icon[0]}></i>
                  </a>
                );
              })}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

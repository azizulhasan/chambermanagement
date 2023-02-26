import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { database } from "../../../../database";

/**
 *
 * Utilities
 */
import { addCSS, getData } from "../../../../utilities/utilities";

const {
  footer: {
    socialMediaLinks,
    menus: { aboutUs, ourServices, contactUs },
  },
} = database;

export default function Footer() {
  addCSS(["/assets/front/css/footer.css"]);
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
    <div>
      <footer aria-label="Site Footer" className="bg-themeColor w-full pt-5">
        <div className="mx-auto max-w-screen-xl px-4 pt-8 pb-6 sm:px-6 lg:px-2 lg:pt-5">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex flex-shrink-0 items-center  text-black font-medium">
                <img
                  className="block h-16 w-auto"
                  src="assets/front/images/mindtoheart.ogo.png"
                  alt="Mind To Heart"
                />
                <div>
                  <div className="font-semibold">Mind To Heart</div>
                  <div className="text-sm">Psychological Wellness Center</div>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
                <div>
                  <h4 className="text-2xl font-semibold text-center mb-6 text-white">
                    Follow Us
                  </h4>
                  <div className="icons">
                    {socialMediaLinks.map(({ name, link, icon }) => (
                      <a
                        href={link}
                        className={`icon icon--${name.toLowerCase()}`}
                        key={name}
                      >
                        <i className={icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white pb-4">About Us</p>
              <nav aria-label="Footer About Nav">
                <ul className="space-y-3 text-sm">
                  {aboutUs.map(({ name, link }) => (
                    <li key={name}>
                      <Link
                        className="inline-block text-white  transition hover:text-white/75"
                        to={link}
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white pb-4">
                Our Services
              </p>

              <nav aria-label="Footer Services Nav">
                <ul className="space-y-3 text-sm">
                  {ourServices.map(({ name, link }) => (
                    <li key={name}>
                      <Link
                        className="text-white transition hover:text-white/75"
                        to={link}
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white pb-4">Contact Us</p>

              <ul className="space-y-3 text-sm">
                {contactUs.map(({ name, icon }) => (
                  <li
                    key={name}
                    className="flex items-start justify-center gap-1.5 sm:justify-start"
                  >
                    {icon()}
                    <span className="text-white">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

/**
 *
 * Utilities
 */
import { getData } from '../../../../utilities/utilities';
export default function About() {
    const [about, setAbout] = useState({
        _id: '',
        section_title: '',
        top_details: '',
        profession: '',
        details: '',
        portfolioImage: '',
    });
    useEffect(() => {
        /**
         * Get data from and display to table.
         */
        getData(process.env.REACT_APP_API_URL + '/api/about').then((res) => {
            if (res.data.length) {
                setAbout(res.data[0]);
            }
        });
    }, []);
    return (
        <section id="about" className="about">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>
                        {about.section_title ? about.section_title : 'About'}
                    </h2>
                    <p>{about.top_details ? about.top_details : ''}</p>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <img
                            src={about.portfolioImage}
                            className="img-fluid"
                            alt={about.profession}
                        />
                    </div>
                    <div className="col-lg-8 pt-4 pt-lg-0 content">
                        <h3>{about.profession}</h3>
                        <div
                            dangerouslySetInnerHTML={{ __html: about.details }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

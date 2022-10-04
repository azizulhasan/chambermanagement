import React from "react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Testimonials</h2>
        </div>

        <div
          className="testimonials-slider swiper"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="testimonial-item">
                <img
                  src="assets/front/img/testimonials/testimonials-4.jpg"
                  className="testimonial-img"
                  alt="testimonials"
                />
                <h3>Matt Brandon</h3>
                <h4>Freelancer</h4>
                <p>
                  <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                  Fugiat enim eram quae cillum dolore dolor amet nulla culpa
                  multos export minim fugiat minim velit minim dolor enim duis
                  veniam ipsum anim magna sunt elit fore quem dolore labore
                  illum veniam.
                  <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
              </div>
            </div>
            {/** End testimonial item */}

            <div className="swiper-slide">
              <div className="testimonial-item">
                <img
                  src="assets/front/img/testimonials/testimonials-5.jpg"
                  className="testimonial-img"
                  alt="testimonials"
                />
                <h3>John Larson</h3>
                <h4>Entrepreneur</h4>
                <p>
                  <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                  Quis quorum aliqua sint quem legam fore sunt eram irure aliqua
                  veniam tempor noster veniam enim culpa labore duis sunt culpa
                  nulla illum cillum fugiat legam esse veniam culpa fore nisi
                  cillum quid.
                  <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
              </div>
            </div>
            {/** End testimonial item  */}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
}

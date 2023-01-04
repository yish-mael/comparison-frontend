import React from 'react';
import { Link } from 'react-router-dom';

function Banner() {
  return (
    <>
        
        <section id="hero" className="hero d-flex align-items-center section-bg">
            <div className="container pb-5 pt-3">
                <div className="row justify-content-between gy-5">
                    <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
                        <h3 className='fs-2 fw-light' data-aos="fade-up">Looking to rent an apartment? Or are you overpaying for apartment rent?</h3>
                        <br />
                        <p data-aos="fade-up" data-aos-delay="100">We save you time, money and the hassle by comparing locations using data-driven and Machine learning tools! Our price saving tool provides a 95 % accuracy in savings.</p>
                        <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                            <Link to="/comparison" className="btn-book-a-table">Get Started</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 px-5 order-1 order-lg-2 text-center text-lg-start">
                        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="assets/img/pexels-6444981.jpg" style={{borderRadius: 20}} className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="300"/>
                                </div>
                                <div className="carousel-item">
                                    <img src="assets/img/pexels-4138152.jpg" style={{borderRadius: 20}} className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="300"/>
                                </div>
                                <div className="carousel-item">
                                    <img src="assets/img/pexels-6489104.jpg" style={{borderRadius: 20}} className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="300"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Banner;
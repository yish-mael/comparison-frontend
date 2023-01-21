import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
        <footer id="footer" className="footer pb-0">

            <div className="container">
            <div className="row gy-3">
                <div className="col-lg-3 col-md-6 d-flex">
                <i className="bi bi-geo-alt icon"></i>
                <div>
                    <h4>Address</h4>
                    <p>10265 Rockingham Dr Ste 100 <br/> PMB 6128 Sacramento CA 95827.<br/></p>
                </div>

                </div>

                <div className="col-lg-3 col-md-6 p-0 d-flex">
                <i className="bi bi-envelope icon"></i>
                <div>
                    <h4>Reservations</h4>
                    <p>
                    <strong>Email:</strong> <a href="mailto:info@smartrentics.com">info@smartrentics.com</a><br/>
                    </p>
                </div>
                </div>

                <div className="col-lg-3 col-md-6 footer-links d-flex">
                <i className="bi bi-clock icon"></i>
                <div>
                    <h4>Opening Hours</h4>
                    <p>
                    <strong>Mon-Fri: 9AM</strong> - 5PM
                    </p>
                </div>
                </div>

                <div className="col-lg-3 col-md-6 footer-links">
                <h4>Follow Us</h4>
                <div className="social-links d-flex">
                    <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                </div>
                </div>

            </div>
            </div>

            <div className=" copyright py-2 container d-flex justify-content-between">
                <div className="">
                    &copy; Copyright <strong><span>Smart Rentics, Inc.</span></strong> All Rights Reserved
                </div>
                <div className=" ">
                    <Link to={"/terms"}>Terms & Conditions</Link> | <Link>Privacy Policy</Link>
                </div>
            </div>

        </footer>
    </>
  )
}

export default Footer;
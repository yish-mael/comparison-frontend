import React from 'react';

function Footer() {
  return (
    <>
        <footer id="footer" className="footer">

            <div className="container">
            <div className="row gy-3">
                <div className="col-lg-3 col-md-6 d-flex">
                <i className="bi bi-geo-alt icon"></i>
                <div>
                    <h4>Address</h4>
                    <p>10265 Rockingham Dr Ste 100 <br/> PMB 6128 Sacramento CA 95827.<br/></p>
                </div>

                </div>

                <div className="col-lg-3 col-md-6 footer-links d-flex">
                <i className="bi bi-envelope icon"></i>
                <div>
                    <h4>Reservations</h4>
                    <p>
                    <strong>Email:</strong> info@smartrentics.com<br/>
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

            <div className="container">
                <div className="copyright">
                    &copy; Copyright <strong><span>Smart Rentics</span></strong>. All Rights Reserved
                </div>
            </div>

        </footer>
    </>
  )
}

export default Footer;
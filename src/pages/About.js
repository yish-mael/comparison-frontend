import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function About() {
  return (
    <>
      <Header />

      <div className="container-fluid bg-shade px-5 py-4" style={{background: "url(/assets/img/pexels-6782581.jpg)", backgroundSize: "cover", backgroundPosition: "center"}}>

          <div className=" px-5 pt-5">
            <br />
            <br />
            <h2 className="pt-5 pb-5 text-white">About</h2>
          </div>
      </div>

      <section id="cheap">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div className="col"></div>
              <div className="col-md-5 my-auto">
                <h4 className='fw-normal'>Who we are</h4>
                <p>
                Smart rentics, Inc. helps you save time, money, and hassle when looking to rent an apartment.
                Post-COVID, with the flexibility of working from anywhere, the ever-increasing apartment rental prices,
                and inflation. Smart rentics, Inc. is the smart way to rent an apartment. <br />
                Our tool helps Apartment renters make informed decisions by comparing current rental prices across
                different cities and guarantees a 95% accuracy in price savings between the two locations if there is one.      
                </p>
              </div>
              <div className="col-md-5 px-5">
                <img src="assets/img/pexels-6758788.jpg" style={{borderRadius: 20}} className="img-fluid"  alt="" />
              </div>
              <div className="col"></div>
            </div>
            <br />
            <div className="row py-5">
              <div className="col-md-4 p-4">
                <h4 className='fw-normal'>Safety Comparison Tool</h4>
                  <p >
                  Our Machine-Learning driven tool processes crime data obtained from law enforcement agencies and
                  grades the data on a safety rating scale. This rating helps users know how relatively safe their preferred
                  cities are.
                  </p>
              </div>
              <div className="col-md-4 p-4">
                <h4 className='fw-normal'>Price Comparison Tool</h4>
                  <p>
                  Our data-driven tool gets data from various apartment listing agencies. It computes as a comparison a price
                  saving if you prefer to live in one city compared to another. The accuracy of our results is 95 percent.
                  </p>
              </div>
              <div className="col-md-4 p-4">
                <h4 className='fw-normal'>Rewiews</h4>
                  <p>
                  Apartment renters want accurate, reliable information about various apartment communities. You can
                  then navigate to these communities through our third-party affiliates. This invaluable information would
                  help you get living insights about apartment communities.
                  </p>
              </div>
            </div>
          </div>
        </section>
     
      <Footer />
    </>
  )
}

export default About
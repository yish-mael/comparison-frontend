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
                  Smart rentics, Inc. helps you save time, money and hassle when looking to rent and apartment.
                  <br />
                  Smart rentics, Inc. is the smart way to rent an apartment. Post-COVID, with the flexibility of working from anywhere, ever increasing apartment rental prices,
                  and inflation. Our tool helps Apartments renters make informed decisions by comparing current rental prices across different cities and guarantiees a 95% accuracy in price savings between the two locations, if there is one.
                </p>

                <h4 className='fw-normal'>Safety Comparison Tool</h4>
                <p >
                  Our Machine Learning driven tool processes crime data got from law enforcement agencies and grades the data on 
                  safety rationg scale. This helps users know how relatively safe their preferred cities are.     
                </p>

                <h4 className='fw-normal'>Price comparison tool</h4>
                <p>
                  Our data driven tool gets from various apartment listing agencies and computes as a comparison a price saving if you prefer to live in  city compared to another. The accuracy in our results is 95 percent.
                </p>
                
                <h4 className='fw-normal'>Rewiews</h4>
                <p>
                  Apartment renters and frist hand, accurate and reliable information about various apartment communities. This invaluabble information would help you get living insights about apartment communities you can them navigate to these communities through our third party affiliates.
                </p>
              </div>
              <div className="col-md-5 px-5">
                <img src="assets/img/pexels-6758788.jpg" style={{borderRadius: 20}} className="img-fluid"  alt="" />
              </div>
              <div className="col"></div>
            </div>
          </div>
        </section>
     
      <Footer />
    </>
  )
}

export default About
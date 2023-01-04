import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from '../apis/axios';

function Home() {

  
  const [reviews, setReviews] = useState([]);
  
  async function getReviews(){
    try{
      const response = await axios.get("/reviews");
      
      const reviewsArr = [];
      // console.log(response.data.results);
      reviewsArr.push(...response.data.results);
      setReviews(reviewsArr);
      console.log(reviewsArr);
    }catch (err){
      console.log(err);
    }

  }

  useEffect(() => {
    getReviews();
   }, []);

  return (
    <>
      <Header />
      <Banner />
      
      <main id="main">
        <section id="csr">
          <div className="container" data-aos="fade-up">

            <h2 className='fw-light'>Explore Apartments</h2>

            <div className='row p-5'>

              <div className="col-md-3 rounded p-4" style={{backgroundColor: "#ce1212"}}>
                <h3 className='text-white fw-normal'><i className="bi bi-shield-plus"></i> Safety</h3>
                <p className='px-3 text-white'>Get and compare safety ratings of your preferred locations to rent from!</p>
                <button className='btn btn-sm btn-dark px-3 rounded-pill'>View More</button>
              </div>

              <div className="col"></div>
              
              <div className="col-md-3 rounded p-4" style={{backgroundColor: "#012f6c"}}>
                <h3 className='text-white fw-normal'><i className="bi bi-wallet2"></i> Savings</h3>
                <p className='px-3 text-white'>Compare locations and retrieve price savings from your preffered location. our results are 95% accurate!</p>
                <button className='btn btn-sm btn-light px-3 rounded-pill'>View More</button>
              </div>
              
              <div className="col"></div>

              <div className="col-md-3 rounded p-4" style={{backgroundColor: "#eeeeee"}}>
                <h3 className='text-danger fw-normal'><i className="bi bi-chat-text"></i> Reviews</h3>
                <p className='px-3'>Write reviews of apartment communities and gain insights on others!</p>
                <button className='btn btn-sm btn-danger px-3 rounded-pill'>View More</button>
              </div>

            </div>

          </div>
        </section>
        
        <section id="cheap" className="section-bg">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div className="col"></div>
              <div className="col-md-5 my-auto">
                <h2 className='fw-light'>Price Savings</h2>
                <p>
                  Smart rentics, Inc. gets data from various sources. It uses proprietary data-driven algorithms to compare apartment prices in different locations to provide a 95 percent accuracy in rent savings between the locations if there is one. <br/> This information would help you save money! Also, We'll provide links to our third-party vendors for you to choose specific apartments in the city or location that interests you. 
                </p>
              </div>
              <div className="col-md-5 px-5">
                <img src="assets/img/pexels-6492402.jpg" style={{borderRadius: 20}} className="img-fluid"  alt="" />
              </div>
              <div className="col"></div>
            </div>
          </div>
        </section>

        <section id="safe">
          <div className="container" data-aos="fade-up">
          <div className="row">
              <div className="col"></div>
              <div className="col-md-5 px-5">
                <img src="assets/img/pexels-life-matters-4614155.jpg" style={{borderRadius: 20}} className="img-fluid"  alt="" />
              </div>
              <div className="col-md-5 my-auto">
                <h2 className='fw-light'>Safety Ratings</h2>
                <p>
                 We gather data from law enforcement agencies and use machine learning techniques to grade the safety of the cities. This gives apartment renters peace of mind knowing the safety of a city as compared to others.
                </p>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </section>

        <section id="reviews" className="section-bg">
          <div className="container" data-aos="fade-up">
            <h2 className='fw-light'>Reviews</h2>
          </div>


    <Carousel showArrows={false} autoPlay={true} infiniteLoop={true} showThumbs={false} stopOnHover={true} showStatus={false}>
        
        {
          reviews.map((item) => {
          return (<>
            <div key="slide1">
              <section className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded">
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-8">
                      <div className="card">
                        <div className="card-body m-3">
                          <div className="row">
                            
                            <div className='col-md-4' >
                              <small>
                              <p className="fw-bold fs-5 mb-2"><strong>{ item.apartmentComplex.toUpperCase() }</strong></p>
                              <b>Beds</b> : {item.beds} <br />
                              <b>Baths</b> : {item.baths} <br />
                              <b>Price</b> : ${item.price}<br />
                              <b>Sqr. Feet</b> : {item.sqfeet} ft.
                              </small>
                            </div>
                            <div className="col">
                              <p className="text-muted fw-light mb-4">
                                { item.details }
                              </p>
                              <p className="fw-bold lead mb-2"><strong>{ item.city.toUpperCase() }</strong></p>
                              {/* <p className="fw-bold text-muted mb-0">{  }</p> */}
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
          </>)
        })
      }
        
        
    </Carousel>


        </section>

        </main>

      <Footer />
    </>
  )
}

export default Home;
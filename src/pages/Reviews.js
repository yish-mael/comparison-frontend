import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function Reviews() {
  return (
    <>
      <Header />

      <div className="container-fluid bg-shade px-5 py-4" style={{background: "url(/assets/img/pexels-6782581.jpg)", backgroundSize: "cover", backgroundPosition: "center"}}>

          <div className=" px-5 pt-5">
            <br />
            <br />
            <h2 className="pt-5 pb-5 text-white">Reviews</h2>
          </div>
      </div>

      <div className="container py-5">

        Reviews content
      </div>
     
      <Footer />
    </>
  )
}

export default Reviews
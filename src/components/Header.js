import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../apis/axios';
import useAuth from '../hooks/useAuth';

function Header() {

  const url = "/sign-out";
  const { auth, setAuth } = useAuth();

  async function logout(){
       
    try{
        // Axios API.
        const response = await axios.post(url, 
            JSON.stringify({}), 
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            //console.log(response.data);
            
            setAuth({});
            window.location.reload(true);
            
    }catch(e){
        console.error(e);
    }
    
}

// console.log(auth);

  return (
    <>
        <header className="header py-0 fixed-top d-flex align-items-center border-bottom">
            <div className="container d-flex align-items-center justify-content-between">

            <Link to="/" className="logo d-flex align-items-center me-auto me-lg-0">   
                <img src="assets/img/srlogo.png" alt="" />
                {/* <h3 className='text-dark'>Smart Rentics<span className='text-danger'>.</span></h3> */}
            </Link>

            <nav id="navbar" className="navbar ">
                <ul>
                  {/* <li><a href="#hero">Home</a></li>
                  <li><a href="#menu">Comparison</a></li> */}
                  {/* <li><a href="#events" className='fw-normal'>Listings</a></li> */}
                  <li><Link to="/about" className='fw-normal'>About Us</Link></li>
                  {/* <li><Link to="/reviews" className='fw-normal'>Reviews</Link></li> */}
                  {/* <li><a href="#contact">Contact</a></li> */}
                  

                  {
                    auth?.userId
                      ? ( <li className="dropdown">
                            <a className="nav-link dropdown-toggle fw-normal" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              My Account
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                              <li><a className="dropdown-item" href="#">Profile</a></li>
                              <li><hr className="dropdown-divider"/></li>
                              <li><Link className="dropdown-item"  onClick={logout} >Logout</Link></li>
                            </ul>
                          </li>)
                      : (<li className="dropdown">
                          <a className="nav-link dropdown-toggle fw-normal" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Sign In / Sign Up
                          </a>
                          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a data-bs-toggle="modal" onMouseOver={(e)=>{e.target.style.cursor='pointer'}} data-bs-target="#signup" className="dropdown-item">Create Account</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a data-bs-toggle="modal" onMouseOver={(e)=>{e.target.style.cursor='pointer'}} data-bs-target="#loginx" className="dropdown-item">Sign In</a></li>
                          </ul>
                        </li>)
                  }

                </ul>

            </nav>

            <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
            <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

            </div>
        </header>
    </>
  )
}

export default Header;
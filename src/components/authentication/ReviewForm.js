import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../apis/axios";
import AuthContext from "../../context/AuthProvider";

function ReviewForm(props) {
    const url = '/reviews';

    const [error, setError] = useState();
    const [success, setSuccess] = useState();  
    let [cities, setCities] = useState([]);

    const { setAuth } = useContext(AuthContext);

    const [submit, setSubmit] = useState("Submit");

    async function getCities()
    {
        try{
            
            const cityResponse = await fetch('https://smartrentics.com/api/cities');
            //const cityResponse = await fetch('http://localhost:5001/cities');
            const cityData = await cityResponse.json();
            // console.log(cityData);
            setCities(cityData);
        }catch(err){
            console.log(err);
        }
    }

    async function handleReviews(event){
        event.preventDefault();
        event.target.elements.submitBtn.disabled = true;
        setSubmit(<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</>)
        
        //console.log(event);
        const inputValues = {
            userId: event.target.elements.userId.value,
            city: event.target.elements.city.value,
            apartmentComplex: event.target.elements.apartmentInput.value,
            apartmentType: '',
            beds: event.target.elements.bedsInput.value,
            baths: event.target.elements.bathsInput.value,
            price: event.target.elements.priceInput.value,
            sqfeet: event.target.elements.sqftInput.value,
            details: event.target.elements.description.value,
            stars: '0',
            reviewType: 'apartment'
        }

        //console.log(inputValues)

        try{
            // Axios API.
            const response = await axios.post(url, 
            JSON.stringify(inputValues)
            , {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            });

            event.target.elements.submitBtn.disabled = false;
            setSubmit("Submit");

            // Print out responses
            setAuth(response?.data);

            setSuccess("Review successfull!")
            window.location.reload(false);
            
        }catch(e){
            event.target.elements.submitBtn.disabled = false;
            setSubmit("Submit");
            console.error(e);
            setError(e.response.data);
        }
    }

    useEffect(() => {
        getCities();
    }, []);


    return (
        <>
            <div className="modal fade" id="review" tabIndex="-1" aria-labelledby="review" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        
                        <div className="modal-body p-5 rounded-end shadow-sm">
                        
                            <div className="logo mt-2" align="center">
                                <a href="/"><img src={`${window.location.origin}/assets/img/srlogo.png`} width="100" alt="" /></a>
                            </div>
                            <form onSubmit={handleReviews}  className="py-5 px-3 pt-0">

                                <p className="pt-4 text-dark h4 text-center fw-bold">Review</p>
                                <p className="text-center text-dark fw-light">Kindly drop a review on your current apartment.</p>
                                <span className="text-danger small"><b>{error}</b></span>
                                <span className="text-success small"><b>{success}</b></span>

                                <div className="row">
                                    <div className="pb-4 col-md-12 ">
                                        <input type="hidden" defaultValue={props.cityName}/>
                                        <input type="hidden" name="userId" defaultValue={props.userId}/>
                                        <input type="text" name="apartmentInput" placeholder="Apartment Complex Name." className="form-control placeholder-text border-0 border-bottom" required />
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="pb-4 col-md-12 ">
                                        <select required className="form-control placeholder-text border-0 border-bottom"  name="city">
                                            <option value="">Select City</option>
                                            { cities.map((city, index)=>  (<option value={city} key={index}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>) ) }
                                        </select>
                                        
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="pb-4 col-md-6 ">
                                        <input type="text" name="bedsInput" placeholder="Beds" className="form-control placeholder-text border-0 border-bottom" required />
                                    </div>

                                    <div className="pb-4 col-md-6">
                                        <input type="text" name="bathsInput" placeholder="Baths" className="form-control placeholder-text border-0 border-bottom" required />
                                    </div>
                                </div>

                                <div className="row">

                                    <div className="pb-4 col-md-6 ">
                                        <input type="text" name="priceInput" placeholder="Price" className="form-control placeholder-text border-0 border-bottom" required />
                                    </div>

                                    <div className="pb-4 col-md-6">
                                        <input type="text" name="sqftInput" placeholder="Square Feet." className="form-control placeholder-text border-0 border-bottom" required />
                                    </div>

                                </div>


                                <div className="row">
                                    <div className="pb-4 col-md-12 ">
                                        <textarea name="description" placeholder="what do you like / dislike about your current apartment complex?" className="form-control placeholder-text border-0 border-bottom" id="" cols="30" rows="4" required></textarea>
                                    </div>
                                </div>

                                <div className="d-grid gap-2 col mx-auto">
                                    <button type="submit" name="submitBtn" className="btn btn-danger btn-lg rounded-pill"><span className="fw-normal fs-6">{submit}</span></button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
      
    )
}
  
export default ReviewForm;
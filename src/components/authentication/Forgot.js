import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../apis/axios";

function Forgot() {

    const url = '/forgot';

    const [emailError, setEmailError] = useState();
    const [success, setSuccess] = useState("");
    const [submit, setSubmit] = useState("Reset Password");
    const navigate = useNavigate();  

    async function handleForgotPassword(event){
        event.preventDefault();
        event.target.elements.submitBtn.disabled = true;
        setSubmit(<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</>)
        const inputValues = { email: event.target.elements.emailInput.value }; 
        try{
            // Axios API.
            const response = await axios.post(url, 
                JSON.stringify(inputValues), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                
                setEmailError("");
                event.target.elements.submitBtn.disabled = false;
                event.target.elements.emailInput.value = "";
                setSubmit("Continue");
                setSuccess(response?.data?.message);
                
            }catch(e){
                setSubmit("Continue");
                event.target.elements.submitBtn.disabled = false;
                if (e.response.data.error.hasOwnProperty("email")){
                    setEmailError(e.response.data.error.email);
                }else {
                    console.error(e);
                }   
        }
    }

    return (
        <>
            <div className="modal fade" id="fpwd" tabIndex="-1" aria-labelledby="fpwd" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        
                        <div className="modal-body p-5 rounded-end shadow-sm">
                                
                            <div className="logo mt-2" align="center">
                                <a href="/"><img src={`${window.location.origin}/assets/img/srlogo.png`} width="100" alt="" /></a>
                            </div>
                            <form onSubmit={handleForgotPassword} className="py-5 px-3 pt-0">

                                <p className="pt-4  text-dark h4 text-center fw-bold">Forgot password?</p>
                                <p className="text-center text-dark fw-light">No worries, we'll send you reset instructions.</p>
                                <span className="text-success small"><b>{success}</b></span>
                                
                                <div className="pb-4">
                                    <input type="email" name="emailInput" className="form-control placeholder-text border-0 border-bottom"  placeholder="Enter your email" required />
                                    <span className="text-danger small"><b>{emailError}</b></span>
                                </div>
                                
                                <div className="d-grid gap-2 col mx-auto">
                                    <button type="submit" name="submitBtn" className="btn btn-danger btn-lg rounded-pill"><span className="fw-normal fs-6 cursor" data-bs-toggle="modal" data-bs-target="#chkemail">{submit}</span></button>
                                </div>
                                <p className="text-secondary text-center pt-4 pb-0"> Back to <a data-bs-toggle="modal" data-bs-target="#loginx" align="right" className="text-danger" onMouseOver={(e)=>{e.target.style.cursor='pointer'}} onClick={() => { document.getElementById("fpwd").click(); }}>Login</a></p>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
  }
  
  export default Forgot;
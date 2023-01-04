import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../apis/axios";

const url = '/reset/';

function ChangePassword(){

    const params = useParams();
    const [error, setError] = useState();
    const [success, setSuccess] = useState("");
    const [submit, setSubmit] = useState("Submit");
    console.log(params.token);

    async function handleForgotPassword(event){
        event.preventDefault();
        event.target.elements.submitBtn.disabled = true;
        setSubmit(<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</>)
        const inputValues = { 
            password: event.target.elements.passwordInput.value,
            token: params?.token
         }; 
        try{
            // Axios API.
            const response = await axios.post(url+params?.token, 
                JSON.stringify(inputValues), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                
                console.log(response.data)
                setError("");
                event.target.elements.submitBtn.disabled = false;
                event.target.elements.passwordInput.value = "";
                event.target.elements.confirmPasswordInput.value = "";
                setSubmit("Submit")
                setSuccess(response?.data?.message);

                
            }catch(e){
            setSubmit("Submit");
            event.target.elements.submitBtn.disabled = false;
            if (e.response?.data?.error?.hasOwnProperty("token")){
                //console.log(e.response.data.error.token);
                setError(e.response.data.error.token);
            }else {
                console.error(e);
            }   
        }
    }

    return(
        <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                    <img src={`${window.location.origin}/assets/img/srlogo.png`} alt="logo" />
                </div>
                <h4>Change Password</h4>

                <br />
                <span className="text-success small"><b>{success}</b></span>
                <span className="text-danger small"><b>{error}</b></span>
                <form className="pt-3" onSubmit={handleForgotPassword}>

                    <div className="form-group">
                    <input type="password" 
                    className="form-control form-control-sm"
                    name="passwordInput" 
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}" 
                    placeholder="New Password" 
                    title="min: 8 characters, max: 24 characters, special character, uppercase character and number." 
                    required/>
                    </div>
                    <div className="form-group">
                    <input type="password" className="form-control form-control-sm" name="confirmPasswordInput" placeholder="Confirm New Password" required/>
                    </div>
                    <div className="mt-3">
                    <button type="submit" name="submitBtn" className="btn btn-block btn-danger btn-md font-weight-medium" >
                        {submit}
                    </button>
                    </div>
                    <div className="mt-4">
                        Back to <Link to="/login" className="text-danger">Login</Link>.
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
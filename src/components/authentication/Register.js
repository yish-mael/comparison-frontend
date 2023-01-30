import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../apis/axios";
import AuthContext from "../../context/AuthProvider";

function Register() {
    const url = '/sign-up';

    const [firstNameError, setFirstNameError] = useState();
    const [lastNameError, setLastNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [userNameError, setUserNameError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();  

    const [showPass, setShowPass] = useState(false);
    const [passIcon, setPassIcon] = useState("bi bi-eye-slash");
    const [passType, setPassType] = useState("password");

    function handlePassView(){
        if (showPass){
            setShowPass(false);
            setPassIcon("bi bi-eye-slash");
            setPassType("password");
        }else{
            setShowPass(true);
            setPassIcon("bi bi-eye");
            setPassType("text")
        }
    }
    

    const { setAuth } = useContext(AuthContext);

    const [submit, setSubmit] = useState("Sign Up");

    async function handleRegistration(event){
        event.preventDefault();
        event.target.elements.submitBtn.disabled = true;
        setSubmit(<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</>)
        
        const inputValues = {
            firstName: event.target.elements.firstNameInput.value,
            lastName: event.target.elements.lastNameInput.value,
            username: event.target.elements.userNameInput.value,
            email: event.target.elements.emailInput.value,
            userType: event.target.elements.userType.value,
            password: event.target.elements.passwordInput.value,
            confirmPassword: event.target.elements.confirmPasswordInput.value
        }

        //console.log(inputValues);
        // Input Validation 
        if(inputValues.password !== inputValues.confirmPassword) {
        //console.log("hello");
        event.target.elements.confirmPasswordInput.setCustomValidity("Passwords don't match");
        } else {
        event.target.elements.confirmPasswordInput.setCustomValidity('');
        }

        try{
            // Axios API.
            const response = await axios.post(url, 
            JSON.stringify({
                firstName: inputValues.firstName,
                lastName: inputValues.lastName,
                username: inputValues.username,
                email: inputValues.email,
                password: inputValues.password,
                stateId: inputValues.state,
                userType: inputValues.userType,
                status: "active"
            })
            , {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            });

            event.target.elements.submitBtn.disabled = false;
            setSubmit("Sign Up");

            // Print out responses
            setAuth(response?.data);

            setSuccess("Registration successfull!")
            window.location.reload(false);
            
        }catch(e){
            event.target.elements.submitBtn.disabled = false;
            setSubmit("Sign Up");
            if (e.response.data.error.hasOwnProperty("firstName")){
                setFirstNameError(e.response.data.error.firstName);
            }else if (e.response.data.error.hasOwnProperty("lastName")){
                setLastNameError(e.response.data.error.lastName);
            }else if (e.response.data.error.hasOwnProperty("username")){
                setUserNameError(e.response.data.error.username);
            }else if (e.response.data.error.hasOwnProperty("email")){
                setEmailError(e.response.data.error.email);
            }else if (e.response.data.error.hasOwnProperty("password")){
                setPasswordError(e.response.data.error.password);
            }else {
                console.error(e);
                setError(e.response.data);
            } 
        }
    }


    return (
        <>
            <div className="modal fade" id="signup" tabIndex="-1" aria-labelledby="signup" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        
                        <div className="modal-body p-5 rounded-end shadow-sm">
                        
                            <div className="logo mt-2" align="center">
                                <a href="/"><img src={`${window.location.origin}/assets/img/srlogo.png`} width="100" alt="" /></a>
                            </div>
                            <form onSubmit={handleRegistration}  className="py-5 px-3 pt-0" autoComplete="false">

                                <p className="pt-4 text-dark h4 text-center fw-bold">Create an account</p>
                                <p className="text-center text-dark fw-light">Let's get started</p>
                                <span className="text-danger small"><b>{error}</b></span>
                                <span className="text-success small"><b>{success}</b></span>


                                <div className="row">

                                    <div className="pb-4 col-md-6">
                                        <input type="text" 
                                        className="form-control placeholder-text border-0 border-bottom"  
                                        name="firstNameInput" 
                                        pattern="[a-zA-Z0-9]{3,30}" 
                                        title="min: 3 characters max: 30 characters." 
                                        placeholder="First Name" 
                                        required />
                                        <span className="text-danger small"><b>{firstNameError}</b></span>
                                    </div>
                                     
                                    <div className="pb-4 col-md-6">
                                        <input type="text" 
                                        className="form-control placeholder-text border-0 border-bottom"  
                                        name="lastNameInput" 
                                        pattern="[a-zA-Z0-9]{3,30}" 
                                        placeholder="Last Name" 
                                        title="min: 3 characters max: 30 characters." 
                                        required />
                                        <span className="text-danger small"><b>{lastNameError}</b></span>
                                    </div>

                                </div>

                                
                                <div className="row">

                                    <div className="pb-4 col-md-6">
                                        <input type="text" name="userNameInput" className="form-control placeholder-text border-0 border-bottom"  placeholder="Username" required />
                                        <span className="text-danger small"><b>{userNameError}</b></span>
                                    </div>

                                    <div className="pb-4 col-md-6">
                                        <input type="email" name="emailInput" className="form-control placeholder-text border-0 border-bottom"  placeholder="Email" required />
                                        <span className="text-danger small"><b>{emailError}</b></span>
                                    </div>

                                </div>


                                <div className="row">

                                    <div className="pb-4 col-md-6 ">
                                        <div class="input-group flex-nowrap">
                                            <input 
                                            type={passType} 
                                            name="passwordInput" 
                                            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}" 
                                            className="form-control placeholder-text border-0 border-bottom" 
                                            placeholder="Password" 
                                            required
                                            title="Minimum of 8 characters, upper and lowercase characters, numbers, and special symbols."
                                            />
                                            <span class="input-group-text bg-white border-top-0 border-end-0" onClick={()=>{ handlePassView() }} id="addon-wrapping"><i className={passIcon}></i></span>
                                            <span className="text-danger small"><b>{passwordError}</b></span>
                                        </div>

                                        {/* <input type="password" name="passwordInput" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}" placeholder="Password" title="min: 8 characters, max: 24 characters, special character, uppercase character and number."   className="form-control placeholder-text border-0 border-bottom" required />
                                        <span className="text-danger small"><b>{passwordError}</b></span> */}
                                    </div>

                                    <div className="pb-4 col-md-6">
                                        <input type={passType} name="confirmPasswordInput" placeholder="Confirm Password" className="form-control placeholder-text border-0 border-bottom" required />
                                    </div>

                                </div>

                                <div className="pb-4">
                                    <label htmlFor="">How would you describe yourself? </label>
                                    <select className="form-select" name="userType" required >
                                        <option value="renter">I'm an apartment renter.</option>
                                        <option value="landlord">I'm a landlord.</option>
                                        <option value="apartment-community">I'm an apartment community manager.</option>
                                        <option value="regular">Just looking through.</option>
                                    </select>
                                    {/* <span className="text-danger small"><b>{emailError}</b></span> */}
                                </div>
                                
                                <div className="mb-4">
                                    <div className="pl-4">
                                        <label className="form-check-label text-muted">
                                        <input type="checkbox" className="form-check-input" required/>
                                            &nbsp; I agree to all Terms & Conditions
                                        </label>
                                    </div>
                                </div>
                                
                                
                                <div className="d-grid gap-2 col mx-auto">
                                    <button type="submit" name="submitBtn" className="btn btn-danger btn-lg rounded-pill"><span className="fw-normal fs-6">{submit}</span></button>
                                    {/* <button type="submit" className="btn btn-outline-danger btn-lg rounded-pill fw-normal fs-6"><i className="fa fa-google"></i>&nbsp;&nbsp;Sign up with Google</button> */}
                                </div>
                
                                <p className="text-secondary text-center pt-4 pb-0"> Back to <a data-bs-toggle="modal" data-bs-target="#loginx" align="right" className="text-danger" onMouseOver={(e)=>{e.target.style.cursor='pointer'}} onClick={() => { document.getElementById("signup").click(); }}>Login</a></p>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
      
    )
}
  
export default Register;
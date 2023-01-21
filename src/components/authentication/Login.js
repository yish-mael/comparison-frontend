import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosPrivate } from "../../apis/axios";
import useAuth from "../../hooks/useAuth";

const url = '/sign-in';


function Login() {

    // variable declarations.
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    const navigate = useNavigate();  
    const location = useLocation();
    const from = location.state?.from?.pathname;
    const { setAuth } = useAuth();
    const [submit, setSubmit] = useState("Sign In");

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

    async function handleLogin(event){
        event.preventDefault();
        event.target.elements.submitBtn.disabled = true;
        setSubmit(<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</>)

        const inputValues = {
            username: event.target.elements.userNameInput.value,
            password: event.target.elements.passwordInput.value
        }

        try{
            // Axios API.
            const response = await axiosPrivate.post(url, 
                JSON.stringify(inputValues), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            event.target.elements.submitBtn.disabled = false;
            setEmailError("");
            setPasswordError("");
            setSubmit("Sign In");

            // Print Out Responses.
            // console.log(response?.data);

            // Set Authentication.
            setAuth(response?.data);

            // Redirect To Dashboard.
            navigate(from, { replace: true });

            document.getElementById("loginx").click();

        }catch(e){
            event.target.elements.submitBtn.disabled = false;
            setSubmit("Sign In");
            if (e?.response?.data?.error.hasOwnProperty("userName")){
                setEmailError(e.response.data.error.userName);
                setPasswordError("");
            }else if (e?.response?.data?.error.hasOwnProperty("password")){
                setEmailError("");
                setPasswordError(e?.response?.data?.error.password);
            }else if (e?.message == "Invalid user.") {
                setEmailError("User doesn't exist.")
            }else {
                // setEmailError();
                console.error(e?.message);
            }   
        }
    }

    return (
        <>
            <div className="modal fade" id="loginx" tabIndex="-1" aria-labelledby="loginx" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        
                        <div className="modal-body p-5 rounded-end shadow-sm">

                            <div className="logo mt-2" align="center">
                                <a href="/"><img src={`${window.location.origin}/assets/img/srlogo.png`} width="100" alt="" /></a>
                            </div>
                            <form onSubmit={handleLogin}  className="p-3 pt-0">

                                <p className="pt-4  text-dark h4 text-center fw-bold">Login</p>
                                <p className="text-center text-dark fw-light">Welcome back!</p>
                                
                                <div className="pb-4">
                                    <input type="text" name="userNameInput" className="form-control placeholder-text border-0 border-bottom"  placeholder="Email Address" required />
                                    <span className="text-danger small"><b>{emailError}</b></span>
                                </div>
                                <div className="pb-4">
                                    <div class="input-group flex-nowrap">
                                        <input type={passType} name="passwordInput"  className="form-control placeholder-text border-0 border-bottom" placeholder="Password" required />
                                        <span class="input-group-text bg-white border-top-0 border-end-0" onClick={()=>{ handlePassView() }} id="addon-wrapping"><i className={passIcon}></i></span>
                                        <span className="text-danger small"><b>{passwordError}</b></span>
                                    </div>
                                    {/* <input type="password" name="passwordInput"  className="form-control placeholder-text border-0 border-bottom" placeholder="Password" required /> */}
                                    {/* <span className="text-danger small"><b>{passwordError}</b></span> */}
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                                            <label className="form-check-label text-dark" htmlFor="rememberMe">Remember me</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <a data-bs-toggle="modal" data-bs-target="#fpwd" align="right" onMouseOver={(e)=>{e.target.style.cursor='pointer'}} onClick={() => { document.getElementById("loginx").click(); }}><p className="text-danger cursor">Forgot password?</p>
                                        </a>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 col mx-auto">
                                    <button type="submit" name="submitBtn" className="btn btn-danger btn-lg rounded-pill"><span className="fw-normal fs-6">{submit}</span></button>
                                    {/* <button type="submit" className="btn btn-danger btn-lg rounded-pill fw-normal fs-6"><i className="fa fa-google"></i>&nbsp;&nbsp;Sign in with Google</button> */}
                                </div>
                                <p className="text-secondary text-center pt-4 pb-0">Don't have an account? <a data-bs-toggle="modal"  onMouseOver={(e)=>{e.target.style.cursor='pointer'}} onClick={() => { document.getElementById("loginx").click(); }} data-bs-target="#signup" className="text-danger cursor">  Sign up</a></p>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
      
    )
}
export default Login;
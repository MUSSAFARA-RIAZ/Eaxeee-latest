import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';





import GreenPaleGray from "../../../src/Assets/Images/BlueAndBlack.png";
import RoyalBlue from "../../../src/Assets/Images/PaleGray.png";
import "./Login.css";

import LottieLoader from "../../../src/animation/LottieLoader"

function ForgetPasswordScreen() {
    const [username, setUsername] = useState('');
    
  
    const handleSubmit = async (e) => {
        e.preventDefault();

       
    };
    const navigate = useNavigate();
    const Resetpassword=async(e)=>{
        navigate('/newPassword')
    }

    return (
        <div className="login-container" >
            <div className="login-wrapper">
                <div className="login-imagecontainer">
                    <img className="login-img" src={RoyalBlue} alt="Login" loading="eager" />
                </div>
                <div className="login-form">

                    <img className='eaxee-logo' style={{position:"relative",top:"-10px"}} src={GreenPaleGray} alt="Eaxee Logo" loading="eager" />

                    <p className="login-subtitle">
                        <p className='login-heading' style={{fontSize:"30px", position:"relative",top:"-70px", fontFamily:"Lato"}}>
                            Forget Password
                        </p>
                        <p className='subheadtext'>
                            
                        </p>
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="login-input-group" >
                            <label htmlFor="username" className='label'>Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                style={{ outline: "2px solid rgba(206, 206, 206, 0.47)" }}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative", top: "30px" }}>
                            {/* approach-1 */}
                            {/* <div style={{ display: "flex", flexDirection:"column", gap: "10px", position: "relative", top: "160px" }}> */}
                            {/* approach-2 */}
                            {/* <div style={{ display: "flex", flexDirection:"column", gap: "10px", position: "relative", top: "100px" }}> */}
                            {/* approach-3 */}

                            <button type="submit" className="login-button" onClick={Resetpassword}>
                                Reset
                            </button>
                            <div className="login-forgot-password" style={{ position: "relative", left: "270px" }}>
                                <Link to="/login">Back to Login Page?</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgetPasswordScreen;

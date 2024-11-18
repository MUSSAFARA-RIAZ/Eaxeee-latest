import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Swal from 'sweetalert2';

import GreenPaleGray from "../../../src/Assets/Images/BlueAndBlack.png";
import RoyalBlue from "../../../src/Assets/Images/PaleGray.png";
import "./Login.css";

import LottieLoader from "../../../src/animation/LottieLoader"

function ResetPasswordScreen() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(true); // State to manage loading
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // Get the token from the URL
    const navigate = useNavigate();
    useEffect(() => {

        // console.log('====================================');
        // console.log("RoyalBlue");
        // console.log(RoyalBlue);

        // console.log('====================================');


        const loadResources = async () => {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            setLoading(false);
        };

        loadResources();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();


    };
    const BackToHome = async (e) => {


        navigate('/')
    };

    return (
        <>
            {loading ? (
                <>

                    <div className="loader-container" style={{ opacity: 1 }}>
                        <LottieLoader />
                    </div>
                    <div className="login-container" style={{ transition: "2s all ease", opacity: 0 }}>
                        <div className="login-wrapper">
                            <div className="login-imagecontainer" style={{ height: "500px" }}>
                                <img className="login-img" src={RoyalBlue} alt="Login" />
                            </div>
                            <div
                                className="login-form"
                                style={{ width: "441px", padding: "20px", display: "flex", justifyContent: "center" }}
                            >
                                <div style={{ width: "100%", height: "80px", display: "flex", justifyContent: "center" }}>
                                    <img style={{ width: "200px" }} src={GreenPaleGray} alt="Eaxee Logo" />
                                </div>

                                <div className="login-subtitle">
                                    <p className="login-heading">Reset Password</p>
                                </div>
                                <div >
                                <form onSubmit={handleSubmit}>
                                    <div className="login-input-group">
                                        <label htmlFor="newPassword" className="label">Enter new password</label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            value={newPassword}
                                            style={{ outline: "2px solid rgba(206, 206, 206, 0.47)" }}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="login-input-group">
                                        <label htmlFor="confirmPassword" className="label">Confirm new password</label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            style={{ outline: "2px solid rgba(206, 206, 206, 0.47)" }}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="login-button">
                                        Submit
                                    </button>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            ) : (

                <div className="login-container" style={{ transition: "2s all ease", opacity: 1 }}>
                    <div className="login-wrapper">
                        <div className="login-imagecontainer" style={{ height: "500px" }}>
                            <img className="login-img" src={RoyalBlue} alt="Login" />
                        </div>
                        <div
                            className="login-form"
                            style={{ width: "441px", padding: "20px", display: "flex", justifyContent: "center" }}
                        >
                            <div style={{ width: "100%", height: "80px", display: "flex", justifyContent: "center" }}>
                                <img style={{ width: "200px" }} src={GreenPaleGray} alt="Eaxee Logo" />
                            </div>

                            <div className="login-subtitle">
                                <p className="login-heading">Reset Password</p>
                                
                            </div>
                            <form onSubmit={handleSubmit} style={{position:"relative",top:"10px"}}>
                                <div className="login-input-group" style={{position:"relative",top:"10px"}}>
                                    <label htmlFor="newPassword" className="label"style={{position:"relative",top:"5px"}}>Enter new password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={newPassword}
                                        style={{ outline: "2px solid rgba(206, 206, 206, 0.47)" }}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="login-input-group" style={{position:"relative",top:"10px"}}>
                                    <label htmlFor="confirmPassword" className="label">Confirm new password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        style={{ outline: "2px solid rgba(206, 206, 206, 0.47)" }}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="login-button" style={{position:"relative",top:"70px"}} onClick={BackToHome}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}

export default ResetPasswordScreen;

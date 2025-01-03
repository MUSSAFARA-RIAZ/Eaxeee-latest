import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from '@mui/material';
import './Login.css';

import GreenPaleGray from "../../../src/Assets/Images/BlueAndBlack.png";
import RoyalBlue from "../../../src/Assets/Images/PaleGray.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LottieLoader from '../../animation/LottieLoader';
import Swal from 'sweetalert2';

import { Link, Navigate } from 'react-router-dom';
import { getRepositoriesByUsername } from '../../apis/auth';
import { checkIfUserExistOrNot } from '../../apis/auth';
import { loginUser } from '../../apis/auth';
function Login({ onSignIn }) {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [selectedOption, setSelectedOption] = useState('abc');
  const [isSignInDisabled, setIsSignInDisabled] = useState(false);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const loadResources = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setLoading(false);
    };

    loadResources();
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };



  const [isLoading, setIsLoading] = useState(false);

  const handleSignInClick = async (e) => {
    e.preventDefault();

    try {


      // Call API to get list of repositories when sign-in is clicked
      setIsSignInDisabled(true)
      setIsLoading(true);
      const res = await getRepositoriesByUsername(username);
      setIsSignInDisabled(false)

      // If the domain in username exist and have some repositories then it will list them
      if (res.code === 200) {
        setRepositories(res.data);
        setIsDialogOpen(true);
        console.log("list of repositories are: ", res);
      }  //Otherwise it will show message 'invalid domain'
      else {
        setIsLoading(true);
        Swal.fire({
          title: 'Invalid Domain',
          icon: 'error',
          confirmButtonText: 'OK',
          buttonsStyling: false, 
          customClass: {
            confirmButton: 'custom-ok-button' 
          }
        });
        // alert("Invalid domain");
      }
    } // If something else went wrong during this api call then this catch block will execute.

    catch (error) {
      setIsLoading(true);
      setIsSignInDisabled(false)
      console.error("Error during sign-in:", error);
      alert("Unknown error occured");
    }
  };





  const handleConfirm = async () => {

    // When user has selected a repository form a list and 'Confirm' button is clicked then this api will be called that check if the username & password exist in that repository
    const res = await checkIfUserExistOrNot(username, password, selectedOption);
    console.log("Response after selecting repository and confirming: ", res);

    // If correct credentials & correct repository was provided then it returns 200
    if (res.code === 200) {
      console.log("Provided credentials are correct: ", onSignIn)
      setIsDialogOpen(false); // Close the dialog box

      // When this api returns 200 then we'll call the final api that login the user & update the session for user on backend.
      const res_login = await loginUser(username, password, selectedOption)

      // If the api updates the session on backend successfully & user is logged in, 200 status code is returned and the onSignIn function is called that allows user to view rest of the view as logged in user.
      if (res_login.code === 200) {

        if (onSignIn) {
          onSignIn()
        }
        alert("user login successful")
        navigate('/home')

      }// Other wise it shows alert with the error message and user is shown no UI other than the login page.
      else if (res_login.code === 401) {
        alert(res_login.data.error)
      }

    } else if (res.code === 401) {
      alert(res.data.message);
    } else {
      alert("Something went wrong.");
    }
  };




  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsDialogOpen(true);
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
              <div className="login-imagecontainer">
                <img className="login-img" src={RoyalBlue} alt="Login" />
              </div>
              <div className="login-form">
                <img className='eaxee-logo' src={GreenPaleGray} alt="Eaxee Logo" />

                <p className="login-subtitle">
                  <p className='login-heading'>
                    Superadmin Login
                  </p>
                  <p className='subheadtext'>
                    Your key to multitenancy
                  </p>
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="login-input-group">
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
                  <div className="login-input-group">
                    <label htmlFor="password" className='label'>Password</label>
                    <div className="password-container" style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        style={{ outline: "2px solid rgba(206, 206, 206, 0.47)", paddingRight: '40px' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span
                        className="password-toggle-icon"
                        onClick={togglePasswordVisibility}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                        }}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </span>
                    </div>
                  </div>
                  <div className="login-forgot-password">
                    <Link to="/forgetpassword">Reset password?</Link>
                  </div>
                  <button type="submit" className="login-button" >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="login-container" style={{ opacity: 1 }}>
            <div className="login-wrapper">
              <div className="login-imagecontainer">
                <img className="login-img" src={RoyalBlue} alt="Login" />
              </div>
              <div className="login-form">
                <img className='eaxee-logo' src={GreenPaleGray} alt="Eaxee Logo" />
                <p className="login-subtitle">
                  <p className='login-heading'>Eaxee Login</p>
                  <p className='subheadtext'>Your key to multitenancy</p>
                </p>
                <form onSubmit={handleSignInClick}>
                  <div className="login-input-group">
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
                  <div className="login-input-group">
                    <label htmlFor="password" className='label'>Password</label>
                    <div className="password-container" style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        style={{ outline: "2px solid rgba(206, 206, 206, 0.47)", paddingRight: '40px' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span
                        className="password-toggle-icon"
                        onClick={togglePasswordVisibility}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                        }}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </span>
                    </div>
                  </div>
                  <div className="login-forgot-password">
                    <Link to="/forgetpassword">Reset password?</Link>
                  </div>
                  <Button
                    onClick={handleSignInClick}
                    variant="contained"
                    // disabled={isSignInDisabled || isLoading}
                    className="login-button"
                    sx={{padding:"10px", position:"relative",top:"10px"}}
                  >
                    {isLoading ? (
                      <>
                        <CircularProgress size={24} style={{ marginRight: 8, color: (isSignInDisabled || isLoading ? "white" : "red") }} />
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <Dialog
            open={isDialogOpen}
            onClose={handleDialogClose}
            PaperProps={{ sx: { width: '700px', maxWidth: '90%' } }}
          >
            <DialogTitle sx={{
              backgroundColor: "#2158a4",
              color: "#cecece",
              padding: "10px",
              paddingLeft: "35px",
            }}>
              Select Repository
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: "#cecece",
                }}
                onClick={handleDialogClose}

              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{
              backgroundColor: "#cecece",
              color: '#414849',
              padding: "20px",

            }}>
              <RadioGroup
                sx={{
                  position: "relative",
                  top: "20px", left: "10px"
                }}
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {repositories.map((repo) => (
                  <FormControlLabel
                    key={repo.repository_id}
                    value={repo.repository_id}
                    control={<Radio />}
                    label={repo.repository_name}
                  />
                ))}
              </RadioGroup>
            </DialogContent>
            <DialogActions sx={{
              backgroundColor: "#cecece",
              padding: "10px 20px",
            }}>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirm} color="primary" disabled={!selectedOption}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default Login;
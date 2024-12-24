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
  Alert,
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
  const [selectedOption, setSelectedOption] = useState('');
  const [disableConfirmButton, setDisableConfirmButton] = useState(false);
  const [isSignInDisabled, setIsSignInDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState('')



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
    setSelectedOption('')
  };



  const [isLoading, setIsLoading] = useState(false);

  const handleSignInClick = async (e) => {
    e.preventDefault();
    setError('');

    try {


      // Call API to get list of repositories when sign-in is clicked
      setIsSignInDisabled(true)
      setIsLoading(true);
      const res = await getRepositoriesByUsername(username);
      
      // If the domain in username exist and have some repositories then it will list them
      if (res.code === 200) {

        if (res.data.length === 1) {
          setRepositories(res.data)
          setSelectedOption(res.data[0].repository_id)
          const userExistOrNot = await checkIfUserExistOrNot(username, password, res.data[0].repository_id);
          if (userExistOrNot.code === 200){
            setLoading(true)
            const res_login = await loginUser(username, password, res.data[0].repository_id)

            if (res_login.code === 200) {

              if (onSignIn) {
                onSignIn()
              }

              navigate('/home')
      
            }
            else if (res_login.code === 401) {
      
              setError(res_login.data.error + "401-148")
            }
            setLoading(false)
          } else {
            setError(userExistOrNot.data.message + "401-148")
          }
          // console.log("selected_option_is: ",selectedOption)
          // console.log("The length of repositories is 1.");
          // You can perform additional actions here if needed
      } else if (res.data.length === 0){
        setError("Could not found any Repository...")
      }
        else{

          setRepositories(res.data);
          setIsDialogOpen(true);
          console.log("list of repositories are: ", res);
        }
      }  //Otherwise it will show message 'invalid domain'
      else {
        setIsLoading(true);
        
        if (res.code === 500){
          setError("Something went wrong")
        }
        else if (res.code === 404){
          setError("Domain not found")
        }
        // Swal.fire({
        //   title: 'Invalid Domain',
        //   icon: 'error',
        //   confirmButtonText: 'OK',
        //   buttonsStyling: false, 
        //   customClass: {
        //     confirmButton: 'custom-ok-button' 
        //   }
        // });
        // alert("Invalid domain");
      }
    } // If something else went wrong during this api call then this catch block will execute.

    catch (error) {
      // setIsLoading(true);
      
      console.error("Error during sign-in:", error);
      setError("Unknown error occured");
    }
    setIsLoading(false )
    setIsSignInDisabled(false)
  };





  const handleConfirm = async () => {

    setDisableConfirmButton(true)
    // When user has selected a repository form a list and 'Confirm' button is clicked then this api will be called that check if the username & password exist in that repository
    const res = await checkIfUserExistOrNot(username, password, selectedOption);
    console.log("Response after selecting repository and confirming: ", res);

    // If correct credentials & correct repository was provided then it returns 200
    if (res.code === 200) {
      console.log("Provided credentials are correct: ", onSignIn)
      setIsDialogOpen(false); // Close the dialog box
      
      // When this api returns 200 then we'll call the final api that login the user & update the session for user on backend.
      setLoading(true)
      const res_login = await loginUser(username, password, selectedOption)

      // If the api updates the session on backend successfully & user is logged in, 200 status code is returned and the onSignIn function is called that allows user to view rest of the view as logged in user.
      if (res_login.code === 200) {


        if (onSignIn) {
          onSignIn()
        }
        // alert("user login successful")
        
        navigate('/home')

      }// Other wise it shows alert with the error message and user is shown no UI other than the login page.
      else if (res_login.code === 401) {

        // Swal.fire({
        //   title: res_login.data.error,
        //   icon: 'error',
        //   confirmButtonText: 'OK',
        //   buttonsStyling: false, 
        //   customClass: {
        //     confirmButton: 'custom-ok-button' 
        //   }
        // });
        setError(res_login.data.error + "401-148")
      }
      setLoading(false)
    } else if (res.code === 401) {
      setError(res.data.message + "401-152");
       // Close the dialog box
      // Swal.fire({
      //     title: res.data.message,
      //     icon: 'error',
      //     confirmButtonText: 'OK',
      //     buttonsStyling: false, 
      //     customClass: {
      //       confirmButton: 'custom-ok-button' 
      //     }
      //   });
    } else {
      console.log("Something went wrong, please try later.")
      setIsDialogOpen(false); // Close the dialog box
      // Swal.fire({
      //   title: "Something went wrong, please try later.",
      //   icon: 'error',
      //   confirmButtonText: 'OK',
      //   buttonsStyling: false, 
      //   customClass: {
      //     confirmButton: 'custom-ok-button' 
      //   }
      // });
    }
    setIsDialogOpen(false);
    setDisableConfirmButton(false)
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
                  Enterprise architecture-based digital transformation made efficient and effective.
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
                  {/* <p className='login-heading'>Eaxee Login</p> */}
                  <p className='subheadtext'>Enterprise architecture-based digital transformation made efficient and effective.</p>
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
                  {error &&
                  <Alert
                    sx={{
                      // opacity: 1,
                      
                      padding: '1px 5px',      // Reduce padding for smaller height
                      fontSize: '12px',         // Adjust font size for a compact look
                      lineHeight:0.3,          // Fine-tune line spacing
                      borderRadius: '4px',      // Match the compact height with smaller corners
                      alignItems: 'center',     // Ensure content is vertically centered
                      '.MuiAlert-icon': {
                        fontSize: '20px',       // Scale down the icon size
                      }
                    }}
                    severity="error"
                  >
                  {error}
                  </Alert>

                  }

                  <div className="login-forgot-password">
                    <Link to="/forgetpassword">Reset password?</Link>
                  </div>
                  <Button
                    onClick={handleSignInClick}
                    variant="contained"
                    disabled={isSignInDisabled || isLoading}
                    className="login-button"
                    sx={{ padding: "10px", position: "relative", top: "10px" }}
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
              <Button onClick={handleConfirm} color="primary" disabled={!selectedOption || disableConfirmButton}>
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
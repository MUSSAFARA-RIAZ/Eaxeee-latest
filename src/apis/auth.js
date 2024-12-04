"use client";
import { S_URL } from "../config";
import axios from "axios";
import { useNavigate } from 'react-router-dom'


const _headers = {
  "Content-Type": "application/json",
  
};




  export const getRepositoriesByUsername = async (username) => {
    try {
        const response = await axios.post(
            
            `${S_URL}/rest/getUserRepositories`,
            
            { 
              username 
            },
            
        );

        console.log("Repositories fetched successfully:", response.data);

        // Return the data or set it to state as needed
        return { code: response.status, data: response.data };
    } catch (error) {
        console.error("Failed to fetch repositories:", error);

        // Handle and return the error
        return {
            code: error.response?.status || 502,
            data: error.response?.data || "Unknown error occurred",
        };
    }
};


export const checkIfUserExistOrNot = async (username, password, repositoryId) => {
  try {
    const url = `${S_URL}/rest/checkUserExistOrNot`;

    const payload = {
      username,
      password,
      repositoryId,
    };

    const headers = _headers

    // Make the API call
    const response = await axios.post(url, payload, { headers,withCredentials: true });

    console.log("Response from API:", response.data);

    // Return the response in a structured format
    return {
      code: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error("Error checking user existence:", error);

    // Return error details
    return {
      code: error.response?.status || 502,
      data: error.response?.data || "Unknown error occurred",
    };
  }
};



export const loginUser = async (username, password, repositoryId) => {
  try {
    const url = `${S_URL}/rest/loginUser`;

    const payload = {
      username,
      password,
      repositoryId,
    };

    const headers = _headers;

    // Make the API call with credentials enabled
    const response = await axios.post(url, payload, { headers, withCredentials: true });

    console.log("Login successful:", response.data);

    //Store the session id in session storage.
    if (response.status === 200){
      sessionStorage.setItem("isUserLoggedIn",true)
    }
    // Return the response in a structured format
    return {
      code: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error("Login failed:", error);  

    // Handle and return the error
    return {
      code: error.response?.status || 502,
      data: error.response?.data || "Unknown error occurred",
    };
  }
};



export const logoutUser = async () => {

    console.log("calling logout user")
  try {
    const url = `${S_URL}/rest/logout`;


    // Now make the API call for logout with withCredentials
    const response = await axios.post(url, {}, { withCredentials: true });

    console.log("response is: ", response);
    console.log("Logout successful:", response.data);

    
    if (response.status === 200){
      sessionStorage.removeItem('isUserLoggedIn');
      alert("logout was successfull")
      window.location.href = '/login'

      // window.location.reload()
      

    }
    else if (response.status === 400){
      console.log("inside anotehr bracket")
    }
    // Return the response in a structured format

    // sessionStorage.removeItem('isUserLoggedIn');
    // window.location.reload()

    return {
      code: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("I am in catch")
    

    return {
      code: error.response?.status || 502,
      data: error.response?.data || "Unknown error occurred",
    };
  }
};
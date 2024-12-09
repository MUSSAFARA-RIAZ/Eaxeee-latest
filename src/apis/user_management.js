
"use client";
import { S_URL } from "../config";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import {handleSessionExpiration} from './general_utils'
const _headers = {
    "Content-Type": "application/json",
    
  };




 


  export const getUsersList = async () => {
    try {
      const url = `${S_URL}/rest/getUsers`;
  
      const headers = _headers; // Assuming _headers is pre-defined and contains necessary headers
  
      // Make the API call
      const response = await axios.get(url, { headers, withCredentials: true });
  
    //   console.log("Response from API:", response.data);
  
      // Return the response in a structured format
      return {
        code: response.status,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      handleSessionExpiration(error.response?.status || 500);
      console.log("returning...")
      // Return error details
      return {
        code: error.response?.status || 502,
        data: error.response?.data || "Unknown error occurred",
      };
    }
  };




  export const addUser = async (userPayload) => {
    try {
        const url = `${S_URL}/rest/addUser`;

        const headers = _headers; // Assuming _headers is pre-defined and contains necessary headers

        // Make the API call
        const response = await axios.post(url, userPayload, { headers, withCredentials: true });

        // Return the response in a structured format
        return {
            code: response.status,
            data: response.data // Assuming the success message is in response.data.message
        };
    } catch (error) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data.error || "Unknown error occurred";

        // Handle session expiration
        handleSessionExpiration(statusCode);

        // Return error details
        return {
            code: statusCode,
            error: errorMessage,
        };
    }
};


export const activateDeactivateUsers = async (payload) => {
  try {
      const url = `${S_URL}/rest/updateUserStatuses`;

      const headers = _headers; // Assuming _headers is pre-defined and contains necessary headers

      // Make the API call
      const response = await axios.post(url, payload, { headers, withCredentials: true });

      // Return the response in a structured format
      return {
          code: response.status,
          data: response.data // Assuming the success message is in response.data.message
      };
  } catch (error) {
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.data?.error || "Unknown error occurred";

      // Handle session expiration
      handleSessionExpiration(statusCode);

      // Return error details
      return {
          code: statusCode,
          error: errorMessage,
      };
  }
};


export const removeUsers = async (payload) => {
  try {
      const url = `${S_URL}/rest/removeUsers`;

      const headers = _headers; // Assuming _headers is pre-defined and contains necessary headers

      // Make the API call
      const response = await axios.post(url, payload, { headers, withCredentials: true });

      // Return the response in a structured format
      return {
          code: response.status,
          data: response.data // Assuming the success message is in response.data.message
      };
  } catch (error) {
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.data?.error || "Unknown error occurred";

      // Handle session expiration
      handleSessionExpiration(statusCode);
      
      // Return error details
      return {
          code: statusCode,
          error: errorMessage,
      };
  }
};


export const changeUserPassword = async (username) => {
  try {
      const url = `${S_URL}/rest/updateUserPassword`;

      const headers = _headers; // Assuming _headers is pre-defined and contains necessary headers

      const payload = { "username": username}
      // Make the API call
      const response = await axios.post(url, payload, { headers, withCredentials: true });

      // Return the response in a structured format
      return {
          code: response.status,
          data: response.data // Assuming the success message is in response.data.message
      };
  } catch (error) {
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.data?.error || "Unknown error occurred";

      // Handle session expiration
      handleSessionExpiration(statusCode);
      
      // Return error details
      return {
          code: statusCode,
          error: errorMessage,
      };
  }
};


export const getListofUsers = async () => {
  try {
      const url = `${S_URL}/rest/getActiveUserNames`;

      const headers = _headers; // Assuming _headers is pre-defined and contains necessary headers

      
      // Make the API call
      const response = await axios.get(url, { headers, withCredentials: true });

      // Return the response in a structured format
      return {
          code: response.status,
          data: response.data // Assuming the success message is in response.data.message
      };
  } catch (error) {
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.data?.error || "Unknown error occurred";

      // Handle session expiration
      handleSessionExpiration(statusCode);
      
      // Return error details
      return {
          code: statusCode,
          error: errorMessage,
      };
  }
};


















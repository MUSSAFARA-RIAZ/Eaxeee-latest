
"use client";
import { S_URL } from "../config";
import axios from "axios";
import {handleSessionExpiration} from './general_utils'
const _headers = {
    "Content-Type": "application/json",
    
  };




 



export const getElementNames = async () => {
  try {
      const url = `${S_URL}/rest/getElementNames`;

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


export const exportTemplate = async (selectedSheets) => {
    try {
      const url = `${S_URL}/rest/downloadOnlyTemplate`;
  
      const headers = _headers; // Assuming _headers is pre-defined and contains necessary headers
  
      const payload = {
        sheetNames: selectedSheets,
      };
  
      // Make the API call to get the file
      const response = await axios.post(url, payload, {
        headers,
        withCredentials: true,
        responseType: 'blob', // Expect the response as a Blob
      });
  
      // Return the raw response for further handling
      return {
        code: response.status,
        data: response.data, // The Blob data
        headers: response.headers, // Headers may contain filename
      };
    } catch (error) {
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.data?.error || 'Unknown error occurred';
  
      // Handle session expiration
      handleSessionExpiration(statusCode);
  
      // Return error details
      return {
        code: statusCode,
        error: errorMessage,
      };
    }
  };





export const getAllRepositories = async () => {
  try {
      const url = `${S_URL}/rest/getAllRepositories`;

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











"use client";
import { S_URL } from "../config";
import axios from "axios";



  export const getRepositoriesByUsername = async (username) => {
    try {
        const response = await axios.post(
            
            `${S_URL}/EAZeeRest/rest/getUserRepositories`,
            
            { 
              username 
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },withCredentials: true
            }
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
    const url = `${S_URL}/EAZeeRest/rest/checkUserExistOrNot`;

    const payload = {
      username,
      password,
      repositoryId,
    };

    const headers = {
      "Content-Type": "application/json",
    };

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
    const url = `${S_URL}/EAZeeRest/rest/loginUser`;

    const payload = {
      username,
      password,
      repositoryId,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    // Make the API call with credentials enabled
    const response = await axios.post(url, payload, { headers, withCredentials: true });

    console.log("Login successful:", response.data);

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
  try {
    const url = `${S_URL}/EAZeeRest/logout`;

    const headers = {
      "Content-Type": "application/json",
      // Include credentials (cookies) for authentication
      withCredentials: true,
    };

    // Make the API call for logout
    const response = await axios.post(url, {}, { headers, withCredentials: true });

    console.log("Logout successful:", response.data);

    // Return the response in a structured format
    return {
      code: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error("Logout failed:", error);

    // Handle and return the error
    return {
      code: error.response?.status || 502,
      data: error.response?.data || "Unknown error occurred",
    };
  }
};

"use client";
import { S_URL } from "../config";
import axios from "axios";


// export const LoginUser = async (username, password) => {
//     try {
//       const response = await axios.post(
//         `${S_URL}/auth/login`,
//         {
//           username: "emilys",
//           password: "emilyspass",
//           expiresInMins: 30 // optional, defaults to 60
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           withCredentials: true // Include cookies in the request
//         }
//       );
  
//       console.log("The incoming response is: ", response.data);
  
//       // Return response data
//       return { code: response.status, data: response.data };
//     } catch (error) {
//       console.error("Error during login:", error);
  
//       // Handle and return error response
//       return {
//         code: error.response?.status || 502,
//         data: error.response?.data || "Unknown error occurred"
//       };
//     }
//   };


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
"use client";
import { S_URL } from "../config";
import axios from "axios";


export const LoginUser = async (username, password) => {
    try {
      const response = await axios.post(
        `${S_URL}/auth/login`,
        {
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 30 // optional, defaults to 60
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true // Include cookies in the request
        }
      );
  
      console.log("The incoming response is: ", response.data);
  
      // Return response data
      return { code: response.status, data: response.data };
    } catch (error) {
      console.error("Error during login:", error);
  
      // Handle and return error response
      return {
        code: error.response?.status || 502,
        data: error.response?.data || "Unknown error occurred"
      };
    }
  };
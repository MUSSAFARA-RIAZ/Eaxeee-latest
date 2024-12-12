
"use client";
import { S_URL } from "../config";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import {handleSessionExpiration} from './general_utils'
const _headers = {
    "Content-Type": "application/json",
    
  };



  export const getAvailableNamedLicenses = async () => {
    try {
        const url = `${S_URL}/rest/getAvailableNamedLicenses`;

        const headers = _headers;

        const response = await axios.get(url, { headers, withCredentials: true });

        return {
            code: response.status,
            data: response.data,
        };
    } catch (error) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.message || "Unknown error occurred";

        handleSessionExpiration(statusCode);

        return {
            code: statusCode,
            error: errorMessage,
        };
    }
};


export const getAllocatedNamedLicenses = async () => {
    try {
        const url = `${S_URL}/rest/getAllocatedNamedLicenses`;

        const headers = _headers;

        const response = await axios.get(url, { headers, withCredentials: true });

        return {
            code: response.status,
            data: response.data,
        };
    } catch (error) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.message || "Unknown error occurred";

        handleSessionExpiration(statusCode);

        return {
            code: statusCode,
            error: errorMessage,
        };
    }
};


export const allocateNamedLicense = async (licenseId, username) => {
    try {
        const url = `${S_URL}/rest/allocateNamedLicense`;

        const headers = _headers;

        // Constructing the payload within the function
        const payload = {
            license_id: licenseId,
            username: username,
        };

        const response = await axios.post(url, payload, { headers, withCredentials: true });

        return {
            code: response.status,
            data: response.data,
        };
    } catch (error) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.error || "Unknown error occurred";

        handleSessionExpiration(statusCode);

        return {
            code: statusCode,
            error: errorMessage,
        };
    }
};



export const deAllocateNamedLicense = async (licenseId, username) => {
    try {
        const url = `${S_URL}/rest/deAllocateNamedLicense`;

        const headers = _headers;

        // Constructing the payload within the function
        const payload = {
            license_id: licenseId,
            username: username,
        };

        const response = await axios.post(url, payload, { headers, withCredentials: true });

        return {
            code: response.status,
            data: response.data,
        };
    } catch (error) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.error || "Unknown error occurred";

        handleSessionExpiration(statusCode);

        return {
            code: statusCode,
            error: errorMessage,
        };
    }
};





export const createPool = async (poolName, poolType) => {
    try {
        const url = `${S_URL}/rest/createPool`;

        const headers = _headers;

        // Constructing the payload within the function
        const payload = {
            poolName: poolName,
            poolType: poolType,
        };

        const response = await axios.post(url, payload, { headers, withCredentials: true });

        return {
            code: response.status,
            data: response.data,
        };
    } catch (error) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.error || "Unknown error occurred";

        handleSessionExpiration(statusCode);

        return {
            code: statusCode,
            error: errorMessage,
        };
    }
};














"use client";

export const handleSessionExpiration = (statusCode) => {
    if (statusCode === 401) {
        console.log("session expired...")
        // Perform session handling, like redirecting to login
        alert("Your session has expired. Please log in again.");
        window.location.href = "/login"; // Adjust the URL to your login page
    }
};
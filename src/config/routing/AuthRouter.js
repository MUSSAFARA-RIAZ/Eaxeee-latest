import React from "react";
import { Routes, Route ,Navigate } from "react-router-dom";
import Login from "../../views/Login/Login";
import ResetPasswordScreen from "../../views/Login/ResetPasswordScreen";
import ForgetPasswordScreen from "../../views/Login/ForgetPasswordScreen";

function OtherRouter({ onSignIn }) {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onSignIn={onSignIn} />}
      />
      
            <Route path="/forgetpassword" element={<ForgetPasswordScreen />} />
            <Route path="/newPassword" element={<ResetPasswordScreen />} />
     
    </Routes>
  );
}

export default OtherRouter;

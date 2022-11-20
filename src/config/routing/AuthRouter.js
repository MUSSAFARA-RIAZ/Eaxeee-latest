import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../../views/Login/Login";

function OtherRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default OtherRouter;
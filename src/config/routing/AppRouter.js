import React from "react";

import { Routes, Route } from "react-router-dom";
import Home from "../../views/Home/Home"
import Enterprise from "../../views/Enterprise/Enterprise";
import Admin from "../../views/Admin/Admin";
import Impex from "../../views/Impex/Impex"
import OrganizationPortal from "../../views/OrganizationalPortal/OrganizationalPortal"
import Profile from "../../views/Profile/Profile"
import ResetPasswordScreen from "../../views/Login/ResetPasswordScreen";
import Metamodel from "../../views/MetaModeller/Metamodel";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/impex" element={<Impex />} />
      <Route path="/enterprise" element={<Enterprise />} />

      <Route path="/organizational-portal" element={<OrganizationPortal />} />
      <Route path="/metamodel" element={<Metamodel/>}/>
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default AppRouter;
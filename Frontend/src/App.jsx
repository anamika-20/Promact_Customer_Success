import React from "react";
import Layout from "./Layout";
import Login from "./components/user/Login.jsx";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/routing/ProtectedRoute.jsx";
import Home from "./components/dashboard/Home.jsx";
import Project from "./components/project/Project.jsx";
import CreateProject from "./components/project/CreateProject.jsx";
import CreateUser from "./components/user/CreateUser.jsx";
import UpdateUserPassword from "./components/user/UpdateUserPassword.jsx";

// Main component defining the application routes
const App = () => {
  return (
    <Routes>
      {/* Route for login page */}
      <Route path="/login" element={<Login />}></Route>

      <Route path="/createUserLogin/?" element={<UpdateUserPassword />}></Route>
      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute />}>
        {/* Layout component containing navigation */}
        <Route path="/" element={<Layout />}>
          {/* Route for home page */}
          <Route path="/" element={<Home />}></Route>
          {/* Route for adding a new project */}
          <Route path="/addProject" element={<CreateProject />}></Route>
          {/* Route for adding a new user */}
          <Route path="/addUser" element={<CreateUser />}></Route>
          {/* Route for displaying project details */}
          <Route path="/project/:id" element={<Project />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

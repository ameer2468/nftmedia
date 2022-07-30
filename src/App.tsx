import React from "react";
import "./assets/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Topbar from "./components/home/topbar";
import Sidebar from "./components/home/sidebar";
import "tippy.js/dist/tippy.css";
import Latest from "./pages/latest";
import MobileMenu from "./components/global/mobile-menu";
import Signup from "./pages/signup";
import Login from "./pages/login";

function App() {
  const appRoutes = ["/home", "/latest", "/messages", "/settings", "/profile"];
  const checkLocation = appRoutes.includes(window.location.pathname);
  return (
    <BrowserRouter>
      {checkLocation ? (
        <div>
          <Topbar />
          <Sidebar />
          <MobileMenu />
        </div>
      ) : (
        ""
      )}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

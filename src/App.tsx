import React from "react";
import "./assets/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Topbar from "./components/browsing/topbar";
import Sidebar from "./components/browsing/sidebar";
import "tippy.js/dist/tippy.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Topbar />
        <Sidebar />
      </div>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import "./assets/index.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Topbar from "./components/home/topbar";
import Sidebar from "./components/home/sidebar";
import "tippy.js/dist/tippy.css";
import Latest from "./pages/latest";
import MobileMenu from "./components/global/mobile-menu";
import Signup from "./pages/signup";
import Login from "./pages/login";
import { MetaMaskProvider } from "metamask-react";
import { useCheckUser } from "./hooks/useCheckUser";
import { UserProvider } from "./context/UserContext";

function App() {
  const appRoutes = ["/home", "/latest", "/messages", "/settings", "/profile"];
  const { user } = useCheckUser();
  const checkRoute = (path: string) => {
    return appRoutes.includes(path);
  };

  return (
    <MetaMaskProvider>
      <UserProvider value={user}>
        {checkRoute(useLocation().pathname) ? (
          <>
            <Topbar />
            <Sidebar />
            <MobileMenu />
          </>
        ) : null}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </MetaMaskProvider>
  );
}

export default App;

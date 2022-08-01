import React, { useMemo, useState } from "react";
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
import { ModalContext } from "./context/ModalContext";
import ModalManager from "./components/global/ModalManager";
import { ModalID } from "./types/modals";

function App() {
  const appRoutes = ["/home", "/latest", "/messages", "/settings", "/profile"];
  const [modalId, setModalId] = useState<keyof ModalID | null>(null);
  const checkRoute = (path: string) => {
    return appRoutes.includes(path);
  };
  const { user, setUser } = useCheckUser();
  useMemo(() => {
    if (user && user.display_name === null) {
      setModalId("display_name");
    }
  }, [user]);

  return (
    <MetaMaskProvider>
      <UserProvider value={{ user, setUser }}>
        <ModalContext.Provider value={{ modalId, setModalId }}>
          <ModalManager />
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
        </ModalContext.Provider>
      </UserProvider>
    </MetaMaskProvider>
  );
}

export default App;

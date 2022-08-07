import React, { useMemo, useState } from "react";
import "./assets/index.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Topbar from "./components/home/topbar";
import Sidebar from "./components/home/sidebar";
import "tippy.js/dist/tippy.css";
import Latest from "./pages/latest";
import MobileMenu from "./components/global/mobile-menu";
import Login from "./pages/login";
import { MetaMaskProvider } from "metamask-react";
import { useCheckUser } from "./hooks/useCheckUser";
import { UserProvider } from "./context/UserContext";
import { ModalContext } from "./context/ModalContext";
import ModalManager from "./components/global/ModalManager";
import { ModalID } from "./types/modals";
import Settings from "./pages/settings";
import Post from "./pages/post";
import New from "./pages/new";

function App() {
  const appRoutes = [
    "/home",
    "/latest",
    "/messages",
    "/settings",
    "/profile",
    "/new",
    `/post/${useLocation().pathname.split("/")[2]}`,
  ];
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

  const authedRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/post/:id", element: <Post /> },
    { path: "/latest", element: <Latest /> },
    { path: "/settings", element: <Settings /> },
    { path: "/new", element: <New /> },
  ];
  const guestRoutes = [{ path: "/login", element: <Login /> }];

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
            {user === null
              ? guestRoutes.map((route, index: number) => (
                  <Route
                    key={index.toString()}
                    path={route.path}
                    element={route.element}
                  />
                ))
              : authedRoutes.map((route, index: number) => (
                  <Route
                    key={index.toString()}
                    path={route.path}
                    element={route.element}
                  />
                ))}
          </Routes>
        </ModalContext.Provider>
      </UserProvider>
    </MetaMaskProvider>
  );
}

export default App;

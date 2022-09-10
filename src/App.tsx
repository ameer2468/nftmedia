import React, { useMemo, useState } from "react";
import "./assets/index.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Topbar from "./components/home/topbar";
import Sidebar from "./components/home/sidebar";
import "tippy.js/dist/tippy.css";
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
import { useScrollTop } from "./hooks/useScrollTop";
import Profile from "./pages/profile";
import { useCheckSession } from "./hooks/useCheckSession";
import Messages from "./pages/messages";
import { ChatsContext } from "./context/ChatsContext";
import { useChat } from "./hooks/useChat";

function App() {
  const appRoutes = [
    "/home",
    "/messages",
    "/settings",
    "/profile",
    "/new",
    "/messages",
    `/post/${useLocation().pathname.split("/")[2]}`,
    `/profile/${useLocation().pathname.split("/")[2]}`,
  ];
  const [modalId, setModalId] = useState<keyof ModalID | null>(null);
  const checkRoute = (path: string) => {
    return appRoutes.includes(path);
  };
  const { user, setUser } = useCheckUser();
  const {chats, setChats} = useChat();
  useMemo(() => {
    if (user && user.display_name === null) {
      setModalId("display_name");
    }
  }, [user]);

  const authedRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/post/:id", element: <Post /> },
    { path: "/profile/:id", element: <Profile /> },
    { path: "/settings", element: <Settings /> },
    { path: "/new", element: <New /> },
    { path: "/messages", element: <Messages /> },
  ];
  const guestRoutes = [{ path: "/login", element: <Login /> }];
  useScrollTop();
  useCheckSession();

  return (
    <MetaMaskProvider>
      <UserProvider value={{ user, setUser }}>
        <ModalContext.Provider value={{ modalId, setModalId }}>
          <ChatsContext.Provider value={{ chats, setChats }}>
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
          </ChatsContext.Provider>
        </ModalContext.Provider>
      </UserProvider>
    </MetaMaskProvider>
  );
}

export default App;

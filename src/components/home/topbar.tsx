import React, { useContext, useRef } from "react";
import Searchbox from "../global/searchbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBell } from "@fortawesome/free-solid-svg-icons";
import HiddenMenu from "../global/hidden-menu";
import { useLogin } from "../../hooks/useLogin";
import { UserContext } from "../../context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import { useNavigate } from "react-router-dom";
import { AvatarMemo } from "../global/avatar";
import Notifications from "../global/notifications/notifications";

const Topbar = () => {
  const { logout } = useLogin();
  const { user } = useContext(UserContext);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();
  const [notificationToggle, setNotificationToggle] = useDetectOutsideClick(
    notifRef,
    false
  );
  const [active, setActive] = useDetectOutsideClick(dropdownRef, false);
  const clickHandler = () => {
    setActive(!active);
  };
  return (
    <div
      className="topbar z-50  w-full gap-5 h-24 px-0 fixed right-0 top-0
     flex items-center lg:gap-0 lg:pl-20 lg:pr-28 lg:justify-between"
    >
      <div className="flex items-center w-full px-6 justify-between">
        <div className="hidden lg:block">
          <Searchbox />
        </div>
        <HiddenMenu />
        <div
          ref={dropdownRef}
          className="flex gap-10 items-center relative cursor-pointer"
        >
          <div
            onClick={() => setActive(!active)}
            className="flex gap-3 items-center"
          >
            {user?.avatar_image_url === null ? (
              <AvatarMemo className="w-10" />
            ) : (
              <img
                src={user?.avatar_image_url + "?v=" + Date.now()}
                alt="user"
                onError={() => ""}
                className="w-8 h-8 rounded-full"
              />
            )}
            <p>{user?.display_name || "NA"}</p>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <div
            ref={notifRef}
            onClick={() => {
              setNotificationToggle(!notificationToggle);
              setActive(false);
            }}
          >
            <FontAwesomeIcon
              className="text-2xl transition-all duration-200 hover:opacity-50 cursor-pointer"
              icon={faBell}
            />
            {notificationToggle && <Notifications />}
          </div>
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bg-black text-white text-sm text-justify rounded w-36 h-auto p-3 top-[60px]"
              >
                <ul className="flex flex-col gap-1.5">
                  <li
                    onClick={() => {
                      clickHandler();
                      navigate(`/profile/${user?.id}`, { replace: true });
                    }}
                    className="flex gap-2 transition-all duration-200 items-center justify-center hover:opacity-50 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    Profile
                  </li>
                  <li
                    onClick={() => logout(user?.id as number)}
                    className="flex gap-2 transition-all duration-200 items-center justify-center hover:opacity-50 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faSignOut} />
                    Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

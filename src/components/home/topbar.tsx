import React, { useContext, useState } from "react";
import Searchbox from "../global/searchbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBell } from "@fortawesome/free-solid-svg-icons";
import HiddenMenu from "../global/hidden-menu";
import { useLogin } from "../../hooks/useLogin";
import { Avatar } from "../global/avatar";
import { UserContext } from "../../context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const Topbar = () => {
  const { logout } = useLogin();
  const { user } = useContext(UserContext);
  const [active, setActive] = useState(false);
  return (
    <div className="topbar z-50  w-full gap-5 h-24 px-0 fixed right-0 top-0 flex items-center lg:gap-0 lg:pl-20 lg:pr-28 lg:justify-between">
      <div className="flex items-center w-full px-6 justify-between">
        <div className="hidden lg:block">
          <Searchbox />
        </div>
        <HiddenMenu />
        <div className="flex gap-10 items-center relative cursor-pointer">
          <div
            onClick={() => setActive(!active)}
            className="flex gap-3 items-center"
          >
            <Avatar className="w-12 h-12" />
            <p>{user?.display_name || "Unknown"}</p>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <FontAwesomeIcon
            className="text-2xl transition-all duration-200 hover:opacity-50 cursor-pointer"
            icon={faBell}
          />
          <AnimatePresence>
            {active && (
              <motion.div
                onClick={logout}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bg-black text-white text-sm text-justify rounded w-36 h-auto p-2 top-[60px]"
              >
                <ul>
                  <li className="flex gap-2 transition-all duration-200 items-center justify-center hover:opacity-50 cursor-pointer">
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

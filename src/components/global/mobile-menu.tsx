import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import { useLocation } from "react-router-dom";
import { links } from "../../constants/nav";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const router = useLocation();
  const pathname = router.pathname.split("/")[1];
  return (
    <div className="fixed z-50 bottom-0 w-full left-0 lg:hidden">
      <div className="flex flex-row w-full justify-center items-center gap-16 bg-gradient-to-r from-sky-500 to-sky-300 h-24">
        {links.map((link, index) => (
          <Link to={link.url} key={index.toString()}>
            <Tippy
              onShow={(instance) => {
                setTimeout(() => {
                  instance.hide();
                }, 500);
              }}
              placement="right"
              content={link.name}
            >
              <div
                className={`flex w-[28%] m-auto justify-center ${
                  pathname === link.name.toLowerCase()
                    ? "opacity-100"
                    : "opacity-50"
                }`}
                key={index.toString()}
              >
                <FontAwesomeIcon
                  className="text-white text-[30px] transition-all duration-200 hover:opacity-80 cursor-pointer transition-all duration-200"
                  icon={link.icon}
                />
              </div>
            </Tippy>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;

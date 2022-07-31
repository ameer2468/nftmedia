import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import { useLocation } from "react-router-dom";
import { links } from "../../constants/nav";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MobileMenu = () => {
  const router = useLocation();
  const pathname = router.pathname.split("/")[1];
  return (
    <div className="fixed z-50 bottom-0 w-full left-0 lg:hidden">
      <div className="flex flex-row w-full justify-center items-center gap-16 bg-gradient-to-r from-sky-500 to-sky-300 h-24">
        <Tippy placement="right" content="New Post">
          <div
            className="absolute flex w-12 transition-all duration-200 m-auto justify-center items-center text-white text-[20px]
          bg-sky-500 h-12 bottom-[70px] rounded-full hover:bg-sky-600 cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </Tippy>
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

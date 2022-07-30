import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/images/logo.png";
import Tippy from "@tippyjs/react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { links } from "../../constants/nav";

const Sidebar = () => {
  const router = useLocation();
  const pathname = router.pathname.split("/")[1];
  return (
    <div className="sidebar hidden w-full h-full items-center fixed lg:flex">
      <div className="logo absolute w-full h-24 top-0 flex items-center justify-center">
        <img src={Logo} alt="logo" />
      </div>
      <div className="flex flex-col justify-items-center w-full gap-10">
        {links.map((link, index) => (
          <Link to={link.url} key={index.toString()}>
            <Tippy placement="right" content={link.name}>
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

export default Sidebar;

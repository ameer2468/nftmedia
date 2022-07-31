import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "./button";
import Searchbox from "./searchbox";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const HiddenMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="lg:hidden block" onClick={() => setIsOpen(!isOpen)}>
      <div className="bg-sky-500 rounded-full w-12 h-12 flex justify-center items-center">
        <FontAwesomeIcon
          className={`text-white text-xl transition-all duration-200 ${
            isOpen ? "transform rotate-90" : "transform rotate-0"
          }`}
          icon={faBars}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${
              isOpen ? "flex" : "hidden"
            } menubg w-full fixed mt-6 flex-col justify-center items-center gap-5 left-0 h-auto p-10`}
          >
            <Link to="/login">
              <Button
                className="bg-transparent text-black normal-case py-3 border border-black"
                text="Login"
              />
            </Link>
            <Link to="/signup">
              <Button className="bg-sky-500 normal-case py-3" text="Sign Up" />
            </Link>
            <Searchbox />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HiddenMenu;

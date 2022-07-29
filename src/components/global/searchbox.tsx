import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Searchbox = () => {
  return (
    <div className="searchbox relative w-64 h-12 rounded-md">
      <input
        className="bg-transparent p-4 text-black w-56 h-full focus:outline-none placeholder-black"
        type="text"
        placeholder="Search..."
      />
      <div className="absolute right-4 top-1/4">
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
};

export default Searchbox;

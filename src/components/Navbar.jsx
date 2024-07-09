import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-acadia text-offwhite border-b-2 border-acadia-2 flex justify-center">
      <div className="flex justify-center overflow-x-auto">
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex justify-center items-center text-center w-28 md:w-36 border-2 py-1 md:py-2 px-2 md:px-4 my-2 mx-1 md:mx-4 rounded-lg hover:border-gainsboro ${
              isActive
                ? "bg-acadia-3 shadow-lg border-acadia-2"
                : "border-acadia-3 bg-acadia"
            }`
          }
        >
          <p className="text-sm md:text-base">Pesanan</p>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex justify-center items-center text-center w-28 md:w-36 border-2 py-1 md:py-2 px-2 md:px-4 my-2 mx-1 md:mx-4 rounded-lg hover:border-gainsboro ${
              isActive
                ? "bg-acadia-3 shadow-lg border-acadia-2"
                : "border-acadia-3 bg-acadia"
            }`
          }
        >
          <p className="text-sm md:text-base">Daftar Menu</p>
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex justify-center items-center text-center w-28 md:w-36 border-2 py-1 md:py-2 px-2 md:px-4 my-2 mx-1 md:mx-4 rounded-lg hover:border-gainsboro ${
              isActive
                ? "bg-acadia-3 shadow-lg border-acadia-2"
                : "border-acadia-3 bg-acadia"
            }`
          }
        >
          <p className="text-sm md:text-base">Tambah Menu</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;

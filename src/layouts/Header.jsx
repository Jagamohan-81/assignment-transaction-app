import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-500 p-4 z-50 ">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white font-semibold text-xl">Transaction App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-yellow-300">
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

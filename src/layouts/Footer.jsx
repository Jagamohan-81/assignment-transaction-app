import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Transaction App. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

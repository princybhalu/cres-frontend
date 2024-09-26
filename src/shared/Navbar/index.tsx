import React, { useState } from "react";
import CloseIcon from "../icons/close-icon";
import ProfileIcon from "../icons/profile-icon";
import MenuIcon from "../icons/menu-icon";
import NotifictionBellIcon from "../icons/notifiction-bell-icon";

interface NavbarProps {
  IsIsMobileMenuOpenFun: (a: boolean) => void; // This defines the type for children
  isMobileMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  IsIsMobileMenuOpenFun,
  isMobileMenuOpen,
}) => {
  return (
    <nav className="bg-[var(--navbar-bg)] text-[var(--navbar-text)] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <button
          className="lg:hidden mr-2"
          onClick={() => IsIsMobileMenuOpenFun(!isMobileMenuOpen)}
        >
          <MenuIcon />
        </button>
        {/* Left side - Logo */}
        {/* <div className="flex items-center">
            <img src="logo.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
          </div> */}
        {/* Center - Title */}
        {/* <h1 className="text-xl flex font-bold text-center flex-grow mx-auto">
            <img src="logo.jpg" alt="Logo" className="w-8 h-8 rounded-full mr-2" />
            Centralized Retail Engineering System
          </h1> */}
        <div className="hidden lg:block">
          <div className="flex">
            <img src="logo.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
            <h1 className="text-xl font-bold ml-2">
              Centralized Retail Engineering System
            </h1>
          </div>
        </div>

        <h1 className="text-xl font-bold lg:hidden">CRES</h1>
        {/* Right side - Icons */}
        <div className="flex items-center">
          <button className="mr-4 lg:block">
            <NotifictionBellIcon />
          </button>
          <button className="hidden lg:block">
            <ProfileIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import CloseIcon from "../icons/close-icon";
import ProfileIcon from "../icons/profile-icon";
import MenuIcon from "../icons/menu-icon";
import NotifictionBellIcon from "../icons/notifiction-bell-icon";
import logo from "../../assets/logo.jpg";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

interface NavbarProps {
  IsIsMobileMenuOpenFun: (a: boolean) => void; // This defines the type for children
  isMobileMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  IsIsMobileMenuOpenFun,
  isMobileMenuOpen,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);
  

  return (
    // <nav className="bg-[var(--navbar-bg)] text-[var(--navbar-text)] p-4">
    //   <div className="container mx-auto flex justify-between items-center">
    //     <button
    //       className="lg:hidden mr-2"
    //       onClick={() => IsIsMobileMenuOpenFun(!isMobileMenuOpen)}
    //     >
    //       <MenuIcon />
    //     </button>
    //     {/* Left side - Logo */}
    //     {/* <div className="flex items-center">
    //         <img src="logo.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
    //       </div> */}
    //     {/* Center - Title */}
    //     {/* <h1 className="text-xl flex font-bold text-center flex-grow mx-auto">
    //         <img src="logo.jpg" alt="Logo" className="w-8 h-8 rounded-full mr-2" />
    //         Centralized Retail Engineering System
    //       </h1> */}
    //     <div className="hidden lg:block">
    //       <div className="flex">
    //         <img src="logo.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
    //         <h1 className="text-xl font-bold ml-2">
    //           Centralized Retail Engineering System
    //         </h1>
    //       </div>
    //     </div>

    //     <h1 className="text-xl font-bold lg:hidden">CRES</h1>
    //     {/* Right side - Icons */}
    //     <div className="flex items-center">
    //       <button className="mr-4 lg:block">
    //         <NotifictionBellIcon />
    //       </button>
    //       <button className="hidden lg:block">
    //         <ProfileIcon />
    //       </button>
    //     </div>
    //   </div>
    // </nav>

    // <nav className="bg-[var(--navbar-bg)] text-[var(--navbar-text)] p-2 flex justify-between items-center">
    //   {/* <div className="container mx-auto flex justify-between items-center  lg:hidden">
    //     <button
    //       className="lg:hidden mr-2"
    //       onClick={() => IsIsMobileMenuOpenFun(!isMobileMenuOpen)}
    //     />
    //     <MenuIcon />
    //   </div>

    //   <div className="flex flex-row hidden lg:block"> */}
    //     <div className="flex items-center space-x-2">
    //       <img
    //         src="logo.jpg"
    //         alt="Logo"
    //         className="w-10 h-10 rounded-full mr-2"
    //       />
    //       <div className="sm:hidden">
    //         <h1 className="text-lg font-bold">
    //           Hindustan Petroleum Corporation Limited
    //         </h1>
    //         <p className="text-xs">हिंदुस्तान पेट्रोलियम कॉर्पोरेशन लिमिटेड</p>
    //       </div>
    //     </div>
    //     <div className="text-center flex-grow">
    //       <h2 className="text-xl font-semibold text-white my-2">
    //         Centralized Retail Information System
    //       </h2>
    //     </div>
    //     <div className="flex flex-col text-right">
    //       <span>Welcome</span>
    //       <span className="font-semibold">SALES_USER - Sales User</span>
    //     </div>
    //     <div className="ml-1">
    //       <ProfileIcon />
    //     </div>
    //   {/* </div> */}
    // </nav>

    <nav className="bg-[var(--navbar-bg)] text-white p-2">
      <div className="flex justify-between items-center">
        {/* Mobile menu icon */}
        <div className="lg:hidden">
          <button
            className="h-6 w-6 cursor-pointer"
            onClick={() => IsIsMobileMenuOpenFun(!isMobileMenuOpen)}
          > <MenuIcon /></button>
        </div>

        {/* Logo and company name */}
        <div className="hidden lg:flex items-center space-x-2">
          <img
            src={logo}
            alt="HP Logo"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h1 className="text-lg font-bold">
              Hindustan Petroleum Corporation Limited
            </h1>
            <p className="text-xs">हिंदुस्तान पेट्रोलियम कॉर्पोरेशन लिमिटेड</p>
          </div>
        </div>

        {/* Central title */}
        <div className="text-center flex-grow">
          <h2 className="text-xl font-semibold text-white my-auto">
            Centralized Retail Information System
          </h2>
        </div>

        {/* User info */}
        <div className="hidden lg:flex items-center space-x-2">
          <span>Welcome</span>
          <span className="font-semibold">{
          //@ts-ignore
          user?.firstname}</span>
        </div>
        <div className="ml-1 hidden lg:flex">
           <ProfileIcon />
     </div>

        {/* Mobile user icon */}
        <div className="lg:hidden">
          <ProfileIcon />
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 space-y-2">
          <div>Hindustan Petroleum Corporation Limited</div>
          <div>हिंदुस्तान पेट्रोलियम कॉर्पोरेशन लिमिटेड</div>
          <div>Welcome SALES_USER - Sales User</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

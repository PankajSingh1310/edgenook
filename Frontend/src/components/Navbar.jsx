import React, { useContext, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogIn, Menu, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useId } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "./ui/mode-toggle";
import userContext from "@/context/user.context";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [activeNav, setActiveNav] = useState("Home");
  const uniqueId = useId();
  const {isLoggedIn, setIsLoggedIn,userData} = useContext(userContext);
  const navItems = [
    { label: "Home", to: "/home" },
    { label: "About", to: "/about" },
    { label: "Contact us", to: "/contact" },
  ];

  return (
    <div className="w-full px-5 py-3 flex items-center justify-between shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      {/* Search */}
      <div className="flex lg:w-[350px] items-center border border-gray-600 rounded-2xl px-1 py-1 w-[150px]">
        <SearchIcon className="w-4 text-gray-400" />
        <input
          className="ml-2 w-full outline-none border-none bg-transparent text-zinc-600 text-sm"
          type="text"
          placeholder="Find certificate courses"
        />
      </div>

      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-4">
        {navItems.map((item, i) => (
          <NavLink
            key={uniqueId + i}
            to={item.to}
            className={({ isActive }) =>
              `relative px-3 py-2 text-sm transition-colors duration-300 ease-in-out ${
                isActive ? "text-black dark:text-white" : "text-zinc-500"
              } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full 
               after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-in-out ${
                 isActive
                   ? "after:scale-x-100 after:bg-black dark:after:bg-white"
                   : ""
               }`
            }
          >
            {item.label}
          </NavLink>
        ))}

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Plan & Pricing</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>499 plan</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>999 plan</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
       
        {!isLoggedIn ? (
          <>
            <Button variant="outline" asChild>
              <Link to="/login" className="flex items-center gap-1">
                <LogIn className="w-4" /> Login
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </>
        ) : (
          <p className="text-sm font-medium text-zinc-700 dark:text-white">
            {userData.fullname.firstname} {userData.fullname.lastname}
          </p>
        )}


        {/* <Button variant="outline" asChild>
          <Link to="/login" className="flex items-center gap-1">
            <LogIn className="w-4" /> Login
          </Link>
        </Button>

        <Button variant="outline" asChild>
          <Link to="/signup">Sign up</Link>
        </Button> */}

        <ModeToggle className="bg-transparent hover:bg-transparent border-none shadow-none" />
      </div>

      {/* Hamburger menu button (mobile) */}
      <div className="lg:hidden flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <Menu />
        </Button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full shadow-lg flex flex-col items-center px-6 py-4 gap-2 z-50 lg:hidden bg-white dark:bg-black">
          {navItems.map((item) => (
            <NavLink
              key={uniqueId + item.label}
              to={item.to}
              onClick={() => {
                setActiveNav(item.label);
                setIsMobileMenuOpen(false);
              }}
              className={({ isActive }) =>
                `w-full text-left px-3 py-2 rounded-md ${
                  isActive
                    ? "underline underline-offset-4 text-black dark:text-white"
                    : "text-zinc-700 dark:text-zinc-400"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="px-0">Plan & Pricing</MenubarTrigger>
              <MenubarContent className="ml-[-1rem]">
                <MenubarItem>499 plan</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>999 plan</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          {!isLoggedIn ? (
          <>
            <Button variant="outline" asChild>
              <Link to="/login" className="flex items-center gap-1">
                <LogIn className="w-4" /> Login
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </>
        ) : (
          <p className="text-sm font-medium text-zinc-700 dark:text-white">
            {userData.fullname.firstname} {userData.fullname.lastname}
          </p>
        )}

        </div>
      )}
    </div>
  );
};

export default Navbar;

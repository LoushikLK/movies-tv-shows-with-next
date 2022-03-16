import { Notifications, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";

const Header = () => {
  const navlinks = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/movies",
      text: "Movies",
    },
    {
      href: "/tvshows",
      text: "TV Shows",
    },

    {
      href: "/newpopular",
      text: "New & Popular",
    },
    {
      href: "/mylist",
      text: "My List",
    },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 ">
      <div className="my-container flex flex-row justify-between  ">
        <div className="flex flex-row items-center">
          <div className="text-teal-500 ">
            <Link href={"/"}>
              <a className="text-teal-500 text-[2.5rem] uppercase font-semibold  pr-6 tracking-wide ">
                Movie Hub{" "}
              </a>
            </Link>
          </div>

          <ul className="flex flex-row items-center gap-4">
            {navlinks.map((link, index) => {
              return (
                <li key={index} className="text-teal-500 ">
                  <Link href={link.href}>
                    <a className="text-teal-500 text-base  hover:text-teal-200 font-semibold tracking-wide ">
                      {link.text}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative flex flex-row items-center gap-4">
          <div className=" flex items-center flex-row border border-teal-300   overflow-hidden rounded-md ">
            <span className="relative flex items-center ">
              <Search className="absolute ml-1" />
              <input
                type="text"
                className=" focus:outline-none pl-8 h-[2rem]  "
              />
            </span>
            <span className="flex px-2 h-[2rem] items-center cursor-pointer bg-teal-500 text-white font-medium tracking-wide ">
              Search
            </span>
          </div>
          <div className="flex items-center">
            <span className="flex items-center  cursor-pointer text-teal-500 font-medium tracking-wide ">
              <Notifications className="h-8 w-8" />
            </span>
          </div>
          <div className="flex items-center">
            <span className="flex items-center cursor-pointer text-white font-medium tracking-wide ">
              <Avatar
                alt="Remy Sharp"
                src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/pHUMxUOHI6sRk4uGSpDdQPM2WaV.jpg"
                sx={{ width: "2rem", height: "2rem" }}
              />
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

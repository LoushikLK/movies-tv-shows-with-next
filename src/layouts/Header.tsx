import { ModeNight, Notifications, Search, WbSunny } from "@mui/icons-material";
import { Avatar, Switch } from "@mui/material";
import { SearchArea } from "components/search";
import Link from "next/link";
import React from "react";

const Header = ({ setDarkTheme }: any) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const handleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setDarkTheme(event.target.checked);
  };

  // console.log(showSearch);

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
    <nav className="bg-white  dark:bg-gray-900 z-50 sticky top-0 ">
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
          <div
            className=" flex items-center flex-row   overflow-hidden  cursor-pointer  "
            onClick={() => {
              setShowSearch(!showSearch);
            }}
          >
            <span className="relative flex items-center ">
              <Search className=" text-teal-500 h-8 w-8 " />
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
          <div className="flex items-center bg-gray-900 dark:bg-gray-200/95 ml-4 px-4 rounded-full ">
            <span>
              <ModeNight className="h-6 w-6 text-gray-500" />
            </span>
            <span className="flex items-center  cursor-pointer text-teal-500 font-medium tracking-wide ">
              <Switch
                checked={checked}
                onChange={handleTheme}
                inputProps={{ "aria-label": "controlled" }}
              />
            </span>
            <span>
              <WbSunny className="h-6 w-6 text-yellow-500" />
            </span>
          </div>
        </div>
      </div>
      {showSearch && <SearchArea />}
    </nav>
  );
};

export default Header;

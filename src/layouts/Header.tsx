import {
  Logout,
  ModeNight,
  Notifications,
  Search,
  WbSunny,
} from "@mui/icons-material";
import { Avatar, ClickAwayListener, Switch } from "@mui/material";
import { SearchArea } from "components/search";
import { useAppContext } from "context";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";

const Header = ({ setDarkTheme, darkTheme }: any) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const router = useRouter();

  const handleTheme = (event: ChangeEvent<HTMLInputElement>) => {
    setDarkTheme(!event.target.checked);
  };

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
  ];

  const { user, refetchUser } = useAppContext();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let json = await response.json();

      if (response.status !== 200) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: json.message,
        });
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: json.message,
      });

      refetchUser();
    } catch (error) {
      Swal.fire({
        title: "Oops, something went wrong",
        icon: "error",
        text: "Oops, something went wrong. Please try again.",
      });
    }
  };

  const handleProfileClick = () => {
    if (user?._id) return;
    router.push("/login");
  };

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
          <div className="flex items-center relative ">
            <ClickAwayListener onClickAway={() => setShowProfile(false)}>
              <div>
                <span
                  className="flex items-center cursor-pointer text-white font-medium tracking-wide "
                  onClick={() => {
                    setShowProfile(!showProfile);
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={""}
                    sx={{ width: "2rem", height: "2rem" }}
                    onClick={handleProfileClick}
                  >
                    {(user?.userName && user?.userName[0]) ||
                      (user?.name && user?.name[0])}
                  </Avatar>
                </span>
                {user?._id && (
                  <>
                    {showProfile && (
                      <span className="absolute flex-col flex h-fit w-full min-w-[15rem] bg-white dark:bg-gray-900 top-0 translate-y-[55%] rounded-sm right-0 ">
                        <Link href={"/profile"}>
                          <a className="text-black text-lg w-full  capitalize font-semibold px-4 py-2 hover:bg-gray-900 hover:dark:bg-white hover:text-white hover:dark:text-black cursor-pointer transition-all ease-in-out duration-300 dark:text-white ">
                            {user?.userName || user?.name}
                          </a>
                        </Link>
                        <span
                          className="text-red-500 flex items-center gap-2 text-lg capitalize font-semibold px-4 py-2 hover:bg-gray-900 hover:dark:bg-white cursor-pointer transition-all ease-in-out duration-300  "
                          onClick={handleLogout}
                        >
                          <Logout className="text-red-500  " />
                          Logout
                        </span>
                      </span>
                    )}
                  </>
                )}
              </div>
            </ClickAwayListener>
          </div>
          <div className="flex items-center bg-gray-900 dark:bg-gray-200/95 ml-4 px-4 rounded-full ">
            <span>
              <ModeNight className="h-6 w-6 text-gray-500" />
            </span>
            <span className="flex items-center  cursor-pointer text-teal-500 font-medium tracking-wide ">
              <Switch
                checked={!darkTheme}
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

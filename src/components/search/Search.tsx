import React from "react";
import { Search } from "@mui/icons-material";
import SearchCard from "./SearchCard";

const SearchArea = () => {
  return (
    <section className="h-full top-auto    w-full fixed  left-0 z-20 flex justify-center backdrop-blur-lg  ">
      <div className="dark:bg-white/10 flex flex-col items-center bg-gray-900/20 relative top-0  w-fit h-full px-8  ">
        <div className="flex items-center my-4 overflow-hidden rounded-md  bg-white h-11  dark:bg-gray-900 ">
          <button className="ml-2">
            <Search className=" text-teal-500 h-8 w-8 " />
          </button>
          <input
            type="text"
            className=" bg-transparent focus:outline-none md:w-[500px] w-full pl-4 "
            placeholder="Search for movies,tv shows,actor..."
          />
        </div>

        <div className="w-full flex flex-col gap-2 ">
          <SearchCard />
          <SearchCard />
          <SearchCard />
        </div>
      </div>
    </section>
  );
};

export default SearchArea;

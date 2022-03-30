import Image from "next/image";
import React from "react";
import Profile from "assets/profile.jpg";

const SearchCard = () => {
  return (
    <div className="bg-white rounded-md overflow-hidden dark:bg-gray-900 flex flex-row items-center ">
      <div className="w-1/4 p-1 ">
        <div className="relative h-28 w-24  ">
          <Image src={Profile} layout="fill" objectFit="cover" alt="card" />
        </div>
      </div>
      <div className="w-3/4 flex flex-col gap-1 justify-between ">
        <h3 className="text-black dark:text-white text-2xl tracking-wide capitalize  ">
          Turning Red
        </h3>
      </div>
    </div>
  );
};

export default SearchCard;

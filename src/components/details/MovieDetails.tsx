import { useApiData } from "hooks";
import Image from "next/image";
import React from "react";
import Banner from "assets/hobbit_bg.jpg";
import Poster from "assets/profile.jpg";
import { PlayArrow } from "@mui/icons-material";

import { useDetails } from "hooks";

const MovieDetails = ({ data }: any) => {
  console.log(data);

  const cast = useDetails.getCast("movie", data?.id);

  console.log(cast);

  // const genre = useDetails.getGenres("movie");

  // console.log(genre);

  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="w-full relative ">
        <div className="w-full">
          <div className="relative w-full h-[25rem] ">
            <Image
              src={"https://image.tmdb.org/t/p/original" + data?.backdrop_path}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        <div className="w-full absolute left-0 bottom-12 ">
          <div className="  my-container   ">
            <button className="bg-gray-100/20 gap-2 border border-gray-300/20 hover:bg-gray-200 transition-all ease-in-out duration-300 text-teal-500 relative flex items-center  text-[1.3rem] tracking-wide font-bold py-3 px-6 rounded-md">
              <PlayArrow className="text-[2rem]" /> Watch Trailer
            </button>
          </div>
        </div>
      </div>

      <div className="my-container w-full ">
        <div className="w-full flex flex-row  gap-8 justify-between items-center py-8 ">
          <div className="flex flex-col gap-4 ">
            <h1 className="text-black dark:text-white text-5xl py-4 tracking-wider   ">
              {data?.title || data?.original_title}
            </h1>

            <p className="text-black text-xl dark:text-gray-300 ">
              {data?.tagline}
            </p>

            <div className="flex flex-row items-center  flex-wrap gap-4">
              <span className="text-gray-600 text-base  dark:text-gray-400 tracking-wide  ">
                {data?.original_language}
              </span>
              <span className="text-gray-600 text-base  dark:text-gray-400 tracking-wide  ">
                {data?.release_date}
              </span>
              <span className="text-gray-600 text-base  dark:text-gray-400 tracking-wide  ">
                {data?.runtime} min
              </span>
              <span className="text-gray-600 text-base  dark:text-gray-400 tracking-wide  ">
                {data?.adult ? "18+" : "PG-13"}
              </span>
            </div>
            <div className="flex flex-row items-center  flex-wrap gap-4">
              {data?.genres?.map((item: any) => {
                return (
                  <span className="px-3 py-1 rounded text-sm  font-normal card-genre  ">
                    {item.name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex">
            <div className=" flex flex-col justify-center items-center h-[7rem] w-[7rem] rounded-full border-4 border-teal-500/50 bg-teal-200/20  ">
              <span className="text-gray-900 dark:text-gray-300 text-2xl ">
                55%
              </span>
              <span className="text-gray-900 dark:text-gray-300 ">Ratings</span>
            </div>
          </div>
        </div>

        <hr className=" h-[1px] w-full bg-gray-400  " />

        <div className=" flex flex-row py-8 gap-8 ">
          <div className="flex   ">
            <div className="relative h-[20rem] w-[15rem] ">
              <Image src={Poster} layout="fill" objectFit="cover" />
            </div>
          </div>

          <div className="flex flex-col gap-4  ">
            <span className="flex flex-col">
              <h3 className="text-black dark:text-gray-100 text-2xl pb-4 ">
                Overview
              </h3>

              <p className="text-black text-lg tracking-wide dark:text-gray-300 ">
                {data?.overview}
              </p>
            </span>

            <span className="flex flex-col">
              <h3 className="text-black dark:text-gray-100 text-2xl pb-4 ">
                Cast & Crew
              </h3>

              <span className="flex flex-row items-center gap-4 ">
                {cast?.data?.success === true &&
                  cast?.data?.map((item: any) => {
                    return (
                      <span className=" h-[3rem] overflow-hidden w-[3rem] cursor-pointer  relative rounded-full border border-teal-500/50 bg-teal-200/20  ">
                        <Image src={Poster} layout="fill" objectFit="cover" />
                      </span>
                    );
                  })}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;

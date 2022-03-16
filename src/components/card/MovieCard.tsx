import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useApiData } from "hooks";
import { Rating } from "@mui/material";
import { Star } from "@mui/icons-material";

const MovieCard = ({ moviesDetails }: any) => {
  console.log(moviesDetails);



  const genre = useApiData("https://api.themoviedb.org/3/genre/movie/list?api_key=023e7fa152989334a68b0ed2985b5fb8&language=en-US");


  console.log(genre);
  return (
    <>
      {moviesDetails?.first_air_date ? (
        <Link href={`/details/tv/${moviesDetails.id}`}>
          <a className=" w-[14rem]  shadow-[0px_0px_8px_0px_#14b8a6] h-[20rem] cursor-pointer overflow-hidden rounded bg-gray-500 ">
            <div className="w-full h-full ">
              <div className="relative  h-[20rem] w-full ">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/w500" +
                    moviesDetails.poster_path
                  }
                  layout="fill"
                  loading="lazy"
                  alt={moviesDetails?.title || moviesDetails?.name || moviesDetails?.original_name || moviesDetails?.original_title}
                />
              </div>
            </div>
          </a>
        </Link>
      ) : (
        <Link href={`/details/movie/${moviesDetails.id}`}>
          <a className=" w-[14rem] relative group shadow-[0px_0px_8px_0px_#14b8a6] h-[20rem] cursor-pointer overflow-hidden rounded bg-gray-500 ">
            <div className="w-full h-full  ">
              <div className="relative  h-[20rem] w-full  ">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/w500" +
                    moviesDetails.poster_path
                  }
                  layout="fill"
                  loading="lazy"
                  alt={moviesDetails.title}
                />
              </div>
            </div>
            <div className="absolute group-hover:translate-y-[20%] transition-all ease-in-out duration-300 top-0 translate-y-[75%] left-0 w-full h-full bg-gradient-to-t backdrop-blur-sm from-black to-black/10  p-4 gap-2 flex flex-col ">

              <h3 className="text-black dark:text-white  font-semibold text-base tracking-wide ">

                {moviesDetails?.title || moviesDetails?.name || moviesDetails?.original_name || moviesDetails?.original_title}
                {"  "}  (2022)

              </h3>

              <span className="flex flex-row items-center text-black dark:text-white justify-between " >
                <Rating sx={{ fontSize: "1.2rem" }} name="read-only" emptyIcon={<Star className="text-gray-500  " fontSize="inherit" />} precision={0.5} value={moviesDetails?.vote_average / 2} readOnly />
                <span className="text-sm" >
                  {moviesDetails?.vote_average / 2}/5
                </span>
              </span>
              <span className="flex flex-row gap-2 flex-wrap py-2 ">

                {
                  moviesDetails?.genre_ids.map((item: any) => {


                    return genre?.data?.genres?.map((genre: any) => {
                      return (
                        genre.id === item && <span className=" px-2 rounded text-xs  font-normal card-genre ">{genre.name}</span>
                      )
                    })


                  })
                }


              </span>

              <span className="text-black dark:text-white text-sm tracking-wide text-clip ">

                {moviesDetails?.overview?.substring(0, 75)

                }
                <p className="text-xs">
                  ...read more
                </p>

              </span>

            </div>
          </a>
        </Link>
      )}
    </>
  );
};

export default MovieCard;

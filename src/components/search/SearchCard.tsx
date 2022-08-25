import Image from "next/image";
import React from "react";
import { Rating } from "@mui/material";
import { Star } from "@mui/icons-material";
import Link from "next/link";
import { useDetails } from "hooks";

const SearchCard = ({ result }: any) => {
  // console.log(result);

  const tvGenre = useDetails.useGenres("tv");

  const movieGenre = useDetails.useGenres("movie");

  return (
    <>
      {result?.media_type !== "person" && (
        <div className="bg-teal-100  rounded-md  overflow-hidden dark:bg-teal-900 backdrop-brightness-50 flex flex-row items-center ">
          <div className="w-1/4 p-1 ">
            <div className="relative h-44 w-32  ">
              {result ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${
                    result?.poster_path || result?.backdrop_path
                  }`}
                  layout="fill"
                  objectFit="cover"
                  alt="search card"
                />
              ) : (
                <div className="bg-gray-500 h-full w-full "></div>
              )}
            </div>
          </div>
          <div className="w-3/4 flex flex-col gap-2 pr-4   justify-between ">
            <span className="flex items-center gap-2">
              <h3 className="text-black dark:text-white text-xl tracking-wide capitalize  ">
                {result?.name ||
                  result?.title ||
                  result?.original_name ||
                  result?.original_title}
              </h3>
              {result?.release_date && (
                <h3 className="text-black dark:text-white text-xl tracking-wide capitalize  ">
                  ({result?.release_date?.split("-")[0]})
                </h3>
              )}
              {result?.first_air_date && (
                <h3 className="text-black dark:text-white text-xl tracking-wide capitalize  ">
                  (
                  {result?.first_air_date?.split("-")[0] ||
                    result?.last_air_date?.split("-")[0]}
                  )
                </h3>
              )}
            </span>
            <span className="flex flex-row items-center text-black dark:text-white gap-4 ">
              <span className="text-gray-600 text-base  dark:text-gray-400 tracking-wide  ">
                {result?.adult ? "18+" : "PG-13"}
              </span>
              <Rating
                sx={{ fontSize: "1.2rem" }}
                name="read-only"
                emptyIcon={
                  <Star className="text-gray-500  " fontSize="inherit" />
                }
                precision={0.5}
                value={result?.vote_average / 2}
                readOnly
              />
              <span className="text-sm">{result?.vote_average}/5</span>
            </span>
            {result?.media_type === "tv" ? (
              <span className="flex flex-row gap-2 flex-wrap py-2 ">
                {result?.genre_ids.map((item: any) => {
                  return tvGenre?.data?.genres?.map((genres: any) => {
                    return (
                      genres.id === item && (
                        <span
                          className=" px-2 rounded text-xs  font-normal card-genre "
                          key={genres?.id}
                        >
                          {genres.name}
                        </span>
                      )
                    );
                  });
                })}
              </span>
            ) : (
              <span className="flex flex-row gap-2 flex-wrap py-2 ">
                {result?.genre_ids.map((item: any) => {
                  return movieGenre?.data?.genres?.map((genres: any) => {
                    return (
                      genres.id === item && (
                        <span
                          className=" px-2 rounded text-xs  font-normal card-genre "
                          key={genres?.id}
                        >
                          {genres.name}
                        </span>
                      )
                    );
                  });
                })}
              </span>
            )}

            <span className="text-black capitalize dark:text-white text-base">
              Type - {result?.media_type}
            </span>
            <Link href={`/details/${result?.media_type}/${result?.id}`}>
              <a className=" cursor-pointer dark:text-teal-500 text-sm dark:bg-white text-white bg-gray-900 px-2 py-1 w-fit rounded-md ">
                See Details
              </a>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchCard;

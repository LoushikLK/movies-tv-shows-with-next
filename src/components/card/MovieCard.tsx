import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieCard = ({ moviesDetails }: any) => {
  // console.log(moviesDetails);

  return (
    <>
      {moviesDetails?.first_air_date ? (
        <Link href={`/details/tv/${moviesDetails.id}`}>
          <a className=" w-[20rem]  shadow-[0px_0px_8px_0px_#14b8a6] h-[11rem] cursor-pointer overflow-hidden rounded-md bg-gray-500 ">
            <div className="w-full h-full ">
              <div className="relative  h-[11rem] w-full ">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/w500" +
                    moviesDetails.backdrop_path
                  }
                  layout="fill"
                  loading="lazy"
                  alt={moviesDetails.title}
                />
              </div>
            </div>
          </a>
        </Link>
      ) : (
        <Link href={`/details/movie/${moviesDetails.id}`}>
          <a className=" w-[20rem]  shadow-[0px_0px_8px_0px_#14b8a6] h-[11rem] cursor-pointer overflow-hidden rounded-md bg-gray-500 ">
            <div className="w-full h-full ">
              <div className="relative  h-[11rem] w-full ">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/w500" +
                    moviesDetails.backdrop_path
                  }
                  layout="fill"
                  loading="lazy"
                  alt={moviesDetails.title}
                />
              </div>
            </div>
          </a>
        </Link>
      )}
    </>
  );
};

export default MovieCard;

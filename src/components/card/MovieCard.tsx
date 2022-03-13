import Image from "next/image";
import React from "react";

const MovieCard = ({ moviesDetails }: any) => {
  //   console.log(moviesDetails);

  return (
    <div className=" w-[20rem]  shadow-[0px_0px_8px_0px_#14b8a6] h-[11rem] cursor-pointer overflow-hidden rounded-md bg-gray-500 ">
      <div className="w-full h-full ">
        <div className="relative  h-[11rem] w-full ">
          <img
            src={
              "https://image.tmdb.org/t/p/w500" + moviesDetails.backdrop_path
            }
            alt="movie-poster"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

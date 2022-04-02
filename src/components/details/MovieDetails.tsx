import Image from "next/image";
import React, { useEffect } from "react";

import {
  Add,
  BookmarkAdd,
  Cancel,
  Language,
  PlayArrow,
} from "@mui/icons-material";

import { useDetails } from "hooks";
import { Avatar, Rating } from "@mui/material";
import {
  RecommendedContent,
  SimilarContent,
  VideoPlayer,
} from "components/common";
import Animation from "assets/animations";

const MovieDetails = ({ data, loading }: any) => {
  // console.log(data);

  const [mainCast, setMainCast] = React.useState([]);
  const [playYoutube, setPlayYoutube] = React.useState(false);

  const youtubeData = useDetails.getYoutubeData(
    data?.title || data?.original_title
  );

  // console.log(youtubeData);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (data?.credits?.cast.length > 15) {
        setMainCast(data?.credits?.cast.slice(0, 15));
      } else {
        setMainCast(data?.credits?.cast);
      }
    }

    return () => {
      mounted = false;
    };
  }, [data]);

  console.log(data?.videos?.results);

  return (
    <section className="bg-white dark:bg-gray-900 ">
      {loading ? (
        <div className="flex items-center w-full h-screen justify-center">
          <Animation.LoadingAnimation className="h-20 w-20" />
        </div>
      ) : data ? (
        <>
          {playYoutube && (
            <VideoPlayer
              close={() => {
                setPlayYoutube(false);
              }}
              title={data?.title || data?.original_title}
              url={`https://www.youtube.com/embed/${
                data?.videos?.results?.pop()?.key ||
                data?.videos?.results?.pop()?.key ||
                (youtubeData?.data?.items &&
                  youtubeData?.data?.items[0]?.id?.videoId)
              }?autoplay=1&mute=0`}
            />
          )}
          <div
            style={{
              backgroundImage: `url(${
                "https://image.tmdb.org/t/p/original" + data?.backdrop_path
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "scroll",
            }}
          >
            <div className="w-full h-full backdrop-brightness-50  bg-gradient-to-r from-black to-white/0 ">
              <div className="my-container w-full  flex flex-row py-8 gap-8 ">
                <div className="flex flex-col items-center gap-2 ">
                  <div>
                    <div className="relative h-[35rem] w-[25rem] ">
                      <Image
                        src={
                          "https://image.tmdb.org/t/p/w500/" + data?.poster_path
                        }
                        layout="fill"
                        objectFit="cover"
                        alt="poster"
                      />
                    </div>
                  </div>
                  {/* youtube video play*/}
                  <div className="flex flex-row justify-between w-full gap-2">
                    {data?.videos?.results && data?.videos?.results.length > 0 && (
                      <div
                        className="bg-gray-100/20  w-1/2 gap-2 justify-center border border-gray-300/20 hover:bg-gray-200 transition-all ease-in-out duration-300 text-teal-500 relative flex items-center  text-[1rem] tracking-wide font-bold py-3 px-2 cursor-pointer"
                        onClick={() => setPlayYoutube(true)}
                      >
                        <PlayArrow className="text-[1.5rem]" /> Watch Trailer
                      </div>
                    )}

                    {data?.homepage && (
                      <a
                        href={`${data?.homepage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100/20   justify-center w-1/2 gap-2 border border-gray-300/20 hover:bg-gray-200 transition-all ease-in-out duration-300 text-teal-500 relative flex items-center  text-[1rem] tracking-wide font-bold py-3 px-2 "
                      >
                        <Language className="text-[1.5rem]" /> Visit Website
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4  ">
                  <div className="flex flex-row gap-2 items-center ">
                    <h1 className="text-black font-bold dark:text-white text-5xl py-4 tracking-wider   ">
                      {data?.title || data?.original_title}
                    </h1>
                    <span className="text-gray-700 font-bold dark:text-gray-300 text-3xl py-4 tracking-wider">
                      ({data?.release_date?.split("-")[0] || data?.release_date}
                      )
                    </span>
                  </div>
                  <p className="text-black text-xl dark:text-gray-300 ">
                    {data?.tagline}
                  </p>
                  <div className="flex items-center gap-4 ">
                    <div className="flex items-center gap-2 ">
                      <div className=" flex flex-col justify-center items-center h-[5rem] w-[5rem] rounded-full border-4 border-teal-500/50 bg-teal-200/20  ">
                        <span className="text-gray-900  dark:text-gray-300 text-2xl font-medium ">
                          {data?.vote_average * 10}%
                        </span>
                      </div>
                      <span className="text-teal-500 text-xl font-medium ">
                        User Score
                      </span>
                    </div>
                    <div className="flex flex-row gap-2 justify-center hover:text-gray-500  transition-all ease-in-out duration-300  text-black dark:text-white font-medium cursor-pointer select-none ">
                      <BookmarkAdd />
                      Add to favorites
                    </div>
                    <div className="flex flex-row gap-2 justify-center hover:text-gray-500 transition-all ease-in-out duration-300   text-black dark:text-white font-medium cursor-pointer select-none ">
                      <Add />
                      Compare
                    </div>
                  </div>

                  <div className="flex flex-row items-center  flex-wrap gap-4">
                    <span className="text-gray-600 text-base uppercase dark:text-gray-400 tracking-wide  ">
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
                    <span className="text-gray-600 text-base  dark:text-gray-400 tracking-wide  ">
                      Budget - {data?.budget ? "$" + data?.budget : "N/A"}
                    </span>
                    <span className="text-gray-600 text-base  dark:text-gray-400 tracking-wide  ">
                      Revenue - {data?.revenue ? "$" + data?.revenue : "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-row items-center  flex-wrap gap-4">
                    {data?.genres?.map((item: any) => {
                      return (
                        <span
                          className="px-3 py-1 rounded text-sm  font-normal card-genre  "
                          key={item.id}
                        >
                          {item.name}
                        </span>
                      );
                    })}
                  </div>

                  <span className="flex flex-col">
                    <h3 className="text-black dark:text-gray-100 text-2xl pb-4 ">
                      Overview
                    </h3>

                    <p className="text-black text-lg tracking-wide dark:text-gray-300 ">
                      {data?.overview}
                    </p>
                  </span>
                  {data?.credits?.crew && (
                    <div className="grid grid-cols-12 py-8 gap-4 ">
                      {data?.credits?.crew?.map((item: any, index: number) => {
                        if (
                          item.job === "Director" ||
                          item.job === "Producer" ||
                          item.job === "Writer"
                        ) {
                          return (
                            <span
                              className="flex flex-col col-span-4 "
                              key={index}
                            >
                              <h3 className="text-lg font-semibold text-black dark:text-white">
                                {item?.name}
                              </h3>
                              <h3 className="text-base font-normal text-gray-700 dark:text-gray-200">
                                {item?.job}
                              </h3>
                            </span>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full my-container">
            <div className="flex w-full flex-col ">
              {/* cast and crew */}

              {mainCast?.length > 0 && (
                <div className="flex flex-col">
                  <h3 className="text-black dark:text-gray-100 text-2xl pb-4 ">
                    Cast & Crew
                  </h3>

                  <span className="flex flex-row items-baseline flex-wrap gap-4 ">
                    {mainCast?.map((item: any) => {
                      if (item.profile_path) {
                        return (
                          <div
                            className="flex flex-col max-w-[7rem]  gap-2"
                            key={item.cast_id}
                          >
                            <span className=" h-[9rem] overflow-hidden w-[7rem] cursor-pointer  relative  border border-teal-500/50 bg-teal-200/20  ">
                              <Image
                                src={
                                  "https://image.tmdb.org/t/p/w500" +
                                  item.profile_path
                                }
                                layout="fill"
                                objectFit="cover"
                                alt="cast"
                              />
                            </span>
                            <span className="flex flex-col gap-1">
                              <span className="text-teal-400 text-xs tracking-wide ">
                                {item.name}
                              </span>
                              <span className="text-gray-300 text-[11px] tracking-wide ">
                                As {item.character}
                              </span>
                            </span>
                          </div>
                        );
                      }
                    })}
                  </span>
                </div>
              )}

              {/* reviews */}

              <div className="w-full py-4 ">
                <h3 className="text-black dark:text-gray-100 text-2xl pb-8 ">
                  Reviews
                </h3>
                {data?.reviews?.results?.length > 0 ? (
                  <div className="w-full flex flex-col gap-4 ">
                    {data?.reviews?.results?.map((item: any, index: number) => {
                      // console.log(`${item?.author_details?.avatar_path}`.slice(1));
                      return (
                        <div
                          className="flex flex-row gap-4 items-start shadow-[0px_0px_5px_0px] shadow-gray-800/40 dark:shadow-white/50 rounded-md p-8  "
                          key={index}
                        >
                          <div className="flex w-1/5 flex-row items-center gap-4 ">
                            <div>
                              <Avatar
                                src={`${item?.author_details?.avatar_path}`.slice(
                                  1
                                )}
                                sx={{
                                  width: "3rem",
                                  height: "3rem",
                                  color: "GrayText",
                                }}
                              />
                            </div>
                            <div className="text-black font-semibold dark:text-white ">
                              {item?.author}
                            </div>
                          </div>
                          <div className="flex flex-col w-4/5 gap-2 ">
                            <span>
                              <Rating
                                name="read-only"
                                value={item?.author_details?.rating / 2}
                                readOnly
                                className="rating-icon"
                              />
                            </span>

                            <a
                              href={item?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-black font-normal cursor-pointer dark:text-white text-base tracking-wide "
                            >
                              {item?.content?.slice(0, 300)} ...read more.
                            </a>

                            <span className="text-black dark:text-gray-500">
                              {new Date(item?.updated_at).toDateString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-black text-base dark:text-white">
                    No reviews yet.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full my-container ">
            {/* recommended content */}
            {data?.recommendations?.results?.length > 0 && (
              <div className="w-full py-8 ">
                <h3 className="text-black dark:text-gray-100 text-2xl pb-4 ">
                  Recommended
                </h3>

                <div className="w-full">
                  <RecommendedContent data={data?.recommendations?.results} />
                </div>
              </div>
            )}

            {/* similar content */}
            {data?.similar?.results.length > 0 && (
              <div className="w-full py-8 ">
                <h3 className="text-black dark:text-gray-100 text-2xl pb-4 ">
                  Similar
                </h3>

                <div className="w-full">
                  <SimilarContent data={data?.similar?.results} />
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <p> No data </p>
      )}
    </section>
  );
};

export default MovieDetails;

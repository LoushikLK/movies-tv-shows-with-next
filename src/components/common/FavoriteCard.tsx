import { Star } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useApiData } from "hooks";
import Image from "next/image";
import Link from "next/link";

const FavoriteCard = ({ type, id }: any) => {
  let API_KEY = "api_key=023e7fa152989334a68b0ed2985b5fb8";

  const apiData = useApiData(
    `https://api.themoviedb.org/3/${String(
      type
    ).toLowerCase()}/${id}?${API_KEY}&append_to_response=videos,images,/watch/providers,similar,recommendations,credits,reviews&language=en-US`
  );

  //   console.log(apiData);

  return (
    <>
      {apiData?.data?.first_air_date ? (
        <Link href={`/details/tv/${apiData?.data.id}`}>
          <a className=" group w-[14rem] relative shadow-[0px_0px_8px_0px_#14b8a6] h-[20rem] cursor-pointer overflow-hidden rounded bg-gray-500 ">
            <div className="w-full h-full ">
              <div className="relative  h-[20rem] w-full ">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/w500" +
                    apiData?.data.poster_path
                  }
                  layout="fill"
                  loading="lazy"
                  alt={
                    apiData?.data?.title ||
                    apiData?.data?.name ||
                    apiData?.data?.original_name ||
                    apiData?.data?.original_title
                  }
                />
              </div>
            </div>
            <div className="absolute group-hover:translate-y-[20%] transition-all ease-in-out duration-300 top-0 translate-y-[75%] left-0 w-full h-full bg-gradient-to-t backdrop-blur-sm from-black to-black/10  p-4 gap-2 flex flex-col ">
              <h3 className="text-white  font-semibold text-base tracking-wide ">
                {apiData?.data?.title ||
                  apiData?.data?.name ||
                  apiData?.data?.original_name ||
                  apiData?.data?.original_title}
                {"  "}
              </h3>

              <span className="flex flex-row items-center text-white justify-between ">
                <Rating
                  sx={{ fontSize: "1.2rem" }}
                  name="read-only"
                  emptyIcon={
                    <Star className="text-gray-500  " fontSize="inherit" />
                  }
                  precision={0.5}
                  value={apiData?.data?.vote_average / 2}
                  readOnly
                />
                <span className="text-sm">
                  {new Date(apiData?.data?.first_air_date).getFullYear()}
                </span>
              </span>

              <span className="text-white text-sm tracking-wide text-clip ">
                {apiData?.data?.overview?.substring(0, 75)}
                <p className="text-xs">...read more</p>
              </span>
            </div>
          </a>
        </Link>
      ) : (
        <Link href={`/details/movie/${apiData?.data.id}`}>
          <a className=" w-[14rem] relative group shadow-[0px_0px_8px_0px_#14b8a6] h-[20rem] cursor-pointer overflow-hidden rounded bg-gray-500 ">
            <div className="w-full h-full  ">
              <div className="relative  h-[20rem] w-full  ">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/w500" +
                    apiData?.data.poster_path
                  }
                  layout="fill"
                  loading="lazy"
                  alt={apiData?.data.title}
                />
              </div>
            </div>
            <div className="absolute group-hover:translate-y-[20%] transition-all ease-in-out duration-300 top-0 translate-y-[75%] left-0 w-full h-full bg-gradient-to-t backdrop-blur-sm from-black to-black/10  p-4 gap-2 flex flex-col ">
              <h3 className="text-white  font-semibold text-base tracking-wide ">
                {apiData?.data?.title ||
                  apiData?.data?.name ||
                  apiData?.data?.original_name ||
                  apiData?.data?.original_title}
              </h3>

              <span className="flex flex-row items-center text-white justify-between ">
                <Rating
                  sx={{ fontSize: "1.2rem" }}
                  name="read-only"
                  emptyIcon={
                    <Star className="text-gray-500  " fontSize="inherit" />
                  }
                  precision={0.5}
                  value={apiData?.data?.vote_average / 2}
                  readOnly
                />
                <span className="text-sm">
                  {new Date(apiData?.data?.release_date).getFullYear()}
                </span>
              </span>

              <span className="text-white text-sm tracking-wide text-clip ">
                {apiData?.data?.overview?.substring(0, 75)}
                <p className="text-xs">...read more</p>
              </span>
            </div>
          </a>
        </Link>
      )}
    </>
  );
};

export default FavoriteCard;

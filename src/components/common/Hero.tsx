import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import React, { useEffect } from "react";

const Hero = ({ data }: any) => {

  // console.log(data);

  const [movieId, setMovieId] = React.useState(0);

  useEffect(() => {

    let timeInterval = setInterval(() => {
      let length = data?.length;
      if (movieId < length - 1) {
        setMovieId(movieId + 1);
      } else {
        setMovieId(0);
      }

    }, 5000);






    return () => {

      clearInterval(timeInterval);

    }

  }, [movieId, data]);

  // console.log(movieId);

  console.log(("Twenty-five years after a streak of brutal murders shocked the quiet town of Woodsboro, a new killer has donned the Ghostface mask and begins targeting a group of teenagers to resurrect secrets from the town’s deadly past.").length);

  return (
    <section
      className="bg-white dark:bg-gray-900 bg-cover bg-center transition-all ease-in-out duration-500  bg-no-repeat  "
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${data && data[movieId]?.backdrop_path
          })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="my-container min-h-[80vh]  flex items-center ">
        <div className="flex flex-col my-[5rem]  md:w-full gap-4 lg:w-2/5 ">
          <h1 className="text-white text-[3rem] md:text-[3.5rem] lg:text-[5rem] font-bold tracking-wide uppercase  ">
            {(data && data[movieId]?.title) ||
              (data && data[movieId]?.original_title) ||
              (data && data[movieId]?.original_name)}
          </h1>

          <p className="text-white text-2xl tracking-wide  ">
            {data && data[movieId]?.overview}
          </p>

          <div className="flex flex-row items-center my-4 gap-4">
            <button className="bg-gray-200 gap-2 hover:bg-gray-300 transition-all ease-in-out duration-300 text-black relative flex items-center  text-[1.3rem] tracking-wide font-bold py-3 px-6 rounded-md">
              <PlayArrow className="text-[2rem]" /> Watch Trailer
            </button>

            <button className="bg-[#009a8952] gap-2 relative flex items-center  text-white hover:bg-[#009a8952]/40 transition-all ease-in-out duration-300 text-[1.3rem] tracking-wide font-bold py-3 px-6 rounded-md">
              <InfoOutlined className="text-[2rem]" /> More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

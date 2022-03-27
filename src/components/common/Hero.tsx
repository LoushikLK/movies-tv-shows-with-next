import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { useDetails } from "hooks";
import Link from "next/link";

import React from "react";

import Slider from "react-slick";

const Hero = ({ data }: any) => {
  const movieSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const getYoutubeVideo = (item: any) => {
    const API_KEY = "AIzaSyCHIbZjybz14jrvYEiJ0NjYZiQY1GrSoNs";

    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${
      item?.title + "trailer" || item?.original_title + "trailer"
    }&key=${API_KEY}`;

    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url);
        const json = await response.json();

        if (json?.items?.length > 0) {
          window.location.href = `https://www.youtube.com/watch?v=${json?.items[0]?.id?.videoId}`;
        }

        console.log(json);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(url);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <Slider {...movieSliderSettings}>
        {data?.map((item: any) => {
          return (
            <div key={item.id}>
              <div
                className=" bg-cover h-full bg-center transition-all ease-in-out duration-500  bg-no-repeat  "
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${
                    data && item?.backdrop_path
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="w-full h-full gradient-bg ">
                  <div className="my-container min-h-[80vh] overflow-hidden  flex items-center ">
                    <div className="flex flex-col my-[5rem]  md:w-full gap-4 lg:w-4/5 ">
                      <h1 className="text-white text-[3rem] md:text-[3.5rem] lg:text-[5rem] font-bold tracking-wide uppercase  ">
                        {(data && item?.title) ||
                          (data && item?.original_title) ||
                          (data && item?.original_name)}
                      </h1>

                      <span className="text-white text-2xl tracking-wide w-3/5 ">
                        {data && item?.overview.substring(0, 220)}
                        <Link
                          href={
                            item?.first_air_date
                              ? `/details/tv/${item.id}`
                              : `/details/movie/${item.id}`
                          }
                        >
                          <a className="text-gray-500 inline ">...read more.</a>
                        </Link>
                      </span>

                      <div className="flex flex-row items-center my-4 gap-4">
                        <button
                          className="bg-gray-200 gap-2 hover:bg-gray-300 transition-all ease-in-out duration-300 text-black relative flex items-center  text-[1.3rem] tracking-wide font-bold py-3 px-6 rounded-md"
                          onClick={() => getYoutubeVideo(item)}
                        >
                          <PlayArrow className="text-[2rem]" /> Watch Trailer
                        </button>

                        <Link
                          href={
                            item?.first_air_date
                              ? `/details/tv/${item.id}`
                              : `/details/movie/${item.id}`
                          }
                        >
                          <a className="bg-[#009a8952] gap-2 relative flex items-center  text-white hover:bg-[#009a8952]/40 transition-all ease-in-out duration-300 text-[1.3rem] tracking-wide font-bold py-3 px-6 rounded-md">
                            <InfoOutlined className="text-[2rem]" /> More Info
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div></div>
      </Slider>
    </section>
  );
};

export default Hero;

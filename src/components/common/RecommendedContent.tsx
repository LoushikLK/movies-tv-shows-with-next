import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";

const RecommendedContent = ({ data }: any) => {
  // console.table(data);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {data?.map((item: any, index: number) => {
        return (
          <div key={index}>
            <div className="flex group items-center justify-center">
              <Link
                href={`${
                  item?.media_type === "movie"
                    ? "/details/movie/" + item.id
                    : "/details/tv/" + item.id
                }`}
              >
                <a className="w-[20rem] relative overflow-hidden bg-gray-500 h-fit ">
                  <div className="w-full">
                    <div className="relative h-[10rem] w-full ">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
                        layout="fill"
                        objectFit="cover"
                        alt="poster"
                      />
                    </div>
                  </div>
                  <div className=" bg-gradient-to-t from-black to-transparent backdrop-blur-sm z-10 items-center px-2 absolute left-0 bottom-0 translate-y-full flex justify-between  group-hover:translate-y-0 ease-in-out duration-300 transition-all w-full">
                    <h3 className="text-white text-lg font-medium w-3/4">
                      {item?.original_title ? item?.title : item.name}
                    </h3>
                    <div className=" w-[4rem] flex flex-col justify-center items-center h-[4rem]  rounded-full border-4 border-teal-500/50 bg-teal-200/25  ">
                      <span className="text-gray-200  dark:text-white text-base font-medium ">
                        {(item?.vote_average * 10).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default RecommendedContent;

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { MovieCard } from "components/card";
import { useApiData } from "hooks";

import React, { useRef } from "react";

type Props = {
  path: any;
  title: string;
};

const ContentContainer = ({ path, title }: Props) => {
  // const [data , setData] = React.useState<any[]>([]);

  const apiData: any = useApiData(path);

  // console.log(apiData?.data?.results[0]?.id);

  const cardContainerRef = useRef<any>(null);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="my-container pt-4 lg:pt-8">
        <div className="flex gap-4 items-center">
          <h1 className="text-teal-500 font-medium text-[1.5rem] lg:text-[2rem] tracking-wide ">
            {title}
          </h1>
          <span className="w-[2rem] h-1 bg-teal-500 "></span>
        </div>

        <div className=" relative p-4   ">
          <div className="absolute left-0 top-1/2 h-full items-center -translate-y-1/2 flex w-full justify-between ">
            <span
              className=" text-teal-500 dark:text-white "
              onClick={() => {
                cardContainerRef?.current?.scrollBy(-300, 0);
              }}
            >
              <ChevronLeft className="cursor-pointer   " />
            </span>
            <span
              className="text-teal-500 dark:text-white"
              onClick={() => {
                cardContainerRef?.current?.scrollBy(300, 0);
              }}
            >
              <ChevronRight className="cursor-pointer   " />
            </span>
          </div>

          <div
            className="content-section-scroll relative z-10 py-4"
            ref={cardContainerRef}
          >
            {apiData?.data?.results?.map((movie: any, index: number) => {
              return (
                <div
                  className="min-w-[21rem] flex items-center justify-center "
                  key={index}
                >
                  <MovieCard moviesDetails={movie} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentContainer;

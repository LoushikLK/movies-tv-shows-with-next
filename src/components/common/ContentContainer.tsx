import { MovieCard } from "components/card";
import { useApiData, useDetails } from "hooks";

import React from "react";

type Props = {
  path: any;
  title: string;
};

const ContentContainer = ({ path, title }: Props) => {
  // const [data , setData] = React.useState<any[]>([]);

  const apiData: any = useApiData(path);

  const tvGenre = useDetails.getGenres("tv");

  const movieGenre = useDetails.getGenres("movie");

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="my-container pt-4 lg:pt-8">
        <div className="flex gap-4 items-center">
          <h1 className="text-teal-500 font-medium text-[1.5rem] lg:text-[2rem] tracking-wide ">
            {title}
          </h1>
        </div>

        <div className=" relative gap-4 grid grid-cols-12 py-4">
          {apiData?.data?.results?.map((movie: any, index: number) => {
            return (
              <div
                className=" xs:col-span-12  col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 flex items-center justify-center "
                key={index}
              >
                <MovieCard
                  moviesDetails={movie}
                  genres={movie?.original_name ? tvGenre : movieGenre}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContentContainer;

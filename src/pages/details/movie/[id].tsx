import { MovieDetails } from "components/details";
import { useApiData } from "hooks";
import Layouts from "layouts";
import { useRouter } from "next/router";
import React from "react";

const Details = () => {
  const routes = useRouter();


  let API_KEY = "api_key=023e7fa152989334a68b0ed2985b5fb8";

  const apiData = useApiData(
    `https://api.themoviedb.org/3/movie/${routes?.query?.id}?${API_KEY}&language=en-US`
  );
  // console.log(apiData);

  return (
    <Layouts title={"Movie Details"}>
      <MovieDetails data={apiData?.data} />
    </Layouts>
  );
};

export default Details;

import Layouts from "layouts";
import { ContentContainer, Hero } from "components/common";
import { useApiData } from "hooks";
import { Loader } from "components/core";

const NewPopular = () => {
  let API_KEY = process?.env?.TMDB_API_KEY;

  const seriesPage = [
    {
      path: `https://api.themoviedb.org/3/trending/all/day?${API_KEY}`,
      title: "Trending Movies And TV Shows On MV",
    },
    {
      path: `https://api.themoviedb.org/3/discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_watch_monetization_types=flatrate`,
      title: "Explore Movies",
    },
    {
      path: `
      https://api.themoviedb.org/3/discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=2&with_watch_monetization_types=flatrate`,
      title: "Discover Movies",
    },
    {
      path: `https://api.themoviedb.org/3/discover/tv?${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
      title: "Explore TV Shows",
    },
    {
      path: `https://api.themoviedb.org/3/discover/tv?${API_KEY}&language=en-US&sort_by=popularity.desc&page=2&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
      title: "Top Rated   TV Shows ",
    },
  ];

  const heroPage = useApiData(
    `https://api.themoviedb.org/3/trending/all/day?${API_KEY}`
  );

  console.log(heroPage);

  return (
    <Layouts title="New And Popular | MV">
      {heroPage?.loading ? (
        <div className="flex items-center w-full h-screen justify-center">
          <Loader height={400} width={400} />
        </div>
      ) : (
        <>
          <Hero data={heroPage?.data?.results} />

          {seriesPage.map((movie, index) => {
            return (
              <ContentContainer
                path={movie.path}
                title={movie.title}
                key={index}
              />
            );
          })}
        </>
      )}
    </Layouts>
  );
};

export default NewPopular;

import Layouts from "layouts";
import { ContentContainer, Hero } from "components/common";
import { useApiData } from "hooks";
import { Loader } from "components/core";

const TvShows = () => {
  let API_KEY = process?.env?.TMDB_API_KEY;

  const seriesPage = [
    {
      path: `https://api.themoviedb.org/3/tv/on_the_air?${API_KEY}&language=en-US&page=1&include_adult=true`,
      title: "Now Playing",
    },
    {
      path: `https://api.themoviedb.org/3/tv/airing_today?${API_KEY}&language=en-US&page=1&include_adult=true`,
      title: "New Arrive TV Shows",
    },
    {
      path: `https://api.themoviedb.org/3/tv/popular?${API_KEY}&language=en-US&page=1&include_adult=true`,
      title: "Popular TV Shows",
    },
    {
      path: `https://api.themoviedb.org/3/tv/top_rated?${API_KEY}&language=en-US&page=1&include_adult=true`,
      title: "Top Rated  TV Shows ",
    },
  ];

  const heroPage = useApiData(
    `https://api.themoviedb.org/3/tv/on_the_air?${API_KEY}&language=en-US&page=1&include_adult=true`
  );

  // console.log(heroPage);

  return (
    <Layouts title="TV Shows | MV">
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

export default TvShows;

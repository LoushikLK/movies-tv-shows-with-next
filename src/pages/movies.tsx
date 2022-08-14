import Layouts from "layouts";
import { ContentContainer, Hero } from "components/common";
import { useApiData } from "hooks";
import { Loader } from "components/core";

const Movies = () => {
  let API_KEY = process?.env?.TMDB_API_KEY;

  const moviePage = [
    {
      path: `https://api.themoviedb.org/3/movie/now_playing?${API_KEY}&language=en-US&page=1&include_adult=true`,
      title: "Now Playing",
    },
    {
      path: `https://api.themoviedb.org/3/movie/popular?${API_KEY}&language=en-US&page=1&include_adult=true`,
      title: "Popular Movies",
    },
    {
      path: `https://api.themoviedb.org/3/movie/top_rated?${API_KEY}&language=en-US&page=1&include_adult=true`,
      title: "Top Rated Movies",
    },
    {
      path: `https://api.themoviedb.org/3/movie/upcoming?${API_KEY}&language=en-US&page=1&include_adult=true`,
      title: "Upcoming Movies",
    },
  ];

  const heroPage = useApiData(
    `https://api.themoviedb.org/3/movie/now_playing?${API_KEY}&language=en-US&page=1&include_adult=true`
  );

  // console.log(heroPage);

  return (
    <Layouts title="Movies | MV">
      {heroPage?.loading ? (
        <div className="flex items-center w-full h-screen justify-center">
          <Loader height={400} width={400} />
        </div>
      ) : (
        <>
          <Hero data={heroPage?.data?.results} />

          {moviePage.map((movie, index) => {
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

export default Movies;

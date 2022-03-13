import Layouts from "layouts";
import { ContentContainer, Hero } from "components/common";
import { useApiData } from "hooks";

export default () => {
  let API_KEY = "api_key=023e7fa152989334a68b0ed2985b5fb8";

  const moviePage = [
    {
      path: `https://api.themoviedb.org/3/movie/now_playing?${API_KEY}&language=en-US&page=1`,
      title: "Now Playing",
    },
    {
      path: `https://api.themoviedb.org/3/movie/popular?${API_KEY}&language=en-US&page=1`,
      title: "Popular Movies",
    },
    {
      path: `https://api.themoviedb.org/3/movie/top_rated?${API_KEY}&language=en-US&page=1`,
      title: "Top Rated Movies",
    },
    {
      path: `https://api.themoviedb.org/3/movie/upcoming?${API_KEY}&language=en-US&page=1`,
      title: "Upcoming Movies",
    },
  ];

  const heroPage = useApiData(
    `https://api.themoviedb.org/3/movie/now_playing?${API_KEY}&language=en-US&page=1`
  );

  console.log(heroPage);

  return (
    <Layouts title="Movies | MV">
      <Hero data={heroPage?.data?.results} />

      {moviePage.map((movie, index) => {
        return (
          <ContentContainer path={movie.path} title={movie.title} key={index} />
        );
      })}
    </Layouts>
  );
};

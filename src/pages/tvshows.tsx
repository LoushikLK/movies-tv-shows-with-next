import Layouts from "layouts";
import { ContentContainer, Hero } from "components/common";
import { useApiData } from "hooks";

export default () => {
  let API_KEY = "api_key=023e7fa152989334a68b0ed2985b5fb8";

  const seriesPage = [
    {
      path: `https://api.themoviedb.org/3/tv/on_the_air?${API_KEY}&language=en-US&page=1`,
      title: "Now Playing",
    },
    {
      path: `https://api.themoviedb.org/3/tv/airing_today?${API_KEY}&language=en-US&page=1`,
      title: "New Arrive TV Shows",
    },
    {
      path: `https://api.themoviedb.org/3/tv/popular?${API_KEY}&language=en-US&page=1`,
      title: "Popular TV Shows",
    },
    {
      path: `https://api.themoviedb.org/3/tv/top_rated?${API_KEY}&language=en-US&page=1`,
      title: "Top Rated  TV Shows ",
    },
  ];

  const heroPage = useApiData(
    `https://api.themoviedb.org/3/tv/on_the_air?${API_KEY}&language=en-US&page=1`
  );

  console.log(heroPage);

  return (
    <Layouts title="TV Shows | MV">
      <Hero data={heroPage?.data?.results} />

      {seriesPage.map((movie, index) => {
        return (
          <ContentContainer path={movie.path} title={movie.title} key={index} />
        );
      })}
    </Layouts>
  );
};

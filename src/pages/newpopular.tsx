import Layouts from "layouts";
import { ContentContainer, Hero } from "components/common";
import { useApiData } from "hooks";

const NewPopular = () => {
  let API_KEY = "api_key=023e7fa152989334a68b0ed2985b5fb8";

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
      <Hero data={heroPage?.data?.results} />

      {seriesPage.map((movie, index) => {
        return (
          <ContentContainer path={movie.path} title={movie.title} key={index} />
        );
      })}
    </Layouts>
  );
};

export default NewPopular;

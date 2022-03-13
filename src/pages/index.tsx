import { ContentContainer, Hero } from "components/common";
import { useApiData } from "hooks";
import Layouts from "layouts";

const Home = () => {
  let API_KEY = "api_key=023e7fa152989334a68b0ed2985b5fb8";
  let trendingMovies = `https://api.themoviedb.org/3/trending/all/day?${API_KEY}`;
  let popularMovies = `https://api.themoviedb.org/3/movie/popular?${API_KEY}&language=en-US&page=1`;
  let popularShows = `https://api.themoviedb.org/3/tv/popular?${API_KEY}&language=en-US&page=1`;

  let hero = `https://api.themoviedb.org/3/movie/now_playing?${API_KEY}&language=en-US&page=1S`;

  const heroPage = useApiData(hero);

  console.log(heroPage);

  return (
    <Layouts title="Home MV">
      <Hero data={heroPage?.data?.results} />

      <ContentContainer
        path={`https://api.themoviedb.org/3/trending/all/day?${API_KEY}`}
        title={"Trending Movies On MV"}
      />
      <ContentContainer
        path={`https://api.themoviedb.org/3/movie/popular?${API_KEY}&language=en-US&page=1`}
        title={"Popular Tv Shows On MV"}
      />
      <ContentContainer
        path={`https://api.themoviedb.org/3/tv/popular?${API_KEY}&language=en-US&page=1`}
        title={"Popular Movies On MV"}
      />
    </Layouts>
  );
};

export default Home;

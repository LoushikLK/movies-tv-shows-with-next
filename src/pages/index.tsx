import Animation from "assets/animations";
import { ContentContainer, Hero } from "components/common";
import { useApiData } from "hooks";
import Layouts from "layouts";

const Home = () => {
  let API_KEY = "api_key=023e7fa152989334a68b0ed2985b5fb8";
  // let trendingMovies = `https://api.themoviedb.org/3/trending/all/day?${API_KEY}`;
  // let popularMovies = `https://api.themoviedb.org/3/movie/popular?${API_KEY}&language=en-US&page=1`;
  // let popularShows = `https://api.themoviedb.org/3/tv/popular?${API_KEY}&language=en-US&page=1`;

  let hero = `https://api.themoviedb.org/3/movie/now_playing?${API_KEY}&language=en-US&page=1S&include_adult=true`;

  const heroPage = useApiData(hero);

  // console.log(heroPage);

  return (
    <Layouts title="Home MV">
      {heroPage?.loading ? (
        <div className="flex items-center w-full h-screen justify-center">
          <Animation.LoadingAnimation className="h-20 w-20" />
        </div>
      ) : (
        <>
          <Hero data={heroPage?.data?.results} />

          <ContentContainer
            path={`https://api.themoviedb.org/3/trending/all/day?${API_KEY}&include_adult=true`}
            title={"Popular on MovieHub"}
          />
          <ContentContainer
            path={`https://api.themoviedb.org/3/movie/popular?${API_KEY}&language=en-US&page=1&include_adult=true`}
            title={"Popular Movies On MovieHub"}
          />
          <ContentContainer
            path={`https://api.themoviedb.org/3/tv/popular?${API_KEY}&language=en-US&page=1&include_adult=true`}
            title={"Popular TV Shows On MovieHub"}
          />
        </>
      )}
    </Layouts>
  );
};

export default Home;

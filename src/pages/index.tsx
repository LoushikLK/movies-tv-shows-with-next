import { ContentContainer, Hero } from "components/common";
import { Loader } from "components/core";
import { useApiData } from "hooks";
import Layouts from "layouts";

const Home = () => {
  const API_KEY = process?.env?.TMDB_API_KEY;

  let hero = `https://api.themoviedb.org/3/movie/now_playing?${API_KEY}&language=en-US&page=1S&include_adult=true`;

  const heroPage = useApiData(hero);

  // console.log(heroPage);

  return (
    <Layouts title="Home MV">
      {heroPage?.loading ? (
        <div className="flex items-center w-full h-screen justify-center">
          <Loader height={400} width={400} />
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

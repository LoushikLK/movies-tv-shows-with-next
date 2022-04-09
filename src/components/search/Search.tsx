import { useState } from "react";
import { Search } from "@mui/icons-material";
import SearchCard from "./SearchCard";
import { useApiData } from "hooks";

const SearchArea = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const url = `https://api.themoviedb.org/3/search/multi?api_key=023e7fa152989334a68b0ed2985b5fb8&language=en-US&query=${searchKeyword}&page=1&include_adult=true&`;

  const { data, loading, error } = useApiData(url);

  // console.log(data);

  return (
    <section className="h-screen overflow-y-auto  top-auto    w-full fixed  left-0 z-20 flex justify-center backdrop-blur-lg  ">
      <div className="dark:bg-white/10    flex flex-col items-center bg-gray-900/20 relative top-0  w-fit h-full overflow-y-auto px-8  ">
        <div className="flex w-full shadow-lg  items-center my-4 sticky top-0 z-50 py-4 rounded-md  bg-white h-11  dark:bg-gray-900 ">
          <button className="ml-2">
            <Search className=" text-teal-500 h-8 w-8 " />
          </button>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className=" bg-transparent dark:text-white focus:outline-none md:w-[500px] w-full pl-4 "
            placeholder="Search for movies,tv shows..."
          />
        </div>

        <div className="w-full   flex flex-col gap-2 ">
          {data && data?.results?.length > 0 ? (
            data?.results?.map((result: any, index: any) => {
              return <SearchCard key={index} result={result} />;
            })
          ) : searchKeyword === "" ? (
            <p className="w-full text-center text-base capitalize text-white font-medium">
              Please enter a search term
            </p>
          ) : (
            <p className="w-full text-center text-base capitalize text-white font-medium">
              No results found
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchArea;

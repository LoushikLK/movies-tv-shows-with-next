import React from "react";

type Genre = "movie" | "tv";

const getGenres = (type: Genre) => {
  let API_KEY = "api_key=023e7fa152989334a68b0ed2985b5fb8";

  const [data, setData] = React.useState<any>({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(null);

  const fetchData = async (type: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/${type}/list?${API_KEY}&language=en-US`
      );
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData(type);
  }, []);

  return { data, loading, error };
};
const getCast = (type: Genre, id: number) => {
  let API_KEY = "api_key=023e7fa152989334a68b0ed2985b5fb8";

  const [data, setData] = React.useState<any>({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(null);

  const url = `https://api.themoviedb.org/3/${type}/${id}/credits?${API_KEY}&language=en-US`;

  console.log(url);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

const useDetails = {
  getGenres,
  getCast,
};

export default useDetails;

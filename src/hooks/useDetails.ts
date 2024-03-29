import { useEffect, useState } from "react";

type Genre = "movie" | "tv";

const useGenres = (type: Genre) => {
  let API_KEY = "api_key=023e7fa152989334a68b0ed2985b5fb8";

  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

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

  useEffect(() => {
    fetchData(type);
  }, [type]);

  return { data, loading, error };
};

const useYoutubeData = (title: any) => {
  const API_KEY = "AIzaSyCHIbZjybz14jrvYEiJ0NjYZiQY1GrSoNs";

  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${
    title + "trailer"
  }&key=${API_KEY}`;

  const fetchData = async (url: string) => {
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

  useEffect(() => {
    fetchData(url);
  }, [title]);

  return { data, loading, error };
};

const useDetails = {
  useGenres,
  useYoutubeData,
};

export default useDetails;

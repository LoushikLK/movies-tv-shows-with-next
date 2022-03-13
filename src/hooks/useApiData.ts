import React from "react";

const useApiData = (url: any) => {
  const [data, setData] = React.useState<any>({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(null);

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

  React.useEffect(() => {
    fetchData(url);
  }, []);

  return { data, loading, error };
};

export default useApiData;

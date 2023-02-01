import { useState, useEffect } from "react";

export const useFetchData = (url = "") => {
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    const getFetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Http status ${response.status}`);
        }
        const data = await response.json();
        setFetchData(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getFetchData();
  }, [url]);

  return fetchData;
};

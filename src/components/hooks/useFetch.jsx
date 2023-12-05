import { useEffect, useState } from "react";


  const useFetch = (url, refetch) => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {

    setPending(true)
    setTimeout(() => {
     
      fetch(url, {
        method: "GET",
        // credentials: "include",
        headers: { "Content-Type": "application/json" }
      })
        .then((response) => {
          if (!response.ok) {
            throw Error("could not fetch the data");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setPending(false);
          setError(null);
        })
        .catch((err) => {
          setPending(false);
          setError(err.message);
        })
    }, 1000);
    clearTimeout();
  }, [url, refetch]);


  return { data, pending, error };
};


export default useFetch;

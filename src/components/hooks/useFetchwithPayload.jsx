import { useEffect, useState } from "react";


  const useFetchwithPayload = (url, refetch, payload = null) => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    setPending(true)
    if (payload !== null){

      setTimeout(() => {
        fetch(url, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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
    }
  }, [url, refetch]);


  return { data, pending, error };
};


export default useFetchwithPayload;

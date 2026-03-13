import { useState, useEffect } from 'react';
 
export function useFetch(fetchFn, deps = []) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
 
  useEffect(() => {
    setLoading(true);
    fetchFn()
      .then(res => setData(res.data.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, deps);
 
  return { data, loading, error };
}
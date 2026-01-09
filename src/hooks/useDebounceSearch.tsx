import React, { useEffect, useState } from "react";

const useDebounceSearch = (query: string, delay: number) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(query);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return searchTerm;
};

export default useDebounceSearch;

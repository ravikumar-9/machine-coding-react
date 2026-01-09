import { useCallback, useEffect, useState } from "react";
import SearchableMultiSelect from "../components/custom_input/searchable_multiselect";
import type { User } from "../types";
import useDebounceSearch from "../hooks/useDebounceSearch";
import React from "react";

const Multiselectwithsearch = () => {
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounceSearch(searchTerm, 500);

  const fetchUsers = useCallback(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }
    fetch(`https://dummyjson.com/users/search?q=${debouncedSearchTerm}`)
      .then((response) => response?.json())
      .then((data) => setSuggestions(data?.users))
      .catch((error) => {
        console.log(error);
      });
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearchTerm]);

  return (
    <div>
      <SearchableMultiSelect
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        suggestions={suggestions}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    </div>
  );
};

export default Multiselectwithsearch;

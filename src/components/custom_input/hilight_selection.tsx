import { ChevronDown, ChevronUp, Loader, Search } from "lucide-react";
import React, { useEffect, useState, type ChangeEvent } from "react";
import useDebounceSearch from "../../hooks/useDebounceSearch";
import TextHighlight from "./text-highlight";
import type { Recipe } from "../../types";

const SearchbleFilter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loader, setLoader] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const debouncedSearchTerm = useDebounceSearch(searchTerm, 500);

  const getRecipesList = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${debouncedSearchTerm}`
      );
      const data = await response?.json();
      setRecipes(data?.recipes || []);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipesList();
  }, [debouncedSearchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e);
    if (e.key === "Backspace" && selectedRecipe) {
      setSelectedRecipe("");
    } else if (
      e.key === "ArrowDown" &&
      recipes?.length > 0 &&
      activeSuggestion < recipes?.length
    ) {
      setActiveSuggestion((prev) => prev + 1);
    } else if (
      e.key === "ArrowUp" &&
      recipes?.length > 0 &&
      activeSuggestion > 0
    ) {
      setActiveSuggestion((prev) => prev - 1);
    } else if (e.key === "Enter") {
      setSelectedRecipe(recipes[activeSuggestion]?.name);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Dropdown Trigger */}
      <div className="relative w-96">
        <div
          className="flex items-center justify-between border border-slate-300 rounded-lg bg-white shadow-md px-4 py-2 cursor-pointer hover:shadow-lg transition"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="text-slate-500">
            {selectedRecipe !== "" ? selectedRecipe : "Select a recipe..."}
          </span>
          {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
        </div>

        {/* Dropdown Content */}
        {isDropdownOpen && (
          <div className="absolute mt-2 w-full bg-white border border-slate-200 shadow-2xl rounded-xl max-h-96 overflow-y-auto z-20">
            {/* Search Bar */}
            <div className="sticky top-0 bg-white shadow-sm p-2 border-b border-slate-100 flex items-center rounded-t-xl">
              <Search className="absolute ml-3 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
              />
            </div>

            {/* Recipe List */}
            <ul className="list-none py-2">
              {loader ? (
                <span className="flex items-center justify-center w-full">
                  loading <span className="animate-ping">......</span>
                </span>
              ) : recipes.length === 0 ? (
                <li className="p-3 text-slate-500 text-center text-sm">
                  No recipes found
                </li>
              ) : (
                recipes.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedRecipe(item?.name)}
                    className={
                      item?.name === selectedRecipe ||
                      index === activeSuggestion
                        ? "bg-purple-500 text-white px-4 py-3 cursor-pointer text-sm transition"
                        : "px-4 py-3 cursor-pointer text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
                    }
                  >
                    <TextHighlight text={item?.name} query={searchTerm} />
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchbleFilter);

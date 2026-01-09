import { Loader } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

const InfiniteScrolling = () => {
  const [skip, setSkip] = useState(0);
  const [recipesList, setRecipesList] = useState<Recipe[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const limit = 10;

  const fetchRecipes = useCallback(
    async (currentSkip: number) => {
      if (isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://dummyjson.com/recipes?limit=${limit}&skip=${currentSkip}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const { recipes, total } = data;

        if (!Array.isArray(recipes) || !Number.isInteger(total)) {
          throw new Error("Invalid API response");
        }

        setRecipesList((prev) =>
          currentSkip === 0 ? recipes : [...prev, ...recipes]
        );
        setTotal(total);
        setHasMore(currentSkip + recipes.length < total);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, limit]
  );

  // Load more recipes
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const newSkip = recipesList.length;
      setSkip(newSkip);
      fetchRecipes(newSkip);
    }
  }, [isLoading, hasMore, recipesList.length, fetchRecipes]);

  useEffect(() => {
    fetchRecipes(0);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "20px",
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader && hasMore) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore, hasMore]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Collection</h1>

      <div className="border border-gray-200 rounded-lg p-4 h-96 overflow-y-auto bg-white">
        {error && (
          <div className="text-red-500 text-center p-4 bg-red-50 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipesList.map((recipe: Recipe) => (
            <div
              key={recipe.id}
              className="border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Cuisine: {recipe.cuisine}</p>
                <p>Difficulty: {recipe.difficulty}</p>
                <p>
                  Prep: {recipe.prepTimeMinutes}min | Cook:{" "}
                  {recipe.cookTimeMinutes}min
                </p>
                <p>Servings: {recipe.servings}</p>
                <p>
                  Rating: {recipe.rating}/5 ({recipe.reviewCount} reviews)
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Loader - Always rendered when there are more items */}
        {hasMore && (
          <div
            ref={loaderRef}
            className="flex justify-center items-center py-8"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader className="animate-spin h-5 w-5" />
                <span>Loading more recipes...</span>
              </div>
            ) : (
              <div className="text-gray-500">Scroll for more recipes</div>
            )}
          </div>
        )}

        {/* End message */}
        {!hasMore && recipesList.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>🍽️ You've seen all {total} recipes!</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && recipesList.length === 0 && !error && (
          <div className="text-center py-8 text-gray-500">
            No recipes found.
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScrolling;

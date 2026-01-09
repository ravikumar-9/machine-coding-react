import { useInfiniteQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import React, { useCallback, useEffect, useRef } from "react";

const InfiniteScrollingWithReactQuery = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const fetchRecipes = useCallback(async (params: any) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes?limit=10&skip=${params?.pageParam}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["receipes"],
    queryFn: fetchRecipes,
    initialPageParam: 0,
    getNextPageParam: (nextPage) => {
      const { skip, total, limit } = nextPage;
      const nextSkip = skip + limit;
      return nextSkip < total ? nextSkip : undefined;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const isInserted = entries[0]?.isIntersecting;
      if (isInserted) {
        fetchNextPage();
      }
    });

    if (ref.current && hasNextPage) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasNextPage]);

  return (
    <div className="flex flex-col items-center p-4 overflow-y-auto h-96 my-45 border max-w-3xl mx-auto rounded-lg border-slate-400 bg-white">
      <div className="grid grid-cols-2 gap-4">
        {data?.pages
          ?.flatMap((page) => page.recipes)
          ?.map((item, index) => (
            <div
              className="p-4 bg-white shadow-lg border border-blue-100 cursor-pointer"
              key={index}
            >
              <img
                src={item?.image}
                alt="thumbnail"
                className="rounded-md transition-all duration-300 hover:scale-105"
              />
              <p className="font-bold text-md">{item?.name}</p>
              <div className="text-sm mt-2 space-y-1 text-gray-700">
                <p>cuisine: {item?.cuisine}</p>
                <p className="flex items-center">
                  Rating: {item?.rating}
                  <Star className="w-4 h-4 ml-2 text-amber-400 bg-white" />
                </p>
                <p>Reviews : {item?.reviewCount}</p>
                <p>Prep Time(min): {item?.prepTimeMinutes}</p>
                <p className="font-semibold">Tags:</p>
                <div className="grid grid-cols-2 gap-2">
                  {item?.tags?.map((tag: string, i: number) => (
                    <button
                      key={i}
                      className="bg-white border border-slate-200 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="p-3" ref={ref}>
        {!hasNextPage
          ? `you have senn all ${
              data?.pages?.flatMap((page) => page.recipes)?.length
            } recipes`
          : "loading....."}
      </div>
    </div>
  );
};

export default InfiniteScrollingWithReactQuery;

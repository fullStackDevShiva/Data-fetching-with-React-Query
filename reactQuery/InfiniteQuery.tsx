"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UserData } from "@/types/allTypes";
import ItemList from "@/components/ItemList";

export default function InfiniteQuery() {
  const MAX_PAGE_LIMIT = 100;

  const fetchUsersInfinite = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<UserData> => {
    try {
      const response = await fetch(
        `http://dummyjson.com/users?page=${pageParam}&limit=${MAX_PAGE_LIMIT}&skip=${
          (pageParam - 1) * MAX_PAGE_LIMIT
        }`
      ); // as per dummyjson API, need to set page, limit and skip values
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const userData = response.json();
      console.log(userData);
      return userData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinite_list"],
    queryFn: fetchUsersInfinite,
    initialPageParam: 1,
    //when the API returns a cursor use the following function definition
    // getNextPageParam: (lastPage, pages) => lastPage.nextCursor,

    //if the API doesn't return a cursor, we can use the pageParam as a cursor as follows
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.users?.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    // getNextPageParam: (lastPage, allPages) => {
    //   if (lastPage.length === 0) {
    //     return undefined;
    //   }
    //   return allPages.length + 1;
    // },
  });

  console.log(data);

  if (isError) return <p className="mt-20">Error: {error.message}</p>;
  if (isLoading) return <p className="mt-20">Loading...</p>;

  return (
    <div className="infinite-list">
      {data && data?.pages ? (
        <div className="infinite-list-item">
          <p className="text-sm text-center">
            <span className="font-bold">Infinite loading</span> - 8 items per
            fetch
          </p>

          {data?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {/* Using ItemList component to render the list */}
              <ItemList users={page.users} />
            </React.Fragment>
          ))}
          <div className="load-more-btns w-full flex justify-center mt-8">
            <button
              className="btn btn-small btn-green-outline"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </button>
          </div>
        </div>
      ) : (
        <p>Users not found!</p>
      )}
    </div>
  );
}

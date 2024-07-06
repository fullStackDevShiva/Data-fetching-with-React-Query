"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { User } from "../types/allTypes";
import ItemList from "../components/ItemList";
import React from "react";

const pageLimit = 8;

export default function InfiniteQuery() {
  const fetchUsersInfinite = async ({ pageParam }: { pageParam: number }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/users?_page=${pageParam}&_limit=${pageLimit}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["infinite-list"],
    queryFn: fetchUsersInfinite,
    initialPageParam: 0,
    //when the API returns a cursor use the following function definition
    // getNextPageParam: (lastPage, pages) => lastPage.nextCursor,

    //if the API doesn't return a cursor, we can use the pageParam as a cursor as follows
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  return (
    <div className="infinite-list">
      {status === "pending" ? (
        <p className="mt-20">Loading...</p>
      ) : status === "error" ? (
        <p className="mt-20">Error: {error.message}</p>
      ) : (
        <div className="infinite-list-item">
          <p className="text-sm text-center">
            <span className="font-bold">Infinite</span> - loading 8 items per
            fetch
          </p>

          {data.pages.map((users: User[], index) => (
            <React.Fragment key={index}>
              {/* Using ItemList component to render the list */}
              <ItemList users={users} />
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
          {/* <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div> */}
        </div>
      )}
    </div>
  );
}

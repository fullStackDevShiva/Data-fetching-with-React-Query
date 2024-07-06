"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "../types/allTypes";
import ItemList from "../components/ItemList";

//type for the query response
interface PaginatedData {
  data: User[];
  next: number | null;
  prev: number | null;
  pages: number | null;
}

async function fetchUsersPaginated(page: number): Promise<PaginatedData> {
  try {
    const response = await fetch(`http://localhost:5000/users?_page=${page}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // console.log(response.json());
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default function PaginatedQuery() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["paginated_query", page],
    queryFn: () => fetchUsersPaginated(page),
    keepPreviousData: true,
  });

  return (
    <div className="paginated-list">
      {isLoading ? (
        <p className="mt-20">Loading...</p>
      ) : isError ? (
        <p className="mt-20">Error: {error.message}</p>
      ) : (
        <div className="paginated-list-items">
          <p className="text-sm text-center">
            <span className="font-bold">Paginated</span> - page {page} of{" "}
            {data?.pages} pages
          </p>

          {/* Using ItemList component to render the list */}
          <ItemList users={data.data} />

          <div className="pages-btns w-full justify-center mt-8">
            <button
              className="btn btn-small btn-green-outline mr-6"
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
            >
              Previous Page
            </button>

            {/* <span className="mx-6 inline-flex rounded-full p-2 text-xs font-bold bg-transparent text-gray-700 border border-gray-700">
              {page}
            </span> */}
            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              {page}
            </span>

            <button
              className="btn btn-small btn-green-outline ml-6"
              onClick={() =>
                setPage((old) => (data.next != null ? old + 1 : old))
              }
              disabled={data.next == null}
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

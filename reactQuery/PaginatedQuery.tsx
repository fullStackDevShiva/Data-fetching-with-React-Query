"use client";

import { useState } from "react";
import { User, UserData } from "../types/allTypes";
import { useQuery } from "@tanstack/react-query";
import UserCard from "../components/UserCard";

const PaginatedQuery = () => {
  const [page, setPage] = useState(1);
  const MAX_PAGE_LIMIT = 8; // setting page limit 8

  const fetchUsersPaginated = async (page: number): Promise<UserData> => {
    try {
      const response = await fetch(
        `http://dummyjson.com/users?page=${page}&limit=${MAX_PAGE_LIMIT}&skip=${
          (page - 1) * MAX_PAGE_LIMIT
        }`
      ); // as per dummyjson API, we need to set page, limit and skip values to fetch paginated list
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["paginated_list", page],
    queryFn: () => fetchUsersPaginated(page),
    keepPreviousData: true,
  });

  if (isError) return <p className="mt-20">Error: {error.message}</p>;
  if (isLoading) return <p className="mt-20">Loading...</p>;

  return (
    <div className="paginated-list">
      {data && data?.users?.length > 0 ? (
        <div className="paginated-list-items">
          <p className="text-sm text-center">
            <span className="font-bold">Paginated</span> - page {page} of{" "}
            {Math.ceil(data.total / data.limit)} pages
          </p>

          {/* Using UserCard component to render the user details */}
          <div className="user-list w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-4">
            {data.users.map((user: User) => {
              return <UserCard user={user} key={user.id} />;
            })}
          </div>

          <div className="pages-btns flex w-full justify-center items-center mt-8">
            <button
              className="btn btn-small btn-green-outline mr-6"
              onClick={() => setPage((page) => page - 1)}
              disabled={page === 1}
            >
              Previous Page
            </button>
            <span className="bg-blue-100 text-blue-800 text-sm font-bold px-4 py-2 rounded dark:bg-blue-900 dark:text-blue-300">
              {page}
            </span>

            <button
              className="btn btn-small btn-green-outline ml-6"
              onClick={() => setPage((page) => page + 1)}
              disabled={page === Math.ceil(data.total / data.limit)}
            >
              Next Page
            </button>
          </div>
        </div>
      ) : (
        <p>Users not found!</p>
      )}
    </div>
  );
};

export default PaginatedQuery;

"use client";

import { User, UserData } from "@/types/allTypes";
import { useQuery } from "@tanstack/react-query";
import UserCard from "../components/UserCard";

const BasicQuery = () => {
  const fetchUsersBasic = async (): Promise<UserData> => {
    try {
      const response = await fetch("http://dummyjson.com/users?limit=0"); // as per dummyjson API, need to set limit=0 to fetch all data
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["basic_list"],
    queryFn: fetchUsersBasic,
  });

  if (isError) return <p className="mt-20">Error: {error.message}</p>;
  if (isLoading) return <p className="mt-20">Loading...</p>;

  return (
    <div className="basic-list">
      {data && data?.users?.length > 0 ? (
        <>
          <p className="text-sm text-center">
            <span className="font-bold">Basic list</span> - all{" "}
            {data.users.length} users
          </p>
          {/* Using UserCard component to render user details */}
          <div className="user-list w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-4">
            {data.users.map((user: User) => {
              return <UserCard user={user} key={user.id} />;
            })}
          </div>
        </>
      ) : (
        <p>Users not found!</p>
      )}
    </div>
  );
};

export default BasicQuery;

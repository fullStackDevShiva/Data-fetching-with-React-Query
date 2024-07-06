"use client";

import { useQuery } from "@tanstack/react-query";
import ItemList from "../components/ItemList";

export default function BasicQuery() {
  const fetchUsersBasic = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response);
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { data, error, status } = useQuery({
    queryKey: ["basic_list"],
    queryFn: fetchUsersBasic,
  });

  return (
    <div className="basic-list">
      <p className="text-sm text-center">
        <span className="font-bold">Basic</span> - {data?.length} items
      </p>
      <div>
        {status === "error" && <div className="mt-20">{error.message}</div>}

        {status === "pending" && <div className="mt-20">Loading...</div>}

        {/* Using ItemList component to render the list */}
        {status === "success" && <ItemList users={data} />}
      </div>
    </div>
  );
}

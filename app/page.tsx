"use client";

import { useState } from "react";
import BasicQuery from "../reactQuery/BasicQuery";
import PaginatedQuery from "../reactQuery/PaginatedQuery";
import InfiniteQuery from "../reactQuery/InfiniteQuery";

export default function Home() {
  const [displayflag, setDisplayFlag] = useState<
    "Basic" | "Paginated" | "Infinite"
  >("Basic");

  return (
    <div className="page-layout">
      <h3 className="text-center mb-3">React Query Data Fetching</h3>

      <div className="btn-group w-full mt-3 mb-4 text-center">
        <button
          className="btn btn-small btn-green-outline m-1"
          onClick={() => setDisplayFlag("Basic")}
          disabled={displayflag === "Basic"}
        >
          Basic list
        </button>
        <button
          className="btn btn-small btn-green-outline m-1"
          onClick={() => setDisplayFlag("Paginated")}
          disabled={displayflag === "Paginated"}
        >
          Paginated list
        </button>

        <button
          className="btn btn-small btn-green-outline m-1"
          onClick={() => setDisplayFlag("Infinite")}
          disabled={displayflag === "Infinite"}
        >
          Infinite list
        </button>
      </div>
      <div className="user-list-sec w-full text-center">
        {displayflag === "Basic" && <BasicQuery />}
        {displayflag === "Paginated" && <PaginatedQuery />}
        {displayflag === "Infinite" && <InfiniteQuery />}
      </div>
    </div>
  );
}

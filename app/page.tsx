"use client";

import { useState } from "react";
import BasicQuery from "../reactQuery/BasicQuery";
import PaginatedQuery from "../reactQuery/PaginatedQuery";
import InfiniteQuery from "../reactQuery/InfiniteQuery";

export default function Home() {
  const [displayflag, setDisplayFlag] = useState<
    "_BASIC_" | "_PAGINATED_" | "_INFINITE_"
  >("_BASIC_");

  return (
    <div className="page-layout">
      <h4 className="text-center">React Query Data Fetching</h4>

      <div className="btn-group w-full mt-3 mb-4 text-center">
        <button
          className="btn btn-small btn-green-outline m-1"
          onClick={() => setDisplayFlag("_BASIC_")}
          disabled={displayflag === "_BASIC_"}
        >
          Basic List
        </button>
        <button
          className="btn btn-small btn-green-outline m-1"
          onClick={() => setDisplayFlag("_PAGINATED_")}
          disabled={displayflag === "_PAGINATED_"}
        >
          Paginated List
        </button>

        <button
          className="btn btn-small btn-green-outline m-1"
          onClick={() => setDisplayFlag("_INFINITE_")}
          disabled={displayflag === "_INFINITE_"}
        >
          Infinite List
        </button>
      </div>
      <div className="user-list-sec w-full text-center">
        {displayflag === "_BASIC_" && <BasicQuery />}
        {displayflag === "_PAGINATED_" && <PaginatedQuery />}
        {displayflag === "_INFINITE_" && <InfiniteQuery />}
      </div>
    </div>
  );
}

"use client";

import { User } from "../types/allTypes";
import Image from "next/image";

// A common component to render all the users
const ItemList = ({ users }: { users: User[] }) => {
  return (
    <div className="user-list w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-4">
      {users?.map((user: User) => {
        return (
          <div className="card text-center items-center" key={user.id}>
            <Image
              src="/profile.jpg"
              width={70}
              height={70}
              className="inline object-contain mb-0.5 relative self-center bg-white border-2 rounded-full border-yellow-300 border-solid"
              alt="Profile image"
            />
            <p className="font-bold text-emerald-400">
              <span className="mr-2">{user.firstName}</span>
              {user.lastName}
            </p>
            <p className="text-xs font-semibold mt-1">Age - {user.age}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;

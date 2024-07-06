"use client";

import { User } from "../types/allTypes";
import Image from "next/image";

// A common component to render all the users lists
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
              style={{
                objectFit: "contain",
                display: "unset",
                borderRadius: 50,
                background: "#fff",
                borderWidth: 2,
                borderColor: "yellow",
                borderStyle: "solid",
                textAlign: "center",
                alignSelf: "center",
                marginBottom: 2,
                fontSize: 12,
                position: "relative",
              }}
              alt="Profile image"
            />
            <p className="font-bold text-emerald-400">
              <span className="mr-2">{user.first_name}</span>
              {user.last_name}
            </p>
            <p className="text-xs overflow-hidden">{user.email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;

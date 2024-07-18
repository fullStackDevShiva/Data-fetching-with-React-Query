"use client";

import { User } from "../types/allTypes";
import Image from "next/image";

// A common component to render user details
const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="card text-center items-center">
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
};

export default UserCard;

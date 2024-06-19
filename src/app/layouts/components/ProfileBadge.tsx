"use client";
import { AppAssets } from "@/constants/assets";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../DashboardLayout";

export default function ProfileBadge() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center">
      <div className="relative bg-secondary rounded-full w-10 h-10 overflow-hidden">
        <Image
          src={user?.profile_image ?? AppAssets.avatar}
          fill={true}
          className="rounded-full"
          alt=""
        />
      </div>
      <div className="ml-2">
        <div className="text-[14px] text-primary font-bold capitalize">
          {user?.full_name}
        </div>
        <div className="text-xs text-gray-500 -mt-1">HR</div>
      </div>
    </div>
  );
}

"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState("");

  const getUserData = async () => {
    try {
      const res = await axios("/api/users/me");
      setData(res?.data?.data?._id);
      if(res.data.success){
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }
    } catch (error: any) {
      console.log(error.message);
      toast(error.message);
    }
  };
  const logout = async () => {
    try {
      await axios("/api/users/logout");
      toast.success("logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-5">
      <h1>Profile Page</h1>
      <Link href={`/profile/${data}`}>
        UserData : {data ? (data) : "Nothing"}
        {data && <span> &larr; click here</span>}
      </Link>
      <button
        className="block max-w-3xl rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={getUserData}
      >
        Get User Data
      </button>
      <button
        className="block max-w-3xl rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;

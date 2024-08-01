"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Verifyemail = () => {
  // const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false)
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    // basic method for get value in url
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // nextjs method for get value in url
    // const { query } = router;
    // const urlToken = query.token;
    // setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return <div className="flex flex-col justify-center items-center min-h-screen py-2">
    <h1 className="text-4xl">Verify Email Process: </h1>
    <h2 className="p-2 bg-orange-500 text-black ">
      Token: {token ? `${token}`:"No Token"}
    </h2>
{
  verified && (
    <div className="mt-10"> 
      <h2 className="text-2xl">You Are Verified</h2>
      <Link href="/login" className="mt-4 bg-green-500 py-2 px-4 rounded block text-center">Login</Link>
    </div>
  )
}
{
  error && (
    <div> 
      <h2>Error</h2>
    </div>
  )
}
  </div>;
};

export default Verifyemail;

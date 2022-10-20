import React from "react";
import getGoogleOAuthUrl from "./getGoogleUrl";

export default function googleAuth() {
  return (
    <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
      <a href={getGoogleOAuthUrl()}>Login with Google</a>
    </button>
  );
}

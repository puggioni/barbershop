import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleAuth() {
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
      <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
        Google
      </button>{" "}
    </GoogleOAuthProvider>
  );
}

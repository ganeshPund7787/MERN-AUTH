import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";

const OAtuth = () => {
  const handleClick = () => {
    try {
    } catch (error) {}
  };
  return (
    <button
      onClick={handleClick}
      type={"button"}
      className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 disabled:bg-red-400 disabled:cursor-not-allowed uppercase"
    >
      Continue with Google
    </button>
  );
};

export default OAtuth;

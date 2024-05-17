import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  signinFail,
  signinStart,
  signinSuccess,
} from "../App/userFeature/userSlice.js";

const OAtuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const handleClick = async () => {
    try {
      const Provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, Provider);
      const user = result.user;

      dispatch(signinStart());
      const res = await fetch("/api/user/googleAuth", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          username: user.displayName,
          email: user.email,
          profileImage: user.photoURL,
        }),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signinFail());
        toast.error(data.message, {
          duration: 2000,
          style: {
            borderRadius: "10px",
            color: "#000",
            backgroundColor: "#fff",
          },
        });
        return;
      }

      if (data) {
        navigate("/");
        dispatch(signinSuccess(data));
        toast.success(`welcome , ${data.username}`, {
          duration: 2000,
          style: {
            borderRadius: "10px",
            color: "#000",
            backgroundColor: "#fff",
          },
        });
      }
    } catch (error) {
      dispatch(signinFail());
      toast.error(error.message, {
        duration: 2000,
        style: {
          borderRadius: "10px",
          color: "#000",
          backgroundColor: "#fff",
        },
      });
    }
  };
  return (
    <button
      onClick={handleClick}
      type={"button"}
      disabled={loading}
      className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 disabled:bg-red-400 disabled:cursor-not-allowed uppercase"
    >
      {loading ? `LOADING...` : `Continue with Google`}
    </button>
  );
};

export default OAtuth;

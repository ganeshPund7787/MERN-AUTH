import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteUser,
  logoutUser,
  toggleEdit,
} from "../App/userFeature/userSlice";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { currentUser, isEditable } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const userConfirmed = confirm(
        "Are you sure you want to delete your profile?"
      );
      if (!userConfirmed) {
        toast.error("err while delete account", {
          duration: 3000,
          style: {
            color: "#333",
            backgroundColor: "#fff",
          },
        });
        return;
      }

      const responce = await fetch(`/api/user/${currentUser._id}`, {
        method: "delete",
      });
      const data = await responce.json();
      toast.success(data.message, {
        duration: 3000,
        style: {
          color: "#333",
          backgroundColor: "#fff",
        },
      });

      dispatch(deleteUser());
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const userConfirmed = confirm(
        "Are you sure you want to logout your profile?"
      );
      if (!userConfirmed) {
        toast.error("err while delete account", {
          duration: 3000,
          style: {
            color: "#333",
            backgroundColor: "#fff",
          },
        });
        return;
      }

      const responce = await fetch(`/api/user/logout`);

      const data = await responce.json();
      toast.success(data.message, {
        duration: 3000,
        style: {
          color: "#333",
          backgroundColor: "#fff",
        },
      });

      dispatch(logoutUser());
    } catch (error) {}
  };

  const handleClick = () => {
    dispatch(toggleEdit());
  };
  return (
    <>
      {isEditable ? (
        <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-24 w-auto rounded-full"
              src={currentUser.profileImage}
              alt="Your Company"
              title="logo"
            />
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div className="mt-2">
                <input
                  name="username"
                  type="text"
                  defaultValue={currentUser.username}
                  autoComplete="additional-name"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900
                 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                 outline-none "
                />
              </div>

              <div className="mt-2">
                <input
                  name="email"
                  readOnly
                  type="email"
                  value={currentUser.email}
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900
                 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                 outline-none"
                />
              </div>

              <div className="mt-2">
                <input
                  placeholder="Change Password"
                  name="password"
                  readOnly
                  type="text"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900
                 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                 outline-none"
                />
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleClick}
                  className="disabled:bg-indigo-400 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit Button
                </button>
              </div>
            </form>
            <div
              className={`mt-6 flex justify-between ${
                isEditable ? "hidden" : "flex"
              }`}
            >
              <button onClick={handleDelete}>delete Profile</button>
              <button onClick={handleLogout}>Log out</button>
            </div>
          </div>
        </div>
      ) : (
        //
        //
        //

        //

        //
        //

        <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-24 w-auto rounded-full"
              src={currentUser.profileImage}
              alt="Your Company"
              title="logo"
            />
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <div className="mt-2">
                  <input
                    id="email"
                    name="username"
                    type="text"
                    defaultValue={currentUser.username}
                    readOnly
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900
                 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                 outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="email"
                    defaultValue={currentUser.email}
                    readOnly
                    type="email"
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900
                 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                 outline-none"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleClick}
                  className="disabled:bg-indigo-400 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit Button
                </button>
              </div>
            </form>
            <div
              className={`mt-6 flex justify-between ${
                currentUser ? "flex" : "hidden"
              }`}
            >
              <button onClick={handleDelete}>delete Profile</button>
              <button onClick={handleLogout}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

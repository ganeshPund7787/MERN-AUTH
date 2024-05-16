import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-24 w-auto"
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
              className="disabled:bg-indigo-400 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit Button
            </button>
          </div>
        </form>
        <div className="mt-6 flex justify-between">
          <p>
            <Link>delete Profile</Link>
          </p>
          <p>
            <Link>update Profile</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

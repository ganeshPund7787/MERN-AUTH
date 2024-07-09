import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { app } from "../firebase";
import {
  deleteUser,
  logoutUser,
  toggleEdit,
  signinStart,
  signinSuccess,
} from "../App/userFeature/userSlice";
import { toast } from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  list,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Profile = () => {
  const { currentUser, isEditable } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePer] = useState(0);
  const [uploadFileError, setuploadFileError] = useState(false);

  // console.log("filePer", filePer);
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageref = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageref, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (error) => {
        setuploadFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, profileImage: downloadUrl });
        });
      }
    );
  };

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

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      dispatch(signinStart());
      e.preventDefault();
      const res = await fetch(`/api/user/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        toast.error(data.message, {
          duration: 3000,
          style: {
            color: "#000",
            backgroundColor: "#fff",
          },
        });
        dispatch(toggleEdit());
        dispatch(signinFail());
        return;
      }

      if (data) {
        dispatch(signinSuccess(data));
        dispatch(toggleEdit());
        toast.success("User update successfully", {
          duration: 3000,
          style: {
            color: "#000",
            backgroundColor: "#fff",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    dispatch(toggleEdit());
  };
  return (
    <>
      {isEditable ? (
        <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              hidden
              ref={fileRef}
            />
            <img
              onClick={() => fileRef.current.click()}
              className="mx-auto h-24 w-24 rounded-full"
              src={currentUser.profileImage}
              alt="Your Company"
              title="logo"
            />
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mt-2">
                <input
                  name="username"
                  type="text"
                  defaultValue={currentUser.username}
                  onChange={handleOnChange}
                  autoComplete="additional-name"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900
                  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                  outline-none "
                />
              </div>

              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  onChange={handleOnChange}
                  defaultValue={currentUser.email}
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

              <div className="flex justify-between gap-5">
                <button
                  type="submit"
                  className="disabled:bg-indigo-400 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleClick}
                  className="disabled:bg-indigo-400 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Cancle
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        //
        //

        <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-24 w-24 rounded-full"
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
                  type="button"
                  onClick={handleClick}
                  className="disabled:bg-indigo-400 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit Button
                </button>
              </div>
            </form>
            <div className="flex justify-between mt-5">
              <button type="button" onClick={handleDelete}>
                delete Profile
              </button>
              <button type="button" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

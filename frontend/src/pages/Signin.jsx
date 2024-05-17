import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import OAtuth from "../components/OAtuth";
import {
  signinFail,
  signinStart,
  signinSuccess,
} from "../App/userFeature/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(signinStart());
      const responce = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await responce.json();
      console.log(data);
      if (data.success === false) {
        toast.error(data.message, {
          duration: 3000,
          style: {
            color: "#000",
            backgroundColor: "#fff",
          },
        });
        dispatch(signinFail());
        return;
      }

      if (data) {
        dispatch(signinSuccess(data));
        navigate("/");
        toast.success(`welcome , ${data.username}`, {
          duration: 3000,
          style: {
            color: "#000",
            backgroundColor: "#fff",
          },
        });
      }
    } catch (error) {
      dispatch(signinFail());
      toast.error(error.message, {
        duration: 3000,
        style: {
          color: "#000",
          backgroundColor: "#fff",
        },
      });
    }
  };

  return (
    <>
      <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 uppercase">
            Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  onChange={handleData}
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="disabled:bg-indigo-400 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "LOADING..." : "SIGN IN"}
              </button>
            </div>

            <hr />

            <div>
              <OAtuth />
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            New member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;

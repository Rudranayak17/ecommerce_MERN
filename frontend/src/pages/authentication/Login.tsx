import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { login } from "../../action/userActions";
import { useAppDispatch, useAppSelector } from "../../hook";
import toast from "react-hot-toast";


const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated, user } = useAppSelector(
    (state) => state.user
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Use async/await if login function returns a Promise
    try {
      dispatch(login(formData));

      // Handle success or navigate to a different page
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
     
    }

    if (isAuthenticated) {
      toast.success(`hi ${user?.user.name as string}`);
      navigate("/")
    }
  }, [error, user, isAuthenticated,navigate,dispatch]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" mx-auto w-96 min-h-3/5 bg-[#111827] rounded-lg p-8 text-white">
        <p className="text-center text-2xl font-bold mb-6">Login</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border text-black border-gray-700 rounded focus:outline-none focus:border-purple-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 border  text-black border-gray-700 rounded focus:outline-none focus:border-purple-500"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="flex justify-end text-sm">
              <Link to="/forget" className="text-gray-400">
                Forgot Password ?
              </Link>
            </div>
          </div>
          <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
            Sign in
          </button>
        </form>
        <div className="mt-8">
          <div className="flex items-center">
            <div className="flex-grow bg-gray-700 h-0.5"></div>
            <p className="mx-4 text-gray-400">Login with social accounts</p>
            <div className="flex-grow bg-gray-700 h-0.5"></div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              aria-label="Log in with Google"
              className="icon bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current text-white"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
          </div>
        </div>
        <p className="text-center mt-6 text-sm text-gray-400">
          Don't have an account?
          <Link to="/register" className="ml-1 text-purple-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

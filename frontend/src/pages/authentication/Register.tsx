import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook';
import { register } from '../../action/userActions';
import toast from 'react-hot-toast';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState<string | null>(null);
  
  const { error, isAuthenticated, user } = useAppSelector((state) => state.user);

 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: null as File | null,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(register(formData));
      setFormData({
        email:"",
        password:"",
        avatar:null ,
        name:""
      })
      // Handle success or navigate to a different page
    } catch (error) {
      console.error(error);
    }
  };


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
  
      reader.readAsDataURL(file);
  
      setFormData({
        ...formData,
        avatar: file, // or you can use reader.result directly if needed
      });
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

  }, [error, user, isAuthenticated,navigate,dispatch,formData]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="mx-auto w-96 min-h-3/5 bg-[#111827] rounded-lg p-8 text-white">
        <p className="text-center text-2xl font-bold mb-6">Registration</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="w-14 flex mx-auto items-center overflow-hidden">
            <img
              className="rounded-full"
              src={userImage || 'https://pluspng.com/img-png/user-png-icon-young-user-icon-2400.png'}
              alt="userProfile"
              
            />
          </div>
          <input name='avatar'   type="file" onChange={handleImageChange} />

          <div className="space-y-2">
            <label htmlFor="name" className="block text-gray-300">
              User Name
            </label>
            <input
              required
              type="text"
              name="name"
              id="name"
              placeholder="Please enter your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black border-gray-700 rounded focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-300">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Please enter your Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black border-gray-700 rounded focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-300">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black border-gray-700 rounded focus:outline-none focus:border-purple-500"
            />
          </div>

          <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
           register
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Already have an account? <Link to="/login" className="ml-1 text-purple-500">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;



import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff, User, Lock, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserData  {
  username?: string;
  lastName?: string;
  email: string;
  gender?: string;
  photoUrl?: string | null;
  // Add other user properties as needed
};

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setusername] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate('/');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setLoginError(
        axiosError.response?.data?.message || 'Something went wrong'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
    
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/signup`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      dispatch(addUser(res.data));
      navigate('/');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setLoginError(
        axiosError.response?.data?.message || 'Something went wrong'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent): void => {
    if (isLogin) {
      handleLogin(e);
    } else {
      handleSignUp(e);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    // Add forgot password logic here
    console.log('Forgot password clicked');
  };

  return (
    <div className="w-full h-screen  bg-[#4880FF] flex items-center justify-center p-4 py-10 relative  ">
      {/* Animated background elements */}
       

      {/* Main login container */}
      <div className="relative z-10 w-full max-w-md">
      

        {/* Login/Signup form */}
        <div className="bg-[#FFFFFF] backdrop-blur-sm border border-gray-100 rounded-3xl px-8 py-14 shadow-2xl shadow-black/10">
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-6">
              {<h3 className=' text-center font-bold text-2xl'>{isLogin?"Login to Account":"Create an Account"}</h3>}
              <span className=' text-center font-medium text-[#3f3e3e] text-sm'>{isLogin?"Please enter your email and password to continue":"Create an account to continue"}</span>
              {!isLogin && (
                <>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setusername(e.target.value)}
                      className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>

              
                </>
              )}

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="Enter your password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-black transition-colors duration-200" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-black transition-colors duration-200" />
                    )}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="text-red-600 text-sm text-center">{loginError}</div>
              )}

              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
                >
                  {isLogin ? <p>Don’t have an account? <span className=' text-blue-500 font-semibold  hover:underline active:underline-blue-300 scale-100 hover:scale-95 duration-200 delay-100 cursor-pointer ease-out'>Create Account</span></p> : <p>Already have an account? <span
                  className=' text-blue-500 font-semibold  hover:underline active:underline-blue-300 scale-100 hover:scale-95 duration-200 delay-100 cursor-pointer ease-out'
                  > Login</span> </p>}
                </button>
                {/* {isLogin && (
                  <a
                    href="#"
                    onClick={handleForgotPassword}
                    className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    Forgot password?
                  </a>
                )} */}
              </div>
                <div className=' w-full flex justify-center'>
              <button
                type="submit"
                disabled={isLoading}
                className="w-3/4 bg-[#4880FF] text-white py-3 px-4 rounded-2xl font-medium hover:bg-[#487fffee] focus:outline-none focus:ring focus:ring-black focus:ring-offset-2 transition-all duration-200 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Sign Up'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
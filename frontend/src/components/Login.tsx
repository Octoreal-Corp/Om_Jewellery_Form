

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff, User, Lock, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserData  {
  firstName?: string;
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
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
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
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('gender', gender);
    
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
    <div className="w-full h-full flex items-center justify-center p-4 py-10 relative  ">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-black/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-black/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-black/2 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main login container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-2xl mx-auto mb-4 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600 text-sm">
            {isLogin ? 'Sign in to your account to continue' : 'Join our community today'}
          </p>
        </div>

        {/* Login/Signup form */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-2xl shadow-black/10">
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-6">
              {!isLogin && (
                <>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                      className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                      className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setGender(e.target.value)}
                      className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring focus:ring-black focus:border-transparent transition-all duration-200 text-gray-700"
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
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
                  {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                </button>
                {isLogin && (
                  <a
                    href="#"
                    onClick={handleForgotPassword}
                    className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    Forgot password?
                  </a>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 px-4 rounded-2xl font-medium hover:bg-neutral-900 focus:outline-none focus:ring focus:ring-black focus:ring-offset-2 transition-all duration-200 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed mt-4"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
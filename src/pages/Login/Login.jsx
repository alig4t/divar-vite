import { useEffect, useState } from 'react';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiShield } from 'react-icons/fi';

import BottomNav from '../../components/Navbar/BottomNav';
import apiService from '../../config';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const isSignUp = location.pathname === '/signup';

  useEffect(() => {
    const currentSession = apiService.getSession();
    setSession(currentSession);

    const { unsubscribe } = apiService.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await apiService.signUp(formData.email, formData.password);
      } else {
        await apiService.signIn(formData.email, formData.password);
      }
    } catch (err) {
      setError(err.message || 'خطا در احراز هویت');
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="flex justify-between items-center">
          <Typography 
            variant="h4" 
            className="text-pink-500 font-bold cursor-pointer hover:text-pink-600 transition-colors"
            onClick={() => navigate('/')}
          >
            دیــــوار
          </Typography>
          <Button
            variant="text"
            color="pink"
            onClick={() => navigate('/')}
            className="text-pink-500 hover:text-pink-600 hover:bg-pink-50"
          >
            بازگشت به خانه
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 py-20">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500 rounded-full mb-4 shadow-lg">
              {isSignUp ? (
                <FiUser className="w-8 h-8 text-white" />
              ) : (
                <FiShield className="w-8 h-8 text-white" />
              )}
            </div>
            <Typography variant="h3" color="blue-gray" className="mb-2 font-bold text-gray-800">
              {isSignUp ? 'خوش آمدید!' : 'خوش برگشتید!'}
            </Typography>
            <Typography color="gray" className="text-base text-gray-600">
              {isSignUp 
                ? 'برای شروع، حساب کاربری خود را ایجاد کنید'
                : 'برای ادامه، وارد حساب کاربری خود شوید'
              }
            </Typography>
          </div>

          {/* Form Card */}
          <Card className="p-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-r mb-6 flex items-center">
                <FiShield className="w-5 h-5 ml-2" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-pink-400" />
                </div>
                <Input
                  type="email"
                  name="email"
                  label="آدرس ایمیل"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  size="lg"
                  className="!border-pink-200 focus:!border-pink-500 !pr-10"
                  labelProps={{
                    className: "before:content-none after:content-none text-pink-600",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-pink-400" />
                </div>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-pink-400 hover:text-pink-600 focus:outline-none transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="رمز عبور"
                  placeholder="رمز عبور خود را وارد کنید"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  size="lg"
                  className="!border-pink-200 focus:!border-pink-500 !pr-10 !pl-10"
                  labelProps={{
                    className: "before:content-none after:content-none text-pink-600",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-pink-500 hover:bg-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                loading={loading}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                    در حال بررسی...
                  </div>
                ) : (
                  isSignUp ? 'ایجاد حساب کاربری' : 'ورود به حساب'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-pink-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-pink-500">یا</span>
              </div>
            </div>

            {/* Switch Form Type */}
            <div className="text-center">
              <Typography color="gray" className="text-sm text-gray-600">
                {isSignUp ? 'قبلاً حساب کاربری دارید؟' : 'حساب کاربری ندارید؟'}
              </Typography>
              <Button
                variant="text"
                onClick={() => navigate(isSignUp ? '/login' : '/signup')}
                className="font-medium text-pink-500 hover:text-pink-600 hover:bg-pink-50 p-1 mt-1 transition-colors"
              >
                {isSignUp ? 'وارد شوید' : 'ثبت نام کنید'}
              </Button>
            </div>
          </Card>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
            <Typography variant="small" color="blue-gray" className="text-center text-pink-700">
              <strong>نکته:</strong> برای تست، از هر ایمیل و رمز عبوری استفاده کنید
            </Typography>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Login;
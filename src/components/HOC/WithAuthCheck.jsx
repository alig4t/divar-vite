

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../config';

const WithAuthCheck = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function checkAuth() {
        try {
          const session = apiService.getSession();
          if (!session) {
            navigate('/login', { replace: true });
          } else {
            setUserLogin(session.user);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          navigate('/login', { replace: true });
        } finally {
          setLoading(false);
        }
      }

      checkAuth();
    }, [navigate]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
        </div>
      );
    }

    return userLogin ? <WrappedComponent {...props} user={userLogin} /> : null;
  };
};

export default WithAuthCheck;
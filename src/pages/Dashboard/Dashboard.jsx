
import { useEffect, useState } from 'react';
import { Button, Card } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { PiNewspaperClippingLight } from "react-icons/pi";

import DashboardLayout from '../../components/Layout/DashboardLayout';
import WithAuthCheck from '../../components/HOC/WithAuthCheck';
import apiService from '../../services/api';

const Dashboard = (props) => {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      // Get all posts and filter by author (in a real app, this would be done server-side)
      const allPosts = await apiService.getPosts();
      const userPosts = allPosts.filter(post => post.author === props.user.id);
      setMyPosts(userPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await apiService.signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      navigate('/');
    }
  }

  const renderMyPosts = () => {
    if (loading) {
      return (
        <div className='w-full flex justify-center items-center min-h-56'>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
        </div>
      );
    }

    if (myPosts.length === 0) {
      return (
        <div className='w-full flex flex-col gap-3 items-center justify-center text-center border-2 border-gray-100 p-4 rounded-lg min-h-56'>
          <PiNewspaperClippingLight className='text-8xl' />
          <p className='font-bold opacity-40'>در حال حاضر آگهی ثبت‌شده ندارید.</p>
          <Link to={'/new'}>
            <Button variant="gradient" color='indigo' className='text-sm'>
              ثبت آگهی
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className='max-w-full overflow-x-auto flex lg:flex-col gap-2 py-2 list-scroll2'>
        {myPosts.map((item) => (
          <Link 
            key={item.id}
            to={`/v/${item.code}/${item.title.replace(/\s+|\/|\u200C/g, '-').toLowerCase()}`}
          >
            <Card className="min-w-80 overflow-hidden cursor-pointer shadow-sm">
              <div className="w-full h-full flex items-center justify-between pl-2 md:px-3 py-3 border-2 border-gray-50 hover:border-blue-gray-100 transition">
                <div className="px-3 py-2 pb-0 min-h-32 overflow-hidden flex flex-col justify-between gap-2">
                  <h2 className="text-14 md:text-16 font-bold md:font-extrabold line-clamp-2">
                    {item.title}
                  </h2>
                  <div className="flex flex-col gap-0.5 text-gray-600 align-bottom text-12 md:text-14">
                    <p className="line-clamp-1">
                      {Number(item.postDetail?.price[0]?.value).toLocaleString() + " " + "تومان"}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 self-center bg-blue-gray-50 rounded-md">
                  <img 
                    src={item.images?.[0] || ''} 
                    alt={item.title}
                    className="w-32 h-32 rounded-md object-cover"
                  />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout signOut={signOut}>
      <div className='flex flex-col lg:flex-row gap-5 items-start m-auto max-w-7xl p-4'>
        <div className='w-full'>
          <div className='w-full font-bold text-sm border-b-2 border-pink-400 my-4 pb-2'>
            <p>آگهی های شما :</p>
          </div>
          {renderMyPosts()}
        </div>

        <div className='w-full'>
          <div className='w-full font-bold text-sm border-b-2 border-pink-400 my-4 pb-2'>
            <p>آگهی های نشان شده :</p>
          </div>
          <div className='w-full flex flex-col gap-3 items-center justify-center text-center border-2 border-gray-100 p-4 rounded-lg min-h-56'>
            <PiNewspaperClippingLight className='text-8xl' />
            <p className='font-bold opacity-40'>در حال حاضر آگهی نشان شده ندارید.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithAuthCheck(Dashboard);
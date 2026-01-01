import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';

import Layout from '../../components/Layout/Layout';
import Breadcrumbs from '../../components/Single/Breadcrumbs';
import Carousel from '../../components/Single/Carousel';
import Content from '../../components/Single/Content';
import StickyTell from '../../components/Single/StickyTell';
import apiService from '../../services/api';

const Single = () => {
  const { code } = useParams();
  const [post, setPost] = useState({ id: 0, title: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getPost() {
    try {
      const data = await apiService.getPostByCode(code);
      if (data) {
        setPost(data);
      } else {
        setError('Post not found');
      }
    } catch (err) {
      setError('Failed to load post');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPost();
  }, [code]);

  if (loading) {
    return (
      <Layout page="single">
        <div className='w-full h-screen flex justify-center items-center'>
          <Spinner className="h-10 w-10" color='pink' />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout page="single">
        <div className='w-full h-screen flex justify-center items-center'>
          <div className='text-center'>
            <h2 className='text-xl font-bold mb-4'>خطا در بارگذاری آگهی</h2>
            <p className='text-gray-600'>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout page="single">
      <div className='m-auto max-w-5xl relative'>
        <Breadcrumbs cat={post.category} postTitle={post.title} />
        <div className="w-full grid grid-cols-1 md:grid-cols-11 md:gap-5 px-3 md:px-6">
          <div className='order-2 md:order-1 md:col-span-6 py-4 px-4 md:pl-10 flex flex-col gap-10'>
            <Content
              title={post.title}
              desc={post.description}
              info={post.postDetail} 
              location={post.location}
            />
          </div>
          <div className='order-1 md:order-2 md:col-span-5 py-4'>
            <Carousel imgs={post.images} />
          </div>
        </div>
      </div>
      <StickyTell />
    </Layout>
  );
};

export default Single;
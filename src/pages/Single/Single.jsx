import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import Breadcrumbs from '../../components/Single/Breadcrumbs';
import Carousel from '../../components/Single/Carousel';
import Content from '../../components/Single/Content';
import StickyTell from '../../components/Single/StickyTell';

import { supabase } from '../../config';
import { Spinner } from '@material-tailwind/react';



const Single = () => {

    const { code, title } = useParams()
    const [post, setPost] = useState({ id: 0, title: "" })
    const [catBread, setCatBread] = useState([])

    const [loading, setLoading] = useState(true)

    async function getPost() {
        const { data } = await supabase
            .from('posts')
            .select("*")
            .eq('code', code)
        setPost(data[0]);
        setLoading(false)

    }


    useEffect(() => {
        getPost()
    }, [])

    return (

        <Layout page="single">
            <div className='m-auto max-w-5xl relative'>

                {loading ? (
                    <div className='w-full h-screen flex justify-center items-center'>
                        <Spinner className="h-10 w-10 " color='pink' />
                    </div>

                ) : (
                    <>
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
                    </>
                )}


            </div>
            <StickyTell />
        </Layout>

    );
}

export default Single;
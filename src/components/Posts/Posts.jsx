import React from 'react';

import {
    Button,
    Card
} from "@material-tailwind/react";

import { Link, useSearchParams } from "react-router-dom";
import PostSkeleton from "../UI/PostSkeleton";
import { useEffect, useState } from "react";
import { useStateContext } from "../../context/SiteContext";
import { supabase } from '../../config';
import { showDate } from '../../helper/Helper';


const Posts = () => {

    const now = new Date()
    
    const [queryStirng] = useSearchParams();
    const { currentCat } = useStateContext()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    // useEffect(() => {
    //     setLoading(true)
    //     setTimeout(() => {
    //         setLoading(false)
    //         window.scrollBy({ top: -20, behavior: "smooth" })
    //     }, 1000);
    // }, [queryStirng, currentCat])

    console.log(error);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, [queryStirng, currentCat]);

    async function getPosts() {
        setLoading(true)
        const { data, error } = await supabase.from("posts")
        .select()
        .order('created_at',{ascending:false})
        console.log(error);
        setTimeout(() => {
            if (!error) {
                console.log(data);
                setPosts(data);
                setLoading(false)
                setError(null)
                window.scrollBy({ top: -20, behavior: "smooth" })
            } else {
                setError(error)
                setLoading(false)
            }
        }, 500);
    }




    return (

        <>



            <div className="w-full  grid grid-cols-1 lg:grid-cols-2  gap-x-5 gap-y-3 lg:gap-y-5">

                {loading ? (
                    <>

                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                    </>
                ) : (
                    <>
                        {
                            error ? (
                                <div className='w-full col-span-2 h-screen text-center mt-12'>
                                    <h6 className=' font-bold'>خطا در برقراری ارتباط</h6>
                                    <Button variant='outlined' size='sm' color='pink' className='my-3'
                                        onClick={getPosts}
                                    >تلاش مجدد</Button>
                                </div>
                            ) :
                                posts?.map((item) => {
                                    let time = new Date(item.created_at)
                                    return (
                                        <div className="" key={item.code}>
                                            <Link to={`/v/${item.code}/${item.title.replace(/\s+|\/|\u200C/g, '-').toLowerCase()}`}>
                                                <Card className="min-w-80 overflow-hidden cursor-pointer shadow-sm">
                                                    <div className="w-full h-full flex items-center justify-between pl-2 md:px-3 py-3 border-2 border-gray-50 hover:border-blue-gray-100 transition">
                                                        <div className="px-3 py-2 pb-0 min-h-32 overflow-hidden flex flex-col justify-between gap-2">

                                                            <h2 className="text-14 md:text-16 font-bold md:font-extrabold line-clamp-2">
                                                                {item.title}
                                                            </h2>
                                                            <div className="flex flex-col gap-0.5  text-gray-600 align-bottom text-12 md:text-14">
                                                                <p className="line-clamp-1">

                                                                    {
                                                                        item.postDetail.status ? item.postDetail.status.type === 'number'?
                                                                        Number(item.postDetail.status.value).toLocaleString() + " " + item.postDetail.status.unit
                                                                        : item.postDetail.status.value
                                                                        :null
                                                                    }
                                                                </p>
                                                                <p className="line-clamp-1">
                                                                    {Number(item.postDetail?.price[0]?.value).toLocaleString() + " " + "تومان"}


                                                                </p>
                                                                <p className="line-clamp-1">
                                                                    
                                                                    {showDate(item.created_at) + " در "}  {item.location?.mahale}
                                                                    
                                                                    </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex-shrink-0 self-center bg-blue-gray-50 rounded-md">
                                                            <img src={item.images? item.images[0] : ''}
                                                                className="w-32 h-32 rounded-md object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </div>
                                    )
                                })
                        }
                    </>
                )}


            </div>


        </>
    );
}

export default React.memo(Posts);
import React from 'react';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

// import Ads from "../../JsonFiles/Ads.json"
import { Link, useLocation, useSearchParams } from "react-router-dom";
import PostSkeleton from "../UI/PostSkeleton";
import { useEffect, useState } from "react";
import { useStateContext } from "../../context/SiteContext";
import { supabase } from '../../config';


const Posts = () => {

    const [queryStirng] = useSearchParams();
    const { currentCat } = useStateContext()
    const [loading, setLoading] = useState(false)
    // useEffect(() => {
    //     setLoading(true)
    //     setTimeout(() => {
    //         setLoading(false)
    //         window.scrollBy({ top: -20, behavior: "smooth" })
    //     }, 1000);
    // }, [queryStirng, currentCat])



    const [posts, setPosts] = useState([]);
    console.log(posts);

    useEffect(() => {
        setLoading(true)
        getPosts();
      
        setTimeout(() => {
            setLoading(false)
            window.scrollBy({ top: -20, behavior: "smooth" })
        }, 500);
      
    }, [queryStirng, currentCat]);

    async function getPosts() {
        const { data } = await supabase.from("posts").select();
        setPosts(data);
        // console.log(data);
    }




    return (

        <>
            {/* 
            <div className="w-full">
                فیلترها
            </div> */}




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
                            posts?.map((item) => {
                                return (
                                    <div className="" key={item.code}>
                                        <Link to={`/v/${item.code}/${item.title.replace(/\s+|\//g, '-').toLowerCase()}`}>
                                            <Card className="min-w-80 overflow-hidden cursor-pointer shadow-sm">
                                                <div className="w-full h-full flex items-center justify-between pl-2 md:px-3 py-3 border-2 border-gray-50 hover:border-blue-gray-100 transition">
                                                    <div className="px-3 py-2 pb-0 min-h-32 overflow-hidden flex flex-col justify-between gap-2">

                                                        <h2 className="text-14 md:text-16 font-bold md:font-extrabold line-clamp-2">
                                                            {item.title}
                                                        </h2>
                                                        <div className="flex flex-col gap-0.5  text-gray-600 align-bottom text-12 md:text-14">
                                                            <p className="line-clamp-1"> 0 کیلومتر </p>
                                                            <p className="line-clamp-1"> 111,111,111 تومان </p>
                                                            <p className="line-clamp-1">نمایشگاه در ستارخان</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0 self-center bg-blue-gray-50 rounded-md">
                                                        <img src={item.images[0]}
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
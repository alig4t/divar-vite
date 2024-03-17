import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import Breadcrumbs from '../../components/Single/Breadcrumbs';
import Carousel from '../../components/Single/Carousel';
import Content from '../../components/Single/Content';
import StickyTell from '../../components/Single/StickyTell';

import Ads from "../../JsonFiles/Ads.json"



const Single = () => {

    const { code, title } = useParams()
    const [post, setPost] = useState({ id: 0, title: "" })
    const [catBread, setCatBread] = useState([])

    useEffect(() => {
        let sing = Ads.find((item) => item.code === code)
        setPost(sing)
    }, [])

    return (
       
            <Layout>
                <div className='m-auto max-w-5xl relative'>

                    <Breadcrumbs />

                    <div className="w-full grid grid-cols-1 md:grid-cols-11 md:gap-5 px-3 md:px-6">
                        <div className='order-2 md:order-1 md:col-span-6 py-4 px-4 md:pl-10 flex flex-col gap-10'>
                            <Content title={post.title} />
                        </div>
                        <div className='order-1 md:order-2 md:col-span-5 py-4'>
                            <Carousel />
                        </div>
                    </div>
                </div>
                <StickyTell />
            </Layout >
        
    );
}

export default Single;
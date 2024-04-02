
import React, { useEffect } from 'react';
import { useParams, useSearchParams, useLocation, useNavigate } from "react-router-dom"
import Layout from '../../components/Layout/Layout';

import { useStateContext } from '../../context/SiteContext';
import { checkValidCat, checkValidCities, navToLocalCityAndCat } from '../../helper/Helper';


import Posts from '../../components/Posts/Posts';
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from '../../components/Navbar/Navbar';
import PostNav from '../../components/Navbar/PostNav';
import WrongUrlAlert from '../../components/UI/WrongUrlAlert';

// import { hasGrantedAllScopesGoogle } from '@react-oauth/google';



const Home = () => {


    const { city, cat } = useParams()
    const [queryStirng] = useSearchParams();
    let citiesString = queryStirng.get('cities')
    const navigate = useNavigate()
    const location = useLocation()


    const { currentCity, setCityHandler, currentCat, setCatHandler } = useStateContext()

    useEffect(() => {

        let [validUrl, cityListArray, ids] = checkValidCities(city, queryStirng.get('cities'))
        if (validUrl) {
            let idsStr = (ids.sort()).join("");
            setCityHandler(ids, cityListArray)
        } else {
            let url = navToLocalCityAndCat()
            navigate(url, { state: { wrong: true, type: "city" } })
        }

    }, [city, citiesString])


    useEffect(() => {
        let ValidCat = true;
        let catObj = {};
        let catSlug = (cat === undefined) ? '' : cat

        if (catSlug !== currentCat.slug) {
            [ValidCat, catObj] = checkValidCat(cat)
            if (ValidCat) {
                setCatHandler(catObj)
            } else {
                let url = navToLocalCityAndCat()
                navigate(url, { state: { wrong: true, type: "cat" } })
            }
        }

    }, [cat])



    return (
        <Layout page="index" className="">
            <div className='flex items-start m-auto max-w-7xl'>
                <Sidebar />
                <div className="w-full px-3 md:px-6 py-6 min-h-screen">

                    <PostNav />
                    <Posts />

                </div>

                {location.state !== null ? location.state.wrong ? <WrongUrlAlert currentCity={currentCity} currentCat={currentCat} type={location.state.type} /> : "" : ""}

            </div>
        </Layout>
    )
}

export default Home;
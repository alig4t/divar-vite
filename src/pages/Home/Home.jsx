
import React, { useContext, useEffect } from 'react';
import { useParams, useSearchParams, useLocation, useNavigate } from "react-router-dom"
import Layout from '../../components/Layout/Layout';

import CityList from "../../components/CityModal/cities.json"
import CatList from "../../JsonFiles/Catlist.json"
import { useStateContext } from '../../context/SiteContext';
import { URLMakerWithHash, checkValidCat } from '../../helper/Helper';


import Posts from '../../components/Posts/Posts';
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from '../../components/Navbar/Navbar';
import PostNav from '../../components/Navbar/PostNav';

// import { hasGrantedAllScopesGoogle } from '@react-oauth/google';



const Home = () => {

    // const hasAccess = hasGrantedAllScopesGoogle(
    //     tokenResponse,
    //     'google-scope-1',
    //     'google-scope-2',
    //   );
    // console.log(hasAccess);

    console.log("Home");

    const { city, cat } = useParams()
    const [queryStirng] = useSearchParams();
    const location = useLocation()
    const navigate = useNavigate()
    const regexStr = /(^\d+(\,\d+)*$)/g;
    const regexHash = /(^\d+(\%2C\d+)*$)/g;


    const { currentCity, setCityHandler, currentCat, setCatHandler } = useStateContext()
    // console.log(city);
    // console.log(cat);
    // console.log(queryStirng.get('cities'));


    useEffect(() => {
        console.log("ssssssss");
        let ValidCat = true;
        let catObj = {};
        let catSlug = (cat === undefined) ? '' : cat
        if (catSlug !== currentCat.slug) {

            [ValidCat, catObj] = checkValidCat(cat)
            setCatHandler(catObj)
        }

        let ids = [];
        let validAddress = true;
        let cityListArray = []

        if (city === 'iran' && queryStirng.has('cities') && regexStr.test(queryStirng.get('cities'))) {

            let citiesIdsString = queryStirng.get('cities');
            let citiesIdsArray = citiesIdsString.split(",");
            citiesIdsArray.forEach(id => {
                let cityObj = CityList.find((item) => item.id === Number(id))
                if (cityObj === undefined || cityObj.parent === 0) {
                    validAddress = false;
                } else {
                    cityListArray.push(cityObj)
                    ids.push(Number(id))
                }
            });

        } else {
            let singleCityObj = CityList.find((item) => item.slug === city)
            if (singleCityObj === undefined) {
                validAddress = false;
            } else {
                ids.push(singleCityObj.id)
                cityListArray.push(singleCityObj)
            }
        }

        if (validAddress) {
            let idsStr = (ids.sort()).join("");

            if (currentCity.idsStr !== idsStr) {

                setCityHandler(ids, cityListArray)
            }

        } else {
            let prevCityHash = localStorage.getItem("lastCities");
            let prevCat = localStorage.getItem("catSlug");
            if (prevCityHash !== null && prevCityHash !== "" && regexHash.test(prevCityHash)) {
                navigate(URLMakerWithHash(prevCityHash, prevCat), { state: { wrong: true } })
            } else {
                navigate('/', { state: { wrong: true } })
            }
        }

    }, [location])


    return (
        <Layout className="">
            <div className='flex items-start m-auto max-w-7xl'>
                <Sidebar />
                <div className="w-full px-3 md:px-6 py-6 ">
                    
                    <PostNav />

                    <Posts />

                </div>

            </div>
        </Layout>
    )
}

export default Home;
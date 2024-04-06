
import React, { useContext, useEffect, useCallback, useMemo } from 'react';
import { useState } from 'react'

import { Link, NavLink } from 'react-router-dom';
import { FiAlignJustify, FiMapPin, FiSearch, FiUser, FiMessageSquare, FiTag } from "react-icons/fi";

import {
    Button,
} from "@material-tailwind/react";

import CityModal from './../CityModal/CityModal';
import { useStateContext } from '../../context/SiteContext';
import SideDrawer from '../Sidebar/SideDrawer';

const Navbar = () => {

    const [cityModalOpen, setCityModalOpen] = useState(false)
    
    const showCityModalHandler = () =>  {
        setCityModalOpen(true)
    }

    const closeCityModalHandler = useCallback(() =>  {
        setCityModalOpen(false)
    },[])

    const { titleForNav, slug } = useStateContext()


    const [openSide, setOpenSide] = useState(false);

    const closeSide = useCallback(() => {
        setOpenSide(false)
    }, [])



    return (
        <>

            <div className='sticky top-0 bg-white max-w-7xl m-auto flex items-center justify-between gap-3 md:gap-7 px-4 py-2 shadow-sm mb-1 z-10'>


                <div className='flex items-center justify-between gap-1 sm:gap-3 flex-grow'>
                    <div className='border-l-2 pl-4'>
                        <NavLink to={`/s/${slug.city}${slug.filters.cities !== '' ? "?cities=" + slug.filters.cities : ''}`}>
                            <h1 className='text-2xl font-bold text-pink-600 cursor-pointer'>دیــــوار</h1>
                        </NavLink>
                    </div>


                    <Button variant="text" className='flex items-center text-blue-gray-900 px-3 py-2.5 gap-1 sm:gap-3 text-md'
                        onClick={showCityModalHandler}
                    >
                        <FiMapPin className='flex-shrink-0' />
                        <p>
                            {titleForNav}
                        </p>
                    </Button>

                    <div className='max-w-full relative flex-1' >
                        <FiSearch className='absolute right-2.5 text-gray-700 m-auto top-0 bottom-0' />
                        <input className='w-full lg:max-w-96 border-2 outline-none rounded-md bg-gray-50 border-gray-100 focus:border-gray-200 focus:bg-white p-1.5 pr-8 pl-3 text-12 text-blue-gray-900' placeholder='جستجو در همه آگهی ها' />
                    </div>
                </div>




                <div>
                    <div className='flex items-center gap-3'>

                        <div className='hidden lg:flex items-center justify-end gap-4'>

                            <Link to={'/dashboard'}>
                                <div className='flex items-center gap-2 justify-center px-2 py-3 transition rounded-md hover:bg-gray-100'>
                                    <span>
                                        <FiUser />
                                    </span>
                                    <p>دیوار من</p>
                                </div>
                            </Link>

                            <Link to={'/'}>
                                <div className='flex items-center gap-2 justify-center  px-2 py-3 transition rounded-md hover:bg-gray-100'>
                                    <span>
                                        <FiMessageSquare />
                                    </span>
                                    <p>چت</p>
                                </div>
                            </Link>

                            <Link to={'/'}>
                                <div className='flex items-center gap-2 justify-center  px-2 py-3 transition rounded-md hover:bg-gray-100'>
                                    <span>
                                        <FiTag />
                                    </span>
                                    <p>پشتیبانی</p>
                                </div>
                            </Link>

                            {/* <button className='px-3 py-2 text-gray-50 bg-pink-900 text-md rounded-sm hover:bg-rose-900 shadow-md transition '>ثبت آگهی</button>
                       */}
                            <Link to={'/new'}>
                                <Button variant="gradient" color='indigo' className='text-sm'>
                                    ثبت آگهی
                                </Button>
                            </Link>

                        </div>

                        <div className='w-10 h-9 flex items-center cursor-pointer justify-center border-2 border-gray-50 rounded-md hover:shadow-md transition lg:hidden'
                            onClick={() => setOpenSide(true)}
                        >

                            <FiAlignJustify className=' text-3xl text-blue-gray-900' />
                        </div>



                    </div>
                </div>


            </div>


            <CityModal show={cityModalOpen} close={closeCityModalHandler} />

            <SideDrawer open={openSide} close={closeSide} />


        </>
    );
}

export default React.memo(Navbar);
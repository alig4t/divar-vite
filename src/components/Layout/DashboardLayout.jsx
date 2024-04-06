import { FiAlignJustify, FiMessageSquare, FiSearch, FiTag, FiUser } from "react-icons/fi";
import { useStateContext } from "../../context/SiteContext";
import { Link, NavLink } from "react-router-dom";
import { Avatar, Button, Drawer, IconButton, Typography } from "@material-tailwind/react";
import { useState } from "react";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,

} from "@material-tailwind/react";

const DashboardLayout = (props) => {
    const { titleForNav, slug } = useStateContext()



    return (
        <>
            <div className='sticky top-0 bg-white max-w-7xl m-auto flex items-center justify-between gap-3 md:gap-7 px-4 py-2 shadow-sm mb-1 z-10'>


                <div className='flex items-center justify-between gap-1 sm:gap-3'>
                    <div className=''>
                        <NavLink to={`/s/${slug.city}${slug.filters.cities !== '' ? "?cities=" + slug.filters.cities : ''}`}>
                            <h1 className='text-2xl font-bold text-pink-600 cursor-pointer'>
                                دیــــوار


                            </h1>

                        </NavLink>

                    </div>
                    <p>
                        |
                        حساب کاربری
                    </p>
                </div>


                {/* <Typography variant="h5" className="text-lg font-bold text-gray-800 cursor-pointer">
                    داشبورد مدیریت
                </Typography> */}



                <div>
                    <Menu>
                        <MenuHandler>
                            <Button color='indigo' className="flex justify-center items-center gap-3 rounded-full p-3 border-2 border-indigo-300">

                                <FiUser className="text-2xl font-bold text-white" />
                            </Button>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem>حساب کاربری</MenuItem>
                            <MenuItem>درج آگهی</MenuItem>
                            <hr className="my-3" />
                            <MenuItem>خروج</MenuItem>
                        </MenuList>
                    </Menu>
                </div>


            </div>


            {props.children}
        </>
    );
}

export default DashboardLayout;
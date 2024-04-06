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
    const { slug } = useStateContext()

    
    return (
        <>
            <div className='sticky top-0 bg-white max-w-7xl m-auto flex items-center justify-between gap-3 md:gap-7 px-4 py-2 shadow-sm mb-1 z-10'>


                <div className='flex items-center justify-between gap-1 sm:gap-3'>
                    <div className='pl-2'>
                        <NavLink to={`/s/${slug.city}${slug.filters.cities !== '' ? "?cities=" + slug.filters.cities : ''}`}>
                            <h1 className='text-2xl font-bold text-pink-600 cursor-pointer'>
                                دیــــوار
                            </h1>
                        </NavLink>
                    </div>
                    <p className="border-r-2 px-3">

                        حساب کاربری
                    </p>
                </div>


                {/* <Typography variant="h5" className="text-lg font-bold text-gray-800 cursor-pointer">
                    داشبورد مدیریت
                </Typography> */}



                <div>
                    <Menu>
                        <MenuHandler>
                            <Button color='indigo' size="sm" className="flex justify-center items-center gap-3 rounded-full p-2 border-2 border-indigo-300">

                                <FiUser className="text-xl font-bold text-white" />
                            </Button>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem>
                                <Link to={'/dashboard'}>
                                    حساب کاربری
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to={'/new'}>
                                    درج آگهی
                                </Link>

                            </MenuItem>
                            <hr className="my-3" />
                            <MenuItem onClick={props.signOut}>خروج</MenuItem>
                        </MenuList>
                    </Menu>
                </div>


            </div>


            {props.children}
        </>
    );
}

export default DashboardLayout;
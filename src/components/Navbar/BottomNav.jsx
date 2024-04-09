import { FiAlignJustify, FiUser } from "react-icons/fi";
import { FiPocket } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/SiteContext";
import { useState } from "react";
import Categories from "../Sidebar/Categories";
import { Drawer, IconButton, Typography } from "@material-tailwind/react";



const BottomNav = () => {

    const { slug } = useStateContext()
    const [open, setOpen] = useState(false)
    const closeHandler = () => {
        setOpen(false)
    }

    return (

        <>
            <div className="sticky md:hidden bottom-0 bg-gray-200 border-t-2 border-gray-100 flex justify-around 
            items-center backdrop-blur-sm opacity-95 px-2">


                <Link to={`/s/${slug.city}${slug.filters.cities !== '' ? "?cities=" + slug.filters.cities : ''}`} className="flex flex-col items-center gap-2 hover:bg-white h-full p-2 w-1/5 transition cursor-pointer ">
                    <span className="w-8 h-6 text-pink-600 text-sm font-bold leading-6">دیــــوار</span>
                    <p className="text-11 font-bold text-gray-600">آگهی ها</p>
                </Link>

                <div className="flex flex-col items-center gap-2 hover:bg-white h-full p-2 w-1/5 transition cursor-pointer [&>*]:hover:text-gray-900"
                    onClick={() => setOpen(true)}>
                    <FiAlignJustify className="w-6 h-6 text-gray-800" />
                    <p className="text-11 font-bold text-gray-600">دسته ها</p>
                </div>


                <Link to={'/new'} className="flex flex-col items-center gap-2 hover:bg-white h-full p-2 w-1/5 transition cursor-pointer [&>*]:hover:text-gray-900">
                    <FiPlusCircle className="w-6 h-6 text-gray-800" />
                    <p className="text-11 font-bold text-gray-600">ثبت آگهی</p>
                </Link>


                <Link to={'/dashboard'} className="flex flex-col items-center gap-2 hover:bg-white h-full p-2 w-1/5 transition cursor-pointer [&>*]:hover:text-gray-900">
                    <FiUser className="w-6 h-6 text-gray-800" />
                    <p className="text-11 font-bold text-gray-600">حساب‌‌کاربری</p>
                </Link>


                <Link to={''} className="flex flex-col items-center gap-2 hover:bg-white h-full p-2 w-1/5 transition cursor-pointer [&>*]:hover:text-gray-900">
                    <FiPocket className="w-6 h-6 text-gray-800" />
                    <p className="text-11 font-bold text-gray-600">پشتیبانی</p>
                </Link>


            </div>


            <Drawer open={open} onClose={closeHandler} placement='right' className="p-4 overflow-y-auto modal-scroll">
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                        دسته بندی ها
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeHandler}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>

                <div>
                    <Categories />

                </div>
            </Drawer>


        </>
    );
}

export default BottomNav;
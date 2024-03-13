import React, { useState } from 'react';

import { FiSliders } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import FilterSection from '../Filters/FilterSection';
import Categories from '../Sidebar/Categories';


const PostNav = () => {

    const [filterDrawer, setFilterDrawer] = useState({ open: false, mode: "cat" })

    const handleFilterDrawer = () => {
        setFilterDrawer({ open: false, mode: "cat" })
    }

    return (
        <>
            <div className="w-full flex md:hidden overflow-x-scroll overflow-y-hidden items-center gap-2 mb-3 pb-2 list-scroll">

                <Button className={`bg-white flex-shrink-0 flex gap-2 text-sm items-center px-4 py-2.5 text-blue-gray-700 rounded-full  shadow-none border-2 border-gray-200 hover:shadow-none hover:border-pink-500 
 [&>*]:hover:text-pink-600 focus:bg-pink-600 [&>*]:focus:text-white focus:border-pink-700
    ${false ? "[&>*]:text-pink-600 border-pink-500 " : ""}
 `}
                    onClick={() => setFilterDrawer({ open: true, mode: "cat" })}
                >
                    <BiCategory className="text-lg text-blue-gray-700" />
                    <sapn>دسته بندی ها</sapn>
                </Button>

                <Button
                    className={`bg-white flex-shrink-0 flex gap-2 text-sm items-center px-4 py-2.5 text-blue-gray-700 rounded-full  shadow-none border-2 border-gray-200 hover:shadow-none hover:border-pink-500 
                    [&>*]:hover:text-pink-600 focus:bg-pink-600 [&>*]:focus:text-white focus:border-pink-700
                       ${false ? "[&>*]:text-pink-600 border-pink-500 " : ""}
                    `}
                    onClick={() => setFilterDrawer({ open: true, mode: "filter" })}
                >
                    <FiSliders className="text-lg text-blue-gray-700" />
                    <sapn>فیلترها</sapn>
                </Button>





            </div>


            <Drawer open={filterDrawer.open} onClose={handleFilterDrawer} placement='right' className="p-4 overflow-y-auto modal-scroll">
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                        {filterDrawer.mode === "cat" ? "دسته بندی ها" : "فیلترها"}
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={handleFilterDrawer}>
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

                    {filterDrawer.mode === "cat" ? <Categories /> : (
                        <>
                            <div className='flex justify-end mb-2'>
                                <span className=' text-pink-600 text-12 font-bold border-2 rounded-full border-pink-600
                        hover:bg-pink-500 hover:text-white transition cursor-pointer py-1.5 px-3 
                        '>حذف فیلتر ها</span>
                            </div>
                            <FilterSection />
                        </>

                    )
                    }
                </div>
            </Drawer>

        </>
    );
}

export default React.memo(PostNav);
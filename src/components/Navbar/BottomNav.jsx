import { FiAlignJustify, FiUser } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { FiPocket } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/SiteContext";
const BottomNav = () => {

    const { slug } = useStateContext()


    return (
        <>
            <div className="sticky md:hidden bottom-0 bg-gray-200 border-t-2 border-gray-100 flex justify-around 
            items-center backdrop-blur-sm opacity-95 px-6">


                <Link to={slug} className="flex flex-col items-center gap-2 hover:bg-white h-full p-2 w-1/5 transition cursor-pointer ">
                    <span className="w-8 h-6 text-pink-600 text-sm font-bold leading-6">دیــــوار</span>
                    <p className="text-11 font-bold text-gray-600">آگهی ها</p>
                </Link>

                <Link to={''} className="flex flex-col items-center gap-2 hover:bg-white h-full p-2 w-1/5 transition cursor-pointer [&>*]:hover:text-gray-900">
                    <FiAlignJustify className="w-6 h-6 text-gray-800" />
                    <p className="text-11 font-bold text-gray-600">دسته ها</p>
                </Link>


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
        </>
    );
}

export default BottomNav;
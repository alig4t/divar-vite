import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { FiBookmark, FiShare2 } from 'react-icons/fi';
import { FiCheck } from "react-icons/fi";
import { FiCopy } from "react-icons/fi";
import { useCopyToClipboard } from "usehooks-ts";

const Content = (props) => {
    const [showTel, setShowTel] = useState(false)
    const [copied, setCopied] = useState(false);
    const [value, copy] = useCopyToClipboard();
    return (
        <>
            <div>
                <h1 className='text-2xl font-bold mb-2 leading-10'>
                    {props.title}
                </h1>
                <p className='text-gray-600 text-sm'>
                    دقایقی پیش در تهران، تهرانپارس شرقی
                </p>
            </div>

            <div className='w-full flex justify-between items-center'>
                <div className='hidden md:block'>
                    {showTel ? (
                        <Button
                            ripple={false}
                            onMouseLeave={() => setCopied(false)}
                            onClick={() => {
                                copy("091232655897");
                                setCopied(true);
                            }}
                            className="flex items-center gap-x-3 px-4 py-2.5 lowercase transition-none"
                            color='pink'
                        >
                            {copied ? (
                                <FiCheck className="h-4 w-4 text-white" />
                            ) : (
                                <FiCopy className="h-4 w-4 text-white" />
                            )}
                            <Typography
                                className="border-r border-gray-400/50 pr-3 font-normal"
                                variant="small"
                            >
                                091232655897
                            </Typography>
                        </Button>
                    ) : (
                        <Button color='pink' onClick={() => setShowTel(true)}>
                            اطلاعات تماس
                        </Button>
                    )}


                </div>
                <div className='flex gap-4 justify-end flex-grow'>
                    <FiShare2 className='text-2xl text-gray-800 transition cursor-pointer hover:text-gray-900' />
                    <FiBookmark className='text-2xl text-gray-800 transition cursor-pointer hover:text-gray-900' />
                </div>
            </div>

            <div>
                <div className=' w-full flex justify-around items-center pb-6 border-b-2 border-gray-200'>

                    <div className='flex flex-col gap-2 border-l-2 border-gray-200 basis-1/3 items-center'>
                        <p className='text-gray-600 text-sm'>کارکرد</p>
                        <p className='text-gray-800 font-bold text-sm'>۸۵٬۰۰۰</p>
                    </div>

                    <div className='flex flex-col gap-2 border-l-2 border-gray-200 basis-1/3 items-center'>
                        <p className='text-gray-600 text-sm'>کارکرد</p>
                        <p className='text-gray-800 font-bold text-sm'>۸۵٬۰۰۰</p>
                    </div>

                    <div className='flex flex-col gap-2 basis-1/3 items-center'>
                        <p className='text-gray-600 text-sm'>کارکرد</p>
                        <p className='text-gray-800 font-bold text-sm'>۸۵٬۰۰۰</p>
                    </div>

                </div>


                <div className='flex justify-between items-center border-b-2 border-gray-200 py-4'>
                    <span>قیمت کل</span>
                    <span>۵٬۵۵۵٬000٬000 تومان</span>
                </div>

                <div className='flex justify-between items-center border-b-2 border-gray-200 py-4'>
                    <span>قیمت کل</span>
                    <span>۵٬۵۵۵٬000٬000 تومان</span>
                </div>

                <div className='flex justify-between items-center border-b-2 border-gray-200 py-4'>
                    <span>قیمت کل</span>
                    <span>۵٬۵۵۵٬000٬000 تومان</span>
                </div>

                <div className='flex justify-between items-center border-b-2 border-gray-200 py-4'>
                    <span>قیمت کل</span>
                    <span>۵٬۵۵۵٬000٬000 تومان</span>
                </div>

                <div className='flex justify-between items-center border-b-2 border-gray-200 py-4'>
                    <span>قیمت کل</span>
                    <span>۵٬۵۵۵٬000٬000 تومان</span>
                </div>
            </div>
            <div className='mb-12'>
                <h6>توضیحات</h6>
                <p className='text-md font-thin leading-8'>

                    فول ابوظبی،هدآپ،صندوق برقی،کیت M،فیس ۲۰۱۷،رینگ ۲۰۱۷،فرمان ۲۰۱۷،چراغ ۲۰۱۷،پنل کولر ۲۰۱۷،داخل قرمز،پشت کیلومتر ۲۰۱۷،مموری صندلی
                </p>
            </div>

        </>
    );
}

export default Content;
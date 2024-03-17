import { Button, Drawer, IconButton, Typography } from "@material-tailwind/react";
import { useState } from "react";

import { FiCheck } from "react-icons/fi";
import { FiCopy } from "react-icons/fi";
import { useCopyToClipboard } from "usehooks-ts";

const StickyTell = () => {
    
    const [value, copy] = useCopyToClipboard();
    const [copied, setCopied] = useState(false);

    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return ( 
        <>
        
        <div className='w-full z-10 md:hidden sticky bottom-0 bg-white m-auto flex items-center border-t-2 border-gray-200 p-2'>
                    <Button className='w-full bg-pink-600' color='pink' onClick={openDrawer} >
                        اطلاعات تماس
                    </Button>
                </div>


                <Drawer open={open} onClose={closeDrawer} className="p-4" placement='bottom'>
                    <div className="mb-6 flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray">
                            اطلاعات تماس
                        </Typography>
                        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
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

                    <div className="flex gap-2 justify-center">
                        <Button
                            onMouseLeave={() => setCopied(false)}
                            onClick={() => {
                                copy("npm i @material-tailwind/react");
                                setCopied(true);
                            }}
                            className="flex items-center gap-x-3 px-4 py-2.5 lowercase bg-pink-500"
                        >

                            {copied ? (
                                <FiCheck className="h-5 w-5 text-white" />
                            ) : (
                                <FiCopy className="h-5 w-5 text-white" />
                            )}
                            <Typography
                                className="border-r border-gray-400/50 pr-3 font-normal"
                                variant="h5"
                            >
                                091232655897
                            </Typography>
                        </Button>

                        {/* <Input label="09121111111" disabled /> */}
                    </div>

                    <div className='mt-5'>
                        <div className='bg-cyan-100 justify-normal text-blue-gray-700 font-thin text-xs leading-5 py-3 px-6 rounded-md'>
                            هشدار:
                            در صورت بروز مشکل و یا شناسایی نشانه‌های مشکوک، لطفاً آگهی را در صفحهٔ «گزارش کلاهبرداری و رفتار مشکوک» گزارش دهید.
                        </div>
                    </div>
                </Drawer>
        </>
     );
}
 
export default StickyTell;
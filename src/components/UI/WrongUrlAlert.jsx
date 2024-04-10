import React, { useEffect } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { FiX } from "react-icons/fi";
function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
        >
            <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const WrongUrlAlert = (props) => {
    const [open, setOpen] = React.useState(true);
    useEffect(() => {
        // if (open) {
        //     setTimeout(() => {
        //         setOpen(false)
        //     }, 2000);
        // }
    })

    console.log(props);


    function getStringAlert() {
        if (props.type === 'cat') {
            if (props.currentCat.title) {
                return props.currentCat.title
            }
        }
        if (props.currentCity.idsArray.length > 1) {
            return props.currentCity.citiesList[0].title + " و " + (props.currentCity.idsArray.length - 1) + " شهر دیگر "
        }
        return props.currentCity.citiesList[0].title
    }

    let msgStr = ""
    msgStr = getStringAlert()





    return (
        <>
            {open && (
                 
                 <div className="fixed bottom-14 m-auto right-0 left-0 flex justify-center items-center z-40">

                    <div className="rounded-md w-[85%] max-w-[560px] bg-gray-900 text-white flex justify-between items-center p-4 px-5 gap-4 opacity-95"
                    >
                        <p className="text-xs justify-start md:text-sm leading-5 font-thin">
                            لینک شما مشکل داشت شما  آگهی های
                            {" " + msgStr + " "}
                            را میبینید.

                           
                        </p>
                        <span className="cursor-pointer text-xl font-bold opacity-50 hover:opacity-100 w-9 h-5 flex items-center justify-center"
                            onClick={() => setOpen(false)}>
                            <FiX />
                        </span>
                    </div>

                 </div >
            )}
        </>
    )
}

export default WrongUrlAlert;
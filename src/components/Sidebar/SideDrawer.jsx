
import React, { useEffect, useState } from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
    List,
    ListItem,
} from "@material-tailwind/react";

import Categories from "./Categories";
import { supabase } from "../../config";
import { Link, useNavigate } from "react-router-dom";

const SideDrawer = (props) => {

    const [userLogin, setUserLogin] = useState(null)
    // const navigate = useNavigate()
    async function getUserInfo() {
        const { data: { user } } = await supabase.auth.getUser()
        setUserLogin(user)
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        window.location.reload();
    }

    const signOutHandler = () => {
        signOut()
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <>

            <Drawer open={props.open} onClose={props.close} className="p-4 overflow-y-auto modal-scroll" placement="right">
                <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h5" className="text-3xl font-bold text-pink-600 cursor-pointer">
                        دیــــوار
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={props.close}>
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
                <Categories />



                {/* <Typography color="gray" className="mb-8 pr-4 font-normal">
                    Material Tailwind features multiple React and HTML components, all
                    written with Tailwind CSS classes and Material Design guidelines.
                </Typography> */}
                <div className="flex justify-center gap-3">
                    {userLogin ? (
                        <>
                            <Link to={'/new'}>
                                <Button size="sm" variant="outlined">
                                    ثبت آگهی
                                </Button>
                            </Link>
                            <Button size="sm" onClick={signOutHandler}>خروج</Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button size="sm" variant="outlined">
                                    ورود
                                </Button>
                            </Link>
                            <Button size="sm">ثبت نام</Button>
                        </>
                    )}

                </div>
            </Drawer>
        </>
    );
}

export default SideDrawer;
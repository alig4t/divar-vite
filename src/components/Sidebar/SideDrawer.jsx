
import { useEffect, useState, memo } from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

import Categories from "./Categories";
import apiService from "../../services/api";

const SideDrawer = (props) => {
    const [userLogin, setUserLogin] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getUserInfo() {
        try {
            const session = apiService.getSession();
            setUserLogin(session?.user || null);
        } catch (error) {
            console.error('Error getting user info:', error);
            setUserLogin(null);
        } finally {
            setLoading(false);
        }
    }

    async function signOut() {
        try {
            await apiService.signOut();
            setUserLogin(null);
            window.location.reload();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    }

    const signOutHandler = () => {
        signOut();
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const renderAuthButtons = () => {
        if (loading) {
            return (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
                </div>
            );
        }

        if (userLogin) {
            return (
                <>
                    <Link to={'/dashboard'}>
                        <Button size="sm" variant="outlined" color="pink">
                            داشبورد
                        </Button>
                    </Link>
                    <Link to={'/new'}>
                        <Button size="sm" variant="outlined">
                            ثبت آگهی
                        </Button>
                    </Link>
                    <Button size="sm" onClick={signOutHandler} color="red">
                        خروج
                    </Button>
                </>
            );
        }

        return (
            <>
                <Link to="/login">
                    <Button size="sm" variant="outlined">
                        ورود
                    </Button>
                </Link>
                <Link to="/signup">
                    <Button size="sm">ثبت نام</Button>
                </Link>
            </>
        );
    };

    return (
        <Drawer 
            open={props.open} 
            onClose={props.close} 
            className="p-4 overflow-y-auto modal-scroll" 
            placement="right"
        >
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
            
            <div className="flex justify-center gap-3 flex-wrap">
                {renderAuthButtons()}
            </div>
        </Drawer>
    );
};

export default memo(SideDrawer);
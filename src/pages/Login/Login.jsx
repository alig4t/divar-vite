import React, { useEffect, useState } from 'react';


import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc"

import { hasGrantedAnyScopeGoogle } from '@react-oauth/google';


const Login = () => {


    const [user, setUser] = useState("")

    const hasAccess = hasGrantedAnyScopeGoogle(
        user,
        'google-scope-1',
        'google-scope-2',
    );

    console.log(hasAccess);

    useEffect(() => {
        console.log(user);
        console.log(hasAccess);

    }, [user])

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse)
            localStorage.setItem("token", tokenResponse)
            setUser(tokenResponse)
        }

    });
    // const responseMessage = (response) => {
    //     console.log(response);
    // };
    // const errorMessage = (error) => {
    //     console.log(error);
    // };
    return (
        <div className="flex flex-row min-h-screen justify-center items-center p-3 bg-gray-50">

            <Card color="transparent" shadow={false} className='shadow-md px-5 py-4 border-t-2 border-pink-500'>

                <Typography variant="h4" color="blue-gray" className='text-center text-lg text-pink-600'>
                    ثبت نام
                </Typography>

                <form className="mt-8 mb-2 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-4 blur-sm">

                        <Typography variant="h6" color="blue-gray" className="-mb-3 text-sm">
                            ایمیل
                        </Typography>
                        <Input
                            size="md"
                            placeholder=" مثلا name@mail.com "
                            className="disabled:bg-gray-50 !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            disabled
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3 text-sm">
                            رمز عبور
                        </Typography>
                        <Input
                            type="password"
                            size="md"
                            disabled
                            placeholder="********"
                            className="disabled:bg-gray-50 !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Button className="my-4 mb-6 bg-green-500 cursor-not-allowed" fullWidth disabled>
                            ثبت نام
                        </Button>
                    </div>

                    <Button className="relative my-6 bg-gray-50 text-blue-gray-900 text-md shadow-none hover:bg-light-gray
                    hover:shadow-none border-2 border-gray-300 min-w-60" fullWidth onClick={() => login()}

                    >
                        ورود به سایت با گوگل
                        <FcGoogle className='absolute top-0 bottom-0 m-auto right-4 text-xl' />
                    </Button>

                    {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}

                    {/* <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <a href="#" className="font-medium text-gray-900">
                            Sign In
                        </a>
                    </Typography> */}
                </form>
            </Card>

        </div>
    );
}

export default Login;
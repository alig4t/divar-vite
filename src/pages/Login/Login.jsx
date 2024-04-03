import React, { useEffect, useState } from 'react';


import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc"
import { supabase } from '../../config';

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from 'react-router-dom';


// import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
// import { hasGrantedAnyScopeGoogle } from '@react-oauth/google';


const Login = () => {

  const navigate = useNavigate()
  const [session, setSession] = useState(null);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  if (!session) {
    return (
      <div className="flex flex-row min-h-screen justify-center items-center p-3 bg-gray-50">

        <Card color="transparent" shadow={false} className='shadow-md px-5 py-4 border-t-2 border-pink-500'>
          <Auth
            view="sign_up"
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              className: {
                container: "",
                button: "bg-pink-500 text-xl"
              }
            }}
            providers={[]}
            localization={{
              variables: {
                forgotten_password: { link_text: "فراموشی رمز عبور؟" },
                sign_up: {
                  email_label: "آدرس ایمیل",
                  password_label: "رمز عبور",
                  email_input_placeholder: " مثلا name@mail.com ",
                  password_input_placeholder: "رمز عبور شما",
                  button_label: "ثبت نام",
                  loading_button_label: "در حال بررسی..",
                  social_provider_text: "Sign in with {{provider}}",
                  link_text: " حساب کاربری ندارید؟ ثبت نام ",
                },
                sign_in: {
                  email_label: 'آدرس ایمیل',
                  password_label: 'رمز عبور',
                  email_input_placeholder: "آدرس ایمیل را وارد نمایید",
                  password_input_placeholder: "رمز عبور را وارد نمایید",
                  button_label: "ورود",
                  loading_button_label: "در حال بررسی..",
                  social_provider_text: "Sign in with {{provider}}",
                  link_text: "قبلا ثبت نام کردید؟ ورود"
                },
              }

            }}
          />

        </Card>

      </div>
    );
  } else {
    // return (
    //   <div>
    //     <div>Logged in!</div>
    //     <button onClick={() => supabase.auth.signOut()}>Sign out</button>
    //   </div>
    // );
    navigate('/')
  }


  const [emailInput, setEmailInput] = useState("")
  const [passInput, setPassInput] = useState("")


  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: emailInput,
      password: passInput,
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    })
    if (error) {
      console.log(error);
      // signInWithEmail()
    }

  }
  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailInput,
      password: emailInput,
    })
    console.log(data, error);
    // supabase.auth.signInWithOAuth({
    //     provider: 'google',
    //   })
  }

  useEffect(() => {

  })


  // const [user, setUser] = useState("")

  // const hasAccess = hasGrantedAnyScopeGoogle(
  //     user,
  //     'google-scope-1',
  //     'google-scope-2',
  // );

  // console.log(hasAccess);

  // useEffect(() => {
  //     console.log(user);
  //     console.log(hasAccess);

  // }, [user])

  // const login = useGoogleLogin({
  //     onSuccess: tokenResponse => {
  //         console.log(tokenResponse)
  //         localStorage.setItem("token", tokenResponse)
  //         setUser(tokenResponse)
  //     }

  // });
  // const responseMessage = (response) => {
  //     console.log(response);
  // };
  // const errorMessage = (error) => {
  //     console.log(error);
  // };


  // return (
  // <div className="flex flex-row min-h-screen justify-center items-center p-3 bg-gray-50">

  //     <Card color="transparent" shadow={false} className='shadow-md px-5 py-4 border-t-2 border-pink-500'>

  //         <Typography variant="h4" color="blue-gray" className='text-center text-lg text-pink-600'>
  //             ثبت نام
  //         </Typography>

  //         <form className="mt-8 mb-2 max-w-screen-lg sm:w-96">
  //             <div className="mb-4 flex flex-col gap-4 ">

  //                 <Typography variant="h6" color="blue-gray" className="-mb-3 text-sm">
  //                     ایمیل
  //                 </Typography>
  //                 <Input
  //                     value={emailInput}
  //                     onChange={(e) => setEmailInput(e.target.value)}
  //                     size="md"
  //                     placeholder=" مثلا name@mail.com "
  //                     className="disabled:bg-gray-50 !border-t-blue-gray-200 focus:!border-t-gray-900"
  //                     labelProps={{
  //                         className: "before:content-none after:content-none",
  //                     }}

  //                 />
  //                 <Typography variant="h6" color="blue-gray" className="-mb-3 text-sm">
  //                     رمز عبور
  //                 </Typography>
  //                 <Input
  //                     value={passInput}
  //                     onChange={(e) => setPassInput(e.target.value)}
  //                     type="password"
  //                     size="md"
  //                     placeholder="********"
  //                     className="disabled:bg-gray-50 !border-t-blue-gray-200 focus:!border-t-gray-900"
  //                     labelProps={{
  //                         className: "before:content-none after:content-none",
  //                     }}
  //                 />
  //                 <Button className="my-4 mb-6 bg-green-500" fullWidth onClick={signUpNewUser}>
  //                     ثبت نام
  //                 </Button>
  //                 <Button className="my-4 mb-6 bg-green-500" fullWidth onClick={signInWithEmail}>
  //                     ورود
  //                 </Button>
  //             </div>

  //             <Button className="relative my-6 bg-gray-50 text-blue-gray-900 text-md shadow-none hover:bg-light-gray
  //             hover:shadow-none border-2 border-gray-300 min-w-60" fullWidth onClick={() => login()}

  //             >
  //                 ورود به سایت با گوگل
  //                 <FcGoogle className='absolute top-0 bottom-0 m-auto right-4 text-xl' />
  //             </Button>

  //             {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}

  //             {/* <Typography color="gray" className="mt-4 text-center font-normal">
  //                 Already have an account?{" "}
  //                 <a href="#" className="font-medium text-gray-900">
  //                     Sign In
  //                 </a>
  //             </Typography> */}
  //         </form>
  //     </Card>

  // </div>
  // );
}

export default Login;
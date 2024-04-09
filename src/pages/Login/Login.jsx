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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../../components/Navbar/BottomNav';


// import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
// import { hasGrantedAnyScopeGoogle } from '@react-oauth/google';


const Login = () => {

  const navigate = useNavigate()
  const [session, setSession] = useState(null);

  const location = useLocation()

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
      <>
      <div className="flex flex-row min-h-screen justify-center items-center p-3 bg-gray-50">

        <Card color="transparent" shadow={false} className='shadow-md px-5 py-4 border-t-2 border-pink-500'>
          <Auth
            view={location.pathname === '/login' ? "sign_in" : "sign_up"}
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
            {/* <BottomNav /> */}
      </>

    );
  } else {
    // return (
    //   <div>
    //     <div>Logged in!</div>
    //     <button onClick={() => supabase.auth.signOut()}>Sign out</button>
    //   </div>
    // );
    navigate('/dashboard')
  }

}

export default Login;
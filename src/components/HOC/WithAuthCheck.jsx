

import React from 'react';
import { useEffect } from 'react';
import { supabase } from '../../config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WithAuthCheck = (WrappedComponent) => {

    // const navigate= useNavigate()
    // const [userLogin, setUserLogin] = useState(null)
    // async function getUserInfo() {
    //     const { data: { user } } = await supabase.auth.getUser()
    //     console.log(user)
    //     if (user === null) {
    //         navigate('/login', { replace: true })
    //     } else {
    //         setUserLogin(user)
    //     }
    // }
    // useEffect(() => {
    //     getUserInfo()
    // }, [])

    return () => {
        const navigate= useNavigate()
        const [userLogin, setUserLogin] = useState(null)
        console.log("hoc");
        async function getUserInfo() {
            const { data: { user } } = await supabase.auth.getUser()
            console.log(user)
            if(user === null){

                navigate('/login', { replace: true })
            }else{
                setUserLogin(user)
            }
        }
        useEffect(() => {
            getUserInfo()
        }, [])

        return userLogin && <WrappedComponent user={userLogin} />

    }
}

export default WithAuthCheck;
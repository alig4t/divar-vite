
import React, { useEffect, useState } from 'react';
import { supabase } from '../../config';


const Dashboard = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    async function getPosts() {
        const { data } = await supabase.from("posts").select();
        setPosts(data);
        console.log(data);
    }


    // console.log(data);
    return (
        <>
            <h1>داشبورد مدیریت</h1>

        </>
    );
}

export default Dashboard;
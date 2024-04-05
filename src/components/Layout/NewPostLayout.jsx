import { ThemeProvider } from "@material-tailwind/react";

import CustomStyle from "../../assets/css/custom"
import WithAuthCheck from "../HOC/WithAuthCheck";
import Navbar from "../Navbar/Navbar";


const NewPostLayout = (props) => {
    return (
        <>
         <ThemeProvider value={CustomStyle}>
            <Navbar />
            <div className='w-full flex justify-center items-center my-5'>
                {props.children}
            </div>
         </ThemeProvider>
        </>
    );
}

export default NewPostLayout
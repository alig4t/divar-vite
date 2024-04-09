import { ThemeProvider } from "@material-tailwind/react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import BottomNav from "../Navbar/BottomNav";
import CustomStyle from "../../assets/css/custom"

const Layout = (props) => {

    return (

        <ThemeProvider value={CustomStyle}>
            <div className='w-full h-full relative'>
                <Navbar />
                {props.children}

                {/* {props.page === "index" && <BottomNav />} */}

                <Footer />
            </div>
        </ThemeProvider>

    );
}

export default Layout;
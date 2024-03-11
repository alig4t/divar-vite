import { ThemeProvider } from "@material-tailwind/react";
import Navbar from "../Navbar/Navbar";

const Layout = (props) => {
    const theme = {
        select: {
            styles: {
                base: {
                    select: {

                        textAlign: "text-right [&>span]:right-8 [&>span]:text-pink-500",
                    },
                    arrow: {
                        initial: {
                            right: "left-2",
                        }
                    },
                    label: {
                        left: "right-0",
                        // color:"text-pink-500"
                    },
                    menu: {
                        maxHeight: "max-h-[230px] modal-scroll",
                    }
                },
            },
        },
        switch: {
            styles: {
                base: {
                    root: {
                        display: "flex justify-between ltr",
                        alignItems: "items-center",
                    },
                    label: {
                        color: "text-gray-700 flex-auto text-right",
                        fontWeight: "font-light text-sm",
                        
                        userSelect: "select-none",
                        cursor: "cursor-pointer",
                        mt: "mt-px",
                        ml: "ml-3",
                        mb: "mb-0",
                    }
                }
            }
        },
        drawer:{
            styles:{
                base:{
                    drawer:{
                        boxShadow: "none"
                    }
                }
            }
        },
        button:{
            styles:{
                base:{
                    initial:{
                        disabled:"disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none",
                    }
                }
            }
        }
    };

    return (

        <ThemeProvider value={theme}>
            <div className='w-full h-full relative'>
                <Navbar />
                {props.children}
            </div>
        </ThemeProvider>

    );
}

export default Layout;
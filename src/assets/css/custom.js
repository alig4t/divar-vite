
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
    },
    breadcrumbs: {
        defaultProps: {
          className: "",
          fullWidth: false,
          separator: "/",
        },
        styles: {
          base: {
            root: {
              initial: {
                width: "w-fit",
              },
              fullWidth: { display: "block", width: "w-full" },
            },
            list: {
              display: "flex",
              flexWrap: "flex-wrap",
              alignItems: "items-center",
              width: "w-full",
              bg: "bg-blue-gray-50",
              bgOpacity: "bg-opacity-60",
              py: "py-2",
              px: "px-4",
              borderRadius: "rounded-md",
            },
            item: {
              initial: {
                display: "flex",
                alignItems: "items-center",
                color: "text-blue-gray-900",
                fontSmoothing: "antialiased",
                fontFamily: "font-sans",
                fontSize: "text-sm",
                fontWeight: "font-normal",
                lineHeight: "leading-normal",
                cursor: "cursor-pointer",
                transition: "transition-colors duration-300",
                hover: "hover:text-light-blue-500",
              },
              disabled: {
                pointerEvents: "pointer-events-none",
              },
            },
            separator: {
              color: "text-blue-gray-500",
              fontSize: "text-sm",
              fontSmoothing: "antialiased",
              fontFamily: "font-sans",
              fontWeight: "font-normal",
              lineHeight: "leading-normal",
              px: "mx-2",
              pointerEvents: "pointer-events-none",
              userSelcet: "select-none",
            },
          },
        },
      },
};

export default theme
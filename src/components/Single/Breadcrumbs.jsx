

const Breadcrumbs = () => {
    return (

        <div className="w-full px-3 md:px-6 py-6 ">



            <div className='[&>a]:inline-block [&>*]:my-1 bg-gray-100 rounded-md text-sm px-4 py-2
            hover:[&>*]:opacity-100 [&>*]:transition
        '>
                <a href="#" className="opacity-60">
                    وسایل نقلیه
                </a>

                <span className="text-blue-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>

                <a href="#" className="opacity-60">
                    خودرو
                </a>
                <span className="text-blue-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>

                <a href="#" className="opacity-60">
                    سواری و وانت
                </a>
                <span className="text-blue-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>

                <a href="#" className="opacity-60">
                    دنا پلاس
                </a>
                <span className="text-blue-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>

                <p className='cursor-text inline'>دنا پلاس 6 دنده توربو.فول اپشن سانروف دار.مدل 1402</p>

            </div>

           

        </div>

    );
}

export default Breadcrumbs;
import { Link } from "react-router-dom";
import { getBreadCrumbs } from "../../helper/Helper";
import { useStateContext } from "../../context/SiteContext";


const Breadcrumbs = (props) => {

    
    
    const { slug } = useStateContext()
console.log(slug);
    let breads = []
    breads = getBreadCrumbs(props.cat)

    return (

        <div className="w-full px-3 md:px-6 py-6 ">

            <div className='[&>a]:inline-block [&>*]:my-1 bg-gray-100 rounded-md text-sm px-4 py-2
            hover:[&>*]:opacity-100 [&>*]:transition
        '>
                {breads.map((item) => {
                    return (
                        <>
                            <Link to={`/s/${slug.city}/${item.slug}${slug.filters.cities !== '' ? "?cities=" + slug.filters.cities : ''}`} className="opacity-60">
                                {item.title}
                            </Link>
                            <span className="text-blue-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                        </>
                    )
                })}

                <p className='cursor-text inline'>
                    {props.postTitle}
                </p>

            </div>



        </div>

    );
}

export default Breadcrumbs;
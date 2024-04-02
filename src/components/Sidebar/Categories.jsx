
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import {
    Card,
    Typography,
    List,
    ListItem,
} from "@material-tailwind/react";
import { FiTruck, FiArrowRight } from "react-icons/fi";
import catList from "../../JsonFiles/Catlist.json"
import { useStateContext } from '../../context/SiteContext';


const Categories = () => {
    
    const { slug, currentCat } = useStateContext()
    const [parentCats] = useState(catList.filter((item) => item.parent == 0))

    const [catShow, setCatShow] = useState({
        depth: 0,
        sub: [{ id: 0, title: "", parent: 0 }],
        parent: [{ id: 0, title: "", parent: 0 }],
    })

    function getCatWithAllParents(slug) {
        let parentList = [];
        let depth = 1

        let catObj = catList.filter((item) => item.slug === slug)
        if (catObj.length === 0) return
        catObj = { ...catObj[0] }
        let subCats = catList.filter((item) => item.parent == catObj.id)


        let catIndex = catList.findIndex((cat) => cat.id === catObj.id);
        while (catList[catIndex].parent !== 0) {
            parentList.push({
                id: catList[catIndex].id,
                title: catList[catIndex].title,
                icon: catList[catIndex].icon,
                slug: catList[catIndex].slug
            });
            catIndex = catList.findIndex((cat) => cat.id === catList[catIndex].parent);
            depth += 1;
        }
        parentList.push({
            id: catList[catIndex].id,
            title: catList[catIndex].title,
            icon: catList[catIndex].icon,
            slug: catList[catIndex].slug,
        });

        if (depth === 3) {
            subCats = catList.filter((item) => item.parent == catObj.parent)
            parentList.splice(0, 1)
        }

        setCatShow({
            depth,
            sub: subCats,
            parent: [...parentList.reverse()]
        })
    }



    useEffect(() => {
        if (currentCat.id > 0) {
            getCatWithAllParents(currentCat.slug)
        } else {
            setCatShow({
                depth: 0,
                sub: parentCats,
                parent: []
            })
        }
    }, [currentCat])




    return ( 
        // h-[calc(100vh-2rem)]
        <Card className=" max-w-[14rem] min-w-60 p-2 mb-5 min-h-80 shadow-none">

            {catShow.depth > 0 ? (
                <Link to={`/s/${slug.city}${slug.filters.cities !== '' ? "?cities=" + slug.filters.cities : ''}`}>
                    <div className='flex items-center  px-3 py-2.5 gap-1.5 text-gray-400 cursor-pointer hover:text-gray-700 transition text-sm'>
                        <FiArrowRight className='w-4 h-4' />
                        <p>
                            همه آگهی ها
                        </p>
                    </div>
                </Link>
            ) : (
                <div className="mb-2 pt-3 px-3">
                    <Typography variant="h6" className='text-sm' color="blue-gray">
                        دسته ها
                    </Typography>
                </div>
            )}




            {
                catShow.depth > 0 ? (
                    <>
                        <List className='w-full min-w-full py-1 px-0 text-sm gap-0' key={1}>
                            {catShow.parent.map((parent, index) => {
                                return (

                                    <Link key={index} to={`/s/${slug.city}/${parent.slug}${slug.filters.cities !== '' ? "?cities=" + slug.filters.cities : ''}`}>
                                        <ListItem className={`px-3 py-2 rounded-sm hover:bg-gray-100`}>
                                            <div className='ml-2.5'>
                                                {
                                                    index === 0 ? (<FiTruck className="h-4 w-4 text-sm" />) : null
                                                }
                                            </div>
                                            <p className='text-md font-bold'>
                                                {parent.title}
                                            </p>
                                        </ListItem>
                                    </Link>

                                )
                            })}
                        </List>

                        {catShow.sub.map((cat) => {
                            return (
                                <div className='pr-7' key={cat.id}>
                                    <Link to={`/s/${slug.city}/${cat.slug}${slug.filters.cities !== '' ? "?cities=" + slug.filters.cities : ''}`}>
                                        <div className={`border-r-2
                                        ${catShow.depth === 1 ? "text-sm" : "text-xs"}
                                        ${currentCat.slug === cat.slug ? "text-red-900 font-bold border-pink-600" : "text-gray-700"}`}>
                                            <div className={`px-3 py-2.5 cursor-pointer rounded-sm hover:bg-gray-50`}
                                            >
                                                <p className='text-md'>
                                                    {cat.title}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </>
                ) : (
                    <>

                        {catShow.sub.map((cat) => {
                            return (
                                <Link key={cat.id} to={`/s/${slug.city}/${cat.slug}${slug.filters.cities !== '' ? "?cities=" + slug.filters.cities : ''}`}>
                                    <ListItem className={`px-3 py-2.5 rounded-sm hover:bg-gray-100
                                ${cat.slug == currentCat.slug ? "font-bold" : ""}
                            `}
                                    >
                                        <div className='ml-2.5'>
                                            <FiTruck className="h-3.5 w-3.5 text-sm" />
                                        </div>
                                        {cat.title}
                                    </ListItem>
                                </Link>
                            )
                        })}


                    </>
                )
            }

        </Card>
     );
}
 
export default Categories;
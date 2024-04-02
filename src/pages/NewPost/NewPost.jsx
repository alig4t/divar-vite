import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../config';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import WithAuthCheck from '../../components/HOC/WithAuthCheck';
import Navbar from '../../components/Navbar/Navbar';
import CatList from "../../JsonFiles/Catlist.json"
import Provinces from "../../components/CityModal/provinces.json"
import CityList from "../../components/CityModal/cities.json"
import AllFilters from "../../JsonFiles/AllFilters.json"
import { FiChevronLeft } from 'react-icons/fi';
import { Button, Input, Option, Select, Textarea, ThemeProvider } from '@material-tailwind/react';
import { useDropzone } from 'react-dropzone'

import CustomStyle from "../../assets/css/custom"



const NewPost = () => {
    // let user = supabase.auth.user
    // const { data: { user } } = await supabase.auth.getUser()

    const [queryStirng] = useSearchParams();
    const [listShow, setListShow] = useState([])
    const [cat, setCat] = useState(null)
    const [catFilters, setCatFilters] = useState([])

    const navigate = useNavigate()
    let catSlug = queryStirng.get('slug')

    // value={minFilter} onChange={(e) => selectMinHandler(e)}
    const [provinceInput, setProvinceInput] = useState(0)
    const [cityInput, setCityInput] = useState([])


    console.log(provinceInput);
    useEffect(() => {
        let parentSlug = catSlug ? catSlug : ''
        let list = {}
        let parentObj = {}
        if (parentSlug === '') {
            list = CatList.filter((item) => { return item.parent === 0 })

        } else {
            parentObj = CatList.find((item) => { return item.slug === parentSlug })
            list = CatList.filter((item) => item.parent === parentObj.id)
        }

        console.log(list);

        if (list.length === 0) {
            setCat(parentObj)
            setListShow([])
            let catId = parentObj.id
            let filters = AllFilters.find((item) => {
                if (item.catId.includes(catId)) {
                    return item
                }
            })
            console.log(filters);
            setCatFilters(filters)
        } else {
            setListShow(list)
            setCat(null)
        }


    }, [catSlug])

    const clearCat = () => {
        setCat({})
        navigate('/new')
    }

    const proHandler = (e) => {
        console.log(e);
        setProvinceInput(e)
        let getCities = CityList.filter((item) => item.province_id === Number(e.id))
        console.log(getCities);
        setCityInput(getCities)
    }


    const [files, setFiles] = useState({ file1: "", file2: "", file3: "", file4: "" })

    // const [file1, setFile1] = useState();
    function handleFileChange(e, key) {
        console.log(key);
        // console.log(key);
        // console.log(e.target.files);
        // let filesObj = {...files}
        // filesObj[key] = URL.createObjectURL(e.target.files[0])
        // setFiles(filesObj);
    }
    console.log(files);
    // const [file2, setFile2] = useState();
    // function handleChange2(e) {
    //     console.log(e.target.files);
    //     setFile2(URL.createObjectURL(e.target.files[0]));
    // }


    return (
        <>
            <Navbar />
            <ThemeProvider value={CustomStyle}>

                <div className='w-full flex justify-center items-center my-5'>

                    <div className='w-full max-w-lg  p-4'>

                        <div className='border-b-2 border-pink-500 py-2'>
                            <h2 className='font-bold'>ثبت آگهی</h2>
                        </div>

                        <div className='mt-5'>
                            {cat ? (
                                <>
                                    <div className='border-2 border-gray-200 p-6 rounded-md flex items-center justify-between'>
                                        <span className='font-bold'>
                                            {cat.title}
                                        </span>

                                        <Button color='cyan' onClick={clearCat}>
                                            تغییر دسته بندی
                                        </Button>

                                    </div>

                                    <div className='my-6 flex flex-col gap-5'>
                                        <div className='flex gap-2 '>
                                            <Select size='lg' color="teal" label="انتخاب استان"
                                                onChange={(e) => proHandler(e)}
                                            >
                                                {Provinces.map((item) => {
                                                    return <Option value={item}>{item.title}</Option>
                                                })}
                                            </Select>
                                            <Select size='lg' color='teal' label="انتخاب شهر" disabled={provinceInput === 0 ? true : false}>
                                                {cityInput.map((city) => {
                                                    return <Option value={city.id}>{city.title}</Option>
                                                })}
                                            </Select>
                                        </div>

                                        <div >
                                            <Input variant="outlined" size='lg' maxLength="70" color='teal' label="عنوان آگهی" placeholder="" />
                                        </div>

                                        <Textarea variant="outlined" label="توضیحات آگهی" />

                                        {/* <h3 className='font-bold text-sm'>تصاویر آگهی</h3> */}


                            {
                                catFilters.supa.price.map((item)=>{
                                    return <Input label={item.title} variant='outlined' type='number' icon="تومان" />
                                })
                            }

                                        {

                                            catFilters.supa.datas.map((item) => {
                                                if (item.type === "select") {
                                                    return <Select label={item.title}>
                                                        {item.valid.map((opt) => {
                                                            return <Option>{opt}</Option>
                                                        })}
                                                    </Select>
                                                }
                                            })
                                        }
                                        {
                                            catFilters.supa.featured.map((item) => {
                                                if (item.type === "select") {
                                                    return <Select label={item.title}>
                                                        {item.valid.map((opt) => {
                                                            return <Option>{opt}</Option>
                                                        })}
                                                    </Select>
                                                }else if(item.type === "number"){
                                                    return <Input label={item.title} type='number' />
                                                }
                                            })

                                        }


                                        <div className='border-b-2 border-pink-500 py-2'>
                                            <h2 className='font-bold'>تصاویر آگهی</h2>
                                        </div>


                                        <div className='flex gap-3 flex-wrap'>

                                            {
                                                Object.entries(files).map(([key, value]) => {
                                                    console.log(key);
                                                    return (
                                                        <div class="flex flex-col gap-1 items-center justify-start w-32 h-42 relative overflow-hidden">
                                                            <label for="dropzone-file" class="flex flex-col items-center relative justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                                    <svg class="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                                    </svg>
                                                                    <p class="mb-2 text-sm text-center text-gray-500 dark:text-gray-400"><span class="font-semibold">

                                                                        برای انتخاب عکس کلیک کنید
                                                                    </span>
                                                                        <br />
                                                                        <span className='mt-2 text-xs'> یا بکشید</span>
                                                                    </p>
                                                                    {/* <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>  */}
                                                                </div>
                                                                <input id="dropzone-file" type="file" onChange={(e) => handleFileChange(e, key)} class="hidden" />
                                                                {value !== "" && <img src={value} className='absolute top-0 right-0 w-full h-full object-cover rounded-md border-4 border-pink-500' />}
                                                            </label>

                                                            {key === "file1" ? <p className='text-xs'>عکس اصلی</p> : <p> </p>}



                                                        </div>
                                                    )
                                                })
                                            }
                                            {/* 
                                            <div class="flex flex-col gap-2 items-center justify-center w-32 h-42 relative overflow-hidden">
                                                <label for="dropzone-file" class="flex flex-col items-center relative justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg class="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p class="mb-2 text-sm text-center text-gray-500 dark:text-gray-400"><span class="font-semibold">

                                                            برای انتخاب عکس کلیک کنید
                                                        </span>
                                                            <br />
                                                            <span className='mt-2 text-xs'> یا بکشید</span>
                                                        </p>
                                                        {/* <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                                            {/* </div>
                                                    <input id="dropzone-file" type="file" onChange={handleChange1} class="hidden" />
                                                    {file1 && <img src={file1} className='absolute top-0 right-0 w-full h-full object-cover rounded-md border-4 border-pink-500' />}
                                                </label>
                                                <p className='text-sm'>عکس اصلی</p>
                                            </div>

                                            <div class="flex flex-col gap-2 items-center justify-center w-32 h-42 relative overflow-hidden">
                                                <label for="dropzone-file" class="flex flex-col items-center relative justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg class="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                       
                                                    </div>
                                                    <input id="dropzone-file" type="file" onChange={handleChange2} class="hidden" />
                                                    {file2 && <img src={file2} className='absolute top-0 right-0 w-full h-full object-cover rounded-md border-4 border-pink-500' />}
                                                </label>
                                                <p className='text-sm'>سایر</p>
                                            </div> */}


                                        </div>



                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className='text-sm my-3'>انتخاب دسته بندی</p>
                                    {listShow?.map((item) => {
                                        return (
                                            <Link to={`/new?slug=${item.slug}`}>
                                                <div className='flex justify-between border-b-2 border-gray-100 py-2 cursor-pointer'>
                                                    <span>
                                                        {item.title}
                                                    </span>
                                                    <FiChevronLeft />
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </>
                            )}


                        </div>
                    </div>
                </div>
            </ThemeProvider>

        </>
    );
}

export default WithAuthCheck(NewPost);
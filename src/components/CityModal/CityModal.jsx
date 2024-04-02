import React, { useEffect, useState } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { FiChevronLeft } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Checkbox,
    List,
    ListItem,
} from "@material-tailwind/react";

import provinces from "./provinces.json"
import cities from "./cities.json"

import { useParams, useNavigate } from "react-router-dom"
import URLMaker from '../../helper/URLMaker';
import { useStateContext } from '../../context/SiteContext';


const CityModal = (props) => {

    const { currentCity } = useStateContext()

    // console.log(currentCity);

    const [provinceList] = useState([...provinces])
    const [cityList, setCityList] = useState([])
    const [selectedCities, setSelectedCities] = useState({ list: [], ids: [] })

    // console.log(selectedCities.ids);

    const navigate = useNavigate()
    const getCities = (parent) => {
        let citiesList = cities.filter((city) => {
            if (city.province_id === parent) return city
        })
        setCityList(citiesList)
    }

    useEffect(() => {
        setSelectedCities({
            ids: [...currentCity.idsArray],
            list: [...currentCity.citiesList]
        })
    }, [currentCity])


    // const { cat } = useParams()
    const { currentCat } = useStateContext()
    // let catName = cat != undefined ? cat : ""
    const checkCity = (id, title = "", slug = "") => {

        let checkedCities = { ...selectedCities }
        let index = checkedCities.ids.findIndex(item => item === id)

        if (index > -1) {
            checkedCities.ids.splice(index, 1)
            let objIndex = checkedCities.list.findIndex(city => city.id == id)
            checkedCities.list.splice(objIndex, 1)
        } else {
            checkedCities.ids.push(id)
            let newObj = { id, title, slug }
            checkedCities.list.push(newObj)
        }

        setSelectedCities(checkedCities)
    }

    const clearChecked = () => {
        setSelectedCities({ list: [], ids: [] })
    }


    const searchHandler = txt => {

        let allcities = [...cities]
        if (txt.length > 1) {
            let filteredCities = allcities.filter((item) => {
                if (item.title.indexOf(txt) > -1) {
                    return item
                }
            })
            // setShowList({ type: "search", list: filteredCities })
            setCityList(filteredCities)
        } else {
            // if (showList.type != "parent") {
            //     setShowList({ type: "parent", list: provinceObj })
            // }
            setCityList([])
        }
    }

    const backToProvinces = () => {
        setCityList([])
    }

    const navToNewCities = () => {

        let multiCity = selectedCities.ids.length > 1 ? true : false
        let citySlug = ''
        let filters = {}
        if (multiCity) {
            let hashCities = '';
            selectedCities.list.forEach((item, key) => {
                hashCities += item.id
                hashCities += ','
            })
            // console.log(hashCities);
            hashCities = hashCities.slice(0, -1)
            // hashCities = encodeURIComponent(hashCities)
            citySlug = "iran";
            filters.cities = hashCities
        } else {
            citySlug = selectedCities.list[0].slug
        }
        let filtersString = new URLSearchParams(filters);

        if (filtersString.toString().length > 0) {
            filtersString = "?" + filtersString;
        }

        let urlArray = ['/s', citySlug, currentCat.slug]
        // console.log(filtersString);
        urlArray = urlArray.filter((seg) => seg !== '')
        urlArray = urlArray.join('/')

        console.log(urlArray + filtersString);

        // alert(urlArray + filtersString)
        props.close()

        navigate(urlArray + filtersString)
    }

    return (


        <Dialog
            open={props.show}
            size={window.innerWidth < 768 ? "xxl" : "sm"}
            handler={props.close}
            className={`flex flex-col gap-2 ${window.innerWidth > 768 ? "max-h-[90vh]" : ""}`}
        >

            {/* <DialogHeader>انتخاب شهر</DialogHeader> */}

            <div className="flex flex-col justify-center gap-4 shrink-0 p-4 ">

                <h3 className='text-blue-gray-900 antialiased font-sans text-2xl font-semibold leading-snug'>انتخاب شهر</h3>

                <p className={`${selectedCities.ids.length === 0 ? "hidden" : "block"} float-end absolute left-2 top-5 mb-3 ml-2 text-11 cursor-pointer text-red-700 hover:bg-blue-gray-50 px-2 py-1 rounded-lg `}
                    onClick={clearChecked}
                >حذف همه</p>


                <div className={`w-full ${selectedCities.ids.length > 0 ? "h-12" : "h-2"} overflow-x-scroll overflow-y-hidden flex gap-3 list-scroll`}>

                    {selectedCities.list.map((item) => {
                        return (
                            <span key={item.id} className='px-2 py-1 bg-red-100 gap-2 flex items-center justify-center rounded-lg'>
                                <p className='text-red-900 whitespace-nowrap' >{item.title}</p>
                                <span className='w-5 h-5 flex  justify-center items-center  rounded-full transition hover:bg-brown-100 cursor-pointer'>
                                    <IoIosClose className='text-red-900 text-lg'
                                        onClick={() => checkCity(item.id)}
                                    />
                                </span>
                            </span>
                        )
                    })}



                </div>




                <div className='flex gap-2'>


                    <input type='text'
                        className='flex-grow p-2 px-3 border-2 border-gray-100 rounded-md focus:outline-gray-300 transition'
                        placeholder='نام شهر را وارد کنید..'
                        onChange={(e) => searchHandler(e.target.value)}
                    />
                </div>




            </div>



            <DialogBody className='flex-1 overflow-y-scroll modal-scroll'>



                {/* <div className='max-w-full relative mt-3' >
              <FiSearch className='absolute left-2.5 text-lg text-gray-500 m-auto top-0 bottom-0' />
              <input className='w-full md:min-w-80 border-2 outline-none transition rounded-md border-gray-100 focus:border-gray-300 p-2 pl-8 pr-3 text-blue-gray-900' placeholder='نام شهر را وارد کنید..' />
            </div> */}

                {/* <Card className="w-full">
              <div className='w-full p-2 flex justify-between items-center'>
                <p>آذربایجان شرقی</p>
                <span>
                  <FiChevronLeft />
                </span>
              </div>
            </Card> */}


                <List key={5} className=''>
                    {cityList.length === 0 ? (
                        provinceList.map((item) => {
                            return (
                                <ListItem className='flex justify-between items-center'
                                    onClick={() => getCities(item.id)}
                                    key={item.id}
                                >
                                    <p>{item.title}</p>
                                    <span>
                                        <FiChevronLeft />
                                    </span>
                                </ListItem>
                            )
                        })
                    ) : (
                        <>
                            {/* <ListItem>بازگشت</ListItem> */}
                            {
                                cityList.map((item) => {
                                    return (

                                        <ListItem className="flex py-0 justify-between items-center"
                                            onClick={(e) => checkCity(item.id, item.title, item.slug)}
                                        >
                                            <p>{item.title}</p>

                                            <Checkbox color="pink" checked={selectedCities.ids.includes(item.id) ? true : false}
                                                onChange={(e) => ({})}
                                            />
                                        </ListItem>
                                    )
                                })
                            }
                        </>
                    )}


                </List>





            </DialogBody>
            <DialogFooter>

                <div className='flex-grow'>
                    {cityList.length > 0 ? (

                        <Button variant="text" className="flex p-2 md:px-4 items-center gap-1 transition"
                            onClick={backToProvinces}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                            </svg>

                            بازگشت به همه استان ها
                        </Button>

                    ) : null}
                </div>



                <Button
                    variant="text"
                    color="red"
                    onClick={props.close}
                    className="ml-1"
                >
                    <span>بی خیال</span>
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    onClick={navToNewCities}
                    disabled={currentCity.idsStr === selectedCities.ids.sort().join("") || selectedCities.ids.length === 0 ? true : false}
                >
                    <span>تایید</span>
                </Button>
            </DialogFooter>
        </Dialog>


    );
}

export default CityModal;






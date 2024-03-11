
import React, { useEffect, useRef, useState } from "react";

import { Select, Option } from "@material-tailwind/react";
import { FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { format } from "../../helper/Helper";


const MinMaxFilter = (props) => {

    const [queryStirng, setQueryStirng] = useSearchParams();
    const filterParam = queryStirng.get(props.slug)
    const regexMinMaxUrl = /(^((-\d+)|(\d+\-)|(\d+\-\d+))$)/g;

    const [minFilter, setMinFilter] = useState(null)
    const [minInputEnter, setMinInputEnter] = useState("")
    const minInputRef = useRef(null)

    const [maxFilter, setMaxFilter] = useState(null)
    const [maxInputEnter, setMaxInputEnter] = useState("")
    const maxInputRef = useRef(null)

    const objEnter = { value: "enter", label: "وارد کردن مقدار دلخواه", id: "enter" }

    const [minOptions] = useState(() => {
        let values = []
        let newObj = {}
        props.suggestListMin.forEach((item) => {
            newObj = { value: item, label: props.unit === 'تومان'? Number(item).toLocaleString() : Number(item)  + " " + props.unit, id: "min" + item }
            values.push(newObj)
        })
        return [...values, objEnter]
    })

    const [maxOptions] = useState(() => {
        let values2 = []
        let newObj2 = {}
        props.suggestListMin.forEach((item) => {
            newObj2 = { value: item, label: props.unit === 'تومان'? Number(item).toLocaleString() : Number(item) + " " + props.unit, id: "min" + item }
            values2.push(newObj2)
        })
        return [...values2, objEnter]
    })



    function changeMinInputHandler(val) {
        let newVal = props.unit === 'تومان'? format(val) : val
        setMinInputEnter(newVal)
        setMinFilter("enter")
    }

    function changeMaxInputHandler(val) {
        let newVal = props.unit === 'تومان'? format(val) : val
        setMaxInputEnter(newVal)
        setMaxFilter("enter")
    }


    const clearMax = () => {
        setMaxFilter(null)
        setMaxInputEnter("")
        urlMakerWithMinMaxFilter(props.slug, '', "max")
    }
    const clearMin = () => {
        setMinFilter(null)
        setMinInputEnter("")
        urlMakerWithMinMaxFilter(props.slug, '', "min")
    }

    const selectMinHandler = (value) => {
        if (value === "enter") {
            setMinFilter(value)
            setTimeout(() => {
                minInputRef.current.focus()
            }, 500)
        } else {
            setMinFilter(value)
            urlMakerWithMinMaxFilter(props.slug, value, "min")
        }
    }


    const selectMaxHandler = (value) => {
        if (value === "enter") {
            setMaxFilter(value)
            setTimeout(() => {
                maxInputRef.current.focus()
            }, 500)
        } else {
            setMaxFilter(value)
            urlMakerWithMinMaxFilter(props.slug, value, "max")
        }
    }

    const minSubmit = (e) => {
        let unformated = parseInt(e.target.value.replace(/,/g, ''));
        if (e.key === 'Enter' || e.type === 'blur') {
            minInputRef.current.blur()
            urlMakerWithMinMaxFilter(props.slug, unformated, "min")
        }
    }

    const maxSubmit = (e) => {
        let unformated2 = parseInt(e.target.value.replace(/,/g, ''));
        if (e.key === 'Enter' || e.type === 'blur') {
            maxInputRef.current.blur()
            urlMakerWithMinMaxFilter(props.slug, unformated2, "max")
        }
    }


    useEffect(() => {
        if (queryStirng.has(props.slug)) {
            if (regexMinMaxUrl.test(queryStirng.get(props.slug))) {
                let filterArray = queryStirng.get(props.slug).split("-");
                let minFilterUrl = filterArray[0];
                let maxFilterUrl = filterArray[1];

                if (props.suggestListMin.includes(minFilterUrl)) {
                    selectMinHandler(minFilterUrl);
                } else if (minFilterUrl.length > 0) {
                    changeMinInputHandler(minFilterUrl)
                }
                if (props.suggestListMax.includes(maxFilterUrl)) {
                    selectMaxHandler(maxFilterUrl);
                } else if (maxFilterUrl.length > 0) {
                    changeMaxInputHandler(maxFilterUrl)
                }
            }
        } else {
            setMinFilter(null)
            setMaxFilter(null)
        }
    }, [filterParam])


    const urlMakerWithMinMaxFilter = (slug, value, opt) => {

        let minFilterUrl = '';
        let maxFilterUrl = '';
        let newArrayFilter = ['', ''];

        setQueryStirng(params => {
            if (params.has(slug)) {
                let filters = queryStirng.get(slug).split("-")
                minFilterUrl = filters[0];
                maxFilterUrl = filters[1];
                if (opt === "max") {
                    newArrayFilter[0] = minFilterUrl
                    newArrayFilter[1] = value
                } else {
                    newArrayFilter[0] = value
                    newArrayFilter[1] = maxFilterUrl
                }
            } else {
                if (opt === "max") {
                    newArrayFilter[1] = value
                } else {
                    newArrayFilter[0] = value
                }
            }
            let newFilterQuery = newArrayFilter.join("-")
            if (newFilterQuery === '-') {
                params.delete(slug)
            } else {
                params.set(slug, newFilterQuery)
            }
            return params
        })
    }


    return (
        <>
            <div className="w-full p-2  border-t-2 border-gray-100 py-4">
                <h6 className="mb-2 text-16 font-bold text-pink-500 px-2">{props.title}</h6>


                <div className="relative py-3">

                    <Select label={`حداقل ${props.title}`} value={minFilter} onChange={(e) => selectMinHandler(e)} name="minFilter" color="pink" placeholder={"Select"}  >
                        {minOptions.map((option,index) => (
                            <Option key={index} value={String(option.value)}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                    <FiX className={`absolute ${minFilter === null ? "hidden" : ""} cursor-pointer right-[6px] top-0 bottom-0 m-auto z-50`} onClick={clearMin} />



                    {minFilter === "enter" ? (
                        <>
                            <input ref={minInputRef} value={minInputEnter} onChange={(e) => changeMinInputHandler(e.target.value)} type="txt" className="absolute top-0 bottom-0 m-auto max-h-5 w-[159px] px-3 pr-5 focus:outline-none right-2 z-40 text-sm leading-[25px] text-pink-500 placeholder:text-12" placeholder="مقدار دلخواه را وارد نمایید.." onBlur={(e) => minSubmit(e)} onKeyDown={(e) => minSubmit(e)} />

                            {minInputEnter.length > 0 ? (<span className={`absolute ${minFilter === null ? "hidden" : ""} cursor-pointer flex items-center w-6 text-xs left-10 top-0 bottom-0 m-auto z-50`} onClick={() => setMinFilter(null)}>{props.unit}</span>) : null}
                        </>
                    )
                        : (
                            <>
                            </>
                        )}

                </div>






                <div className="relative py-2">

                    <Select label={`حداکثر ${props.title}`} value={maxFilter} onChange={(e) => selectMaxHandler(e)} name="maxFilter" color="pink" placeholder={"Select"}  >
                        {maxOptions.map((option,index) => (
                            <Option key={index} value={String(option.value)}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                    <FiX className={`absolute ${maxFilter === null ? "hidden" : ""} cursor-pointer right-[6px]  top-0 bottom-0 m-auto z-50`} onClick={clearMax} />



                    {maxFilter === "enter" ? (
                        <>
                            <input ref={maxInputRef} value={maxInputEnter} onChange={(e) => changeMaxInputHandler(e.target.value)} type="txt" className="absolute top-0 bottom-0 m-auto max-h-5 w-[159px] px-3 pr-5 focus:outline-none right-2 z-40 text-sm leading-[24px] text-pink-500 placeholder:text-12" placeholder="مقدار دلخواه را وارد نمایید.." onBlur={(e) => maxSubmit(e)} onKeyDown={(e) => maxSubmit(e)} />

                            {maxInputEnter.length > 0 ? (<span className={`absolute ${maxFilter === null ? "hidden" : ""} cursor-pointer flex items-center w-6 text-xs left-10 top-0 bottom-0 m-auto z-50`} onClick={() => setMaxFilter(null)}>{props.unit}</span>) : null}
                        </>
                    )
                        : (
                            <>
                            </>
                        )}

                </div>








            </div>
        </>
    )
}

export default MinMaxFilter;
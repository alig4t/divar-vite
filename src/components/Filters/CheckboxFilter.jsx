
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CheckboxFilter = (props) => {

    const [checkBoxList, setCheckBoxList] = useState([])
    const [queryStirng, setQueryString] = useSearchParams()
    const filterParam = queryStirng.get(props.slug)

    const regexUrl = /(^(\d+|\w+))(\,(\d+|\w+))*$/g

    const urlMakerWithCheckBoxFilter = (value) => {

        setQueryString(params => {
            if (params.has(props.slug)) {
                let vals = params.get(props.slug).split(',');
                let index = vals.indexOf(value)

                if (index > -1) {
                    vals.splice(index, 1);
                } else {
                    vals.push(value)
                }

                vals.length > 0 ? params.set(props.slug, vals) : params.delete(props.slug);

            } else {
                params.append(props.slug, value)
            }
            return params;
        });
    }




    const checkHandler = val => {
        urlMakerWithCheckBoxFilter(val)
    }

    useEffect(() => {
        
        if (queryStirng.has(props.slug)) {
            let urlValStr = queryStirng.get(props.slug)
            if (regexUrl.test(urlValStr)) {
                let checkListArray = [];
                let urlValArray = urlValStr.split(',');
                urlValArray.forEach((val) => {
                    let inItemsArray = props.itemsList.filter(item => item.value === val)
                    if (inItemsArray.length === 1 && !checkListArray.includes(val)) {
                        checkListArray.push(val)
                    }
                })
               return setCheckBoxList(checkListArray)
            }
        }
        setCheckBoxList([])

    }, [filterParam])

    return (
        <>
            <div className="w-full p-2  border-t-2 border-gray-100 py-4">

                <h6 className="mb-4 text-16 font-bold text-pink-500 px-2">
                    {props.title}
                </h6>


                <div className="relative py-2">

                    {props.itemsList.map((item,index) => {
                        return (
                            <span key={index} className={`inline-block bg-white border-2 border-gray-300 text-gray-700 hover:border-pink-400 transition rounded-full m-1 min-w-8 p-2 text-center  py-1.5 text-xs cursor-pointer ${checkBoxList.includes(item.value) ? "border-pink-400 hover:border-pink-600 bg-gray-100 text-gray-800" : "sssss"} `}
                                onClick={() => checkHandler(item.value)}
                            >{item.title}</span>
                        )
                    })}



                </div>

            </div>
        </>
    );
}

export default CheckboxFilter;
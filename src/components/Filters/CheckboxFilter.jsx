
import React, { useState } from 'react';


const filterJson = {
    "slug": "rooms",
    "type": "CheckboxFilter",
    "title": "تعداد اتاق",
    "itemsList": [
        {
            "title": "بدون اتاق",
            "value": "noroom"
        },
        {
            "title": "1",
            "value": "1"
        },
        {
            "title": "2",
            "value": "2"
        },
        {
            "title": "3",
            "value": "3"
        },
        {
            "title": "4",
            "value": "4"
        },
        {
            "title": "بیشتر از 4",
            "value": "more"
        }
    ]
}

const CheckboxFilter = () => {

    const [checkBoxList, setCheckBoxList] = useState([])

    const checkHandler = val => {
        console.log(val);
        let prevChecked = [...checkBoxList]
        let index = prevChecked.findIndex((item) => item == val)
        if (index > -1) {
            prevChecked.splice(index, 1)
        } else {
            prevChecked.push(val)
        }
        setCheckBoxList(prevChecked)
    }

    return (
        <>
            <div className="w-full p-2  border-t-2 border-gray-100 py-4">

                <h6 className="mb-4 text-16 font-bold text-pink-500 px-2">تعداد اتاق</h6>


                <div className="relative py-2">

                    {filterJson.itemsList.map((item) => {
                        return (
                            <span className={`bg-white border-2 border-gray-300 text-gray-700 hover:border-pink-400 transition rounded-full float-right m-1 min-w-8 p-2 text-center  py-1.5 text-xs cursor-pointer ${checkBoxList.includes(item.value) ? "border-pink-400 hover:border-pink-600 bg-gray-100 text-gray-800" : "sssss"} `}
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
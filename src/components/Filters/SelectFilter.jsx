import { Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";


const SelectFilter = (props) => {


    const [queryStirng, setQueryStirng] = useSearchParams();
    const filterParam = queryStirng.get(props.slug)

    const [selected, setSelected] = useState(null)


    const selectHandler = (item) => {
        console.log(item);
        urlMakerWithSelectTypeFilter(props.slug, item)
        // setSelected(item)
    }

    const urlMakerWithSelectTypeFilter = (slug, value) => {
        console.log(value);
        setQueryStirng(params => {
            params.set(slug, value)
            return params
        })
    }

    const urlMakerSelectTypeClear = () => {
        setSelected(null)
        setQueryStirng(params => {
            params.delete(props.slug)
            return params
        })
    }

 
    useEffect(() => {

        if (queryStirng.has(props.slug)) {
            let val = queryStirng.get(props.slug)
            console.log(val);
            let inSuggestArray = props.suggestList.filter(item => item.value === val)
            console.log(inSuggestArray);
            if (inSuggestArray.length === 1) {
                setSelected(inSuggestArray[0].value)
            }
        } else {
            setSelected(null)
        }
    }, [filterParam])

  

    return (
        <div className="w-full p-2  border-t-2 border-gray-100 py-4">

            <h6 className="mb-4 text-16 font-bold text-pink-500 px-2">{props.title}</h6>
            <div className="relative py-2">

                <Select label="سن بنا" value={selected} onChange={(e) => selectHandler(e)} name="selectFilter" color="pink" placeholder={"selectFilter"}  >
                    {props.suggestList.map((item) => (
                        <Option value={item.value}>
                            {item.title}
                        </Option>
                    ))}
                </Select>

                <FiX className={`absolute ${selected === null ? "hidden" : ""} cursor-pointer right-[6px] top-0 bottom-0 m-auto z-50`} onClick={urlMakerSelectTypeClear} />





            </div>
        </div>
    );
}

export default SelectFilter;
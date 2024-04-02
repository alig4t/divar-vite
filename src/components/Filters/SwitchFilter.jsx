
import { Switch } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SwitchFilter = (props) => {

    const [queryStirng, setQueryStirng] = useSearchParams();

    const [switchChecked,setSwitchChecked] = useState([])

    const urlMakerWithStatus = (slug) => {
        setQueryStirng(params => {
            if (params.has(slug)) {
                let state = params.get(slug);
                params.set(slug, !state)
                if (state == 'true') {
                    params.delete(slug)
                    return params
                }
            }
            params.set(slug, true)
            return params
        })
    }

    const checkHandler = slug => {
        // console.log(slug);
        urlMakerWithStatus(slug)
    }

    useEffect(() => {
        let switchObject = []

        props.itemsList.forEach(element => {
            if (queryStirng.has(element.slug) && queryStirng.get(element.slug) === "true") {
                // console.log(element.slug);
                switchObject.push(element.slug)
            }
        });

        // console.log(switchObject);
        setSwitchChecked(switchObject)
    }, [queryStirng])



    return (
        <>
            <div className="w-full p-2  border-t-2 border-gray-100 py-4">
                <h6 className="mb-4 text-16 font-bold text-pink-500 px-2">{props.title}</h6>
                <div className='flex flex-col gap-3'>
                    {props.itemsList.map((item, index) => {
                        return <Switch label={item.title} color='pink' checked={switchChecked.includes(item.slug) === true ? true:false}
                        onChange={()=>checkHandler(item.slug)}
                        />
                    })}
                </div>
            </div>
        </>
    );
}

export default SwitchFilter;
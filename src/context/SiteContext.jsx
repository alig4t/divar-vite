
import React, { createContext, useContext, useState } from 'react';

import DefaultFilters from "../JsonFiles/DefaultFilters.json"
import DefaultFilters2 from "../JsonFiles/DefaultFilters2.json"
import AllFilters from "../JsonFiles/AllFilters.json"

const stateContext = createContext()


export const ContextProvider = ({ children }) => {


    const [currentCity, setCurrentCity] = useState({
        idsStr: "",
        idsArray: [],
        citiesList: [{ title: "", slug: "" }],
    
    });
    const [currentCat,setCurrentCat] = useState({slug:'',filters: [...DefaultFilters, ...DefaultFilters2]})

    let titleForNav = 'انتخاب کنید'
    let slug = {city:'',cat:'',filters:{cities:""}};

    if (currentCity.idsArray.length > 1) {
        titleForNav = currentCity.idsArray.length + " " + "شهر"
        // slug = "/s/iran?cities=" + currentCity.idsArray.join('%2C')
        slug.city='iran';
        slug.filters.cities = currentCity.idsArray.join('%2C')
    } else if (currentCity.idsArray.length === 1) {
        titleForNav = currentCity.citiesList[0].title
        slug.city=currentCity.citiesList[0].slug;
    }

    const setCityHandler = (ids,citiesList) => {
        
        let idsStr = (ids.sort()).join("");
        localStorage.setItem("lastCities", ids.join("%2C"))
        setCurrentCity({
            idsStr,
            idsArray: ids,
            citiesList
        })
    }

    const setCatHandler = cat => {

        let catFilters = {filter:[{}]}
        if(cat.slug !== ''){

            catFilters = AllFilters.find((item)=>{
                if(item.catId.includes(cat.id)){
                    return item
                }
            })
            if(catFilters===undefined){
                catFilters = {filter:[{}]}
            }
            console.log([...DefaultFilters, ...catFilters.filter ,...DefaultFilters2]);
        }

        localStorage.setItem("catSlug",cat.slug)
        setCurrentCat({...cat,filters: [...DefaultFilters, ...catFilters.filter ,...DefaultFilters2]})
    }


    return (
        <stateContext.Provider value={{
            currentCity,
            setCityHandler,
            currentCat,
            setCatHandler,
            titleForNav,
            slug
        }}>
            {children}
        </stateContext.Provider>
    )
} 


export const useStateContext = () => useContext(stateContext)



//     const value = React.useMemo(() => [currentCity, setCurrentCity, titleForNav, slug], [currentCity])

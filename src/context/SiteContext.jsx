
import React, { createContext, useContext, useEffect, useState } from 'react';

import DefaultFilters from "../JsonFiles/DefaultFilters.json"
import DefaultFilters2 from "../JsonFiles/DefaultFilters2.json"
import AllFilters from "../JsonFiles/AllFilters.json"
import CityList from "../components/CityModal/cities.json"

const stateContext = createContext()


export const ContextProvider = ({ children }) => {

    console.log("siteContext");

    const [currentCity, setCurrentCity] = useState({
        idsStr: "301",
        idsArray: [301],
        citiesList: [{
            "id": 301,
            "title": "تهران",
            "slug": "tehran",
            "province_id": 8
        }]
    });


    useEffect(() => {
        let prevCities = localStorage.getItem('lastCities')
        let prevCitiesDecode = ""
        let prevCitiesArray = []
        try {
            prevCitiesDecode = decodeURIComponent(prevCities)
            prevCitiesArray = prevCitiesDecode.split(',')
        } catch (error) {
            prevCitiesArray = ["113"]
        }
        let cityListArray = []
        let ids = []
        prevCitiesArray.forEach(id => {
            let cityObj = CityList.find((item) => item.id === Number(id))
            if (cityObj === undefined || cityObj.parent === 0) {
                validAddress = false;
            } else {
                cityListArray.push(cityObj)
                ids.push(Number(id))
            }
        });
        let idsStr = (ids.sort()).join("");
        localStorage.setItem("lastCities", ids.join("%2C"))
        setCurrentCity({
            idsStr,
            idsArray: ids,
            citiesList : cityListArray
        })
    }, [])



    const [currentCat, setCurrentCat] = useState({ slug: '', filters: [...DefaultFilters, ...DefaultFilters2] })

    let titleForNav = 'انتخاب کنید'
    let slug = { city: '', cat: '', filters: { cities: "" } };

    if (currentCity.idsArray.length > 1) {
        titleForNav = currentCity.idsArray.length + " " + "شهر"
        // slug = "/s/iran?cities=" + currentCity.idsArray.join('%2C')
        slug.city = 'iran';
        slug.filters.cities = currentCity.idsArray.join('%2C')
    } else if (currentCity.idsArray.length === 1) {
        titleForNav = currentCity.citiesList[0].title
        slug.city = currentCity.citiesList[0].slug;
    }

    const setCityHandler = (ids, citiesList) => {

        let idsStr = (ids.sort()).join("");
        localStorage.setItem("lastCities", ids.join("%2C"))
        setCurrentCity({
            idsStr,
            idsArray: ids,
            citiesList
        })
    }

    const setCatHandler = cat => {

        let catFilters = { filter: [{}] }
        if (cat.slug !== '') {

            catFilters = AllFilters.find((item) => {
                if (item.catId.includes(cat.id)) {
                    return item
                }
            })
            if (catFilters === undefined) {
                catFilters = { filter: [{}] }
            }
            console.log([...DefaultFilters, ...catFilters.filter, ...DefaultFilters2]);
        }

        localStorage.setItem("catSlug", cat.slug)
        setCurrentCat({ ...cat, filters: [...DefaultFilters, ...catFilters.filter, ...DefaultFilters2] })
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
